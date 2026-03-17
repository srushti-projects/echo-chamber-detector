import os
import joblib

# Get the directory of this file (ml/)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load model and vectorizer from ml/ folder
model = joblib.load(os.path.join(BASE_DIR, "model.pkl"))
vectorizer = joblib.load(os.path.join(BASE_DIR, "vectorizer.pkl"))

def analyze_posts(posts):
    # Example: transform posts and predict
    X = vectorizer.transform(posts)
    predictions = model.predict(X)

    results = []
    for post, pred in zip(posts, predictions):
        results.append({
            "text": post,
            "bias": pred  # or sentiment/topic depending on your model
        })

    return {
        "analysis": results,
        "echo_chamber_score": 72  # placeholder
    }