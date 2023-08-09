document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');
    const newGameBtn = document.getElementById('newGameBtn');
    const hitBtn = document.getElementById('hitBtn');
    const standBtn = document.getElementById('standBtn');
    const overlay = document.getElementById('overlay');
    const winsTracker = document.getElementById('winsTracker');

    let playerCards, dealerCards, playerScore, dealerScore, deck, gameInProgress, playerTurn;
    let playerWins = 0;
    let dealerWins = 0;

    function createDeck() {
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        return suits.flatMap(suit => values.map(value => ({ suit, value })));
    }

    function getRandomIndex(max) {
        return Math.floor(Math.random() * max);
    }

    function shuffle(deck) {
        deck.forEach((_, i) => [deck[i], deck[getRandomIndex(deck.length)]] = [deck[getRandomIndex(deck.length)], deck[i]]);
    }

    function dealCards() {
        return [deck.pop(), deck.pop()];
    }

    function showCards(cards, player) {
        const cardsElement = document.getElementById(player + '-cards');
        cardsElement.innerHTML = cards.map(card => `<div>${card.value} of ${card.suit}</div>`).join('');
    }

    function getScore(cards) {
        const hasAce = cards.some(card => card.value === 'A');
        let score = cards.reduce((sum, card) => sum + getCardValue(card.value), 0);
        return hasAce && score + 10 <= 21 ? score + 10 : score;
    }

    function getCardValue(value) {
        return ['K', 'Q', 'J'].includes(value) ? 10 : value === 'A' ? 1 : parseInt(value);
    }

    function updateScore() {
        playerScore = getScore(playerCards);
        dealerScore = getScore(dealerCards);
        document.getElementById('player-score').textContent = `Player Score: ${playerScore}`;
        document.getElementById('dealer-score').textContent = `Dealer Score: ${dealerScore}`;
    }

    function startGame() {
        if (gameInProgress) return;
        gameInProgress = true;
        startBtn.disabled = newGameBtn.disabled = true;
        hitBtn.disabled = standBtn.disabled = false;
        playerTurn = true;
        deck = createDeck();
        shuffle(deck);
        playerCards = dealCards();
        dealerCards = dealCards();
        showCards(playerCards, 'player');
        showCards(dealerCards, 'dealer');
        updateScore();
        document.getElementById('message').textContent = 'Your Turn. Hit or Stand?';
    }

    function hit() {
        if (!gameInProgress || !playerTurn) return;
        playerCards.push(deck.pop());
        showCards(playerCards, 'player');
        updateScore();

        if (playerScore > 21) {
            document.getElementById('message').textContent = 'Busted! Dealer wins.';
            disableButtonsAfterBust();
            showTryAgainOverlay();
        } else if (playerScore === 21) {
            stand();
        }
    }

    function stand() {
        if (!gameInProgress || !playerTurn) return;
        playerTurn = false;
        hitBtn.disabled = standBtn.disabled = true;
        document.getElementById('message').textContent = 'Dealer\'s Turn';

        setTimeout(() => {
            while (dealerScore < 17) {
                dealerCards.push(deck.pop());
                showCards(dealerCards, 'dealer');
                updateScore();
            }

            let winnerMessage = '';
            if (dealerScore > 21 || playerScore > dealerScore) {
                winnerMessage = 'Dealer busts! You win!';
                playerWins++;
            } else if (dealerScore > playerScore) {
                winnerMessage = 'Dealer wins.';
                dealerWins++;
            } else {
                winnerMessage = 'It\'s a tie!';
            }

            document.getElementById('message').textContent = winnerMessage;
            endGame();
            showTryAgainOverlay();
        }, 1000);
    }

    function disableButtonsAfterBust() {
        hitBtn.disabled
= standBtn.disabled = true;
}

function showTryAgainOverlay() {
    overlay.style.display = 'flex'; // Show the overlay
    winsTracker.textContent = `Wins: Player: ${playerWins}, Dealer: ${dealerWins}`;
}

function endGame() {
    gameInProgress = false;
    newGameBtn.disabled = false;
}

function newGame() {
    overlay.style.display = 'none'; // Hide the overlay
    startGame();
}

// Listen for keyboard events
document.addEventListener('keydown', (event) => {
    if (!gameInProgress) return;

    const key = event.key.toLowerCase();
    if (key === 'h') {
        hit();
    } else if (key === 's') {
        stand();
    }
});

// Button click events
startBtn.addEventListener('click', startGame);
newGameBtn.addEventListener('click', newGame);
hitBtn.addEventListener('click', hit);
standBtn.addEventListener('click', stand);
document.getElementById('try-again-button').addEventListener('click', () => {
    overlay.style.display = 'none';
    newGame();
});
});
