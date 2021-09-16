//Hard Coded Document Elements
var questionEl = document.querySelector("#question-div");
var aStatusEl = document.querySelector("#answer-status-div");
var timeEl = document.querySelector("#time-display");
var highScoreBtn = document.querySelector("#high-scores");
var welcomeMssgEl = document.querySelector("#welcome-message");
var startQuizBtn = document.querySelector("#startQuiz");

var timeLimit = 120;
var qIndex = 0; //Set the initial question to get the first answer
var allQuestions = createLimitedQuiz(10);
var currentAnswer = allQuestions[qIndex].correctAnswer;
var quizElements = createQuizElement(allQuestions[qIndex]);
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
    qIndex = Math.floor(Math.random()*allQuestions.length);
    currentAnswer = allQuestions[qIndex].correctAnswer;
}

function checkAnswer(inputVal) {
    var resultDiv = document.createElement("div");
    resultDiv.className = "answer-status";
    var rText = "";
    if(inputVal === currentAnswer) {
        rText = "Correct!";
        correctCount++;
        streak++;
        if(streak > 1) {
            rText += " This is going splendidly!";
        }
        score += streak;
    } else {
        rText = "Wrong.";
        if(streak === 0) {
            rText += "  This is not going well.";
        }
        streak = 0;
        if(timeLimit <= 10) {
            timeLimit = 0;
        } else {
            timeLimit -= 10;
        }
    }
    resultDiv.textContent = rText;
    aStatusEl.appendChild(resultDiv);
    setTimeout(function() {
        aStatusEl.innerHTML = "";
    }, 2000);
    qIndex++;
    currentAnswer = allQuestions[qIndex].correctAnswer;
    if(qIndex < allQuestions.length) {
        quizElements = createQuizElement(allQuestions[qIndex]);
        questionEl.innerHTML = "";
        questionEl.appendChild(quizElements[0]);
        questionEl.appendChild(quizElements[1]);
    } else {
        quizElements = createQuizElement(allQuestions[qIndex - 1]);
        questionEl.innerHTML = "";
        questionEl.appendChild(quizElements[0]);
        questionEl.appendChild(quizElements[1]);
    }
    questionCount++;
}

//Welcome Message section
var welcomeDiv = document.createElement("div");
welcomeDiv.id = "#welcome-message";
var welcomePar = document.createElement("p");
welcomePar.textContent = "Welcome!  This quiz will test your understanding of JavaScript fundamentals.  The longer your correct answer streak, the higher score you will receive.  However, incorrect answers will lose you 10 seconds.  When you are ready, press the start button below to begin.  Good luck!";
var startBtn = document.createElement("button");
startBtn.id = "#startQuiz";
startBtn.textContent = "Start";
startBtn.setAttribute("onclick","startTheQuiz()");
welcomeDiv.appendChild(welcomePar);
welcomeDiv.appendChild(startBtn);

//Record Score Section
var gameOverDiv = document.createElement("div");
var gameOverPar = document.createElement("p");
gameOverPar.className = "game-over-p";
var scoreDiv = document.createElement("div");
var scoreForm = document.createElement("form");
var initialLabel = document.createElement("label");
initialLabel.setAttribute("for","initialInput");
initialLabel.textContent = "Initials: ";
var initialInput = document.createElement("input");
initialInput.type = "text";
initialInput.id = "initialInput";
initialInput.name = "initialInput";
var gameOverBtn = document.createElement("button");
gameOverBtn.className = "btn-class-1";
gameOverBtn.textContent = "Submit Score";
gameOverBtn.setAttribute("onclick","updateHighScores()");
scoreForm.appendChild(initialLabel);
scoreForm.appendChild(initialInput);
scoreDiv.appendChild(scoreForm);
scoreDiv.appendChild(gameOverBtn);

//Reset Game Message
var gameResetDiv = document.createElement("div");
gameResetDiv.className = "game-reset";
var gameResetHeader = document.createElement("h2");
gameResetHeader.className = "game-reset-h";
gameResetHeader.textContent = "Thanks for playing!";
var gameResetPar = document.createElement("p");
gameResetPar.className = "game-reset-p";
gameResetPar.textContent = "Click the button below to reset the quiz.";
var gameResetButton = document.createElement("button");
gameResetButton.className = "game-reset-btn";
gameResetButton.setAttribute("onclick","resetQuiz()");
gameResetButton.textContent = "Retake Quiz";
gameResetDiv.appendChild(gameResetHeader);
gameResetDiv.appendChild(gameResetPar);
gameResetDiv.appendChild(gameResetButton);

