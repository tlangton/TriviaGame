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

var time = 30;

$("#startButton").click(startButton);

function startButton(){
	$("#coverpic").fadeOut();
	$("#caption").fadeOut();
	$("#startButton").fadeOut();
	// $("#questionFields").removeClass("hidden");
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
		gameWinLoss();
	};
};


function gameWinLoss() {
	$("#gameOver").html("Time ran out!");
	gameRound.timeExp ++;
	$("#tally").text("Wins: " + gameStats.wins + "  Losses: " + gameStats.losses + "  Time Expired: " + gameStats.timeExp);
	$("#gameScore").text("Correct: " + gameRound.answerCorrect + " Incorrect: " + gameRound.answerIncorrect + " Time Expired: " + gameRound.timeExp)

	setTimeout(clearGameWinLoss, 2000);

}

function clearGameWinLoss() {
	$("#gameOver").html("");
	reset();
	start();
}


function reset() {
	$("#display").html("30");
	time = 30;
};

function unhideQuestions() {
	$("#questionFields").removeClass("hidden");
	popQuestion()
};




var question1= ["What was the name of the first group of American Astronauts? <br> (Logo pictured here)", "Mercury Seven", "Astronaut formerly known as Prince","Jupiter Two","Apollo 13",1,"assets/images/Mercury_insignia.png"]

function popQuestion() {
$("#question").html(question1[0]);
$("#answer1").html(question1[1]);
$("#answer2").html(question1[2]);
$("#answer3").html(question1[3]);
$("#answer4").html(question1[4]);
// $("#answerPic").text(question1[6]);
$("#answerPic").html("<img class=\"center-block\" src=" + question1[6] + ">");
}

$("#answer1").click(a1);

function a1() {
console.log("one")
};
