import os
import json
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai 
from google.genai.errors import APIError
from database import save_recommendation
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
load_dotenv()
CORS(app)

app = FastAPI(title="Movie Recommender API")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    print(f"Gemini error")
    raise ValueError("GEMINI_API_KEY not found in environment variables.")

client = genai.Client(api_key=GEMINI_API_KEY)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000","http://127.0.0.1:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RecommendationRequest(BaseModel):
    preference: str

class RecommendationResponse(BaseModel):
    movies: list[str]


def get_ai_recommendations(preference: str) -> list[str]:
    """Uses the Gemini API to generate 3-5 movie recommendations."""
    try:
        prompt = (
            f"You are a helpful and creative movie recommendation engine. "
            f"Based on this preference: '{preference}', suggest 5 movie titles only. "
            f"No descriptions, years, or numbering required."
        )

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
        )

        movies_text = response.text
        movies = [
            line.strip().lstrip("0123456789. ").strip()
            for line in movies_text.split("\n")
            if line.strip()
        ]
        return movies[:5]

    except Exception as e:
        print(f"Gemini API Error: {e}")
        raise HTTPException(status_code=500, detail="Error communicating with Gemini API.")



@app.post("/recommend", response_model=RecommendationResponse)
def recommend_movies(request: RecommendationRequest):
    """
    Accepts user preference, generates recommendations, saves to DB, and returns results.
    """
    preference = request.preference
    
    movie_list = get_ai_recommendations(preference)
    

    save_recommendation(preference, movie_list)
    
    return RecommendationResponse(movies=movie_list)


@app.get("/")
def read_root():
    return {"message": "Movie Recommender API is running successfully!"}