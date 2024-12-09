from jose import jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
from fastapi import HTTPException, status
import psycopg2

SECRET_KEY = "your-very-long-and-secure-secret-key-here"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def decode_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return email
    except jwt.JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )

def get_user_by_email(email: str):
    """
    Retrieve user by email using direct SQL query
    """
    try:
        with db_pool.get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT * FROM users WHERE email = %s", (email,))
                user = cur.fetchone()
                return user
    except psycopg2.Error as e:
        print(f"Database error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            detail="Database error"
        )

def authenticate_user(email: str, password: str):
    """
    Authenticate user with direct database query
    """
    user = get_user_by_email(email)
    if not user:
        return None
    
    # Verify password (user[2] is hashed_password)
    if not verify_password(password, user[2]):
        return None
    
    return {
        "id": user[0],
        "email": user[1]
    }

def register_user(email: str, password: str):
    """
    Register a new user with direct SQL query
    """
    # Check if user already exists
    existing_user = get_user_by_email(email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Email already registered"
        )
    
    # Hash the password
    hashed_password = get_password_hash(password)
    
    try:
        with db_pool.get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    "INSERT INTO users (email, hashed_password) VALUES (%s, %s) RETURNING id", 
                    (email, hashed_password)
                )
                user_id = cur.fetchone()[0]
                conn.commit()
                return user_id
    except psycopg2.Error as e:
        print(f"Registration error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            detail="Registration failed"
        )
