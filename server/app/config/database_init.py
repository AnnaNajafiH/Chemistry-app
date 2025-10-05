from app.config.database_config import Base, engine, SQLALCHEMY_DATABASE_URL
from sqlalchemy.exc import SQLAlchemyError, OperationalError
from sqlalchemy import text, create_engine
import os
import re
import time


def create_tables():
    max_retries = 5
    retry_count = 0
    
    while retry_count < max_retries:
        try:
            db_name = None
            if 'mysql+pymysql' in SQLALCHEMY_DATABASE_URL:
                match = re.search(r'\/([^\/\?]+)(\?|$)', SQLALCHEMY_DATABASE_URL)
                if match:
                    db_name = match.group(1)
            
            if db_name:
                try:
                    base_url = re.sub(r'\/[^\/\?]+(\?|$)', '/', SQLALCHEMY_DATABASE_URL)
                    temp_engine = create_engine(base_url, isolation_level="AUTOCOMMIT")
                    with temp_engine.connect() as conn:
                        conn.execute(text(f"CREATE DATABASE IF NOT EXISTS {db_name}"))
                    temp_engine.dispose()
                except SQLAlchemyError as db_err:
                    print(f"Could not create database (this is often normal): {str(db_err)}")
            
            Base.metadata.create_all(bind=engine)
            print(f"Database tables created successfully using connection: {SQLALCHEMY_DATABASE_URL}")
            return
            
        except OperationalError as oe:
            retry_count += 1
            if retry_count >= max_retries:
                print(f"Failed to create database tables after {max_retries} attempts: {str(oe)}")
                if os.getenv("ENVIRONMENT") != "production":
                    raise
                return
            
            wait_time = 2 ** retry_count
            print(f"Database connection failed. Retrying in {wait_time} seconds... (Attempt {retry_count}/{max_retries})")
            time.sleep(wait_time)
            
        except Exception as e:
            print(f"Failed to create database tables: {str(e)}")
            print(f"Connection string used: {SQLALCHEMY_DATABASE_URL}")
            print("Please check your database connection settings and ensure the database is running")
            
            if os.getenv("ENVIRONMENT") != "production":
                raise
            return