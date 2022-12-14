
console.log("Hello world!");

var introPage = document.querySelector (".intro-page");
var startButton = document.getElementById ("start-button");
var scoreResults = document.getElementById ("result-button")

var quizPage = document.querySelector (".quiz-page");
var quizQuestions = document.getElementById ("questions");
var quizAnswers = document.querySelector (".answers");
var quizAnswerA = document.querySelector ("#A1");
var quizAnswerB = document.querySelector ("#A2");
var quizAnswerC = document.querySelector ("#A3");
var quizAnswerD = document.querySelector ("#A4");

var scorePage = document.querySelector("#score-page");
var initials = document.querySelector ("#initials");
var scoreValue = document.querySelector ("#score");
var saveScoreButton = document.querySelector ("#save-score");
var goBackButton = document.querySelector ("#go-back");
var checkAnswer = document.querySelector ("#check-answer");

var resultsPage = document.querySelector ("#results-page");
var scoreRecord = document.querySelector ("#score-record");
var clearButton = document.getElementById("clear-button");

var initialsEntry = document.getElementById("initials-entry")


var questionSource = [
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        choices: ["a. quotes", "b. curly brackets", "c. commas", "d. parenthesis"],
        answer: "a"
    },
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["a. strings", "b. booleans", "c. prompts", "d. numbers"],
        answer: "c"
    },
    {
        question: "How do you create a function called renderMessage in JavaScript",
        choices: ["a. function = renderMessage", "b. function renderMessage()", "c. function = RenderMessage()", "d. createFunction = renderMessage()"],
        answer: "b"
    },
    {
        question: "How do you call a function name renderMessage?",
        choices: ["a. run renderMessage()", "b. call renderMessage()", "c. renderMessage()", "d. var = renderMessage"],
        answer: "c"
    },
    {
        question: "How do you pull an ID from your HTML?",
        choices: ["a. getElementById('id')", "b. document.getElementById('#id')", "c. document.querySelect('#id')", "d. document.getElementById('id')" ],
        answer: "d"

    }
];

// additional variables for timer function, questions, and score
var timeEl = document.getElementById ("timer");
var secondsLeft = 60;
var timerInterval;

var questionNumber = 0;
var scoreTotal = 0;
var n = 0;
var questionCount = 1;


// functions 

function timerCountdown () {
    timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = secondsLeft + " seconds remaining!";

        if(secondsLeft === 0) {
            clearInterval(timerInterval);
            timeEl.textContent = "You're outta time!"
            gameOver();}
        // } else if (questionCount >= questionSource.length +1) {
        //     clearInterval(timerInterval);
        //     gameOver();
        //     } 
        
    }, 1000);

}

function genQuiz () {
    introPage.style.display = "none";
    quizPage.style.display = "block";
    timerCountdown();
    genQuestion (questionNumber);

}

function genQuestion (n) {
    quizQuestions.textContent = questionSource[n].question;
    quizAnswerA.textContent = questionSource[n].choices[0];
    quizAnswerB.textContent = questionSource[n].choices[1];
    quizAnswerC.textContent = questionSource[n].choices[2];
    quizAnswerD.textContent = questionSource[n].choices[3];
    questionNumber = n;
}

function checkAnswers (event) {
    event.preventDefault();

    checkAnswer.style.display = "block";
    setTimeout (function (){
        checkAnswer.style.display = "none";
    }, 1000);

    if (questionSource[questionNumber].answer == event.target.value) {
    checkAnswer.textContent = "You're CORRECT !!";
    scoreTotal = scoreTotal + 1;
} else {
    secondsLeft = secondsLeft - 10;
    checkAnswer.textContent = "Oops! Ya goofed!";
} 
   if (questionNumber < questionSource.length -1) {
   genQuestion (questionNumber +1);
   } else {

    gameOver ();
}

questionCount++;

}

function gameOver () {
    quizPage.style.display = "none";
    scorePage.style.display = "block";
    scoreValue.textContent = "Your final score is... " + scoreTotal;
    timeEl.style.display = "none";
    resultsPage.style.display = "none";
    clearInterval(timerInterval);

}


function saveScore () {
   var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    
   var entry = {
     score: scoreTotal,
     initials: initialsEntry.value,
   };
 
   highscores.push(entry);
   localStorage.setItem("highscores", JSON.stringify(highscores));
   console.log (highscores)

   for (var i = 0; i < highscores.length; i += 1) {
    // create li tag for each high score
    var h3Tag = document.createElement('h3');
    h3Tag.textContent = highscores[i].initials + ' - ' + highscores[i].score;

    scoreRecord.appendChild(h3Tag);
}};


// EVENT LISTENERS 
startButton.addEventListener ("click", genQuiz);

quizAnswerA.addEventListener ("click", checkAnswers);
quizAnswerB.addEventListener ("click", checkAnswers);
quizAnswerC.addEventListener ("click", checkAnswers);
quizAnswerD.addEventListener ("click", checkAnswers);


goBackButton.addEventListener ("click", function (event){
    event.preventDefault();
    scorePage.style.display = "none";
    quizPage.style.display = "none";
    introPage.style.display = "block";
    location.reload ();

});

saveScoreButton.addEventListener ("click", function (event){
    event.preventDefault();
    scorePage.style.display = "none";
    quizPage.style.display = "none";
    introPage.style.display = "none";
    resultsPage.style.display = "block";
    saveScore();

});

scoreResults.addEventListener ("click", function(event) {
    event.preventDefault();
    scorePage.style.display = "none";
    quizPage.style.display = "none";
    introPage.style.display = "none";
    resultsPage.style.display = "block";

});


clearButton.addEventListener ("click", function (event){
    event.preventDefault();
    localStorage.clear();
});


// https://calendly.com/fsf-tutor-team/david-elutilo