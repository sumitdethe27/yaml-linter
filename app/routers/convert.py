from fastapi import APIRouter, Request, UploadFile, File, Form
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
import yaml
import json

router = APIRouter()

templates = Jinja2Templates(directory="app/templates")

# GET method to render the convert page
@router.get("/", response_class=HTMLResponse)
async def convert(request: Request):
    return templates.TemplateResponse("convert.html", {"request": request})

# POST method to handle file uploads and conversion
@router.post("/convert", response_class=HTMLResponse)
async def convert_post(request: Request, file: UploadFile = File(...), conversionType: str = Form(...)):
    content = await file.read()
    
    if conversionType == "json":  # YAML to JSON
        yaml_content = yaml.safe_load(content)
        converted_content = json.dumps(yaml_content, indent=4)
    else:  # JSON to YAML
        json_content = json.loads(content)
        converted_content = yaml.dump(json_content, sort_keys=False)
    
    return templates.TemplateResponse("convert.html", {
        "request": request,
        "converted_content": converted_content
    })
