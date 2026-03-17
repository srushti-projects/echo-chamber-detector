#!/usr/bin/env python
# Simple test to verify ML models work
import os
import sys

# Get paths
BACKEND_DIR = os.path.dirname(os.path.abspath(__file__))
ML_DIR = os.path.join(os.path.dirname(BACKEND_DIR), "ml")

print(f"Backend dir: {BACKEND_DIR}")
print(f"ML dir: {ML_DIR}")

# Try loading models
import joblib

model_path = os.path.join(ML_DIR, "model.pkl")
vectorizer_path = os.path.join(ML_DIR, "vectorizer.pkl")

print(f"\nModel path: {model_path}")
print(f"Model exists: {os.path.exists(model_path)}")

print(f"\nVectorizer path: {vectorizer_path}")
print(f"Vectorizer exists: {os.path.exists(vectorizer_path)}")

try:
    model = joblib.load(model_path)
    print("✅ Model loaded")
except Exception as e:
    print(f"❌ Model load failed: {e}")
    sys.exit(1)

try:
    vectorizer = joblib.load(vectorizer_path)
    print("✅ Vectorizer loaded")
except Exception as e:
    print(f"❌ Vectorizer load failed: {e}")
    sys.exit(1)

# Try  a simple prediction
test_posts = ["Climate change is critical", "Government should reduce taxes"]
try:
    vectors = vectorizer.transform(test_posts)
    predictions = model.predict(vectors)
    print(f"✅ Predictions work: {predictions}")
except Exception as e:
    print(f"❌ Prediction failed: {e}")
    sys.exit(1)

print("\n✅ All systems OK!")
