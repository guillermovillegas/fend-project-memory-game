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

const deck = document.querySelector('.deck');
let moves = 0;
let clockOff = true;
let time = 0;
let clockId;

// append shuffled cards to the deck node FEND P3 Mike Wales tutorial
function initGame() {
	let cardHTML = shuffle(card).map(card => {
		return generateCards(`${card}`);
	});
	deck.innerHTML = (cardHTML.join(''));
}
initGame();

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
});

document.querySelector('.modal_cancel').addEventListener('click', () => {
	toggleModal();
});

document.querySelector('.modal_replay').addEventListener('click', () => {
	console.log('replay');
});

function toggleCard(card) {
	card.classList.toggle('open');
	card.classList.toggle('show');
}

function addToggleCard(clickTarget) {
	toggledCards.push(clickTarget);
	console.log(toggledCards);
}

function checkForMatch() {
	if (
		toggledCards[0].firstElementChild.className == 
		toggledCards[1].firstElementChild.className
		) {
		toggledCards[0].classList.toggle('match');
		toggledCards[1].classList.toggle('match');
		toggledCards = [];
	} else {
		setTimeout(() => {
			toggleCard(toggledCards[0]);
			toggleCard(toggledCards[1]);
			toggledCards = [];
		}, 1000);
	}
}

function isClickValid(clickTarget) {
	return (
		clickTarget.classList.contains('card') && 
		!clickTarget.classList.contains('match') &&
		toggledCards.length < 2 &&
		!toggledCards.includes(clickTarget)
		);
}

function addMove() {
	moves++;
	const movesText = document.querySelector('.moves')
	movesText.innerHTML = moves
}

function checkScore() {
	if (moves === 16 || moves === 24) {
		hideStar();
	} 
}

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

function toggleModal() {
	const modal = document.querySelector('.modal_background');
	modal.classList.toggle('hide');
}
toggleModal();
toggleModal();

function writeModalStats() {
	const timeStat = document.querySelector('.modal_time')
	const clockTime = document.querySelector('.clock').innerHTML;
	const moveStat = document.querySelector('modal_moves');
	const starsStat = document.querySelector('modal_stars');
	const stars = getStars();

	timeStat.innerHTML = `Time = ${clockTime}`;
	moveStat.innerHTML = `Moves = ${moves}`;
	starsStat.innerHTML = `Stars = ${stars}`;
}

function getStars() {
	stars = document.querySelector('.stars li');
	starCount = 0;
	for (star of stars) {
		if (star.style.display !== 'none') {
			starCount++;
		}
	}
	console.log(starCount);
	return starCount;
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



