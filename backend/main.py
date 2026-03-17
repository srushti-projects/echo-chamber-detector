from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import joblib
import os

# Initialize FastAPI app
app = FastAPI(title="Echo Chamber Detector", version="0.1.0")

# Enable CORS so frontend (localhost:5173) can call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get the directory paths
BACKEND_DIR = os.path.dirname(os.path.abspath(__file__))
ML_DIR = os.path.join(os.path.dirname(BACKEND_DIR), "ml")

# Load ML model and vectorizer with proper error handling
model_path = os.path.join(ML_DIR, "model.pkl")
vectorizer_path = os.path.join(ML_DIR, "vectorizer.pkl")

try:
    model = joblib.load(model_path)
    print(f"✅ Model loaded from {model_path}")
except FileNotFoundError:
    print(f"❌ Model not found at {model_path}")
    print("Please run: python ml/train_model.py")
    model = None

try:
    vectorizer = joblib.load(vectorizer_path)
    print(f"✅ Vectorizer loaded from {vectorizer_path}")
except FileNotFoundError:
    print(f"❌ Vectorizer not found at {vectorizer_path}")
    print("Please run: python ml/train_vectorizer.py")
    vectorizer = None


class InputData(BaseModel):
    posts: list[str]


@app.post("/analyze")
def analyze_posts(data: InputData):
    if not model or not vectorizer:
        raise HTTPException(
            status_code=500,
            detail="ML model not loaded. Please train the model first."
        )
    
    if not data.posts or len(data.posts) == 0:
        raise HTTPException(
            status_code=422,
            detail="Please provide at least one post to analyze"
        )
    
    posts = data.posts
    vectors = vectorizer.transform(posts)
    predictions = model.predict(vectors)

    left = list(predictions).count("left")
    right = list(predictions).count("right")
    neutral = list(predictions).count("neutral")

    total = len(posts)
    left_percent = (left / total) * 100
    right_percent = (right / total) * 100
    neutral_percent = (neutral / total) * 100
    echo_score = max(left_percent, right_percent)

    return {
        "left": left_percent,
        "right": right_percent,
        "neutral": neutral_percent,
        "echo_score": echo_score,
    }


@app.get("/")
def root():
    return {
        "message": "Echo Chamber Detector Backend is running",
        "version": "0.1.0",
        "model_loaded": model is not None,
        "vectorizer_loaded": vectorizer is not None
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "model": "ready" if model else "not_loaded",
        "vectorizer": "ready" if vectorizer else "not_loaded"
    }

