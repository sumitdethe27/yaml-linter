from fastapi import APIRouter, Request, Form
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.templating import Jinja2Templates
router = APIRouter()
templates = Jinja2Templates(directory="app/templates")

# GET method to render the compare page
@router.get("/", response_class=HTMLResponse)
async def compare(request: Request):
    return templates.TemplateResponse("compare.html", {"request": request})
