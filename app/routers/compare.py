from fastapi import APIRouter, Request, Form
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
import yaml
from deepdiff import DeepDiff

router = APIRouter()

templates = Jinja2Templates(directory="app/templates")

class YamlCompareRequest(BaseModel):
    yaml1: str
    yaml2: str


# GET method to render the compare page
@router.get("/", response_class=HTMLResponse)
async def compare(request: Request):
    return templates.TemplateResponse("compare.html", {"request": request})

# POST method to handle YAML comparison from text input fields
@router.post("/", response_class=HTMLResponse)
async def compare_yaml(request: Request,yaml1: str = Form(...),  yaml2: str = Form(...) ):
        form_data=YamlCompareRequest(yaml1=yaml1,yaml2=yaml2)
        try:
            data1= yaml.safe_load(form_data.yaml1)
            data2= yaml.safe_load(form_data.yaml2)
            diff= DeepDiff(data1, data2, ignore_order=True)
            if not diff:
                result = {"result": "yamls are identical"}
            else:
            # Convert the DeepDiff result to a more user-friendly format
                changes = []
                for change_type, details in diff.items():
                    for key, value in details.items():
                        if isinstance(value, dict):
                            old_value = value.get('old_value', 'N/A')
                            new_value = value.get('new_value', 'N/A')
                            changes.append(f"Changed '{key}': from '{old_value}' to '{new_value}'")
                        else:
                            changes.append(f"{change_type}: {key} -> {value}")
                
                # Join all changes in a readable string
                result = {"result": "\n".join(changes)}
        except yaml.YAMLError as e:
            result= f'yaml error {str(e)}'

    # Render the same page but with comparison result
        return JSONResponse(result)
