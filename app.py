from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

# Load dataset once
def load_data():
    with open('dataset.json', 'r') as f:
        return json.load(f)

@app.route('/')
def index():
    # Serves the frontend
    return render_template('index.html')

@app.route('/evaluate', methods=['POST'])
def evaluate():
    data = request.json
    response_text = data.get('response', '').lower()
    keywords = data.get('keywords', [])
    
    if len(response_text) < 30:
        return jsonify({"error": "Response too short for analysis."}), 400

    # Business Logic: Competency Detection
    matched = [k for k in keywords if k.lower() in response_text]
    missing = [k for k in keywords if k.lower() not in response_text]
    
    # Simple NLP Scoring (Weighted)
    keyword_score = (len(matched) / len(keywords)) * 60
    length_score = min((len(response_text) / 400) * 40, 40)
    final_score = int(keyword_score + length_score)

    return jsonify({
        "score": final_score,
        "matched": matched,
        "missing": missing
    })

@app.route('/get-questions', methods=['GET'])
def get_questions():
    return jsonify(load_data())

if __name__ == '__main__':
    app.run(debug=True, port=5000)