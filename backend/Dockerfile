FROM python:3.10-slim

# 🔧 System deps (important for pdf + spacy)
RUN apt-get update && apt-get install -y \
    build-essential \
    gcc \
    libffi-dev \
    libxml2 \
    libxslt1.1 \
    libjpeg-dev \
    zlib1g-dev \
    && rm -rf /var/lib/apt/lists/*

# ⚡ Speed + stability
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# 📦 Install dependencies first (cache optimization)
COPY requirements.txt .

RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# 📥 Download spaCy model
RUN python -m spacy download en_core_web_sm

# 📁 Copy project
COPY . .

# 🌐 Expose port
EXPOSE 8000

# 🚀 Run server
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]