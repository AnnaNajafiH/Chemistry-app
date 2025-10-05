"""
Database configuration module for handling connection settings and setup.
"""
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os
import re

load_dotenv()

Base = declarative_base()


def get_database_url():
    database_url = os.getenv("DATABASE_URL", "")
    
    if not database_url:
        is_docker = os.environ.get('DOCKER_ENV') == 'true'
        default_host = 'mysql' if is_docker else 'localhost'
        
        database_url = os.getenv(
            "SQLALCHEMY_DATABASE_URL",
            f"mysql+pymysql://root:root@{default_host}:3306/molar_mass_db"
        )
        return database_url
    
    
    if 'mysql://' in database_url and 'mysql+pymysql://' not in database_url:
        database_url = database_url.replace('mysql://', 'mysql+pymysql://')
    
    if 'postgres://' in database_url and 'postgresql://' not in database_url:
        database_url = database_url.replace('postgres://', 'postgresql://')
    
    is_docker = os.environ.get('DOCKER_ENV') == 'true'
    if 'mysql' in database_url and not is_docker and '@mysql:' in database_url:
        database_url = database_url.replace('@mysql:', '@localhost:')
        
    return database_url


def create_db_engine(database_url):
    try:
        masked_url = mask_db_password(database_url)
        print(f"Connecting to database with: {masked_url}")
        
        if '+' in database_url:
            parts = database_url.split('://')
            if len(parts) == 2 and '+' in parts[0]:
                prefix = parts[0]
                
                if prefix.startswith('mysql'):
                    database_url = f"mysql+pymysql://{parts[1]}"
                    print(f"Standardized MySQL connection URL")
                    
                elif prefix.startswith('postgres'):
                    database_url = f"postgresql+psycopg2://{parts[1]}"
                    print(f"Standardized PostgreSQL connection URL")
        
        engine_kwargs = {
            "pool_pre_ping": True,  
            "pool_recycle": 3600,   
        }
        
        if 'mysql' in database_url:
            engine_kwargs["connect_args"] = {"connect_timeout": 15}
            
        engine = create_engine(database_url, **engine_kwargs)
        return engine
        
    except Exception as e:
        print(f"Error creating database engine: {str(e)}")
        print("Attempting to create engine with basic configuration")
        
        try:
            engine = create_engine(database_url)
            return engine
        except Exception as e2:
            print(f"Second attempt failed: {str(e2)}")
            
            if 'sqlite' not in database_url:
                print("Falling back to SQLite database")
                return create_db_engine('sqlite:///./fallback.db')
            else:
                raise


def mask_db_password(database_url):
    if not database_url or '@' not in database_url:
        return database_url
        
    try:
        return re.sub(r'(://[^:]+:)[^@]+(@)', r'\1******\2', database_url)
    except Exception:
        parts = database_url.split('@')
        if len(parts) >= 2:
            credentials = parts[0].split(':')
            if len(credentials) >= 3:
                protocol = ':'.join(credentials[:-1])
                return f"{protocol}:******@{parts[1]}"

    return f"{database_url} (password masking failed)"


SQLALCHEMY_DATABASE_URL = get_database_url()
engine = create_db_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()