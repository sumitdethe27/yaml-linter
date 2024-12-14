from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi import Body
from app.routers.auth import User, auth_endpoint
from app.routers.convert import convert, InputValidation
from app.routers import router as main_router
import logging

# Initialize logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger("app.main")

# Initialize the FastAPI app
app = FastAPI()

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://now.sumitdethe.live", "https://yaml.sumitdethe.live"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/auth")
async def auth_endpoint_direct(
    request: Request,
    user: User,
    action: str = "login"
):
    return await auth_endpoint(request, user, action)


@app.post("/convert")
async def convert_endpoint_direct(
    request: Request,
    input_validation: dict = Body(...)
):
    input_data = InputValidation(**input_validation)  # Validate the input
    return await convert(input_data)

# Include routers
app.include_router(main_router, prefix="/api")

@app.middleware("http")
async def debug_request_middleware(request: Request, call_next):
    """
    Debug middleware to log all incoming requests
    """
    print(f"DEBUG: Incoming Request")
    print(f"URL: {request.url}")
    print(f"Method: {request.method}")
    print(f"Headers: {dict(request.headers)}")
    
    response = await call_next(request)
    
    print(f"DEBUG: Response Status Code: {response.status_code}")
    return response

@app.middleware("http")
async def fix_redirect_middleware(request: Request, call_next):
    """
    Middleware to ensure CORS headers are preserved during redirects.
    """
    response = await call_next(request)
    if response.status_code in {307, 308}:  # Redirect responses
        origin = request.headers.get("Origin")
        if origin in ["http://localhost:5173", "https://now.sumitdethe.live"]:
            response.headers["Access-Control-Allow-Origin"] = origin
            response.headers["Access-Control-Allow-Credentials"] = "true"
    return response

@app.options("/{path:path}")
async def preflight_check(request: Request, path: str):
    """
    Handles preflight OPTIONS requests to ensure proper CORS headers are returned.
    """
    print(f"DEBUG: Preflight OPTIONS request for path: {path}")
    headers = {
        "Access-Control-Allow-Origin": request.headers.get("Origin", "*"),
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": request.headers.get("Access-Control-Request-Headers", "*"),
        "Access-Control-Allow-Credentials": "true",
    }
    return JSONResponse(content="", headers=headers)
