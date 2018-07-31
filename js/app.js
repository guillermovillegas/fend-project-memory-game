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
	return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`

};

// append cards to the deck node FEND P3 Mike Wales tutorial
function initGame() {
	const deck = document.querySelector('.deck');
	let cardHTML = shuffle(card).map(function(card) {
		return generateCards(card);
	});
	deck.innerHTML = (cardHTML.join(''));
}

initGame();

function createBoard(cards) {
	const cardParent = document.querySelector('.deck');
	cardParent.appendChild(card);
};


// add event listeners to the cards
const allCards = document.querySelectorAll('.card');
const openCards = [];

allCards.forEach(function(card) {
	card.addEventListener('click', function (e) {
		card.classList.add('open', 'show');
	})
});

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



