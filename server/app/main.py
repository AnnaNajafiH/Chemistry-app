import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config.database_init import create_tables


app = FastAPI(
    title="chemistry API",
    description="An API for chemistry calculations",
    version="1.0.0",
)

@app.on_event("startup")
async def startup_event():
    print("Starting up the chemistry API...")
    create_tables()

@app.on_event("shutdown")
async def shutdown_event():
    print("Shutting down the chemistry API...")



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
        "status": "ok", 
        "message": "Welcome to the chemistry API. Visit /docs for API documentation."
    }

# Import and include the API routers
from app.routes.formula_routes import router as formula_router
app.include_router(formula_router)


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)