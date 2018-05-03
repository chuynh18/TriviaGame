"use strict";

// for scoring and timing the quiz
var qRight = 0;
var qWrong = 0;
var qUnanswered = 0;
var timeAllowed = 20;  // change this to change how much time the player has
var timeLeft = timeAllowed + 1;
var numCurrentQuestion = 0;

var quizStarted = false;

// first entry in object is the question, 2nd entry is the potential answers in an array of strings,
// and last entry is the index of the correct answer 
var quizQuestions = [
    {q: "Why did Speaker D tell the two Hopeless Situation Warriors to be careful?", a: [" They let their guard down", " The is a big", " Space General was about to ambush them", " They almost missed their chance to escape a day after the fair"], c: 1, s: "https://youtu.be/XziLNeFm1ok?t=730"},
    {q: "What was Space General's response to Gold's insult?", a: [" Batter to death them", " I would be aller strong and big than anyone", " Smelly boy", " Heros is just bad guy"], c: 2, s: "https://youtu.be/XziLNeFm1ok?t=1145"},
    {q: "Why did Ratio Tile not disembark with Gold after the crash landing?", a: [" He is uninterested to politics", " He dislikes Speaker D", " He had a mission to find Space General ", " He had Hopeless Situation Warrior duties to attend to"], c: 0, s: "https://youtu.be/XziLNeFm1ok?t=1447"},
    {q: "Did you heard of the tragedy that reach the man?", a: [" Putting her walks ", " Do not send out the air tank why", " Darth Plagueis the Wise", " Not"], c: 3, s: "https://youtu.be/XziLNeFm1ok?t=2768"},
    {q: "What did Gold realize after Speaker D revealed his true identity?", a: [" Speaker D is the governor of this city", " Hopeless Situation Parliament asked Gold to spy on Speaker D", " The true reason Text How Big and the other Hopeless Situation Elders would not let Gold join Hopeless Situation Parliament", " The is still alive"], c: 0, s: "https://youtu.be/XziLNeFm1ok?t=3851"},
    {q: "Complete the following:  Reaching the man cloth space is the emperor.  He is so strong and big...", a: [" He kill off all hopeless situation in the temples", " He even can use the original dint to create life", " That he must the square who study it the square", " He would be aller strong and big than anyone"], c: 1, s: "https://youtu.be/XziLNeFm1ok?t=2786"},
    {q: "After Gold became Reaching the West of Reaches, he fought and lost to Ratio Tile.  Why?", a: [" The geography that Ratio Tile stood compared Reaching the West of Reaches superior", " Reaching the West of Reaches underrated Ratio Tile's ability", " Reaching the West of Reaches was blinded by the truth of Pure Hero's Ground", " The dark lord distorted Reaching the West of Reaches's heart"], c: 0, s: "https://youtu.be/XziLNeFm1ok?t=7163"},
    {q: "After Reaching the West of Reaches declared that Ratio Tile underrated his ability, what was Ratio Tile's last warning?", a: [" Let me killing your and is not your new empire?", " Everything ends, the peaceful is willing to", " Is", " Bring the world brilliance.  But is not to bring the blackness"], c: 2, s: "https://youtu.be/XziLNeFm1ok?t=7169"},
    {q: "How Speaker D claim to have discovered the location of Space General?", a: [" The knowledge of the dark of the study hopeless, in the fire of water", " He looking am a civilization person", " West", " He beat the intelligence bureau the telephone"], c: 3, s: "https://youtu.be/XziLNeFm1ok?t=2594"},
    {q: "While on Space General's airship, after hearing Speaker D's warning, what did Ratio Tile say to reassure Speaker?", a: [" Don't you ever think to discovers here from I clues", " Like, this time do not calculate in fact", " Can be how like this?  Like this too wide of the mark, like this inequity?", " Mr. speaker, we are for the big"], c: 3, s: "https://youtu.be/XziLNeFm1ok?t=731"}];

var timer;

// starts the timer and calls renderQuiz to start the quiz
var startTimer = function() {
    quizStarted = true;
    timer = setInterval(function() {
        if (timeLeft !== 0 && quizStarted === true) {
            timeLeft--;
            $("#quizHeader").html("Backstroke of the West Quiz - Time left: <strong><font color='red'>" + timeLeft + "</font></strong>");
        }
        else if (quizStarted === true) {
            $("#quizHeader").text("Out of time!");
            checkQuestion();
        };
    }, 1000);
};

// pauses the timer - might be called by other functions
var stopTimer = function() {
    clearInterval(timer);
    quizStarted = false;
};

// used to generate random numbers, which I use to generate arrays, which I use to randomize the order of questions and multiple choice options
var randomNum;
var generateRandom = function(howMany) {
    randomNum = Math.floor(Math.random()*howMany);
};

// generate arrays of arbitrary length, containing random digits starting from 0 and counting upward (but in random order)
// I want one matching the length of my question bank, and one matching the length of however many multiple choice options I have (so, 4)
var randArrQs = [];
var randArrMC = [];
var genRandArr = function(length, destinationArray) {
    while (destinationArray.length < length) {
        generateRandom(length);
        if (destinationArray.indexOf(randomNum) === -1) {
            destinationArray.push(randomNum);
        };
    };
};

// this renders the welcome screen before the quiz (and resets the state of the quiz)
var renderWelcome = function () {
    qRight = 0;
    qWrong = 0;
    qUnanswered = 0;
    numCurrentQuestion = 0;
    timeLeft = timeAllowed + 1;
    $("#quizHeader").text("Backstroke of the West Quiz");
    $("#quizBody").html("<center><button class='button' type='button' id='nextQuestion'>Click to begin</button></center>");
    $("#quizFooter").text("Game time started");
    randArrQs = [];
    genRandArr(quizQuestions.length, randArrQs);
};

