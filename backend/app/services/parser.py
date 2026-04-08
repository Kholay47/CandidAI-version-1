from pathlib import Path
import pdfplumber
import docx
from fastapi import UploadFile
import tempfile
import re


async def extract_text(file: UploadFile) -> str:
    suffix = Path(file.filename).suffix.lower()

    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
        content = await file.read()
        tmp.write(content)
        temp_path = Path(tmp.name)

    if suffix == ".pdf":
        text = extract_pdf(temp_path)
    elif suffix == ".docx":
        text = extract_docx(temp_path)
    else:
        text = temp_path.read_text(errors="ignore")

    return clean_text(text)


def extract_pdf(path: Path) -> str:
    text = ""
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text() or ""
            text += page_text + "\n"
    return text


def extract_docx(path: Path) -> str:
    doc = docx.Document(path)
    return "\n".join([p.text for p in doc.paragraphs])


def clean_text(text: str) -> str:
    """
    Clean extracted text:
    - Remove encoding artifacts like (cid:xxx)
    - Normalize whitespace
    - Remove bullets and special chars
    """

    # remove (cid:123) artifacts
    text = re.sub(r"\(cid:\d+\)", "", text)

    # remove bullets and weird symbols
    text = re.sub(r"[•●▪■►]", " ", text)

    # remove unwanted special characters
    text = re.sub(r"[^A-Za-z0-9\s.,@|:\-]", "", text)

    # normalize encoding
    text = text.encode("utf-8", "ignore").decode("utf-8", "ignore")

    # replace newlines/tabs
    text = re.sub(r"[\n\r\t]+", " ", text)

    # remove multiple spaces
    text = re.sub(r"\s+", " ", text)

    return text.strip()