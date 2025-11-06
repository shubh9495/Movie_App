import React, { useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

function RecommendationForm() {
    const [preference, setPreference] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setRecommendations([]);
        setError(null);

        try {
            const response = await fetch(`${API_URL}/recommend`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ preference }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch recommendations from API.');
            }

            const data = await response.json();
            setRecommendations(data.movies);

        } catch (err) {
            console.error('Fetch error:', err);
            setError('Could not connect to the backend or process the request. Please check the API server.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container">
            <h2> AI Movie Recommender</h2>
            
            <form onSubmit={handleSubmit} className="form-group">
                <label htmlFor="preference-input">
                    Describe your movie preference (e.g., "action movies with a strong female lead"):
                </label>
                <textarea
                    id="preference-input"
                    value={preference}
                    onChange={(e) => setPreference(e.target.value)}
                    rows="3"
                    required
                    disabled={isLoading}
                    placeholder="E.g., A witty sci-fi comedy like Hitchhiker's Guide to the Galaxy, or a gritty historical drama."
                />
                <button type="submit" disabled={isLoading || preference.trim() === ''}>
                    {isLoading ? 'Generating...' : 'Get Recommendations'}
                </button>
            </form>

            {error && <p className="error-message">🚨 {error}</p>}
            
            {recommendations.length > 0 && (
                <div className="recommendation-list">
                    <h3> Your Top Picks:</h3>
                    <ul>
                        {recommendations.map((movie, index) => (
                            <li key={index}>{movie}</li>
                        ))}
                    </ul>
                </div>
            )}

            <style jsx="true">{`
                .container { max-width: 600px; margin: 50px auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
                h2 { text-align: center; color: #333; }
                .form-group { display: flex; flex-direction: column; gap: 15px; margin-bottom: 20px; }
                label { font-weight: bold; }
                textarea { padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 16px; }
                button { padding: 10px 15px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; transition: background-color 0.3s; }
                button:hover:not(:disabled) { background-color: #0056b3; }
                button:disabled { background-color: #a0c9ff; cursor: not-allowed; }
                .recommendation-list { margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 4px; }
                .recommendation-list h3 { border-bottom: 2px solid #e9ecef; padding-bottom: 10px; margin-top: 0; }
                .recommendation-list ul { list-style: none; padding: 0; }
                .recommendation-list li { margin-bottom: 10px; padding: 5px 0; border-bottom: 1px dashed #e9ecef; }
                .error-message { color: #dc3545; font-weight: bold; padding: 10px; border: 1px solid #f5c6cb; background-color: #f8d7da; border-radius: 4px; }
            `}</style>
        </div>
    );
}

export default RecommendationForm;