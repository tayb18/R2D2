//THOUGHTS: When the user pushes START 
//I want the game to begin by having the computer randomly select an element (either var white, blue, grey, black), add the clas glow for a set interval   
//and then wait for users response
//if user response === target from the computers PATTERN array, 
//then the computer will repeat, adding a new random color to the 
//PATTERN array, looping through the array at a set interval and adding/removing the glow class.
//Otherwise, it will replace the instructions P with a nice try message
//Eventually want to also add a Round Counter in the top right corner.
//Eventually I would also like to add dope ass r2d2 beeps to pair with each color.

//assigning my  variables to reference the four different squares, start button, the instructions and lose alert paragraphs, the array of the different colored squares, the empty pattern array, the add glow and remove glow timers making the glow flash for one second, the empty userResponse array and the round counter and the roundNumber variables, and variables for each ofo my four sound bites
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




//addGlow is the funtion which will add the glow to the designated square referred to in either the pattern array used by the computer or the click executed by the player
//This array gets called in the clickFlashColor function and the rTwoFlashColor function (called within the animatePattern array)
var addGlow = function (square){
	square.classList.add('glow');
};

//removeGlow removes the glow class from the designated square after one second
//This function is also called in the clickFlashColor function and the rTwoFlashColor function (called within the animatePattern array)
var removeGlow = function (square){
	square.classList.remove('glow');
};

//clickFlashColor applies the addGlow and removeGlow functions to the square clicked on by the user
//the if/else statement also tracks the userResponse by pushing their clicks into the array in the order that they are clicked. 
var clickFlashColor = function (event){
	// puts user's click into userResponse array and adds the sound effect depending on which colored square is click
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

	//this says that any time a square is clicked, the add glow function is called, and then the setTimeout applies the removeGlow function after .75 seconds
	var square = event.target;
	addGlow(square);
	window.setTimeout(removeGlow, 750, square);

	// now that the user's response has been recorded, let's compare!!!
	// the compare arrays function tests if content in userResponse array === content in pattern array
	compareArrays();
};

//rTwoFlashColor will be called within the animatePatternArray function, adding and removing the glow functions to the pattern array when it is the computers turn
var rTwoFlashColor = function (square) {
	addGlow(square);
	window.setTimeout(removeGlow, 750, square);
};

//createPattern function should create the random array of colors that the game will continue to loop through until the player loses. It will push randomly selected colors into the pattern array when called 
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

//this will cycle through the patterns array and flash each item in order for half a second
var animatePatternArray = function (){

	for (var i = 0, len = pattern.length; i < len; i++){

		// Passing in the index of the pattern array that we're currently using so that we have a reference to it when setAnimationDelay is called. SCOPE MAN. Otherwise i is whatever the final value of i in the loop was forever :(
		var setAnimationDelay = function (rememberIndex) {
			window.setTimeout(function() {
				console.log(rememberIndex);
				var square = pattern[rememberIndex];
				rTwoFlashColor(square);
			}, rememberIndex * 1000);
		};
		//this calls the setAnimationDelay function with the parameter of i (the index of the pattern array)
		setAnimationDelay(i);
	}
};


//this array compares userResponse and pattern arrays. If the same, it will run createPattern and animate pattern array to continue the game. Otherwise it will show the lose alert and clear the pattern array for the next round.
//if userResponse is correct, it will clear userResponse array for the next round
//if userResponse is incorrect, it will clear both the pattern array and the userResponse array for the next game.
var compareArrays = function (){
	for (var i = 0; i < userResponse.length; i++) {
		if(userResponse[i] !== pattern[i]){
			console.log(JSON.stringify(userResponse[i].id) + "|" + JSON.stringify(pattern[i].id));
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

//this will empty the userResponse array. Should be called within the compareArrays function within the continueGame array in the if and the else statements to clear the userResponse array after each round. 
var clearUserResponse = function (){
	userResponse = [];
};

//this will empty the pattern array when called. Should be called within an if/else in the function compareArrays which determines whether the player passes a round or not within the continueGame function.If the player does not pass the round and the game is over, this function should be called to clear the pattern array.
var clearPattern = function (){
	pattern = [];
};

//this function is called when start button is clicked. It makes sure that the LOSE text resets to the original instructiont est when a new game begins
var changeParagraphContent = function(){
	instructions.classList.remove('hidden');
	loseAlert.classList.add('hidden');
};


// this function is called at the beginning of each game (when start is clicked) int he startGame 		function 
var resetRoundCounter = function(){
	round = 0;
};

// startGame function should get this party started
// It will first clear the pattern array so we are starting with 0 elements in the array
// It will run the changeParagraphContent function to ensure the instruction paragraph is present at the 	start of the game
// It will reset the roundCounter, add one to round and change the h2 text so we start the game at round 1
// call the createPattern function to add the first randomly assigned color to the pattern array
// it will then call the animatePatternArray function to run through the array applying and removing the glow effect at a set interval
var startGame = function(event){
	//clicking startButton will run the startGame function.
	clearPattern();
	changeParagraphContent();
	resetRoundCounter();
	round++;
	roundNumber.innerHTML = "Round: " + round;
	createPattern();
	animatePatternArray();
};

//this makes the start button respond to a click
startButton.addEventListener('click', startGame);

//these make the different buttons respond to a click
white.addEventListener('click', clickFlashColor);
blue.addEventListener('click', clickFlashColor);
grey.addEventListener('click', clickFlashColor);
black.addEventListener('click', clickFlashColor);