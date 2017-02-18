function startUp(){
	// $("#questionFields").hide("fast");
};
startUp();

var gameRound = {
	answerCorrect: 0,
	answerIncorrect: 0,
	timeExp: 0
}

//  Variable that will hold our setInterval that runs the timer
var intervalId;
// var holds running state - prevents mulitple starts
var running = false;
var time = 30; //seconds to answer questions

var quizContent=[];
var answerChoice;
var questionNumber = 0;
var correctAnswer;
var vMessage;

var interactive = true;

$("#startButton").click(startButton);

function startButton(){
	$("#coverpic").fadeOut();
	$("#caption").fadeOut();
	$("#startButton").fadeOut();
	$("#message").html("");
	gameRound.answerCorrect = 0;
	gameRound.answerIncorrect = 0;
	gameRound.timeExp = 0;
	gameScore();
	setTimeout(unhideQuestions, 1000);
	resetAnswerColors()
	start();
};

function start() {
	interactive = true
	if(running == false){
		intervalId = setInterval(count,1000);
		running = true;
	}
};

function count() {
	time --;
	$("#display").html(time);
	if (time == 0) {
		clearInterval(intervalId);
		running = false;
		roundExpired();
	};
};

function gameScore(){
	$("#gameScore").text("Correct: " + gameRound.answerCorrect + " Incorrect: " + gameRound.answerIncorrect + " Time Expired: " + gameRound.timeExp);
}
gameScore()

function roundExpired() {
	$("#message").html("Time expired!");
	gameRound.timeExp++;
	gameScore()
	resetAnswerColors();
	setTimeout(clearRoundExpired, 2000);
}

function clearRoundExpired() {
	$("#message").html("");
	questionNumber++;
	//if questions are left?
	reset();
	start();
	popQuestion();
}


function reset() {
	clearInterval(intervalId);
	running = false;
	$("#display").html("30");
	time = 30;
};

function unhideQuestions() {
	$("#questionFields").removeClass("hidden");
	$("#answer1").addClass("success")
	popQuestion()
};

function hideQuestions() {
	$("#questionFields").addClass("hidden");
	$("#startButton").fadeIn();
};



var quizContent = [{
	question:"What was the name of the first group of American Astronauts? <br> (Logo pictured here)",
	choice1: "Mercury Seven",
	choice2: "Astronaut formerly known as Prince",
	choice3: "Jupiter Two",
	choice4: "Apollo 13",
	correctChoice: 1,
	image:"assets/images/Mercury_insignia.png",
	comment: "John Glenn was among the Mercury 7."
},
{
	question:"What was the name of the US Spy Plane shot down over the USSR in 1960?",
	choice1: "UB40",
	choice2: "SR71",
	choice3: "U2",
	choice4: "Soyuz",
	correctChoice: 3,
	image:"assets/images/U-2.jpg",
	comment: "Gary Powers piloted the doomed plane for the CIA and was eventually exchanged for a Soviet officer held by the US."
},
{
	question: "Where were the 1960 Summer Olympics held?",
	choice1: "Rome, Italy",
	choice2: "Tokyo, Japan",
	choice3: "Los Angeles, CA",
	choice4: "Athens, Greece",
	correctChoice: 1,
	image:"assets/images/1960_Summer_Olympic.png",
	comment: "Cassius Clay, won the light-heavyweight gold medal in Boxing. Clay later changed his name to Muhammad Ali."
}];



function popQuestion() {
	if (questionNumber < 3) {
		$("#question").html(quizContent[questionNumber].question);
		$("#answer1").html(quizContent[questionNumber].choice1);
		$("#answer2").html(quizContent[questionNumber].choice2);
		$("#answer3").html(quizContent[questionNumber].choice3);
		$("#answer4").html(quizContent[questionNumber].choice4);
		correctAnswer = quizContent[questionNumber].correctChoice;
		$("#answerPic").html("<img class=\"center-block\" src=" + quizContent[questionNumber].image + ">");
	}
	else	{
		hideQuestions();
		$("#message").html("Game Over");
		clearInterval (intervalId);
	}
}

function clearQuestion() {
	$("#question").html("");
	$("#answer1").html("");
	$("#answer2").html("");
	$("#answer3").html("");
	$("#answer4").html("");
	$("#answerPic").html("");
}

$(".choice").click(function(){
	butID = $(this).attr('butId');
	answer();
});

function answer() {
	if (!interactive) { return }
		interactive = false

	if (butID == correctAnswer) {
		gameRound.answerCorrect ++;
		vMessage = "Congrats! ";
		gameScore();
		// $("#gameScore").text("Correct: " + gameRound.answerCorrect + " Incorrect: " + gameRound.answerIncorrect + " Time Expired: " + gameRound.timeExp);
	} else {
		gameRound.answerIncorrect ++;
		vMessage = "Wrongo!  Correct answer is " + correctAnswer;
		gameScore();
		// $("#gameScore").text("Correct: " + gameRound.answerCorrect + " Incorrect: " + gameRound.answerIncorrect + " Time Expired: " + gameRound.timeExp);
	}

	// $(".choice").removeClass("active");
	// $(".choice").addClass("disabled");

	$("#message").html(vMessage);
	setAnswerColors();
	reset();

	questionNumber ++;
	console.log("q: " + questionNumber);
	console.log("L: " + quizContent.length);
	if (questionNumber >= quizContent.length) {
		setTimeout(function() {
			$("#message").html("Game Over!");
			hideQuestions();
			$("#coverpic").show();
			questionNumber = 0;
		}, 2000)
		clearInterval(intervalId);

	}
	else{
		setTimeout(function(){

			popQuestion();
			$("#message").html("");
			resetAnswerColors();
			// $(".choice").removeClass("disabled");
			// $(".choice").addClass("active");
			start(); },2000);
	}

}


function setAnswerColors() {
	console.log(butID);
	console.log(correctAnswer);
	$(".choice").removeClass("warning");
	$(".choice").addClass("danger");

	switch(correctAnswer){
		case 1:
		$("#answer1").removeClass("danger");
		$("#answer1").addClass("success");
break;
		case 2:
		$("#answer2").removeClass("danger");
		$("#answer2").addClass("success");
break;
		case 3:
		$("#answer3").removeClass("danger");
		$("#answer3").addClass("success");
break;
		case 4:
		$("#answer4").removeClass("danger");
		$("#answer4").addClass("success");
break;
	}
}


function resetAnswerColors() {
	$(".choice").removeClass("danger");
	$(".choice").addClass("warning");
}
