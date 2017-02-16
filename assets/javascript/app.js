function startUp(){
	// $("#questionFields").hide("fast");
};


startUp();


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
	// $("#hideMe").hide();
	// $("#questionFields").fadeIn(slow);
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
	};
};


function reset() {
	time == 0;
	$("#display").html("30");
};