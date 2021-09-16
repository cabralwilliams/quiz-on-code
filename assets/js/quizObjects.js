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

var qObject4 = {
    question: "Which of these functions returns a boolean data type?",
    choices: ["window.confirm()","window.alert()","window.prompt()","window.setInterval()","window.setTimeout()"]
}

function returnedIntValue(startVal = 8, criticalVal = 15, iterations = 15) {
    var question = "var myNumber = " + startVal + ";";
    question += "\nfor(var i = 0; i < " + iterations + "; i++)";
    question += "\n\tmyNumber++;";
    question += "\n\tif(myNumber > " + criticalVal + ") {";
    question += "\n\t\tbreak;";
    question += "\n\t}";
    question += "\n}";
    question += "\nconsole.log(myNumber);";
    question += "\nWhat value is logged to the console in the above example?";
    var correct;
    if(startVal >= criticalVal) {
        correct = startVal + 1;
    } else if(startVal + iterations < criticalVal) {
        correct = startVal + iterations;
    } else if(startVal + iterations === criticalVal) {
        correct = criticalVal;
    } else {
        correct = criticalVal + 1;
    }
    var incorrectPossibilities = [startVal,iterations,criticalVal,criticalVal + 1,correct - 1, correct + 1,correct + 2];
    var options = [correct];
    do {
        var temp = incorrectPossibilities[Math.floor(Math.random()*incorrectPossibilities.length)];
        var count = 0;
        for(var i = 0; i < options.length; i++) {
            if(temp === options[i]) {
                count++;
                break;
            }
        }
        if(count === 0) {
            options.push(temp);
        }
    } while(options.length < 4);
    return [question,options];
}

function arrayItem(arrayLength = 10) {
    var arrayPos = Math.floor(Math.random()*arrayLength);
    var arrayNumbers = [];
    var positionNumberMatch = false;
    do {
        var tempNumber = Math.floor(Math.random()*arrayLength);
        var count = 0;
        for(var i = 0; i < arrayNumbers.length; i++) {
            if(arrayNumbers[i] === tempNumber) {
                count++;
                break;
            }
        }
        if(count === 0) {
            arrayNumbers.push(tempNumber);
        }
    } while(arrayNumbers.length < arrayLength);
    if(arrayPos === arrayNumbers[arrayPos]) {
        positionNumberMatch = true;
        do {
            arrayNumbers = [];
            do {
                var tempNumber = Math.floor(Math.random()*arrayLength);
                var count = 0;
                for(var i = 0; i < arrayNumbers.length; i++) {
                    if(arrayNumbers[i] === tempNumber) {
                        count++;
                        break;
                    }
                }
                if(count === 0) {
                    arrayNumbers.push(tempNumber);
                }
            } while(arrayNumbers.length < arrayLength);
            if(arrayNumbers[arrayPos] !== arrayPos) {
                positionNumberMatch = false;
            }
        } while(positionNumberMatch);
    }
    var question = "var nArr = [" + arrayNumbers + "];";
    var falsePosition = arrayNumbers.indexOf(arrayPos);
    question += "\nGiven nArr above, which of the following would properly log the number " + arrayNumbers[arrayPos] + " to the console?";
    var correct = "console.log(nArr[" + arrayPos + "]);";
    var incorrect1 = "console.log(nArr[" + (arrayPos + 1) + "]);";
    var incorrect2 = "console.log(nArr['" + arrayPos + "']);";
    var incorrect3 = "console.log(nArr['" + (arrayPos + 1) + "']);";
    var choices = [correct,incorrect1,incorrect2,incorrect3];
    if(falsePosition !== arrayPos + 1) {
        choices.push("console.log(nArr[" + falsePosition + "]);")
    }
    return [question,choices];
}

