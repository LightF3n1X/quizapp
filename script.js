/*
Божий захист на цей код, щоб все працювало при представленні, нічого не з'їхало.
*/
const questions = [
    {
        question: "У якому році заснували Полтаву?",
        answers: [
            {text: "899", correct: true},
            {text: "988", correct: false},
            {text: "1100", correct: false},
            {text: "1023", correct: false},
        ]
    },
    {
        question: "Що зображено на гербі міста?",
        answers: [
            {text: "Щит і меч", correct: false},
            {text: "Лук і чотири зірки", correct: true},
            {text: "Козак з шаблею", correct: false},
            {text: "Галушки", correct: false},
        ]
    },
    {
        question: "Як називається гора, на якій стоїть Біла альтанка?",
        answers: [
            {text: "Степанова гора", correct: false},
            {text: "Шведська могила", correct: false},
            {text: "Говерла", correct: false},
            {text: "Іванова гора", correct: true},
        ]
    },
    {
        question: "Де за давніми переказами страчували злочинців?",
        answers: [
            {text: "У Сонячному парку", correct: false},
            {text: "На театральній площі", correct: false},
            {text: "У корпусному парку", correct: false},
            {text: "На площі перед альтанкою", correct: true},
        ]
    },
    {
        question: "Який архітектор відбудував Полтаву після Другої світової війни?",
        answers: [
            {text: "Василь Кричевський", correct: false},
            {text: "Лев Вайнгорт", correct: true},
            {text: "Василь Кричевський", correct: false},
            {text: "Іван Котляровський", correct: false},
        ]
    },
    {
        question: "Існує легенда, що бруківка на вулиці Собороності зроблена з:",
        answers: [
            {text: "Фундаменту старої кам'яної церкви", correct: false},
            {text: "Козацьких могил", correct: false},
            {text: "Європейських надгробків", correct: true},
            {text: "Гранітної стелі", correct: false},
        ]
    },
    {
        question: "Коли була знайдена перша писемна згадка про Полтаву?",
        answers: [
            {text: "1174", correct: true},
            {text: "1154", correct: false},
            {text: "1203", correct: false},
            {text: "1214", correct: false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
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
        selectedBtn.classList.add("correct")
        score++;
    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Ви відповіли правильно на ${score} з ${questions.length} запитань!`;
    nextButton.innerHTML = "Перейти на головну сторінку";
    nextButton.style.display = "block";
    nextButton.addEventListener("click", () => {
        window.location.href = "tests.html";
    });
    
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
});

startQuiz();
