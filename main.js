//THOUGHTS: When the user pushes START 
//I want the game to begin by having 
//The computer randomly select an element from
//the array COLORS, add the clas glow for a set interval   
//and then wait for users response
//if user response === target from the computers PATTERN array, 
//then the computer will repeat, adding a new random color to the 
//PATTERN array, looping through the array at a set interval and adding/removing the glow class.
//Otherwise, it will replace the instructions P with a nice try message
//Eventually want to also add a Round Counter in the top right corner.
//Eventually I would also like to add dope ass r2d2 beeps to pair with each color.


//assigning my  variables to reference the four different squares, start button, the instructions and lose alert paragraphs, the array of the different color squares, the empty pattern array, the add glow and remove glow timers making the glow flash for one second, the empty userResponse array and the round counter.
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

//these variables refer to the four different r2 sound bites 
var soundOne = new Audio('./R2D2-beeps/R2D2-beep1.mp3');
var soundTwo = new Audio('./R2D2-beeps/R2D2-beep2.wav');
var soundThree = new Audio('./R2D2-beeps/R2D2-beep3.mp3');
var soundFour = new Audio('./R2D2-beeps/R2D2-beep4.mp3');




//addGlow is the funtion which will add the glow to the designated square referred to in either the pattern array used by the computer or the click executed by the player
var addGlow = function (square){
	square.classList.add('glow');
};

//removeGlow makes removes the glow class from the designated square after one second
var removeGlow = function (square){
	square.classList.remove('glow');
};

//clickFlashColor applies the addGlow and removeGlow functions to the square clicked on by the user
var clickFlashColor = function (event){
	// put user's click into response array
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

	// now that the user's response has been recorded, let's compare!!!
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
		setAnimationDelay(i);
	}
};


//this array compares userResponse and pattern arrays. If the same, it will run createPattern and animate pattern array to continue the game. Otherwise it will show the lose alert and clear the pattern array for the next round.
//if userResponse is correct, it will clear userResponse array for the next round
//if userResponse in incorrect, it will clear both the pattern array and the userResponse array for the next game.
var compareArrays = function (){
	// we need to check and see if the arrays are the same length
	// Guard 
	if (pattern.length !== userResponse.length) {
		return;
	}
	//compares userResponse array to pattern array
	// if (userResponse === pattern){
	// If the person's really good at Simon, how do we keep going??
	//loops and stuff!
	// loop to go through array and check them all
	// assume EVERYONE'S A WINNER <3
	var matched = true;
	// go through the array and check if this is actually the case
	for (var i = 0; i < pattern.length; i++) {
		// checking
		if(userResponse[i] !== pattern[i]){
			// change match to false
			matched = false;
		}
	}
	if (matched){
		console.log('MATCHED');
		clearUserResponse();
		
		createPattern();
		round++;
		roundNumber.innerHTML = "Round: " + round;
		// Animate after a second if you win stuff!!!
		window.setTimeout(animatePatternArray, 1000);
		// don't want this to happen immediately
		// animatePatternArray();
	} else {
		console.log('LOSE');
		instructions.classList.add('hidden');
		loseAlert.classList.remove('hidden');
		clearPattern();
		clearUserResponse();
	}
};

//this will empty the userResponse array. Should be called within the compareArrays function within the continueGame array in the if and the else statements to clear the userResponse array after each round. 
var clearUserResponse = function (){
	userResponse = [];
};

//this will empty the pattern array when called. Should be called within an if/else in the function compareArrays which determines whether the player passes a round or not within the continueGame function. If the player does not pass the round and the game is over, this function should be called to clear the pattern array.
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

//?????????? SHOULD THE CONTINUE GAME FUNCTION BE CALLED WITHIN THE STARTGAME FUNCTION OR SEPERATELY?
// startGame function should get this party started
// It will call the createPattern function to add the first randomly assigned color to the pattern array
// it will then call the getUserResponse function to track the squares the user is clicking
var startGame = function(event){
	//clicking startButton will run the startGame function.
	changeParagraphContent();
	resetRoundCounter();
	round++;
	roundNumber.innerHTML = "Round: " + round;
	createPattern();
	animatePatternArray();
};

//this makes the start button respond to a click
startButton.addEventListener('click', startGame);

//????? CAN I ADD THESE TO THE END OF THE DOCUMENT?
//these make the different buttons respond to a click
white.addEventListener('click', clickFlashColor);
blue.addEventListener('click', clickFlashColor);
grey.addEventListener('click', clickFlashColor);
black.addEventListener('click', clickFlashColor);


 







