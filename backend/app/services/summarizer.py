from openai import OpenAI
from app.core.config import settings

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=settings.OPENROUTER_API_KEY,
)

MODEL = "mistralai/mistral-7b-instruct"


def generate_summary(text: str, max_words: int = 60) -> str:
    # truncate to avoid token overflow
    text = text[:4000]

    prompt = f"""
Summarize the following resume in under {max_words} words.

Focus on:
- Skills
- Experience
- Education

Make it concise and recruiter-friendly.

Resume:
{text}
"""

    try:
        response = client.chat.completions.create(
            model=MODEL,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3,
            max_tokens=120,
        )

        return response.choices[0].message.content.strip()

    except Exception:
        # fallback (very important for stability)
        return text[:300]