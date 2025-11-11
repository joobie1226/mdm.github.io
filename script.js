// The questions represented in the quiz
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

// DOM elements
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
// Keeps track of questions, score, and answers
let currentQuestionIndex = 0;
let score = 0;
let answersGiven = [];
// Function to start the quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  answersGiven = [];
  nextButton.innerHTML = "Next";
  showQuestion();
}
// Displays the current question and the number of the question
function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
// Handles the multiple choice questions for the quiz, adds to the answer container, and adds a click event
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
    }); // Handles the fill-in-the-blank question, sets an input type for user input, and creates a submit button
  } else if (currentQuestion.type === "fill-in-blank") {
    const input = document.createElement("input");
    input.type = "text";
    input.classList.add("input");
    answerButtons.appendChild(input);

    const submitButton = document.createElement("button");
    submitButton.innerHTML = "Submit Answer";
    submitButton.classList.add("btn");
    answerButtons.appendChild(submitButton);
    // Handles user's answer
    submitButton.addEventListener("click", () => {
      const userAnswer = input.value.trim().toLowerCase();
      selectAnswer(submitButton, userAnswer === currentQuestion.correctAnswers.toLowerCase(), userAnswer, currentQuestion.correctAnswers);
    }); // Handles the multi-selection question and creates a checkbox and label for the question 
  } else if (currentQuestion.type === "multi-selection") {
    
    currentQuestion.answers.forEach(answer => {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = answer.text;
      const label = document.createElement("label");
      label.innerHTML = answer.text;
    // Creates a container for the checkbox and label, adds the checkbox and label to the container, and appends the container to the answer section
      const div = document.createElement("div");
      div.classList.add("checkbox-container");
      div.appendChild(checkbox);
      div.appendChild(label);
      answerButtons.appendChild(div);
      // Sets the correct answer flag on the checkbox
      checkbox.dataset.correct = answer.correct;
      checkbox.addEventListener("change", () => {
        selectMultiSelectionAnswers(currentQuestion);
      });
    });
    // Hide next button initially
    nextButton.style.display = "none";
  }

  nextButton.style.display = "none";
}
// Function to reset the state of the question, deleting all buttons before the next question
function resetState() {
  nextButton.style.display = "none"; y
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
// Handles the answer selection and whether the answer was correct
function selectAnswer(button, isCorrect, userAnswer = null, correctAnswer = null) {
  answersGiven[currentQuestionIndex] = { answer: button.innerHTML, correct: isCorrect };
// Increases the score 
  if (isCorrect) {
    score++;
    button.classList.add("correct");
  } else {
    button.classList.add("incorrect");

    // Show the correct answer for the fill-in-the-blank question if the user is wrong
    if (userAnswer && correctAnswer) {
      questionElement.innerHTML += `<br><strong>Correct Answer: ${correctAnswer}</strong>`;
    }
  }

  // Disable all buttons after click
  Array.from(answerButtons.children).forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.correct === "true") {
      btn.classList.add("correct");
    }
  });

  nextButton.style.display = "block"; // Presents "Next" button after click
}
// Handles the multi-select question
function selectMultiSelectionAnswers(currentQuestion) {
  const checkboxes = document.querySelectorAll(".checkbox-container input");
  let correctCount = 0;
  let selectedCount = 0;
// Increment for if the checkbox selected is correct
  checkboxes.forEach(checkbox => {
    if (checkbox.dataset.correct === "true" && checkbox.checked) {
      correctCount++;
    } // Increment for if the checkbox is selected 
    if (checkbox.checked) {
      selectedCount++;
    }
  });

  // Updates the score of the right checkboxes are selected
  if (correctCount === selectedCount && correctCount === currentQuestion.answers.filter(a => a.correct).length) {
    score++;
  }

  // Shows the correct and incorrect answers after the checkboxes are selected
 checkboxes.forEach(checkbox => {
    if (checkbox.dataset.correct === "true" && checkbox.checked) {
      checkbox.parentElement.classList.add("correct");
    } else if (checkbox.dataset.correct === "false" && checkbox.checked) {
      checkbox.parentElement.classList.add("incorrect");
    } else if (checkbox.dataset.correct === "true" && !checkbox.checked) {
      checkbox.parentElement.classList.add("correct");
    }
  });

  nextButton.style.display = "block"; // Show next button after multi-selection
}
// Shows the final score of the quiz
function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;

  // Displays whether or not the user passed or failed
  if (score >= 3) {
    questionElement.innerHTML += "<br><br>You Passed!";
  } else {
    questionElement.innerHTML += "<br><br>You Failed!";
  }
// Handles the quiz resetting
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}
// Handles the "Next" button click after the last question and presents the score
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
// Handles resetting the game after all questions have been answered 
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
