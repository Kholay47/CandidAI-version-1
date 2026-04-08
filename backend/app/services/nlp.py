from sentence_transformers import SentenceTransformer, util
import spacy
import re

_model = None
_nlp = None

# 🔥 Predefined skill keywords
KNOWN_SKILLS = [
    "python", "java", "c++", "sql", "mysql", "mongodb",
    "flask", "django", "fastapi",
    "aws", "azure", "gcp",
    "docker", "kubernetes",
    "machine learning", "deep learning", "nlp",
    "pandas", "numpy", "scikit-learn",
    "tensorflow", "pytorch",
    "react", "node.js", "javascript", "html", "css",
]
BLOCKLIST = {"LINKEDIN", "COMPUTER ENGINEERING", "EMAIL", "PHONE"}


def get_model():
    global _model
    if _model is None:
        _model = SentenceTransformer("all-MiniLM-L6-v2")
    return _model


def get_nlp():
    global _nlp
    if _nlp is None:
        _nlp = spacy.load("en_core_web_sm")
    return _nlp


def normalize_skill(skill: str) -> str:
    """
    Normalize skill names to consistent format
    """
    return skill.strip().upper()


def extract_skills(text: str):
    """
    Hybrid skill extraction:
    1. Keyword matching (primary)
    2. spaCy NER (secondary)
    """

    text_lower = text.lower()
    found_skills = set()

    # ✅ 1. Keyword matching (strong + reliable)
    for skill in KNOWN_SKILLS:
        if re.search(rf"\b{re.escape(skill)}\b", text_lower):
            found_skills.add(normalize_skill(skill))

    # ✅ 2. spaCy NER fallback (filtered heavily)
    nlp = get_nlp()
    doc = nlp(text)

    for ent in doc.ents:
        if ent.label_ in ["ORG", "PRODUCT"]:
            clean = ent.text.strip()

            if len(clean) < 2:
                continue
            if len(clean) > 30:
                continue
            if "\n" in clean:
                continue
            if any(char in clean for char in ["•", "●", "|", ""]):
                continue
            if not re.match(r"^[A-Za-z\s\.\+\#]+$", clean):
                continue

            normalized = normalize_skill(clean)

            # ✅ remove noise
            if normalized in BLOCKLIST:
                continue

            found_skills.add(normalized)

    return sorted(found_skills)
    

def get_embedding(text: str):
    model = get_model()
    return model.encode(text)


def compute_similarity(e1, e2):
    return float(util.cos_sim(e1, e2))