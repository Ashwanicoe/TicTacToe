let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const statusDisplay = document.getElementById('status');

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

  if (gameState[clickedCellIndex] !== "" || !gameActive) return;

  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerText = currentPlayer;
  clickedCell.classList.add(currentPlayer.toLowerCase());

  checkResult();
}

function checkResult() {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.innerText = `Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    statusDisplay.innerText = "It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerText = `Player ${currentPlayer}'s Turn`;
}

function resetGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerText = "Player X's Turn";
  document.querySelectorAll('.cell').forEach(cell => {
    cell.innerText = "";
    cell.classList.remove('x', 'o');
  });
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
