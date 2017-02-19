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
	$("#message").html("Time expired! Correct answer is " + correctAnswer);
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
},
{
	question: "Fast food is never the same with the 1960 founding of this iconic restaurant.",
	choice1: "Burger King",
	choice2: "McDonalds",
	choice3: "Pizza Hut",
	choice4: "Domino's",
	correctChoice: 4,
	image:"assets/images/Domino.png",
	comment: "Well, it gets there fast."
},
{
	question: "Pop Music was in the valley between Elvis, who was discharged from the army in 1960, and before the Beatles came to America. These brothers filled the airwaves with light pop.",
	choice1: "The Righteous Brothers",
	choice2: "The Everly Brothers",
	choice3: "The Chambers Brothers",
	choice4: "The Smothers Brothers",
	correctChoice: 2,
	image:"assets/images/Phil_Everly.jpg",
	comment: "The Beatles eventually covered some of the Everly's songs."
},
{
	question: "John F. Kennedy was elected President over rival Richard Milhous Nixon. Who was Nixon's VP running mate?",
	choice1: "Estes Kefauver",
	choice2: "Adlai Stevenson",
	choice3: "Robert Goddard",
	choice4: "Henry Cabot Lodge",
	correctChoice: 4,
	image:"assets/images/Cabot_Lodge.jpg",
	comment: "Yes, Nixon's middle named served as the inspiration for The Simpson's character."
},
{
	question: "Besides piloting an X15 rocket plane, Neil Armstrong is also notable for?",
	choice1: "One small step for man...",
	choice2: "There are those who look at things the way they are, and ask why... I dream of things that never were, and ask why not?",
	choice3: "I have a dream...",
	choice4: "Ask not what your country can do for you...",
	correctChoice: 1,
	image:"assets/images/moonprint.jpg",
	comment: "Yes, Nixon's middle named served as the inspiration for The Simpson's character."

}];

console.log("qc " + quizContent.length);

function popQuestion() {
	if (questionNumber <= quizContent.length) {
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
		} else {
		gameRound.answerIncorrect ++;
		vMessage = "Wrongo!  Correct answer is " + correctAnswer;
		gameScore();
	}

	$("#message").html(vMessage);
	setAnswerColors();
	reset();

	questionNumber ++;
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
			start(); },2000);
	}
}


function setAnswerColors() {
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
