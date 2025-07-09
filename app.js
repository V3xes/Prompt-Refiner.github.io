let currentIdea = '';
let refinedText = '';
let refineCount = 0;

document.addEventListener('DOMContentLoaded', () => {
  // Apply saved theme
  const saved = localStorage.getItem('ai-theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
    document.getElementById('themeToggle').checked = saved === "light";
  }

  // Theme toggle handler
  document.getElementById('themeToggle').addEventListener('change', (e) => {
    const newTheme = e.target.checked ? "light" : "dark";
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('ai-theme', newTheme);
  });
});

function refineIdea() {
  const input = document.getElementById('ideaInput').value.trim();
  if (!input) return;

  currentIdea = input;
  const refined = getTemplate(input);

  document.getElementById('refinedOutput').textContent = refined;
  document.getElementById('outputContainer').classList.remove('hidden');
}

function regenerate() {
  if (currentIdea) {
    const refined = getTemplate(currentIdea);
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
      alert("Copied to clipboard!");
    });
}

function getTemplate(idea) {
  const templates = [
    `📌 Prompt:

Act as an expert AI assistant. The user is developing: "${idea}"

Refine and expand this concept into a useful application. Detail features, user benefits, target audience, and implementation. Use clear and professional language.`,

    `💡 Concept Transformation:

Idea: "${idea}"

Now write a highly detailed AI prompt explaining this idea, including how it works, what it solves, and who it's for. Use structured, technical language.`,

    `🎨 Creative Prompt:

Take this idea: "${idea}"

Turn it into a long-form prompt with proper formatting, tone, and detail. Include keywords, user goals, and expected outcomes. Format like a production-grade AI prompt.`
  ];

  const result = templates[refineCount % templates.length];
  refinedText = result;
  refineCount++;
  return result;
}
