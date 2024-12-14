# temp_db_test.py
import os
from psycopg2 import connect, OperationalError
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get the DATABASE_URL from the environment
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    print("Error: DATABASE_URL is not set in the environment variables.")
    exit(1)

try:
    # Establish connection
    print("Attempting to connect to the database...")
    connection = connect(DATABASE_URL)
    print("Connected successfully!")

    # Test query
    with connection.cursor() as cursor:
        cursor.execute("SELECT NOW();")
        current_time = cursor.fetchone()
        print(f"Database connected successfully! Current time: {current_time[0]}")

except OperationalError as e:
    print(f"Error connecting to the database: {e}")
    exit(1)
finally:
    if 'connection' in locals() and connection:
        connection.close()
        print("Database connection closed.")
