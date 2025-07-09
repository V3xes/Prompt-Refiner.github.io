let currentIdea = '';
let refinedText = '';
let refineCount = 0;

// Theme toggle control
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('ai-theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
    document.getElementById('themeToggle').checked = saved === 'light';
  }

  document.getElementById('themeToggle').addEventListener('change', (e) => {
    const newTheme = e.target.checked ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('ai-theme', newTheme);
  });
});

function refineIdea() {
  const input = document.getElementById('ideaInput').value.trim();
  if (!input) return;

  currentIdea = input;
  const refined = generateExpandedIdea(input);
  document.getElementById('refinedOutput').textContent = refined;
  document.getElementById('outputContainer').classList.remove('hidden');
}

function regenerate() {
  if (currentIdea) {
    const refined = generateExpandedIdea(currentIdea);
    document.getElementById('refinedOutput').textContent = refined;
  }
}

function moveToInput() {
  if (refinedText) {
    document.getElementById('ideaInput').value = refinedText;
    document.getElementById('outputContainer').classList.add('hidden');
  }
}

function copyOutput() {
  navigator.clipboard.writeText(refinedText || document.getElementById('refinedOutput').textContent)
    .then(() => {
      alert("📋 Copied to clipboard!");
    });
}

function generateExpandedIdea(idea) {
  const templates = [
    (idea) => `
AI Tool: ${capitalize(idea)}

Builds an intelligent platform that leverages machine learning and automation to address real-world problems like ${guessProblem(idea)}. It targets ${guessAudience(idea)} with the following features:

- Personalized recommendations based on user data
- Real-time adaptive learning
- Multi-platform compatibility
- Insightful analytics dashboards

Ideal for scaling intelligence in day-to-day tasks.
`.trim(),

    (idea) => `
"${idea}" becomes a next-gen AI assistant.

🔍 Overview:
- Purpose: Solve ${guessProblem(idea)}
- Technology: Integrate GPT, NLP, and smart decision-making engines
- Features: Custom workflows, voice or chat interface, data analysis
- Audience: ${guessAudience(idea)}

This AI is designed for immediate productivity improvement.
`.trim(),

    (idea) => `
Project: ${idea.toUpperCase()}

Originating from a simple idea, this AI solution could evolve into a toolset that includes:

• Natural language support  
• Proactive insights using behavior data  
• Smart actions triggered from context  
• Seamless integrations (apps, teams, devices)

Use case: Helping ${guessAudience(idea)} overcome ${guessProblem(idea)}.
`.trim()
  ];

  const wrapped = templates[refineCount % templates.length](idea);
  refineCount++;
  refinedText = wrapped;
  return wrapped;
}

// Utility helpers for basic keyword detection
function guessAudience(idea) {
  const text = idea.toLowerCase();
  if (text.includes("student")) return "students and educators";
  if (text.includes("health") || text.includes("fitness")) return "health professionals";
  if (text.includes("business")) return "business owners and teams";
  if (text.includes("art") || text.includes("design")) return "creative professionals";
  if (text.includes("developer") || text.includes("code")) return "developers and engineers";
  return "general users";
}

function guessProblem(idea) {
  const map = {
    study: "lack of focus and structure",
    schedule: "ineffective time management",
    health: "wellness tracking",
    content: "creative burnout",
    feedback: "slow response cycles",
    team: "poor collaboration"
  };

  for (const key in map) {
    if (idea.toLowerCase().includes(key)) return map[key];
  }
  return "everyday productivity challenges";
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
