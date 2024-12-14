from fastapi import APIRouter, HTTPException, Request, Query
from pydantic import BaseModel
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import JWTError, jwt
import asyncpg
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Database URL and secret key from .env
DATABASE_URL = os.getenv("DATABASE_URL")
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Router setup
router = APIRouter()

# Pydantic models
class User(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

# Utility functions
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

async def get_db_connection():
    """
    Returns a connection to the PostgreSQL database using asyncpg.
    """
    try:
        print(f"Connecting to database at {DATABASE_URL}")
        conn = await asyncpg.connect(
            DATABASE_URL, 
            timeout=5,  # Connection timeout
            statement_cache_size=0  # Disable statement caching for debugging
        )
        print(f"Database connection established: {conn}")
        return conn
    except Exception as e:
        print(f"Database connection failed: {e}")
        print(DATABASE_URL)
        raise HTTPException(status_code=500, detail=f"Database connection failed: {str(e)}")

# Utility function to retrieve user by email
async def get_user_by_email(email: str, conn: asyncpg.Connection):
    result = await conn.fetchrow("SELECT * FROM users WHERE email = $1", email)
    return result

@router.post("/")  # Explicit route
async def auth_endpoint(
    request: Request,
    user: User,
    action: str = Query(default="login")
):
    """
    Handles both login and signup actions 
    """
    # Comprehensive logging
    print("======== AUTH ENDPOINT DEBUG ========")
    print(f"Full Request URL: {request.url}")
    print(f"Request Method: {request.method}")
    print(f"Action: {action}")
    print(f"User Email: {user.email}")
    print(f"Request Headers: {dict(request.headers)}")
    print(f"Query Params: {dict(request.query_params)}")

    conn = await get_db_connection()
    try:
        if action == "signup":
            print("Processing signup action...")
            existing_user = await get_user_by_email(user.email, conn)
            if existing_user:
                raise HTTPException(status_code=400, detail="User already exists")

            hashed_password = hash_password(user.password)
            await conn.execute(
                "INSERT INTO users (email, password) VALUES ($1, $2)",
                user.email,
                hashed_password
            )
            return {"message": "User created successfully"}

        elif action == "login":
            print("Processing login action...")
            db_user = await get_user_by_email(user.email, conn)
            if not db_user:
                raise HTTPException(status_code=401, detail="Invalid email or password")

            if not verify_password(user.password, db_user["password"]):
                raise HTTPException(status_code=401, detail="Invalid email or password")

            access_token = create_access_token(data={"sub": user.email})
            return {"access_token": access_token, "token_type": "bearer"}

        else:
            raise HTTPException(status_code=400, detail="Invalid action. Use 'login' or 'signup'.")

    finally:
        await conn.close()
        print("Database connection closed.")
