from fastapi import FastAPI
from pydantic import BaseModel
import joblib

app = FastAPI()

# load ML model
model = joblib.load("../ml/model.pkl")
vectorizer = joblib.load("../ml/vectorizer.pkl")


class PostInput(BaseModel):
    posts: list[str]


@app.post("/analyze")
def analyze_posts(data: PostInput):

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
        "echo_score": echo_score
    }
