# Internet Echo Chamber Detector

A web application that analyzes political bias in social media posts and detects echo chambers.

## Project Structure

```
new-repo/
├── backend/         # FastAPI backend server
│   ├── main.py     # Main API endpoints
│   └── requirements.txt
├── ml/             # Machine Learning models
│   ├── train_model.py
│   ├── train_vectorizer.py
│   ├── predict.py
│   ├── dataset/
│   └── model.pkl (generated)
└── frontend/       # React frontend
    ├── src/
    ├── public/
    └── package.json
```

## Setup Instructions

### 1. Train ML Models

```bash
cd new-repo/ml
python train_vectorizer.py
python train_model.py
```

This will generate:
- `model.pkl` - Trained classification model
- `vectorizer.pkl` - TF-IDF vectorizer

### 2. Install Backend Dependencies

```bash
cd new-repo/backend
pip install -r requirements.txt
```

### 3. Start Backend Server

```bash
cd new-repo/backend
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at: `http://localhost:8000`

### 4. Install Frontend Dependencies

In a new terminal:

```bash
cd new-repo/frontend
npm install
```

### 5. Start Frontend Development Server

```bash
cd new-repo/frontend
npm run dev
```

Frontend will be available at: `http://localhost:5173`

## How to Use

1. Open `http://localhost:5173` in your browser
2. Enter social media posts in the text area
3. Click "Add Post" to add multiple posts (or Ctrl+Enter)
4. Click "Analyze Posts" to analyze political bias
5. View results showing:
   - Left-leaning percentage
   - Neutral percentage
   - Right-leaning percentage
   - Echo Chamber Score

## API Endpoints

### POST /analyze
Analyzes posts for political bias and echo chamber effect.

**Request:**
```json
{
  "posts": ["post text 1", "post text 2"]
}
```

**Response:**
```json
{
  "left": 50.0,
  "right": 25.0,
  "neutral": 25.0,
  "echo_score": 50.0
}
```

### GET /
Health check endpoint.

## Customization

To improve accuracy:
1. Replace sample posts in `ml/train_model.py` with your actual dataset
2. Load data from `ml/dataset/political_data.csv` if available
3. Adjust model parameters (e.g., max_features, random_state)
4. Retrain and redeploy

## Requirements

- Python 3.8+
- Node.js 16+
- npm or yarn

## Troubleshooting

**"Backend connection failed":**
- Ensure backend is running on port 8000
- Check CORS settings in `backend/main.py`

**"Model not found":**
- Run training scripts in `ml/` folder
- Ensure `model.pkl` and `vectorizer.pkl` exist

**"Frontend not loading":**
- Run `npm install` in frontend folder
- Check if port 5173 is available
