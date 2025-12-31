from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class AnalyzeRequest(BaseModel):
    text: str

@router.post("/analyze")
def analyze_text(payload: AnalyzeRequest):
    return {
        "input": payload.text,
        "insight": f"AI received text of length {len(payload.text)}"
    }
