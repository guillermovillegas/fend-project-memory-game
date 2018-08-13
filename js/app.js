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
			toggleCard(clickTarget);
			addToggleCard(clickTarget);
	if (toggledCards.length === 2 ) {
		checkForMatch(clickTarget);
		addMove();
	}
	}
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



