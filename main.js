//THOUGHTS: When the user pushes START 
//I want the game to begin

//I want the computer to randomly select a var from
//the array COLORS, add the clas glow for a set interval   
//and then wait for users response
//if user response === target from the computers PATTERN array, 
//then the computer will repeat, adding a new random color to the 
//PATTERN array, looping through the array at a set interval and adding/removing the glow class.
//Otherwise, it will replace the instructions P with a nice try message
//Eventually want to also add a Round Counter in the top right corner.
//Eventually I would also like to add dope ass r2d2 beeps to pair with each color.


//assigning my  variables to reference the four different squares, start button, the array of the different color squares, the empty pattern array, and my add glow and remove glow timers making the glow flash for one second.
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




//addGlow is the funtion which will add the glow to the designated square referred to in either the pattern array used by the computer or the click executed by the player
var addGlow = function (square){
	console.log(square);
	square.classList.add('glow');
};

//removeGlow makes removes the glow class from the designated square after one second
var removeGlow = function (square){
	console.log(square);
	square.classList.remove('glow');
};

//???????? does square above refer to the var square definedbelow? Even though it's defined locally within clickFunction?

//clickFlashColor applies the addGlow and removeGlow functions to the square clicked on by the user
var clickFlashColor = function (event){
	console.log('hi', event.target)
	var square = event.target;
	addGlow(square);
	window.setTimeout(removeGlow, 750, square);
};

//rTwoFlashColor will be called within the _________ function, adding and removing the glow functions to the pattern array when it is the computers turn
var rTwoFlashColor = function (square) {
	addGlow(square);
	window.setTimeout(removeGlow, 750, square);
};

//these make the different buttons respond to a click
white.addEventListener('click', clickFlashColor);
blue.addEventListener('click', clickFlashColor);
grey.addEventListener('click', clickFlashColor);
black.addEventListener('click', clickFlashColor);

//createPattern function should create the random array of colors that the game will continue to loop through until the player loses. It will push randomly selected colors into the pattern array when called 
var createPattern = function (event){
	console.log('create pattern');
	if (Math.random() <= .25){
		pattern.push(white);
	} else if (Math.random() <= .50){
		pattern.push(blue);
	} else if (Math.random() <= .75){
		pattern.push(grey);
	} else {
		pattern.push(black);
	}
	console.log("this worked", pattern);

};

// startGame function should get this party started
var startGame = function(event){
	//clicking startButton will run the startGame function.
	//It should first run the createPattern function, adding one random color to the pattern array
	createPattern();

	//????????? WHAT DOES THIS DO AGAIN????
	window.setTimeout(function() {
		var i = 0;
		var square;
		for (i = 0; i < pattern.length; i++){
			square = pattern[i];
			console.log(square);
			rTwoFlashColor(square);
		};
	}, 500);

	//??????????? Empty array to push user click events into. Should I create a new array each round and clear it at the end of the round instead??
	var userResponse = [];

	//this should track the user response by pushing the color they clicked into an empty array userResponse (or should I create a new array to push into each round?)

	//????????Is that a decent parameter name??
	var getUserResponse = function (userResponse){
		//(track user clicks here and push them into userResponse array OR push into a new array)

		if (userResponse === pattern[i]){
			createPattern();
		} else {
			instructions.classList.add('hidden');
			loseAlert.classList.remove('hidden');
		}
	};
};
//this makes the start button respond to a click
startButton.addEventListener('click', startGame);


 







