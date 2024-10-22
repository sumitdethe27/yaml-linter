from fastapi import APIRouter, Request, Form
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
import yaml

router = APIRouter()

templates = Jinja2Templates(directory="app/templates")

# GET method to render the fix page
@router.get("/", response_class=HTMLResponse)
async def fix(request: Request):
    return templates.TemplateResponse("fix.html", {"request": request})

# POST method to handle fixing YAML indentation
@router.post("/", response_class=HTMLResponse)
async def fix_post(request: Request, yaml_content: str = Form(...)):
    try:
        # Load and re-dump the YAML content to fix indentation
        parsed_yaml = yaml.safe_load(yaml_content)
        fixed_yaml = yaml.dump(parsed_yaml, sort_keys=False)

        result = fixed_yaml
    except yaml.YAMLError as e:
        result = f"Error: {str(e)}"
    
    return templates.TemplateResponse("fix.html", {
        "request": request,
        "result": result
    })
