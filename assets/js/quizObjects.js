//A function that will reorder the input integers so that answer choices can appear in different slots
var reorderedInts = function(inputInt) {
    var output = [Math.floor(Math.random()*inputInt)];
    do {
        var tempInt = Math.floor(Math.random()*inputInt);
        var count = 0;
        for(var i = 0; i < output.length; i++) {
            if(tempInt === output[i]) {
                count++;
                break;
            }
        }
        if(count === 0) {
            output.push(tempInt);
        }
    } while(output.length < inputInt);
    return output;
}

function properLog(inputInt = 5) {
    var question = "Which of the following expressions would properly log the number " + inputInt + " to the console?";
    var correct = "console.log(" + inputInt + ");";
    var incorrect1 = "consoleLog(" + inputInt + ");";
    var incorrect2 = "console.log[" + inputInt + "];";
    var incorrect3 = "console.Log(" + inputInt + ");";
    var incorrect4 = "consolog(" + inputInt + ");";
    var incorrect5 = "console.log{" + inputInt + "};";
    return [question,[correct,incorrect1,incorrect2,incorrect3,incorrect4,incorrect5]];
}

function notInfinite(start = 0, end = 100) {
    var question = "Which of the following will not produce an infinite loop?";
    var newStart, newEnd;
    if(start < end) {
        newStart = start;
        newEnd = end;
    } else if(end < start) {
        newStart = end;
        newEnd = start;
    } else {
        newStart = start;
        newEnd = start + 100;
    }
    var correct1, correct2, incorrect1, incorrect2, incorrect3, incorrect4, incorrect5;
    correct1 = "for(var i = " + newStart + "; i < " + (newEnd + 1) + "; i++) { console.log(i); }";
    correct2 = "for(var i = " + newEnd + "; i > " + (newStart - 1) + "; i--) { console.log(i); }";
    incorrect1 = "for(var i = " + newStart + "; i < " + (newEnd + 1) + "; i--) { console.log(i); }";
    incorrect2 = "for(var i = " + newEnd + "; i > " + (newStart - 1) + "; i++) { console.log(i); }";
    incorrect3 = "for(var i = " + newStart + "; i < " + (newEnd + 1) + "; ) { console.log(i); }";
    incorrect4 = "for(var i = " + newEnd + "; i >= " + (newStart - 1) + "; i++) { console.log(i); }";
    incorrect5 = "for(var i = " + newEnd + "; i > " + (newStart - 1) + "; ) { console.log(i); }";
    var correct = Math.random() < 0.5 ? correct1 : correct2;
    return [question,[correct,incorrect1,incorrect2,incorrect3,incorrect4,incorrect5]];
}

function invalidVariable() {
    var question = "Which of the following is not a valid variable name in JavaScript?";
    var invalidStarts = ['0','1','2','3','4','5','6','7','8','9','!','-','?','.','@','&'];
    var letters = [];
    for(var i = 65; i < 91; i++) {
        letters.push(String.fromCharCode(i));
        letters.push(String.fromCharCode(i).toLowerCase());
    }
    var vStart1 = "$";
    var vStart2 = "_";
    var vStart3 = letters[Math.floor(Math.random()*52)];
    var vStart4 = invalidStarts[Math.floor(Math.random()*invalidStarts.length)];
    var vStart5 = letters[Math.floor(Math.random()*52)];
    var vStart6 = "var";
    var vStart7 = "const";
    var vStart8 = "function";
    function addChars(charsToAdd) {
        var output = "";
        for(var j = 0; j < charsToAdd; j++) {
            var randValue = Math.random();
            if(randValue < 1/64) {
                output += '$';
            } else if(randValue < 1/32) {
                output += '_';
            } else if(randValue < 3/16) {
                output += Math.floor(Math.random()*10);
            } else {
                output += letters[Math.floor(Math.random()*letters.length)];
            }
        }
        return output;
    }
    vStart1 += addChars(5);
    vStart2 += addChars(5);
    vStart3 += addChars(5);
    vStart4 += addChars(5);
    vStart5 += addChars(5);
    var valids = [vStart1,vStart2,vStart3,vStart5];
    var invalids = [vStart4,vStart6,vStart7,vStart8];
    var options = [invalids[Math.floor(Math.random()*4)], ...valids];
    return [question,options];
}

function QuizQuestion(questionStr,choiceArray) {
    this.questionStr = questionStr; //The question string
    this.choiceArray = choiceArray; //The array of possible answer choices that will appear.  The first choice in the array must be the correct answer
    this.listedChoices = [this.choiceArray[0]];
    do {
        var tempChoice = this.choiceArray[Math.ceil(Math.random()*(this.choiceArray.length - 1))];
        var count = 0;
        for(var i = 0; i < this.listedChoices.length; i++) {
            if(this.listedChoices[i] === tempChoice) {
                count++;
                break;
            }
        }
        if(count === 0) {
            this.listedChoices.push(tempChoice);
        }
    } while(this.listedChoices.length < 4 && this.listedChoices.length < this.choiceArray.length);

    this.scrambledInts = reorderedInts(this.listedChoices.length);
    if(this.scrambledInts[0] === 0) {
        this.correctAnswer = "A";
    } else if(this.scrambledInts[1] === 0) {
        this.correctAnswer = "B";
    } else if(this.scrambledInts[2] === 0) {
        this.correctAnswer = "C";
    } else {
        this.correctAnswer = "D";
    }
    this.answerStrings = [];
    for(var i = 0; i < this.scrambledInts.length; i++) {
        this.answerStrings.push(this.listedChoices[this.scrambledInts[i]]);
    }
}

var spanEl = function(classString) {
    var output = document.createElement("span");
    output.className = classString;
    return output;
}

var liEl = function(classString) {
    var output = document.createElement("li");
    output.className = classString;
    return output;
}

var mcButtonEl = function(classString,buttonOption) {
    var output = document.createElement("button");
    output.className = classString;
    output.setAttribute("buttonOption",buttonOption);
    return output;
}

var q1 = properLog(2 + Math.floor(Math.random()*10));
var q2 = notInfinite(-10 + Math.floor(Math.random()*21), 30 + Math.floor(Math.random()*100));
var q3 = invalidVariable();


var qOb1 = new QuizQuestion(q1[0],q1[1]);
var qOb2 = new QuizQuestion(q2[0],q2[1]);
var qOb3 = new QuizQuestion(q3[0],q3[1]);

var qObjects1 = [qOb1,qOb2,qOb3];

var createQuizElement = function(qObject) {
    var questionPar = document.createElement("p");
    questionPar.className = "question-paragraph";
    questionPar.innerText = qObject.questionStr;
    var buttonDiv = document.createElement("div");
    buttonDiv.className = "multi-choice-buttons";
    var answerOptions = ["A","B","C","D"];
    for(var i = 0; i < qObject.answerStrings.length; i++) {
        var tempButton = mcButtonEl("multi-choice-btn",answerOptions[i]);
        tempButton.textContent = answerOptions[i] + ". " + qObject.answerStrings[i];
        var clickStr = "checkAnswer('" + answerOptions[i] + "')";
        tempButton.setAttribute("onclick",clickStr);
        buttonDiv.appendChild(tempButton);
    }
    return [questionPar,buttonDiv];
}