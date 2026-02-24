let dataset = {};
let currentQuestion = null;

// Select Elements
const skillSelect = document.getElementById("skillSelect");
const scenarioBox = document.getElementById("scenarioBox");
const scenarioText = document.getElementById("scenarioText");
const responseInput = document.getElementById("responseInput");
const submitBtn = document.getElementById("submitBtn");
const resultsArea = document.getElementById("resultsArea");
const scoreBar = document.getElementById("scoreBar");
const scoreText = document.getElementById("scoreText");
const keywordTags = document.getElementById("keywordTags");
const aiFeedback = document.getElementById("aiFeedback");

// Fetch the dataset from the JSON file
fetch('./dataset.json')
    .then(response => {
        if (!response.ok) throw new Error("Could not load dataset.");
        return response.json();
    })
    .then(data => {
        dataset = data;
    })
    .catch(err => console.error("Error:", err));

// Handle Category Selection
skillSelect.addEventListener("change", () => {
    const category = skillSelect.value;
    const questions = dataset[category];
    
    // Pick a random question from that category
    currentQuestion = questions[Math.floor(Math.random() * questions.length)];

    // Show Scenario UI
    scenarioText.textContent = currentQuestion.question;
    scenarioBox.classList.remove("hidden");
    resultsArea.classList.add("hidden");
    responseInput.value = "";
});

// Performance Analysis Logic
submitBtn.addEventListener("click", () => {
    const input = responseInput.value.trim();
    
    if (input.length < 30) {
        alert("Please provide a more detailed response for a comprehensive AI analysis.");
        return;
    }

    // Keyword Match Logic
    const foundKeywords = currentQuestion.keywords.filter(word => 
        input.toLowerCase().includes(word.toLowerCase())
    );

    const missingKeywords = currentQuestion.keywords.filter(word => 
        !input.toLowerCase().includes(word.toLowerCase())
    );

    // Scoring Formula: 70% Keyword Accuracy + 30% Detail/Length
    const keywordScore = (foundKeywords.length / currentQuestion.keywords.length) * 70;
    const lengthScore = Math.min((input.length / 450) * 30, 30);
    const finalScore = Math.round(keywordScore + lengthScore);

    // Update UI Results
    resultsArea.classList.remove("hidden");
    
    // Animate Score
    scoreBar.style.width = "0%";
    setTimeout(() => {
        scoreBar.style.width = finalScore + "%";
        scoreText.textContent = finalScore + "%";
    }, 150);

    // Render Keyword Tags
    keywordTags.innerHTML = foundKeywords.length > 0 
        ? foundKeywords.map(k => `<span class="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-[10px] font-bold rounded-lg border border-cyan-500/20">${k}</span>`).join('')
        : `<span class="text-slate-600 text-[10px]">No core competencies detected.</span>`;

    // Generate Dynamic Feedback
    let feedbackMessage = "";
    if (finalScore > 85) {
        feedbackMessage = "Excellent. Your response demonstrates high professional maturity and captures all key competencies.";
    } else if (finalScore > 60) {
        feedbackMessage = `Solid response. You demonstrated strong understanding, but could improve by explicitly mentioning <strong>${missingKeywords.join(", ")}</strong>.`;
    } else {
        feedbackMessage = "Your response lacks depth. Focus on incorporating specific professional concepts like <em>" + missingKeywords.slice(0, 2).join(" and ") + "</em> to show more ownership.";
    }
    
    aiFeedback.innerHTML = feedbackMessage;
});