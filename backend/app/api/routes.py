from fastapi import APIRouter, UploadFile, File, Form
from typing import List
import asyncio

from app.services.parser import extract_text
from app.services.nlp import extract_skills, get_embedding, compute_similarity
from app.services.summarizer import generate_summary

router = APIRouter()

# limit concurrent LLM calls
semaphore = asyncio.Semaphore(3)


@router.post("/process_resume/")
async def process_resume(
    resumes: List[UploadFile] = File(...),  # ✅ MULTIPLE FILES FIX
    jd: str = Form(...),
    jd_skills: str = Form(None),
):
    # normalize JD skills
    jd_skills_list = [s.strip() for s in jd_skills.split(",")] if jd_skills else []

    async def process_single(resume: UploadFile):
        text = await extract_text(resume)

        skills = extract_skills(text)

        # ✅ case-insensitive matching
        resume_skills_lower = {s.lower() for s in skills}

        missing = [
            s for s in jd_skills_list
            if s.lower() not in resume_skills_lower
        ]

        # embeddings
        emb1 = get_embedding(text)
        emb2 = get_embedding(jd)
        score = compute_similarity(emb1, emb2)

        # LLM summary (controlled concurrency)
        async with semaphore:
            try:
                summary = generate_summary(text)
            except Exception:
                summary = text[:300]

        return {
            "resume_name": resume.filename,
            "summary": summary,
            "skills_found": skills,
            "required_skills": jd_skills_list,
            "missing_skills": missing,
            "match_score": round(score * 100, 2),
        }

    # process all resumes concurrently
    results = await asyncio.gather(*[process_single(r) for r in resumes])

    # sort by score
    results = sorted(results, key=lambda x: x["match_score"], reverse=True)

    # assign rank
    for i, r in enumerate(results, start=1):
        r["rank"] = i

    return results