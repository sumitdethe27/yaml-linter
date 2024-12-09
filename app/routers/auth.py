from fastapi import APIRouter, HTTPException, Request, Depends
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
    Manages connection using manual handling (no async with).
    """
    conn = await asyncpg.connect(DATABASE_URL)
    try:
        return conn
    except Exception as e:
        await conn.close()
        raise e
    
# Utility function to retrieve user by email
async def get_user_by_email(email: str, conn: asyncpg.Connection):
    result = await conn.fetchrow("SELECT * FROM users WHERE email = $1", email)
    return result

# Unified route for both login and signup
@router.post("/")
async def auth(req: Request, user: User, action: str = "login"):
    """
    Handles both login and signup actions based on the `action` query parameter.
    action = "login" or "signup"
    """
    # Print the request object
    print("Request Object:")
    print(f"Method: {req.method}")
    print(f"Headers: {req.headers}")
    print(f"Client: {req.client}")
    print(f"Query Params: {req.query_params}")
    print(f"Body: {await req.body()}")  # Print the raw body content

    conn = await get_db_connection()
    try:
        if action == "signup":
            # Check if user already exists
            existing_user = await get_user_by_email(user.email, conn)
            if existing_user:
                raise HTTPException(status_code=400, detail="User already exists")

            # Hash password and save user
            hashed_password = hash_password(user.password)
            await conn.execute(
                "INSERT INTO users (email, password) VALUES ($1, $2)",
                user.email,
                hashed_password
            )
            return {"message": "User created successfully"}

        elif action == "login":
            # Check if user exists
            db_user = await get_user_by_email(user.email, conn)
            if not db_user:
                raise HTTPException(status_code=401, detail="Invalid email or password")

            # Verify password
            if not verify_password(user.password, db_user["password"]):
                raise HTTPException(status_code=401, detail="Invalid email or password")

            # Generate JWT token
            access_token = create_access_token(data={"sub": user.email})
            return {"access_token": access_token, "token_type": "bearer"}

        else:
            raise HTTPException(status_code=400, detail="Invalid action. Use 'login' or 'signup'.")

    finally:
        await conn.close()
