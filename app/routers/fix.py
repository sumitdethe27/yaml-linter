from fastapi import APIRouter, Request
import yaml
from yaml.scanner import ScannerError



router = APIRouter()

def lint(file:str)-> dict:
    '''
    input will be a yaml in string format 
    and errors will be returned in a dict

    '''
    try:
        yaml_load=yaml.load(file)

    except ScannerError as e:
        return {'error': str(e)}


# GET method to render the fix page
@router.get("/")
async def fix(request: Request):
    return "Hello"

# POST method to handle fixing YAML indentation
@router.post("/")
async def fix_post(request: Request):
    return "hello" 
