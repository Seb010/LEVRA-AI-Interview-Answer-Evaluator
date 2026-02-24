# 🚀 LEVRA — AI Interview Answer Evaluator

An interactive full‑stack web application that evaluates interview answers using a rule‑based natural language scoring system.

This project simulates AI‑style feedback by analyzing responses against scenario‑specific keywords and provides meaningful feedback to help users improve professional communication skills.

---

## 🔍 Features

### 💡 Core Functionality
- Select interview scenario categories (communication, teamwork, problem‑solving, adaptability)
- Evaluate text responses against scenario keywords
- Score responses based on relevance and length
- Generate tailored feedback and suggestions
- Highlight detected competencies

### 🛠 Technical Highlights
- Full‑stack architecture
- REST API backend using **Flask**
- Frontend UI built with **HTML, CSS, Tailwind, and Vanilla JavaScript**
- JSON‑driven dataset of interview scenarios and guidance

---

## 🧠 Technologies Used

| Layer         | Technology |
|---------------|------------|
| Backend       | Python, Flask, Flask‑CORS |
| Frontend      | HTML, Tailwind CSS, JavaScript |
| Data          | JSON scenario dataset |
| Architecture  | REST API |

---

## 🧩 How It Works

1. User selects a skill category (e.g., communication, problem‑solving).
2. The app loads a random scenario from the dataset.
3. User enters a written response.
4. The application:
   - Scans the response for relevant keywords
   - Scores based on keyword matches + response length
   - Displays AI‑style feedback
   - Shows which competencies were detected

---

## ▶️ How to Run Locally

### 🛠 Backend — Flask API

```bash
cd backend
# (optional) create and activate virtual environment
python3 -m venv venv
source venv/bin/activate

# install dependencies
pip install flask flask_cors

# run API
python app.py
```

The API will start on:

```
http://localhost:5000
```

---

### 📌 Frontend — Web UI

Simply open:

```bash
frontend/index.html
```

in your browser.

No build step required.

---

## 📁 Project Structure

```
LEVRA-AI-Interview-Answer-Evaluator/
├── backend/          # Flask API
│   └── app.py
├── frontend/         # Frontend UI files
│   ├── index.html
│   ├── script.js
│   └── style.css
├── dataset.json      # Interview scenarios & keywords
└── README.md
```

---

## 🎯 Purpose

This project was built to explore:

- Natural language evaluation strategies
- Rule‑based keyword detection
- Full‑stack integration (Frontend + API)
- Real‑world UI/UX design

---

## 📈 Future Enhancements

- Replace rule‑based evaluation with ML/NLP model
- User accounts and persistent scoring
- Export feedback reports
- Live deployment (Heroku / Render / Vercel)

---

## 👨‍💻 Author

Sebastian
