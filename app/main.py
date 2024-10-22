from fastapi import FastAPI, Request # Make sure Request is imported
from fastapi.middleware.cors import CORSMiddleware
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from app.routers import router as main_router  # Adjust this import based on your structure

app = FastAPI()  # Initialize the FastAPI application
origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Set up static files and templates
app.mount("/static", StaticFiles(directory="static"), name="static")  # Serve static files from the 'static' directory
templates = Jinja2Templates(directory="app/templates")  # Set up Jinja2 template directory

# Register the main router with the app
app.include_router(main_router)  # Include the routers defined in app/routers/__init__.py

# Define the home route
@app.get("/")
async def home(request: Request):
    return templates.TemplateResponse("home.html", {"request": request})  # Render the home.html template
