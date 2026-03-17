@echo off
echo ================================
echo Echo Chamber Detector - Full Setup
echo ================================
echo.
echo Step 1: Training ML Models...
cd ml
python train_vectorizer.py
python train_model.py
cd ..
echo.
echo Step 2: Installing Backend Dependencies...
cd backend
pip install -r requirements.txt
cd ..
echo.
echo Step 3: Installing Frontend Dependencies...
cd frontend
call npm install
cd ..
echo.
echo ✅ Setup Complete!
echo.
echo To run the application:
echo   1. Run 'start-backend.bat' in one terminal
echo   2. Run 'start-frontend.bat' in another terminal
echo   3. Open http://localhost:5173 in your browser
echo.
pause
