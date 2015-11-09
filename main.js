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
	var square = event.target;
	addGlow(square);
	window.setTimeout(removeGlow, 750, square);
};

//rTwoFlashColor will be called within the animatePatternArray function, adding and removing the glow functions to the pattern array when it is the computers turn
var rTwoFlashColor = function (square) {
	addGlow(square);
	window.setTimeout(removeGlow, 750, square);
};

//????? CAN I ADD THESE TO THE END OF THE DOCUMENT?
//these make the different buttons respond to a click
white.addEventListener('click', clickFlashColor);
blue.addEventListener('click', clickFlashColor);
grey.addEventListener('click', clickFlashColor);
black.addEventListener('click', clickFlashColor);

//????? THIS ISN'T WORKING. SYNTAX MUST BE INCORRECT
//this adds one to the round number after each round. It gets called in the startGame function
// var roundCounter = function (pattern){
// 	for (createPattern) {
// 		round = pattern.length;
// 	}
// };

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
	window.setTimeout(function() {
		var i = 0;
		var square;
		for (i = 0; i < pattern.length; i++){
			square = pattern[i];
			rTwoFlashColor(square);
		};
	}, 500);
};

//??? THIS ISN'T WORKING YET
//this should track the user response by pushing the color they clicked into a new array each round
var getUserResponse = function (clicks){
	//(track user clicks here and push into a new array)
	if (event.target.classList === white){
		userResponse.push(white);
		console.log(userResponse);
	} else if (event.target.classList === blue){
		userResponse.push(blue);
		console.log(userResponse);
	} else if (event.target.classList === grey){
		userResponse.push(grey);
		console.log(userResponse);
	} else if (event.target.classList === black){
		userResponse.push(black);
		console.log(userResponse);
	};
	console.log(userResponse);
};

//this array compares userResponse and pattern arrays. If the same, it will run createPattern and animate pattern array to continue the game. Otherwise it will show the lose alert and clear the pattern array for the next round.
var compareArrays = function (){
	//compares userResponse array to pattern array
	if (userResponse === pattern){
		clearUserResponse();
		createPattern();
		animatePatternArray();
	} else {
		instructions.classList.add('hidden');
		loseAlert.classList.remove('hidden');
		clearPattern();
		clearUserResponse();
	};
};

//this will empty the userResponse array. Should be called within the compareArrays function within the continueGame array in the if and the else statements to clear the userResponse array after each round. 
var clearUserResponse = function (){
	userResponse = [];
};

//this will empty the pattern array when called. Should be called within an if/else in the function compareArrays which determines whether the player passes a round or not within the continueGame function. If the player does not pass the round and the game is over, this function should be called to clear the pattern array.
var clearPattern = function (){
	pattern = [];
}

//?????????? SHOULD THE CONTINUE GAME FUNCTION BE CALLED WITHIN THE STARTGAME FUNCTION OR SEPERATELY?
// startGame function should get this party started
// It will call the createPattern function to add the first randomly assigned color to the pattern array
// it will then call the getUserResponse function to track the squares the user is clicking
var startGame = function(event){
	//clicking startButton will run the startGame function.
	createPattern();
	animatePatternArray();
	getUserResponse();
};

// continueGame function will  call the compareArrays function to compare the pattern array and the userResponse array. This function says that if userResponse is the same as patterns, it will re-run createPattern and continue on to the next round
//This function will clear the userResponse array at the end of the round so that it is ready for the following round
var continueGame = function(){
	compareArrays();
	userResponse = [];
	console.log(userResponse);
}



//this makes the start button respond to a click
startButton.addEventListener('click', startGame);


 







