# routers/__init__.py

from fastapi import APIRouter
from .compare import router as compare_router
from .convert import router as convert_router
from .fix import router as fix_router

# Create a main router that includes the individual routers
router = APIRouter()

router.include_router(compare_router, prefix="/compare", tags=["compare"])
router.include_router(convert_router, prefix="/convert", tags=["convert"])
router.include_router(fix_router, prefix="/fix", tags=["fix"])
