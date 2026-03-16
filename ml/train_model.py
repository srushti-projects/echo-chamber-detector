from sklearn.linear_model import LogisticRegression
from sklearn.feature_extraction.text import TfidfVectorizer
import pandas as pd
import nltk
import string
from nltk.corpus import stopwords
import joblib


# download stopwords
nltk.download('stopwords')

# load dataset
data = pd.read_csv("dataset/political_data.csv")

print("Dataset Preview:")
print(data.head())

# stopwords
stop_words = set(stopwords.words('english'))

# preprocessing function
def preprocess(text):

    text = text.lower()

    text = text.translate(str.maketrans('', '', string.punctuation))

    words = text.split()

    words = [word for word in words if word not in stop_words]

    return " ".join(words)

# apply preprocessing
data["clean_text"] = data["text"].apply(preprocess)

print("\nCleaned Text:")
print(data[["text", "clean_text"]].head())

# TF-IDF Vectorization
vectorizer = TfidfVectorizer(max_features=5000)

X = vectorizer.fit_transform(data["clean_text"])

print("\nTF-IDF Shape:")
print(X.shape)

y = data["label"]

# Train classifier
model = LogisticRegression()

model.fit(X, y)

print("\nModel training completed!")

# Test prediction
test_posts = [
    "government should reduce taxes",
    "healthcare must be universal",
    "new economic policy announced"
]

test_clean = [preprocess(post) for post in test_posts]

test_vector = vectorizer.transform(test_clean)

predictions = model.predict(test_vector)

print("\nPredictions:")
for post, pred in zip(test_posts, predictions):
    print(post, "→", pred)

# Save model
joblib.dump(model, "model.pkl")

# Save vectorizer
joblib.dump(vectorizer, "vectorizer.pkl")

print("\nModel and vectorizer saved!")
