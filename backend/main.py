from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from ml.predict import analyze_posts  # import your ML function

app = FastAPI(title="Echo Chamber Detector", version="0.1.0")

# Enable CORS so frontend can call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # during dev, allow all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class InputData(BaseModel):
    posts: list[str]

@app.post("/analyze")
def analyze(data: InputData):
    result = analyze_posts(data.posts)  # your ML pipeline
    return result