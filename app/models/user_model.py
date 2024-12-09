import os
import psycopg2
from psycopg2.pool import SimpleConnectionPool
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class DatabaseConnection:
    def __init__(
        self, 
        dbname=None, 
        user=None, 
        password=None, 
        host=None, 
        port=None
    ):
        # Priority: Environment Variables > Function Parameters
        self.dbname = dbname or os.getenv('DB_NAME', 'auth_db')
        self.user = user or os.getenv('DB_USER', 'auth_user')
        self.password = password or os.getenv('DB_PASSWORD', 'password')
        self.host = host or os.getenv('DB_HOST', 'localhost')
        self.port = port or os.getenv('DB_PORT', '5432')

        # Connection pool configuration
        self.min_connections = int(os.getenv('DB_MIN_CONNECTIONS', 1))
        self.max_connections = int(os.getenv('DB_MAX_CONNECTIONS', 10))

        # Connection pool
        self.connection_pool = None
        self._create_connection_pool()

    def _create_connection_pool(self):
        """
        Create a connection pool with error handling
        """
        try:
            self.connection_pool = SimpleConnectionPool(
                self.min_connections, 
                self.max_connections,
                dbname=self.dbname,
                user=self.user,
                password=self.password,
                host=self.host,
                port=self.port
            )
            print("Database connection pool created successfully")
        except psycopg2.Error as e:
            print(f"Error creating database connection pool: {e}")
            raise

    def get_connection(self):
        """
        Get a connection from the pool
        """
        if not self.connection_pool:
            raise Exception("Connection pool not initialized")
        
        try:
            return self.connection_pool.getconn()
        except psycopg2.Error as e:
            print(f"Error getting database connection: {e}")
            raise

    def release_connection(self, connection):
        """
        Release a connection back to the pool
        """
        if self.connection_pool:
            self.connection_pool.putconn(connection)

    def close_all_connections(self):
        """
        Close all connections in the pool
        """
        if self.connection_pool:
            self.connection_pool.closeall()

    def execute_query(self, query, params=None):
        """
        Execute a query with optional parameters
        """
        connection = None
        try:
            connection = self.get_connection()
            with connection.cursor() as cursor:
                cursor.execute(query, params or ())
                connection.commit()
                return cursor
        except psycopg2.Error as e:
            print(f"Database query error: {e}")
            if connection:
                connection.rollback()
            raise
        finally:
            if connection:
                self.release_connection(connection)

    def create_tables(self):
        """
        Create necessary tables if they don't exist
        """
        create_users_table_query = """
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
        self.execute_query(create_users_table_query)

# Create a singleton database connection
database = DatabaseConnection()