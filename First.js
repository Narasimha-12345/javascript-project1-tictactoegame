const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
const reset = document.querySelector("#reset")
const newGame = document.querySelector("#submit")
const resultClass = document.querySelector(".result")
const msg = document.querySelector("#msg")

function handleCellPlayed(clickedCell, cellIndex) {
  gameBoard[cellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;
}

function handleResultValidation() {
  
  let roundWon = false;

  for (let i = 0; i <= 6; i += 3) {
    if (gameBoard[i] !== '' && gameBoard[i] === gameBoard[i + 1] && gameBoard[i] === gameBoard[i + 2]) {
      roundWon = true;
      break;
    }
  }
  for (let i = 0; i <= 2; i++) {
    if (gameBoard[i] !== '' && gameBoard[i] === gameBoard[i + 3] && gameBoard[i] === gameBoard[i + 6]) {
      roundWon = true;
      break;
    }
  }
  if (gameBoard[0] !== '' && gameBoard[0] === gameBoard[4] && gameBoard[0] === gameBoard[8]) {
    roundWon = true;
  }
  if (gameBoard[2] !== '' && gameBoard[2] === gameBoard[4] && gameBoard[2] === gameBoard[6]) {
    roundWon = true;
  }

  if (roundWon) {
    announceWinner();
    gameActive = false;
    return;
  }

  if (!gameBoard.includes('')) {
    announceTie();
    gameActive = false;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}      

function announceWinner() {    
  
  resultClass.classList.remove("result")
  msg.textContent="Congratulations... You Won the Match !"

}

function announceTie() {
  resultClass.classList.remove("result")
  msg.textContent="Draw Match... Play New Game !"
  
}

function resetOperation(){
    // resetting the GameBoard Fresh (empty)
   
    gameBoard = ['', '', '', '', '', '', '', '', '']
    document.querySelectorAll('.cell')
    .forEach(
      cell => cell.textContent = ''
      )
      hideResultMessage();
      gameActive=true;
      
}

function newGameOperation(){
    // we are setting New Game by making Game Board Fresh (empty)
   resetOperation()
}
function hideResultMessage() {
  resultClass.classList.add("result");
}  

  cells.forEach(cell => cell.addEventListener('click', function(event) {
  const clickedCell = event.target;
  const cellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

  if (gameBoard[cellIndex] !== '' || !gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, cellIndex);
  handleResultValidation();
}));

reset.addEventListener('click',resetOperation)
newGame.addEventListener('click',newGameOperation)


