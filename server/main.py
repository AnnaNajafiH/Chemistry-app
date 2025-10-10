import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config.database_init import create_tables


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup logic
    print("Starting up the Chemistry API...")
    create_tables()
    
    yield  # This is where FastAPI serves requests
    
    # Shutdown logic
    print("Shutting down the Chemistry API...")


app = FastAPI(
    title="Chemistry App API", 
    description="An API for Chemistry-related calculations and data retrieval",
    version="1.0.0",
    lifespan=lifespan)
    
    
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],    
    allow_headers=["*"],
)


@app.get("/", tags=["Health Check"])
async def read_root():
    return {
        "status": "success", 
        "message":"Welcome to the chemistry API. Visit /docs for API documentation."}
    

# Import and include routers  
from app.routes.formula_routes import router as formula_router
app.include_router(formula_router)


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)