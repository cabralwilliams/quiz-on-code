//Hard Coded Document Elements
var questionEl = document.querySelector("#question-div");
var aStatusEl = document.querySelector("#answer-status-div");
var timeEl = document.querySelector("#time-display");
var highScoreBtn = document.querySelector("#high-scores");
var welcomeMssgEl = document.querySelector("#welcome-message");
var startQuizBtn = document.querySelector("#startQuiz");

var timeLimit = 120;
var qIndex = Math.floor(Math.random()*qObjects1.length); //Set the initial question to get the first answer
var currentAnswer = qObjects1[qIndex].correctAnswer;
var quizElements = createQuizElement(qObjects1[qIndex]);
var correctCount = 0;
var questionCount = 0;
var streak = 0;
var score = 0;
var quizRunning = false;
var showingTopTen = false;
var highScores = localStorage.getItem("highScores");
if(highScores === null) {
    highScores = [];
} else {
    highScores = JSON.parse(highScores);
}

function resetQIndex() {
    qIndex = Math.floor(Math.random()*qObjects1.length);
    currentAnswer = qObjects1[qIndex].correctAnswer;
}

function checkAnswer(inputVal) {
    if(inputVal === currentAnswer) {
        correctCount++;
        streak++;
        score += streak;
    } else {
        streak = 0;
        if(timeLimit <= 10) {
            timeLimit = 0;
        } else {
            timeLimit -= 10;
        }
    }
    resetQIndex();
    quizElements = createQuizElement(qObjects1[qIndex]);
    questionEl.innerHTML = "";
    questionEl.appendChild(quizElements[0]);
    questionEl.appendChild(quizElements[1]);
    questionCount++;
}

//Welcome Message section
var welcomeDiv = document.createElement("div");
welcomeDiv.id = "#welcome-message";
var welcomePar = document.createElement("p");
welcomePar.textContent = "Welcome!  This quiz will test your understanding of JavaScript fundamentals.  When you are ready, press the start button below to begin.  Good luck!";
var startBtn = document.createElement("button");
startBtn.id = "#startQuiz";
startBtn.textContent = "Start";
startBtn.setAttribute("onclick","startTheQuiz()");
welcomeDiv.appendChild(welcomePar);
welcomeDiv.appendChild(startBtn);

highScoreBtn.addEventListener("click", function() {
    if(!quizRunning && !showingTopTen) {
        showingTopTen = true;
        if(highScores.length === 0) {
            welcomeMssgEl.innerHTML = "";
            var message = document.createElement("h2");
            message.textContent = "There are no scores yet, so take the stupid quiz already!";
            questionEl.appendChild(message);
        } else {
            var headerEl = document.createElement("h2");
            headerEl.textContent = "Current Top 10";
            var topTenOl = document.createElement("ol");
            for(var i = 0; i < highScores.length; i++) {
                var scoreLiEl = document.createElement("li");
                scoreLiEl.textContent = highScores[i].score + " - " + highScores[i].initials;
                topTenOl.appendChild(scoreLiEl);
            }
            questionEl.appendChild(topTenOl);
        }
        highScoreBtn.textContent = "Back to Quiz";
    } else if(!quizRunning) {
        highScoreBtn.textContent = "See High Scores";
        welcomeMssgEl.appendChild(welcomePar);
        welcomeMssgEl.appendChild(startBtn);
        questionEl.innerHTML = "";
        showingTopTen = false;
    }
});

function startTheQuiz() {
    quizRunning = true;
    questionEl.innerHTML = "";
    welcomeMssgEl.innerHTML = "";
    questionEl.appendChild(quizElements[0]);
    questionEl.appendChild(quizElements[1]);
    timeEl.textContent = timeLimit;
    var countdown = setInterval(() => {
        timeLimit--;
        if(timeLimit < 0) {
            clearInterval(countdown);
            timeEl.textContent = "0";
        }
        if(timeLimit > -1) {
            timeEl.textContent = timeLimit;
        }
        if(timeLimit <= 0) {

        }
    }, 1000);
}
