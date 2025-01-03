from fastapi import APIRouter, Request
from pydantic import BaseModel
import yaml
import json

router = APIRouter()

class InputValidation(BaseModel):
    input : str

def dectect_formats(file: str):
    """
    Detect if the input string is JSON or YAML.
    Returns 'json', 'yaml', or 'unknown'
    """
    try:
        json.loads(file)
        if file.strip().startswith(("{","[")):
            return "json"
    except json.JSONDecodeError :
        pass
    try:
        yaml.safe_load(file)
        return "yaml"
    except yaml.YAMLError:
        pass


def yaml_to_json(file):
    """
    Convert YAML to JSON.
    Returns the JSON string or an error message
    """
    try:
        
        return json.dumps(file, indent=2)
    except yaml.YAMLError:
        pass
def json_to_yaml(file):
    """
    Convert JSON to YAML.
    Returns the YAML string or an error message
    """
    try:

        
        return yaml.dump(file)
    except json.JSONDecodeError as e:
        pass

@router.post("")
async def convert(request: InputValidation):
    try:
        output = ""
        inputFile = request.input
        formatype= dectect_formats(inputFile)
        if formatype == "yaml":
            print("yaml detected")
            yaml_dict = yaml.safe_load(inputFile)
            output = json.dumps(yaml_dict, indent=2)
        elif formatype == "json":
            print("json detected")
            json_dict = json.loads(inputFile)
            print(json_dict)
            output = json_to_yaml(json_dict)
        else:
            return {
                "success": False,
                "error": "Invalid Input. Please provide a valid YAML or JSON."
            }
        return {"success":True, "output":output}
    except Exception as e:
        return {"success":False, "error":str(e)}
