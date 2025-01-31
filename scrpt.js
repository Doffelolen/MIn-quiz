const questions = [
    {
        question: "Hva heter jeg?",
        answers: [
            {text: "Birk", correct: false},
            {text: "Jonas", correct: true},
            {text: "Pål", correct: false},
            {text: "Sebastian", correct: false},

        ]

    },    
    {
        question: "Hvilket trinn går jeg i?",
        answers: [
            {text: "Første  året vgs", correct: true},
            {text: "Andre året på vgs", correct: false},
            {text: "Tredje året på vgs", correct: false},
            {text: "Jeg går ikke på skolen?", correct: false},
        ]
    },
    {
        question: "Hvor gammel er jeg?",
        answers: [
            {text: "19", correct: false},
            {text: "17", correct: false},
            {text: "16", correct: true},
            {text: "18", correct: false},

        ]
    },
    {
        question: "Hvilken linje går jeg på?",
        answers: [
            {text: "Studiespesialisering", correct: false},
            {text: "Bygg og anelegg", correct: false},
            {text: "Elektro", correct: false},
            {text: "Informasjonsteknologi og medieproduksjon", correct: true},
        ]
    }

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Neste";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    questionNo;

    currentQuestion. answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text; 
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    })
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button=> {
        if(button.dataset.correct === "true"){
                button.classList.add("correct");
            }
            button.disabled = true;
    })
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Du fikk ${score} poeng av ${questions.length}!`;
    nextButton.innerHTML = "Spill Igjen";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();
 