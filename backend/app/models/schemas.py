from pydantic import BaseModel
from typing import List


class ResumeResponse(BaseModel):
    resume_name: str
    summary: str
    skills_found: List[str]
    required_skills: List[str]
    missing_skills: List[str]
    match_score: float
    rank: int