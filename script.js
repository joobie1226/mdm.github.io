const questions = [
  {
    question: "Which web browser currently controls the majority of the market?",
    type: "multiple-choice",
    answers: [
      { text: "Firefox", correct: false },
      { text: "Chrome", correct: true },
      { text: "Safari", correct: false },
      { text: "Explorer", correct: false }
    ]
  },
  {
    question: "Who created the first web browser?",
    type: "multiple-choice",
    answers: [
      { text: "Steve Jobs", correct: false },
      { text: "Tim Robinson", correct: false },
      { text: "Tim Berners-Lee", correct: true },
      { text: "Marc Andreessen", correct: false }
    ]
  },
  {
    question: "What does HTTP stand for?",
    type: "multiple-choice",
    answers: [
      { text: "Hypertext Transfer Protocol", correct: true },
      { text: "Hypertext Transitional Protocol", correct: false },
      { text: "Highlighters Tell Time Profoundly", correct: false },
      { text: "Hypertest Text Professional", correct: false }
    ]
  },
  {
    question: "Fill in the correct answer: What was the name of the first web browser created?",
    type: "fill-in-blank",
    correctAnswers: "world wide web"
  },
  {
    question: "Select all that apply: Which of the following features are specific to Safari?",
    type: "multi-selection",
    answers: [
      { text: "Apple Pay", correct: true },
      { text: "Keychain", correct: true },
      { text: "Copilot", correct: false },
      { text: "iCloud+", correct: true }
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  if (currentQuestion.type === "multiple-choice") {
    currentQuestion.answers.forEach(answer => {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      answerButtons.appendChild(button);
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", () => selectAnswer(button, answer.correct));
    });
  } else if (currentQuestion.type === "fill-in-blank") {
    const input = document.createElement("input");
    input.type = "text";
    input.classList.add("input");
    answerButtons.appendChild(input);

    const submitButton = document.createElement("button");
    submitButton.innerHTML = "Submit Answer";
    submitButton.classList.add("btn");
    answerButtons.appendChild(submitButton);

    submitButton.addEventListener("click", () => {
      const userAnswer = input.value.trim().toLowerCase();
      selectAnswer(submitButton, userAnswer === currentQuestion.correctAnswers.toLowerCase(), userAnswer, currentQuestion.correctAnswers);
    });
  } else if (currentQuestion.type === "multi-selection") {
    currentQuestion.answers.forEach(answer => {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = answer.text;
      const label = document.createElement("label");
      label.innerHTML = answer.text;

      const div = document.createElement("div");
      div.classList.add("checkbox-container");
      div.appendChild(checkbox);
      div.appendChild(label);
      answerButtons.appendChild(div);

      checkbox.dataset.correct = answer.correct;
      checkbox.addEventListener("change", () => selectMultiSelectionAnswers(currentQuestion));
    });
  }

  nextButton.style.display = "none"; // Hide next button initially
}

function resetState() {
  nextButton.style.display = "none"; // Hide next button initially
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(button, isCorrect, userAnswer = null, correctAnswer = null) {
  if (isCorrect) {
    score++;
    button.classList.add("correct");
  } else {
    button.classList.add("incorrect");

    // Show correct answer for fill-in-blank
    if (userAnswer && correctAnswer) {
      questionElement.innerHTML += `<br><strong>Correct Answer: ${correctAnswer}</strong>`;
    }
  }

  // Disable all buttons after selection
  Array.from(answerButtons.children).forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.correct === "true") {
      btn.classList.add("correct");
    }
  });

  nextButton.style.display = "block"; // Show next button after selection
}

function selectMultiSelectionAnswers(currentQuestion) {
  const checkboxes = document.querySelectorAll(".checkbox-container input");
  let correctCount = 0;
  let selectedCount = 0;

  checkboxes.forEach(checkbox => {
    if (checkbox.dataset.correct === "true" && checkbox.checked) {
      correctCount++;
    }
    if (checkbox.checked) {
      selectedCount++;
    }
  });

  // Check if the number of correct answers matches the selected answers
  if (correctCount === selectedCount && correctCount === currentQuestion.answers.filter(a => a.correct).length) {
    score++;
  }

  // Show correct answers after multi-selection
  currentQuestion.answers.forEach(answer => {
    const checkbox = Array.from(checkboxes).find(cb => cb.value === answer.text);
    if (answer.correct && !checkbox.checked) {
      checkbox.parentElement.classList.add("correct");
    } else if (!answer.correct && checkbox.checked) {
      checkbox.parentElement.classList.add("incorrect");
    }
  });

  nextButton.style.display = "block"; // Show next button after multi-selection
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;

  // Display Pass/Fail Message
  if (score >= 3) {
    questionElement.innerHTML += "<br><br>You Passed!";
  } else {
    questionElement.innerHTML += "<br><br>You Failed!";
  }

  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();

