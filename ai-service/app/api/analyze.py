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

Analyze the user's input and return ONLY valid JSON with the following structure:

- summary: a concise explanation or reflection of the user's input
- sentiment: one of (positive | neutral | negative)
- keywords: important keywords or concepts from the input
- action_items: practical suggestions OR direct answers depending on intent

Rules:
1. If the user input is emotional, reflective, or personal:
   - Provide reflective action items (self-help, guidance, next steps)

2. If the user input is a question or asks for definitions, explanations, or concepts:
   - Provide clear, direct answers inside action_items
   - Do NOT give generic advice in this case

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