var currentQuestion = [];

// this function should take the data contained in this JS file and render the quiz in the html
var renderQuestion = function() {
    $("#quizBody").empty();
    if (numCurrentQuestion === quizQuestions.length) {
        $("#quizBody").html("Quiz over.<br>Questions unanswered: <strong>" + qUnanswered + "</strong><br>Questions correct: <strong id='correctQs'>" + qRight + "</strong><br>Questions incorrect: <strong>" + qWrong + "</strong>");
        $("#quizBody").append("<br><button class='button' type='button' id='clickToRestartQuiz'>Click to restart</button>")
    }
    else {
    startTimer();
    currentQuestion = [quizQuestions[randArrQs[numCurrentQuestion]].q, quizQuestions[randArrQs[numCurrentQuestion]].a, quizQuestions[randArrQs[numCurrentQuestion]].c, quizQuestions[randArrQs[numCurrentQuestion]].s]
    genRandArr(currentQuestion[1].length, randArrMC);
    $("#quizBody").html("<strong>" + currentQuestion[0]) + "</strong><br><br>";
        // warning, warning, disaster zone, warning, disaster zone, evacuate, evacuate
        for (var i = 0; i < currentQuestion[1].length; i++) {
            $("#quizBody").append('<br><input type="radio" name="' + currentQuestion[0] + '" id="' + randArrMC[i] + '" value="' + currentQuestion[1][randArrMC[i]] + '"><label class="labelAnswer" for="' + randArrMC[i] + '">' + currentQuestion[1][randArrMC[i]] + '</label>');
        };
    $("#quizBody").append("<br><em>Source: <a href='" + currentQuestion[3] + "' target='_blank'>" + currentQuestion[3] + "</a></em><br>");
    $("#quizBody").append("<br><button class='button' type='button' id='checkAnswer'>Check answer</button>")
    $("#quizFooter").text("Do not say the reason with me, ratio!  I have seen the true facts of pure hero's ground!");
    };
};

// this function checks the result of the question the user just received
var checkQuestion = function() {
    stopTimer();
    randArrMC = [];
    numCurrentQuestion++;
    $("#quizHeader").html("Backstroke of the West Quiz - Time left: <strong><font color='red'>--</font></strong>");
    if (document.getElementById("0").checked === false &&
    document.getElementById("1").checked === false &&
    document.getElementById("2").checked === false &&
    document.getElementById("3").checked === false) {
        qUnanswered++;
        $("#quizBody").html("You didn't answer the question!<br><button class='button' type='button' id='nextQuestion'>Next Question</button>");
        $("#quizBody").append("<br>Questions unanswered: <strong>" + qUnanswered + "</strong><br>Questions correct: <strong id='correctQs'>" + qRight + "</strong><br>Questions incorrect: <strong>" + qWrong + "</strong><br><img src='assets/images/working.gif' alt='It's (not) working!' />");
        $("#quizFooter").text("R2, let elevator risen, is not a descent");
    }
    else if (document.getElementById(currentQuestion[2]).checked === true) {
        qRight++;
        $("#quizBody").html("Nice job!<br><button class='button' type='button' id='nextQuestion'>Next Question</button>");
        $("#quizBody").append("<br>Questions unanswered: <strong>" + qUnanswered + "</strong><br>Questions correct: <strong id='correctQs'>" + qRight + "</strong><br>Questions incorrect: <strong>" + qWrong + "</strong><br><img src='assets/images/highground.gif' alt='High ground!' />");
        $("#quizFooter").text("The wish power are together with you...");
    }
    else {
        qWrong++;
        if (document.getElementById("0").checked === true) {
            $("#quizBody").html("Nope.<br><span id='u-r-wrong-lol'>Your answer: " + currentQuestion[1][0] + "</span><br><strong id='correctQs'>Correct answer: " + currentQuestion[1][currentQuestion[2]] + "</strong>");
        }
        else if (document.getElementById("1").checked === true) {
            $("#quizBody").html("Nope.<br><span id='u-r-wrong-lol'>Your answer: " + currentQuestion[1][1] + "</span><br><strong id='correctQs'>Correct answer: " + currentQuestion[1][currentQuestion[2]] + "</strong>");
        }
        else if (document.getElementById("2").checked === true) {
            $("#quizBody").html("Nope.<br><span id='u-r-wrong-lol'>Your answer: " + currentQuestion[1][2] + "</span><br><strong id='correctQs'>Correct answer: " + currentQuestion[1][currentQuestion[2]] + "</strong>");
        }
        else {
            $("#quizBody").html("Nope.<br><span id='u-r-wrong-lol'>Your answer: " + currentQuestion[1][3] + "</span><br><strong id='correctQs'>Correct answer: " + currentQuestion[1][currentQuestion[2]] + "</strong>");
        };
        $("#quizBody").append("<br><button class='button' type='button' id='nextQuestion'>Next Question</button>");
        $("#quizBody").append("<br>Questions unanswered: <strong>" + qUnanswered + "</strong><br>Questions correct: <strong id='correctQs'>" + qRight + "</strong><br>Questions incorrect: <strong>" + qWrong + "</strong><br><img src='assets/images/ihateu.gif' alt='I hate you' />");
        $("#quizFooter").text("Do not want");
    }
    timeLeft = timeAllowed + 1;
};

$(document).on("click", "#checkAnswer", function() {
    checkQuestion();
});

$(document).on("click", "#nextQuestion", function() {
    renderQuestion();
});

$(document).on("click", "#clickToRestartQuiz", function() {
    renderWelcome();
});

// ---------------------------------------------------------------------------------

renderWelcome(); // if only this was all the code I had to write to finish the homework