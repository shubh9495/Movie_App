import sqlite3
import json
from datetime import datetime

DB_NAME = "recommendations.db"

def init_db():
    """Initializes the SQLite database and creates the table."""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS recommendations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_input TEXT NOT NULL,
            recommended_movies TEXT NOT NULL,
            timestamp DATETIME NOT NULL
        )
    """)
    conn.commit()
    conn.close()

def save_recommendation(user_input: str, recommended_movies: list):
    """Saves a new user request and its recommendations to the database."""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    movies_json = json.dumps(recommended_movies)
    timestamp = datetime.now().isoformat()
    
    cursor.execute(
        "INSERT INTO recommendations (user_input, recommended_movies, timestamp) VALUES (?, ?, ?)",
        (user_input, movies_json, timestamp)
    )
    conn.commit()
    conn.close()

init_db()