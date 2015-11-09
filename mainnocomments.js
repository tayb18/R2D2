var white = document.querySelector('#white');
var blue = document.querySelector('#blue');
var grey = document.querySelector('#grey');
var black = document.querySelector('#black');
var startButton = document.querySelector('.start');

var instructions = document.querySelector('.instructions');
var loseAlert = document.querySelector('.loseAlert');

var colors = [white, blue, grey, black];
var pattern = [];

var glowTimerOn = window.setTimeout(addGlow, 1000);
var glowTimerOff = window.setTimeout(removeGlow, 2000);

var userResponse = [];

var round = 0;

//these variables refer to the four different r2 sound bites 
// var soundOne = newAudio('');
// var soundTwo = newAudio('');
// var soundThree = newAudio('');
// var soundFour = newAudio('');
// sound.play();

var addGlow = function (square){
	square.classList.add('glow');
};

var removeGlow = function (square){
	square.classList.remove('glow');
};

var clickFlashColor = function (event){
	var square = event.target;
	addGlow(square);
	window.setTimeout(removeGlow, 750, square);
};

var rTwoFlashColor = function (square) {
	addGlow(square);
	window.setTimeout(removeGlow, 750, square);
};

white.addEventListener('click', clickFlashColor);
blue.addEventListener('click', clickFlashColor);
grey.addEventListener('click', clickFlashColor);
black.addEventListener('click', clickFlashColor);

var roundCounter = function (pattern){
	for (createPattern) {
		round = pattern.length;
	}
};

var createPattern = function (event){
	if (Math.random() <= .25){
		pattern.push(white);
	} else if (Math.random() <= .50){
		pattern.push(blue);
	} else if (Math.random() <= .75){
		pattern.push(grey);
	} else {
		pattern.push(black);
	}
	console.log(pattern);

};

var animatePatternArray = function (){
	window.setTimeout(function() {
		var i = 0;
		var square;
		for (i = 0; i < pattern.length; i++){
			square = pattern[i];
			rTwoFlashColor(square);
		}
	}, 500);
};

var getUserResponse = function (clicks){
	if (event.target.id('white')){
		userResponse.push(white);
		console.log(userResponse);
	} else if (event.target.id('blue')){
		userResponse.push(blue);
		console.log(userResponse);
	} else if (event.target.id('grey')){
		userResponse.push(grey);
		console.log(userResponse);
	} else if (event.target.id('black')){
		userResponse.push(black);
		console.log(userResponse);
	}
	console.log(userResponse);
};

var compareArrays = function (){
	if (userResponse === pattern){
		clearUserResponse();
		createPattern();
		animatePatternArray();
	} else {
		instructions.classList.add('hidden');
		loseAlert.classList.remove('hidden');
		clearPattern();
		clearUserResponse();
	}
};

var clearUserResponse = function (){
	userResponse = [];
};


var clearPattern = function (){
	pattern = [];
};


var startGame = function(event){
	createPattern();
	animatePatternArray();
	getUserResponse();
};

var continueGame = function(){
	compareArrays();
	userResponse = [];
	console.log(userResponse);
};


startButton.addEventListener('click', startGame);

