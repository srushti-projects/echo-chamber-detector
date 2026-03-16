import joblib

# load trained model
model = joblib.load("model.pkl")

# load vectorizer
vectorizer = joblib.load("vectorizer.pkl")


def predict_ideology(posts):

    vectors = vectorizer.transform(posts)

    predictions = model.predict(vectors)

    return predictions


# test
if __name__ == "__main__":

    test_posts = [
        "government should reduce taxes",
        "healthcare must be universal",
        "new policy announced by government"
    ]

    result = predict_ideology(test_posts)

    for post, pred in zip(test_posts, result):
        print(post, "→", pred)
