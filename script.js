// --- Configuration ---
const correctName = "Thoriso";
const correctHint1 = "baby";
const correctHint2 = "your baby";

// --- State ---
let nameEntryState = 0;
let noClicks = 0;

// DOM Elements
const body = document.getElementById("body");
const page1 = document.getElementById("page-1");
const page2 = document.getElementById("page-2");
const page3 = document.getElementById("page-3");
const page4 = document.getElementById("page-4");
const page5 = document.getElementById("page-5");

const enterBtn = document.getElementById("enter-btn");
const nameInput = document.getElementById("name-input");
const submitNameBtn = document.getElementById("submit-name-btn");
const nameHint = document.getElementById("name-hint");

const surveyContent = document.getElementById("survey-content");
const finalQuestionLink = document.getElementById("final-question-link");
const finalLink = document.getElementById("final-link");

const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const noJokeContainer = document.getElementById("no-joke-container");
const noJokeText = document.getElementById("no-joke-text");
const noJokeSubtext = document.getElementById("no-joke-subtext");

// Survey Questions
const surveyQuestions = [
  { question: "Do I make you laugh?", options: ["Not at all", "Meh", "Duh"] },
  { question: "Do you think I'm handsome?", options: ["Not at all", "Meh", "Duh"] },
  { question: "Do I make you happy?", options: ["Not at all", "Meh", "Duh"] },
  { question: "Do you love spending time with me?", options: ["Not at all", "Meh", "Duh"] },
  { question: "Do you LOVE me?", options: ["Not at all", "Meh", "Duh"] }
];

// Page navigation
function changePage(from, to) {
  from.classList.add("hidden");
  to.classList.remove("hidden");
  to.classList.add("flex");
}

// Create survey dynamically
function createSurvey() {
  surveyQuestions.forEach(q => {
    const questionDiv = document.createElement("div");
    questionDiv.className = "mb-6 text-center";
    questionDiv.innerHTML = `<p class="text-lg font-semibold text-gray-800 mb-2">${q.question}</p>`;

    const optionsDiv = document.createElement("div");
    optionsDiv.className = "flex flex-col sm:flex-row justify-center gap-4";
    q.options.forEach(option => {
      const button = document.createElement("button");
      button.textContent = option;
      button.className =
        "py-3 px-6 bg-pink-50 hover:bg-pink-100 rounded-xl shadow-sm transition";

      // Highlight on click
      button.addEventListener("click", () => {
        optionsDiv.querySelectorAll("button").forEach(btn => {
          btn.classList.remove("bg-pink-300", "text-white");
          btn.classList.add("bg-pink-50");
        });
        button.classList.remove("bg-pink-50");
        button.classList.add("bg-pink-300", "text-white");
      });

      optionsDiv.appendChild(button);
    });
    questionDiv.appendChild(optionsDiv);
    surveyContent.appendChild(questionDiv);
  });

  finalQuestionLink.classList.remove("hidden");
}

// Confetti
function createConfetti() {
  const isMobile = window.innerWidth < 640;
  const confettiCount = isMobile ? 50 : 120; // fewer on mobile
  const colors = ["confetti-yes", "confetti-no", "confetti-maybe"];

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.className = `confetti-piece ${colors[Math.floor(Math.random() * colors.length)]}`;

    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.top = `${-10 - Math.random() * 10}vh`;

    const size = Math.random() * 14 + 6; // slightly smaller
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    confetti.style.borderRadius = "50%";
    confetti.style.backgroundColor = "currentColor";
    confetti.style.animationDelay = `${Math.random() * 1.5}s`;

    // shorter duration on mobile for performance
    const duration = isMobile ? 3 + Math.random() * 2 : 5 + Math.random() * 3;
    confetti.style.animation = `confetti-fall ${duration}s linear forwards`;

    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), duration * 1000);
  }
}

// --- Event Listeners ---
enterBtn.addEventListener("click", () => {
  changePage(page1, page2);
  nameInput.focus();
});

submitNameBtn.addEventListener("click", () => {
  const enteredName = nameInput.value.trim().toLowerCase();

  if (nameEntryState === 0) {
    if (enteredName === correctName.toLowerCase()) {
      nameHint.textContent = "Wrong name, what do I call you?";
      nameHint.classList.remove("hidden", "text-green-500");
      nameHint.classList.add("text-red-500");
      nameEntryState = 1;
    } else {
      nameInput.value = "";
      nameHint.textContent = "Wrong name, try again!";
      nameHint.classList.remove("hidden", "text-green-500");
      nameHint.classList.add("text-red-500");
    }
  } else if (nameEntryState === 1) {
    if (enteredName === correctHint1.toLowerCase()) {
      nameHint.textContent = "Almost there, but whose baby are you?";
      nameHint.classList.remove("hidden", "text-green-500");
      nameHint.classList.add("text-red-500");
      nameEntryState = 2;
    } else {
      nameInput.value = "";
      nameHint.textContent = "Wrong hint, try again!";
      nameHint.classList.remove("hidden", "text-green-500");
      nameHint.classList.add("text-red-500");
    }
  } else if (nameEntryState === 2) {
    if (enteredName === correctHint2.toLowerCase()) {
      nameHint.textContent = "About time you got it!";
      nameHint.classList.remove("hidden", "text-red-500");
      nameHint.classList.add("text-green-500");

      setTimeout(() => {
        changePage(page2, page3);
        createSurvey();
      }, 1000);
    } else {
      nameInput.value = "";
      nameHint.textContent = "Wrong hint, try again!";
      nameHint.classList.remove("hidden", "text-green-500");
      nameHint.classList.add("text-red-500");
    }
  }
});

finalLink.addEventListener("click", e => {
  e.preventDefault();
  changePage(page3, page4);
});

yesBtn.addEventListener("click", () => {
  noJokeText.textContent = "I knew you'd make the right choice.";
  noJokeSubtext.textContent = "";
  noJokeContainer.classList.remove("hidden");

  setTimeout(() => {
    changePage(page4, page5);
    createConfetti();
  }, 1000);
});

noBtn.addEventListener("click", () => {
  noClicks++;
  noJokeContainer.classList.remove("hidden");
  if (noClicks === 1) {
    noJokeText.textContent = "Are you sure?";
    noJokeSubtext.textContent = "Really? Are you absolutely sure?";
  } else if (noClicks === 2) {
    noJokeText.textContent = "C'mon, you know the right choice!";
    noJokeSubtext.textContent = "";
  } else if (noClicks === 3) {
    noJokeText.textContent = "Nope sorry, not an option, try again.";
    noJokeSubtext.textContent = "";
  } else {
    noJokeText.textContent = "I'm afraid you only have one choice!";
    noJokeSubtext.textContent = "";
    noBtn.classList.add("hidden");
  }
});

// Allow Enter key to submit name
nameInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    submitNameBtn.click();
  }
});