highScoreBtn.addEventListener("click", function() {
    if(!quizRunning && !showingTopTen) {
        showingTopTen = true;
        welcomeMssgEl.innerHTML = "";
        if(highScores.length === 0) {
            questionEl.innerHTML = "";
            var message = document.createElement("h2");
            message.textContent = "There are no scores yet, so take the stupid quiz already!";
            questionEl.appendChild(message);
        } else {
            questionEl.innerHTML = "";
            var headerEl = document.createElement("h2");
            headerEl.className = "top-ten-header";
            headerEl.textContent = "Current Top 10";
            //questionEl.appendChild(headerEl);
            var topTenOl = document.createElement("ol");
            topTenOl.className = "top-ten-ol";
            for(var i = 0; i < highScores.length; i++) {
                var scoreLiEl = document.createElement("li");
                scoreLiEl.className = "top-ten-li";
                scoreLiEl.textContent = highScores[i].score + " - " + highScores[i].initials;
                topTenOl.appendChild(scoreLiEl);
            }
            var topTenDiv = document.createElement("div");
            topTenDiv.className = "top-ten-div";
            topTenDiv.appendChild(headerEl);
            var clearScoreDiv = document.createElement("div");
            clearScoreDiv.className = "empty-top-ten";
            var clearScores = document.createElement("button");
            clearScores.className = "empty-top-ten";
            clearScores.id = "empty-top-ten";
            clearScores.textContent = "Clear High Scores";
            clearScores.setAttribute("onclick", "resetTopTen()");
            //clearScoreDiv.appendChild(clearScores)
            topTenDiv.appendChild(topTenOl);
            //questionEl.appendChild(topTenOl);
            topTenDiv.appendChild(clearScores);
            //questionEl.appendChild(clearScoreDiv);
            questionEl.appendChild(topTenDiv);
        }
        highScoreBtn.textContent = "Back to Quiz";
    } else if(!quizRunning) {
        highScoreBtn.textContent = "See High Scores";
        welcomeMssgEl.appendChild(welcomePar);
        welcomeMssgEl.appendChild(startBtn);
        questionEl.innerHTML = "";
        showingTopTen = false;
        resetQuiz();
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
        if(timeLimit < 0 || qIndex >= allQuestions.length) {
            clearInterval(countdown);
            timeEl.textContent = "0";
            streak = 0;
        }
        if(timeLimit > -1) {
            timeEl.textContent = timeLimit;
        }
        if(timeLimit <= 0 || qIndex >= allQuestions.length) {
            streak = 0;
            quizRunning = false;
            if(qIndex >= allQuestions.length) {
                score += timeLimit;
            }
            if(highScores.length < 10 || score >= highScores[9].score) {
                var parText = "Congratulations!  Your score of <span class='redFont'>" + score + "</span> is a high score!  Please enter your initials below.";
                gameOverPar.innerHTML = parText;
                gameOverDiv.appendChild(gameOverPar);
                gameOverDiv.appendChild(scoreDiv);
                questionEl.innerHTML = "";
                questionEl.appendChild(gameOverDiv);
            } else {
                questionEl.innerHTML = "";
                questionEl.appendChild(gameResetDiv);
            }
        }
    }, 1000);
}

function updateHighScores() {
    var newHighScoreArray = [];
    var scoreObject = {};
    scoreObject.score = score;
    scoreObject.initials = document.querySelector("input[name='initialInput']").value;
    if(highScores.length === 0) {
        newHighScoreArray.push(scoreObject);
    } else {
        var scoreIndex = -1;
        do {
            scoreIndex++;
        } while(scoreIndex < highScores.length && highScores[scoreIndex].score > scoreObject.score);
        if(scoreIndex < 10) {
            if(scoreIndex === 0) {
                newHighScoreArray.push(scoreObject);
                var nextIndex = 0;
                while(nextIndex < highScores.length) {
                    newHighScoreArray.push(highScores[nextIndex])
                    if(newHighScoreArray.length === 10) {
                        break;
                    }
                    nextIndex++;
                }
            } else {
                for(var i = 0; i < scoreIndex; i++) {
                    newHighScoreArray.push(highScores[i]);
                }
                newHighScoreArray.push(scoreObject);
                while(newHighScoreArray.length < 10 && i < highScores.length) {
                    newHighScoreArray.push(highScores[i]);
                    i++;
                }
            }
        }
    }
    highScores = newHighScoreArray;
    localStorage.setItem("highScores",JSON.stringify(highScores));
    questionEl.innerHTML = "";
    questionEl.appendChild(gameResetDiv);
}

function resetQuiz() {
    timeLimit = 120;
    score = 0;
    qIndex = 0;
    streak = 0;
    allQuestions = createLimitedQuiz(10);
    currentAnswer = allQuestions[qIndex].correctAnswer;
    quizElements = createQuizElement(allQuestions[qIndex]);
    questionEl.innerHTML = "";
    welcomeMssgEl.appendChild(welcomePar);
    welcomeMssgEl.appendChild(startBtn);
}

function resetTopTen() {
    highScores = [];
    localStorage.removeItem("highScores");
    questionEl.innerHTML = "";
    var message = document.createElement("h2");
    message.textContent = "There are no scores yet, so take the stupid quiz already!";
    questionEl.appendChild(message);
}