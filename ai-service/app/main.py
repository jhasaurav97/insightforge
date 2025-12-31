from fastapi import FastAPI
from app.api.health import router as health_router
from app.api.analyze import router as analyze_router

app = FastAPI(
    title="InsightForge AI Service",
    version="1.0.0"
)

app.include_router(health_router, prefix="/health")
app.include_router(analyze_router, prefix="/ai")

@app.get("/")
def root():
    return {
        "service": "InsightForge AI",
        "status": "running"
    }
