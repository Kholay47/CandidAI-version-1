# CandidAI – AI Powered Resume Screening System

CandidAI is an AI-powered resume screening and candidate ranking platform built using FastAPI, React, NLP, and Sentence Transformers.  
It helps recruiters automatically analyze resumes, extract skills, compare them against job descriptions, generate summaries, and rank candidates intelligently.

---

# Features

- Upload multiple resumes simultaneously
- Supports PDF and DOCX resume formats
- AI-powered resume summarization
- NLP-based skill extraction
- Resume vs Job Description similarity scoring
- Candidate ranking system
- Missing skills detection
- Recruiter dashboard UI
- FastAPI backend with React frontend
- Docker support for deployment

---

# Tech Stack

## Frontend
- React
- Vite
- Tailwind CSS

## Backend
- FastAPI
- Python
- spaCy
- Sentence Transformers
- OpenRouter API (Mistral LLM)

## NLP & AI
- all-MiniLM-L6-v2 embeddings
- Cosine similarity scoring
- Resume summarization using Mistral-7B

## Deployment & Tools
- Docker
- Render
- Uvicorn

---

# Project Structure

```bash
candidai-version-1/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── models/
│   │   └── services/
│   │
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── api.js
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── docker-compose.yml
├── pyproject.toml
└── README.md
```
