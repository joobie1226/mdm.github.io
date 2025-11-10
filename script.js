const questions = [
  {
    question: "Which web browser currently controls the majority of the market?",
    answers: [
      { text: "Firefox", correct: false},
      { text: "Chrome", correct: true},
      { text: "Safari", correct: false},
      { text: "Explorer", correct: false},
  },
  {
    question: "Who created the first web browser?",
    answers: [
      { text: "Steve Jobs", correct: false},
      { text: "Tim Robinson", correct: false},
      { text: "Tim Berners-Lee", correct: true},
      { text: "Marc Andreessen", correct: false},
      },
  {
    question: "What does HTTP stand for?",
    answers: [
      { text: "Hypertext Transfer Protocol", correct: true},
      { text: "Hypertext Transitional Protocol", correct: false},
      { text: "Highlighters Tell Time Profoundly", correct: false},
      { text: "Hypertest Text Professional", correct: false},
      }
];
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = o;
let score = 0;

function startquiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestions();
}
function showQuestion(){
  resetState();
  let currentQuestion = quetions[currentQuestionIndex];
  let questionNo = currentQuestionIndex +1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.
  question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classlist.add("btn");
    answerButton.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    
                            
  }];
}

function resetState(){
  nextButton.style.display = "none";
  while(answerButton.firstChild){
    answerButtons.removeChild(answerButtons.firstChild)
  }

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct == "true";
  if(isCorrect){
    selectBtn.classlist.add("correct");
  }else(
    selectedBtn.classlist.add("incorrect");
}
}
  
  
  
startQuiz()
  
