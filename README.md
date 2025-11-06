# 🎬 Movie Recommendation App

A full-stack movie recommendation application that uses **Google Gemini 2.5 Flash API** to generate personalized movie suggestions. Built with **FastAPI** for the backend and a frontend (React suggested).

---

Features

- Generate 3-5 personalized movie recommendations using AI
- CORS-enabled API for frontend integration
- Stores user requests and recommendations in a database
- Easy to run locally and extend

---

 Tech Stack


- **Frontend:** ReactJS
- **Backend:** FastAPI, Python  
- **AI Model:** Google Gemini 2.5 Flash  
- **Database:** SQLite (via `database.py`)  
- **Environment Variables:** Managed via `.env`  

---

## Setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/Movie_App.git
cd Movie_App/backend

python -m venv venv
# Linux/Mac
source venv/bin/activate
# Windows
venv\Scripts\activate

pip install -r requirements.txt

add your .env file inside backend folder and insert gemini api
GEMINI_API_KEY=your_gemini_api_key_here

python backend server
python -m uvicorn app:app --reload

frontend
npm start

