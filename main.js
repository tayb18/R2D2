var white = document.querySelector('#white');
var blue = document.querySelector('#blue');
var grey = document.querySelector('#grey');
var black = document.querySelector('#black');
var startButton = document.querySelector('.start');

//add class remove class or toggle class glow 



//THOUGHTS: When the user pushes START 
//I want the game to begin

//I want the computer to randomly select a var from
//the array COLORS, remove the class HIDDEN 
//***THIS LOGIC NEEDS SOME RECONSIDDERING***
//from the glow effect of that specific color for 1 second, 
//and then wait for users response
//if user response === target from the computers PATTERN array, 
//then the computer will repeat, adding a new random color to the 
//PATTERN array
//Otherwise, it will replace the instructions P with a nice try message

//Eventually want to also add a Round Counter in the top right corner.

var colors = [white, blue, grey, black];
var pattern = [];


// var startGame = function(){
	
	var addGlow = function (){
		console.log(event.target);
		if (event.target.id === '#white'){
			this.classList.toggle('glow');
		} else if (event.target.id === '#blue'){
			this.classList.toggle('glow');
		} else if (event.target.id === '#grey'){
			this.classList.toggle('glow');
		} else if (event.target.id === '#black'){
			this.classList.toggle('glow');
		};
	};

	// var removeGlow
	// var glow = function(x){

	// // if eventtarget.class === white 
	// white.classList.add('glow');
	// blue.classList.add('glow');
	// grey.classList.add('glow');
	// black.classList.add('glow');
	// };

// };

var createPattern = function (event){
	var target = event.target;
	
};




 
startButton.addEventListener('click', createPattern);
white.addEventListener('click', addGlow);
blue.addEventListener('click', addGlow);
grey.addEventListener('click', addGlow);
black.addEventListener('click', addGlow);





