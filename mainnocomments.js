var white = document.querySelector('#white');
var blue = document.querySelector('#blue');
var grey = document.querySelector('#grey');
var black = document.querySelector('#black');
var startButton = document.querySelector('.start');

var instructions = document.querySelector('.instructions');
var loseAlert = document.querySelector('.loseAlert');

var pattern = [];

var userResponse = [];

var round = 0;
var roundNumber = document.querySelector('#roundNumber');

var soundOne = new Audio('./R2D2-beeps/R2D2-beep1.mp3');
var soundTwo = new Audio('./R2D2-beeps/R2D2-beep2.wav');
var soundThree = new Audio('./R2D2-beeps/R2D2-beep3.mp3');
var soundFour = new Audio('./R2D2-beeps/R2D2-beep4.mp3');


var addGlow = function (square){
	square.classList.add('glow');
};

var removeGlow = function (square){
	square.classList.remove('glow');
};

var clickFlashColor = function (event){
	if (event.target === white) {
		userResponse.push(white);
		soundOne.play();
		console.log(userResponse);
	} else if (event.target === blue) {
		userResponse.push(blue);
		soundTwo.play();
		console.log(userResponse);
	} else if (event.target === grey){
		userResponse.push(grey);
		soundThree.play();
		console.log(userResponse);
	} else if (event.target === black){
		userResponse.push(black);
		soundFour.play();
		console.log(userResponse);
	}
	console.log(userResponse);

	var square = event.target;
	addGlow(square);
	window.setTimeout(removeGlow, 750, square);

	compareArrays();
};

var rTwoFlashColor = function (square) {
	addGlow(square);
	window.setTimeout(removeGlow, 750, square);
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

	for (var i = 0, len = pattern.length; i < len; i++){

		var setAnimationDelay = function (rememberIndex) {
			window.setTimeout(function() {
				console.log(rememberIndex);
				var square = pattern[rememberIndex];
				rTwoFlashColor(square);
			}, rememberIndex * 1000);
		};
		setAnimationDelay(i);
	}
};

var compareArrays = function (){
	// if (pattern.length !== userResponse.length) {
	// 	return;
	// }
	for (var i = 0; i < userResponse.length; i++) {
		if(userResponse[i] !== pattern[i]){
			console.log('LOSE');
			instructions.classList.add('hidden');
			loseAlert.classList.remove('hidden');
			clearPattern();
			clearUserResponse();
			return;
		}
	}
	if (userResponse.length === pattern.length){
		console.log('MATCHED');
		clearUserResponse();		
		createPattern();
		round++;
		roundNumber.innerHTML = "Round: " + round;
		window.setTimeout(animatePatternArray, 1000);
	} 
};

var clearUserResponse = function (){
	userResponse = [];
};

var clearPattern = function (){
	pattern = [];
};

var changeParagraphContent = function(){
	instructions.classList.remove('hidden');
	loseAlert.classList.add('hidden');
};

var resetRoundCounter = function(){
	round = 0;
};

var startGame = function(event){
	clearPattern();
	changeParagraphContent();
	resetRoundCounter();
	round++;
	roundNumber.innerHTML = "Round: " + round;
	createPattern();
	animatePatternArray();
};

startButton.addEventListener('click', startGame);

white.addEventListener('click', clickFlashColor);
blue.addEventListener('click', clickFlashColor);
grey.addEventListener('click', clickFlashColor);
black.addEventListener('click', clickFlashColor);


 


