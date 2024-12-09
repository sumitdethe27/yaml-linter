import os
from psycopg2.pool import SimpleConnectionPool
from dotenv import load_dotenv
from fastapi import HTTPException

# Load environment variables
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise HTTPException(status_code=500, detail="Database URL is not configured.")

# Initialize the connection pool
db_pool = SimpleConnectionPool(
    minconn=1,
    maxconn=10,
    dsn=DATABASE_URL
)

def get_connection():
    """
    Get a connection from the pool.
    Ensure the connection is returned after use.
    """
    try:
        return  db_pool.getconn()
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database connection error: {str(e)}")

def close_connection(conn):
    """
    Close a connection and return it to the pool.
    """
    try:
        db_pool.putconn(conn)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error returning connection: {e}")

# User-related queries

def create_users_table():
    """
    Create users table if it doesn't already exist.
    """
    query = """
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        hashed_password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP,
        is_active BOOLEAN DEFAULT TRUE,
        role VARCHAR(50) DEFAULT 'user'
    );
    """
    connection = None
    try:
        connection = get_connection()
        with connection.cursor() as cursor:
            cursor.execute(query)
            connection.commit()
    except Exception as e:
        print(f"Database error: {e}")
        raise HTTPException(status_code=500, detail="Error creating users table")
    finally:
        if connection:
            close_connection(connection)

def get_user_by_email(email: str):
    """
    Retrieve a user by email.
    """
    query = "SELECT * FROM users WHERE email = %s"
    connection = None
    try:
        connection = get_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, (email,))
            user = cursor.fetchone()
            return user
    except Exception as e:
        print(f"Database error: {e}")
        raise HTTPException(status_code=500, detail="Error fetching user by email")
    finally:
        if connection:
            close_connection(connection)

def add_user(email: str, hashed_password: str):
    """
    Add a new user to the database.
    """
    query = "INSERT INTO users (email, hashed_password) VALUES (%s, %s) RETURNING id"
    connection = None
    try:
        connection = get_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, (email, hashed_password))
            user_id = cursor.fetchone()[0]
            connection.commit()
            return user_id
    except Exception as e:
        print(f"Database error: {e}")
        raise HTTPException(status_code=500, detail="Error adding user")
    finally:
        if connection:
            close_connection(connection)

def update_user_last_login(user_id: int):
    """
    Update last login timestamp for a user.
    """
    query = "UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = %s"
    connection = None
    try:
        connection = get_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, (user_id,))
            connection.commit()
    except Exception as e:
        print(f"Database error: {e}")
        raise HTTPException(status_code=500, detail="Error updating user's last login")
    finally:
        if connection:
            close_connection(connection)

def deactivate_user(user_id: int):
    """
    Deactivate a user by setting is_active to False.
    """
    query = "UPDATE users SET is_active = FALSE WHERE id = %s"
    connection = None
    try:
        connection = get_connection()
        with connection.cursor() as cursor:
            cursor.execute(query, (user_id,))
            connection.commit()
    except Exception as e:
        print(f"Database error: {e}")
        raise HTTPException(status_code=500, detail="Error deactivating user")
    finally:
        if connection:
            close_connection(connection)

# Call create_users_table when the application starts to ensure the table exists
create_users_table()
