from fastapi import APIRouter, Request, Form

router = APIRouter()

# GET method to render the compare page
@router.get("/")
async def compare(request: Request):
    return "hello"