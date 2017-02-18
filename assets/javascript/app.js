function startUp(){
	// $("#questionFields").hide("fast");
};
startUp();

//game stats
var gameStats = {
	wins: 0,
	losses: 0
}

$("#tally").text("Wins: " + gameStats.wins + "  Losses: " + gameStats.losses);

var gameRound = {
	answerCorrect: 0,
	answerIncorrect: 0,
	timeExp: 0
}

$("#gameScore").text("Correct: " + gameRound.answerCorrect + " Incorrect: " + gameRound.answerIncorrect + " Time Expired: " + gameRound.timeExp)


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

$("#startButton").click(startButton);

function startButton(){
	$("#coverpic").fadeOut();
	$("#caption").fadeOut();
	$("#startButton").fadeOut();
	setTimeout(unhideQuestions, 1000)
	start();
};



function start() {
	intervalId = setInterval(count,1000);
};


function count() {
	time --;
	$("#display").html(time);
	if (time == 0) {
		clearInterval (intervalId);
		roundExpired();
	};
};


function roundExpired() {
	$("#message").html("Time expired!");
	gameRound.timeExp ++;
	$("#tally").text("Wins: " + gameStats.wins + "  Losses: " + gameStats.losses);
	$("#gameScore").text("Correct: " + gameRound.answerCorrect + " Incorrect: " + gameRound.answerIncorrect + " Time Expired: " + gameRound.timeExp);

	setTimeout(clearRoundExpired, 2000);

}

function clearRoundExpired() {
	$("#message").html("");
	questionNumber ++;
	reset();
	start();
	popQuestion();
}


function reset() {
	clearInterval (intervalId);
	$("#display").html("30");
	time = 30;
};

function unhideQuestions() {
	$("#questionFields").removeClass("hidden");
	popQuestion()
};

function hideQuestions() {
	$("#questionFields").addClass("hidden");
	$("#startButton").fadeIn();
	// $("#coverpic").fadeIn();
	// $("#caption").fadeIn();
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
	if (butID == correctAnswer) {
		gameRound.answerCorrect ++;
		vMessage = "Congrats! ";
		$("#gameScore").text("Correct: " + gameRound.answerCorrect + " Incorrect: " + gameRound.answerIncorrect + " Time Expired: " + gameRound.timeExp);
	} else {
		gameRound.answerIncorrect ++;
		vMessage = "Wrongo! ";
		$("#gameScore").text("Correct: " + gameRound.answerCorrect + " Incorrect: " + gameRound.answerIncorrect + " Time Expired: " + gameRound.timeExp);
	}

	reset();
	$("#message").html(vMessage);
	setAnswerColors();

	setTimeout(function(){
		questionNumber ++;
		popQuestion();
		$("#message").html("");
		resetAnswerColors();
		start(); },2000);

}


function setAnswerColors() {
$(".choice").removeClass("warning");
// $(".choice").addClass("danger");
$("[butId = correctAnswer]").addClass("success");
}

function resetAnswerColors() {
$(".choice").addClass("warning");
}