function arrayProduct(arrayLength = 10) {
    var arrayIndex1 = Math.floor(Math.random()*arrayLength);
    var arrayIndex2 = Math.floor(Math.random()*arrayLength);
    while(arrayIndex2 === arrayIndex1) {
        arrayIndex2 = Math.floor(Math.random()*arrayLength);
    }
    var arrayNumbers = [];
    do {
        var tempNumber = Math.floor(Math.random()*arrayLength);
        var count = 0;
        for(var i = 0; i < arrayNumbers.length; i++) {
            if(arrayNumbers[i] === tempNumber) {
                count++;
                break;
            }
        }
        if(count === 0) {
            arrayNumbers.push(tempNumber);
        }
    } while(arrayNumbers.length < arrayLength);
    var question = "var nArr = [" + arrayNumbers + "];";
    question += "\nvar prod = nArr[" + arrayIndex1 + "]*nArr[" + arrayIndex2 + "];";
    question += "\nWhat is the value of prod in the code above?";
    var correct = arrayNumbers[arrayIndex1]*arrayNumbers[arrayIndex2];
    var options = [correct];
    do {
        var index1 = Math.floor(Math.random()*arrayLength);
        var index2 = Math.floor(Math.random()*arrayLength);
        var product = arrayNumbers[index1]*arrayNumbers[index2];
        var count = 0;
        for(var i = 0; i < options.length; i++) {
            if(product === options[i]) {
                count++;
                break;
            }
        }
        if(count === 0) {
            options.push(product);
        }
    } while(options.length < 5);
    return [question,options];
}

function arrayProduct2(arrayLength = 10) {
    var arrayIndex1 = Math.floor(Math.random()*arrayLength);
    var arrayIndex2 = Math.floor(Math.random()*arrayLength);
    while(arrayIndex2 === arrayIndex1) {
        arrayIndex2 = Math.floor(Math.random()*arrayLength);
    }
    var arrayNumbers = [];
    do {
        var tempNumber = Math.floor(Math.random()*arrayLength);
        var count = 0;
        for(var i = 0; i < arrayNumbers.length; i++) {
            if(arrayNumbers[i] === tempNumber) {
                count++;
                break;
            }
        }
        if(count === 0) {
            arrayNumbers.push(tempNumber);
        }
    } while(arrayNumbers.length < arrayLength);
    var question = "var nArr = [" + arrayNumbers + "];";
    question += "\nvar prod = nArr[nArr[" + arrayIndex1 + "]]*nArr[nArr[" + arrayIndex2 + "]];";
    question += "\nWhat is the value of prod in the code above?";
    var correct = arrayNumbers[arrayNumbers[arrayIndex1]]*arrayNumbers[arrayNumbers[arrayIndex2]];
    var options = [correct];
    do {
        var index1 = Math.floor(Math.random()*arrayLength);
        var index2 = Math.floor(Math.random()*arrayLength);
        var product = arrayNumbers[index1]*arrayNumbers[index2];
        var count = 0;
        for(var i = 0; i < options.length; i++) {
            if(product === options[i]) {
                count++;
                break;
            }
        }
        if(count === 0) {
            options.push(product);
        }
    } while(options.length < 5);
    return [question,options];
}

