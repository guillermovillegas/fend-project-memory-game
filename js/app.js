// programatically create a card FEND P3 Mike Wales tutorial
const card = ['fa-diamond', 'fa-diamond',
						 'fa-paper-plane-o', 'fa-paper-plane-o',
						 'fa-anchor', 'fa-anchor',
						 'fa-bolt', 'fa-bolt',
						 'fa-cube', 'fa-cube',
						 'fa-leaf', 'fa-leaf',
						 'fa-bicycle','fa-bicycle',
						 'fa-bomb', 'fa-bomb',
						 ];

function generateCards(card) {
	return `<li class="card" id="${card}"><i class="fa ${card}"></i></li>`
};


//Global varibales
const deck = document.querySelector('.deck');
let moves = 0;
let clockOff = true;
let time = 0;
let clockId;
let matched = 0;
const TOTAL_PAIRS = 8;

// append shuffled cards to the deck node FEND P3 Mike Wales tutorial
function initGame() {
	let cardHTML = shuffle(card).map(card => {
		return generateCards(`${card}`);
	});
	deck.innerHTML = (cardHTML.join(''));
}
initGame();

/*
Used Matthew Crawfords FEND resources to assit in completing the logic below
*/

// add event listeners to the cards
const allCards = document.querySelectorAll('.card');
let toggledCards = [];

deck.addEventListener('click', event => {
	const clickTarget = event.target;
	if (isClickValid(clickTarget)) {
		if(clockOff) {
			startClock();
			clockOff = false;
		}
			toggleCard(clickTarget);
			addToggleCard(clickTarget);
	if (toggledCards.length === 2 ) {
		checkForMatch(clickTarget);
		addMove();
		checkScore();
	}
	}
	if (matched === TOTAL_PAIRS) {
	gameOver();
}
});

// modal cancel functionality
document.querySelector('.modal_cancel').addEventListener('click', () => {
	toggleModal();
});

//modal replay functionality
document.querySelector('.modal_replay').addEventListener('click', () => {
	console.log('replay');
});

//restart button functionality
document.querySelector('.restart').addEventListener('click', resetGame);

//modal replay button functionality
document.querySelector('.modal_replay').addEventListener('click', replayGame);


function toggleCard(card) {
	card.classList.toggle('open');
	card.classList.toggle('show');
}

//adds card to an array to be evaluated for match
function addToggleCard(clickTarget) {
	toggledCards.push(clickTarget);
	console.log(toggledCards);
}

// check math between two cards logic
function checkForMatch() {
	if (
		toggledCards[0].firstElementChild.className == 
		toggledCards[1].firstElementChild.className
		) {
		toggledCards[0].classList.toggle('match');
		toggledCards[1].classList.toggle('match');
		toggledCards = [];
		matched++;
	} else {
		setTimeout(() => {
			toggleCard(toggledCards[0]);
			toggleCard(toggledCards[1]);
			toggledCards = [];
		}, 700);
	}
}

// ensures that the same card cannot be clicked 2x 
function isClickValid(clickTarget) {
	return (
		clickTarget.classList.contains('card') && 
		!clickTarget.classList.contains('match') &&
		toggledCards.length < 2 &&
		!toggledCards.includes(clickTarget)
		);
}

// move counter
function addMove() {
	moves++;
	const movesText = document.querySelector('.moves')
	movesText.innerHTML = moves
}

// determines # of stars
function checkScore() {
	if (moves === 16 || moves === 24) {
		hideStar();
	} 
}

// removes stars based on score
function hideStar() {
	const starList = document.querySelectorAll('.stars li');
	for (star of starList) {
		if (star.style.display != 'none') {
			star.style.display = 'none';
			break;
		}
	}
}

function startClock() {
	clockId = setInterval(() => {
		time++;
		displayTime();
	}, 1000);
}

function stopClock () {
	clearInterval(clockId);
}

//shows time in MM::SS
function displayTime() {
	const minutes = Math.floor(time / 60);
	const seconds = time % 60;
	let clock = document.querySelector('.clock');
	console.log(clock);
	clock.innerHTML = time;
	if (seconds < 10) {
		clock.innerHTML = `${minutes}:0${seconds}`;
	} else {
	clock.innerHTML = `${minutes}:${seconds}`;
	}
}

// covers screen with modal when victory is achieved
function toggleModal() {
	const modal = document.querySelector('.modal_background');
	modal.classList.toggle('hide');
}

function writeModalStats() {
	const timeStat = document.querySelector('.modal_time')
	const clockTime = document.querySelector('.clock').innerHTML;
	const moveStat = document.querySelector('.modal_moves');
	const starsStat = document.querySelector('.modal_stars');
	const stars = getStars();

	timeStat.innerHTML = `Time = ${clockTime}`;
	moveStat.innerHTML = `Moves = ${moves}`;
	starsStat.innerHTML = `Stars = ${stars}`;
}

// counts # of stars to write into modal
function getStars() {
	stars = document.querySelectorAll('.stars li');
	starCount = 0;
	for (star of stars) {
		if (star.style.display !== 'none') {
			starCount++;
		}
	}
	console.log(starCount);
	return starCount;
}

function resetGame() {
	resetClockAndTime();
	resetMoves();
	resetStars();
	initGame();
}

function resetClockAndTime() {
	stopClock();
	clockOff = true;
	time = 0;
	displayTime();
}

function resetMoves() {
	moves = 0;
	document.querySelector('.moves').innerHTML = moves;
}

function resetStars() {
	stars = 0;
	const starList = document.querySelectorAll('.stars li')
	for (star of starList) {
		star.style.display = 'inline';
	}
}

function gameOver() {
	stopClock();
	writeModalStats();
	toggleModal();
	matched = 0;
}

function replayGame() {
	resetGame();
	toggleModal();
	matched = 0;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};



