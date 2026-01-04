import re
from fastapi import APIRouter
from pydantic import BaseModel
from app.core.gemini_client import model

router = APIRouter()

class AnalyzeRequest(BaseModel):
    text: str

def clean_markdown_json(text: str) -> str:
    text = re.sub(r"```json", "", text)
    text = re.sub(r"```", "", text)
    return text.strip()

@router.post("/analyze")
def analyze_text(payload: AnalyzeRequest):
    prompt = f"""
Analyze the following user input and return ONLY valid JSON with:
- summary
- sentiment (positive | neutral | negative)
- keywords
- action_items

User input:
{payload.text}
"""

    response = model.generate_content(prompt)
    cleaned = clean_markdown_json(response.text)

    return {
        "insight": cleaned
    }