function returnsNumberType(int1 = 5 + Math.floor(Math.random()*11), condition = Math.floor(Math.random()*3)) {
    var int2 = 5 + Math.floor(Math.random()*11);
    while(int2 === int1) {
        int2 = 5 + Math.floor(Math.random()*11);
    }
    var constructDeclaration = function(val1,val2) {
        var output = "var myInteger = " + val1;
        if(val2 < 0) {
            output += " -";
        } else {
            output += " +";
        }
        output += " Math.floor(Math.random()*" + Math.abs(val2) + ");";
        return output;
    }
    var alwaysPositive = [constructDeclaration(int1,int2),constructDeclaration(int2,int1)];
    var alwaysNegative = [constructDeclaration(-int1,-int2),constructDeclaration(-int2,-int1)];
    var bothPosAndNeg = [];
    if(int1 > int2) {
        alwaysPositive.push(constructDeclaration(int1,-int2));
        alwaysNegative.push(constructDeclaration(-int1,int2));
        bothPosAndNeg.push(constructDeclaration(int2,-(int1 + 1)));
        bothPosAndNeg.push(constructDeclaration(-int2,int1 + 1));
    } else {
        alwaysPositive.push(constructDeclaration(int2,-int1));
        alwaysNegative.push(constructDeclaration(-int2,int1));
        bothPosAndNeg.push(constructDeclaration(int1,-(int2 + 1)));
        bothPosAndNeg.push(constructDeclaration(-int1,int2 + 1));
    }
    var question = "In which of the following declarations below ";
    var correct, options;
    if(condition === 0) {
        //Always positive
        question += "will myInteger always be positive?";
        correct = alwaysPositive[Math.floor(Math.random()*alwaysPositive.length)];
        options = [correct, ...alwaysNegative, ...bothPosAndNeg];
    } else if(condition === 1) {
        //Always negative
        question += "will myInteger always be negative?";
        correct = alwaysNegative[Math.floor(Math.random()*alwaysNegative.length)];
        options = [correct, ...alwaysPositive, ...bothPosAndNeg];
    } else {
        //Could be either
        question += "can myInteger be either positive or negative?";
        correct = bothPosAndNeg[Math.floor(Math.random()*bothPosAndNeg.length)];
        options = [correct, ...alwaysPositive, ...alwaysNegative];
    }
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
//var q5 = returnedIntValue(5 + Math.floor(Math.random()*11),10 + Math.floor(Math.random()*15),8 + Math.floor(Math.random()*15));
var q5 = arrayItem(8 + Math.floor(Math.random()*9));
var q6 = arrayProduct(8 + Math.floor(Math.random()*9));
var q7 = arrayProduct2(8 + Math.floor(Math.random()*9));
var q8 = returnsNumberType();

var qOb1 = new QuizQuestion(q1[0],q1[1]);
var qOb2 = new QuizQuestion(q2[0],q2[1]);
var qOb3 = new QuizQuestion(q3[0],q3[1]);
var qOb4 = new QuizQuestion(qObject4.question,qObject4.choices);
var qOb5 = new QuizQuestion(q5[0],q5[1]);
var qOb6 = new QuizQuestion(q6[0],q6[1]);
var qOb7 = new QuizQuestion(q7[0],q7[1]);
var qOb8 = new QuizQuestion(q8[0],q8[1]);

var qObjects1 = [qOb1,qOb2,qOb3,qOb4,qOb5,qOb6,qOb7,qOb8];

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

var createLimitedQuiz = function(quizQs = 10) {
    var quizObjects = [];
    var totalQs = 8;
    do {
        var qNumb = Math.floor(Math.random()*totalQs);
        var tempQOb, temp;
        switch(qNumb) {
            case 0:
                temp = properLog(2 + Math.floor(Math.random()*10));
                break;
            case 1:
                temp = notInfinite(-10 + Math.floor(Math.random()*21), 30 + Math.floor(Math.random()*100));
                break;
            case 2:
                temp = invalidVariable();
                break;
            case 3:
                temp = qObject4;
                break;
            case 4:
                temp = arrayItem(8 + Math.floor(Math.random()*9));
                break;
            case 5:
                temp = arrayProduct(8 + Math.floor(Math.random()*9));
                break;
            case 6:
                temp = arrayProduct2(8 + Math.floor(Math.random()*9));
                break;
            case 7:
                temp = returnsNumberType();
                break;
            default:
                temp = properLog(2 + Math.floor(Math.random()*10));
                break;
        }
        if(qNumb === 3) {
            tempQOb = new QuizQuestion(temp.question,temp.choices);
        } else {
            tempQOb = new QuizQuestion(temp[0],temp[1]);
        }
        quizObjects.push(tempQOb);
    } while(quizObjects.length < quizQs);
    return quizObjects;
}