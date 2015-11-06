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


var white = document.querySelector('#white');
var blue = document.querySelector('#blue');
var grey = document.querySelector('#grey');
var black = document.querySelector('#black');
var startButton = document.querySelector('.start');

var colors = [white, blue, grey, black];
var pattern = [];


//startGame function should get this partystarted
// var startGame = function(){
// console.log(event.target);
	
	//createPattern function should create the random array of colors that the game will continue to loop through until the player loses
	var createPattern = function (event){
		console.log('create pattern');
		if (Math.random() <= .25){
			pattern.prototype.push(white);
		} else if (Math.random() <= .50){
			pattern.prototype.push(blue);
		} else if (Math.random() <= .75){
			pattern.prototype.push(grey);
		} else {
			pattern.prototype.push(black);
		}
	};

	//addGlow function should add a glow for a set interval as the game loops through the array
	var addGlow = function (event){
		console.log(event.target);

		event.target.classList.toggle('glow');
		event.target.classList.toggle('animated pulse');
//^^^^^ line 47 === everything in lines 50/72. My code is DRY AS FUCK

		// if (event.target.id === 'white'){
		// 	white.classList.toggle('glow');


		// 	// console.log(event.target);

		// } else if (event.target.id === 'blue'){
		// 	blue.classList.toggle('glow');
			
			
		// 	// console.log(event.target);

		// } else if (event.target.id === 'grey'){
		// 	grey.classList.toggle('glow');

			
		// 	// console.log(event.target);

		// } else if (event.target.id === 'black'){
		// 	black.classList.toggle('glow');

		// 	console.log(event.target);
		// };



		// startButton.addEventListener('click', startGame);

	};

	var glowStartInterval = function () {
		window.setInterval(addGlow, 1000);
	};

	var glowStop = function() {
		clearInterval(glowInterval);
	};

	white.addEventListener('click', addGlow);
	blue.addEventListener('click', addGlow);
	grey.addEventListener('click', addGlow);
	black.addEventListener('click', addGlow);






// };


 
//






