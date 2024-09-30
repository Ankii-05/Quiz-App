const questions = [
  {
    question: "What does CSS stands for? ",
    answers: [
      { text: "Code Style Sheet", correct:false },
      { text: "Cascading Style Sheet", correct: true },
      { text: "Code Styling sheets", correct: false },
      { text: "None of the above", correct: false },
    ],
  },
  {
    question:
      "Which technology is primarily responsible for the styling of web pages?",
    answers: [
      { text: "JavaScript", correct: false },
      { text: "HTML", correct: false },
      { text: "CSS", correct: true },
      { text: "Python", correct: false },
    ],
  },
  {
    question: "How can you add a comment in a JavaScript?",
    answers: [
      { text: "*/This is a comment/*", correct: false },
      { text: "/--This is a comment --/", correct: false },
      { text: "**This is a comment**", correct: false },
      { text: "//This is a comment", correct: true },
    ],
  },
  {
    question: " Inside which HTML element do we put the JavaScript?",
    answers: [
      { text: "< scripting >", correct: false },
      { text: "< script >", correct: true },
      { text: "< javascript >", correct: false },
      { text: "None of the above", correct: false },
    ],
  },
  {
    question: "Choose the correct HTML element for the largest heading:",
    answers: [
      { text: "< heading >", correct: false },
      { text: "< h6 >", correct: false },
      { text: "< h1 >", correct: true },
      { text: "< head >", correct: false },
    ],
  },
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

// Show Questions

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  //show answers

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

// Remove all the previous answers.

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("right");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("right");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "play Again";
  nextButton.style.display = "block";
}

function handledNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handledNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
