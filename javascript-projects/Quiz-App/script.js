const quizData = [
    {
        question: "What City is Located on two continents?",
        a: "Istanbul",
        b: "Budapest",
        c: "Moscow", 
        d: "Riyadh",
        correct: "a"
    },{
        question: "What is Minsk the capital of?",
        a: "Belarus",
        b: "Czech Republic",
        c: "Bulgaria", 
        d: "Croatia",
        correct: "a"
    }, {
        question: "What is Kula Lumpar the capital of?",
        a: "Indonesia",
        b: "Vietnam",
        c: "Thiland", 
        d: "Malaysia",
        correct: "d"
    }, {
        question: "How Many time zones does China have?",
        a: "1",
        b: "2",
        c: "3", 
        d: "4",
        correct: "a"
    }, {
        question: "How Many countries are in Africa?",
        a: "45",
        b: "52",
        c: "58", 
        d: "60",
        correct: "b"
    }
];

const quiz = document.getElementById("quiz");
const questionEl = document.getElementById("question-heading");
const a_text = document.getElementById("a-text");
const b_text = document.getElementById("b-text");
const c_text = document.getElementById("c-text");
const d_text = document.getElementById("d-text");
const submitBtn = document.getElementById("submit");
const anwsersEl = document.querySelectorAll(".anwser");

currentQuestion = 0;

loadQuiz();
getSelected();

function loadQuiz() {
    deselectAnwsers();
    const currentQuizData = quizData[currentQuestion];
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
};

function getSelected() {
    let anwser = undefined
    anwsersEl.forEach((anwserE1) => {
        if (anwserE1.checked) {
            anwser = anwserE1.id;
        }
    });
    return anwser;
};

function deselectAnwsers() {
    anwsersEl.forEach((anwserEl) => {
            anwserEl.checked = false;
    })
};

let score = 0;
submitBtn.addEventListener("click",() => {
    const anwser = getSelected();
    if (anwser) {
        console.log(anwser)
        if (anwser === quizData[currentQuestion].correct) {
            score ++;
        } 
        currentQuestion ++;
        console.log(currentQuestion);
        if (quizData.length > currentQuestion) {
            loadQuiz();
        } else {
            quiz.innerHTML = `<h2>Your score is ${score} out of ${quizData.length}</h2>
            <button id="submit" onClick="location.reload()">Reload</button>`;
        }
    }
});



    