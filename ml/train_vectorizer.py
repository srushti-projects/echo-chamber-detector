import joblib
import os
from sklearn.feature_extraction.text import TfidfVectorizer

# Get the directory of this file (ml/)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Example training data (replace with your dataset)
posts = [
    "Government policies are not beneficial.",
    "Climate change is necessary.",
    "We support progressive reforms.",
    "Traditional values must be preserved.",
    "Socialism is ruining our country.",
    "We need stronger social safety nets.",
    "Individual liberty should be protected.",
    "Climate action is critical for our future.",
    "The free market solves problems best.",
    "Healthcare should be a human right."
]

# Train vectorizer
vectorizer = TfidfVectorizer(max_features=100, stop_words='english')
X = vectorizer.fit_transform(posts)

# Save vectorizer
vectorizer_path = os.path.join(BASE_DIR, "vectorizer.pkl")
joblib.dump(vectorizer, vectorizer_path)

print(f"✅ vectorizer.pkl created at {vectorizer_path}")