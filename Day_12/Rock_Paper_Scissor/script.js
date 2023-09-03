
function getComputerChoice() {
    let randomChoice = Math.floor(Math.random() * 3) + 1;

    switch (randomChoice) {
        case 1:
            return 'rock';
            break;
        case 2:
            return 'paper';
            break;
        case 3:
            return 'scissors';
            break;
    }
};

function getPlayerChoice() {

    let playerChoice = prompt("Enter your choice: Rock, Paper, or Scissors");
    playerChoice = playerChoice.toLocaleLowerCase();

    if (playerChoice === 'rock' || playerChoice === 'paper' || playerChoice === 'scissors') {
        return playerChoice;
    } else {
        alert("Invalid input. Please choose Rock, Paper, or Scissors.");
        return getPlayerChoice(); // Recursively ask for valid input
    }
};


function playRound() {

    let playerChoice = getPlayerChoice();
    let computerChoice = getComputerChoice();

    if (playerChoice === computerChoice) {
        alert("It's a tie Game");
        return 0;
    } else if (
        ((playerChoice === 'rock') && (computerChoice === 'scissors')) ||
        ((playerChoice === 'paper') && (computerChoice === 'rock')) ||
        ((playerChoice === 'scissors') && (computerChoice === 'paper'))

    ) {
        alert(`You Win! ${playerChoice} beats ${computerChoice}.`);
        return 1;
    } else {
        alert(`You Lose! ${computerChoice} beats ${playerChoice}.`);
        return 2;
    }
}

// playRound();

let moves_left = 5;
let playerScore = 0;
let computerScore = 0;
let roundCounter = 1;

function startGame() {

    if (moves_left === 5) {
        alert('Are you ready ??')
    }

    if (moves_left > 0) {
        alert(`Round ${roundCounter}`);
        var result = playRound();

        if (result === 1) {
            playerScore++;
        } else if (result === 2) computerScore++;

        moves_left--;
        roundCounter++;
        startGame();

    } else {
        if (playerScore > computerScore) {
            alert("Game Over >>You win the game!");
        } else if (computerScore > playerScore) {
            alert("Game Over >>Computer wins the game!");
        } else {
            alert("Game Over It's a tie game!");
        }
    }
}


startGame(); 