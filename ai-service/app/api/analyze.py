import re
import json
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
You are an AI assistant for InsightForge.

Analyze the user's input and return ONLY valid JSON with:
- summary
- sentiment (positive | neutral | negative)
- keywords
- action_items (array of strings only)

Rules:
- If the input is a question, provide direct answers in action_items
- No markdown
- No code blocks
- No nested objects inside action_items

User input:
{payload.text}
"""

    response = model.generate_content(prompt)
    cleaned = clean_markdown_json(response.text)

    try:
        parsed = json.loads(cleaned)
    except Exception:
        return {
            "summary": "Unable to analyze input",
            "sentiment": "neutral",
            "keywords": [],
            "action_items": []
        }

    # Normalize action_items to string[]
    normalized = []
    for item in parsed.get("action_items", []):
        if isinstance(item, dict):
            normalized.append(
                item.get("item")
                or item.get("explanation")
                or str(item)
            )
        else:
            normalized.append(str(item))

    parsed["action_items"] = normalized

    return parsed
