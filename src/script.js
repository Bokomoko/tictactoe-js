
const X_CLASS = "x"; // class applied when player X clicks
const CIRCLE_CLASS = "circle"; // class applied when player O clicks
const cellElements = document.querySelectorAll("[data-cell]"); // all the 9 cells in the board
const board = document.getElementById("board"); // the board is a 3x3 matrix
const WINNING_COMBINATIONS = [ // all the possible winning combinations
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const winningMessageElement = document.getElementById("winningMessage"); // element with the winning message
const restartButton = document.getElementById("restartButton"); // button for restart
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
let circleTurn;

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
  circleTurn = false; // alternate between X and O
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS); // clear the classes
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick); // clear the event listeners
    cell.addEventListener("click", handleClick, { once: true }); // reassign the event listeners
  });
  setBoardHoverClass(); // this classe will show the X or O when the mouse rovers the cells
  winningMessageElement.classList.remove("show"); // removes the winning message
}


/**
 * check if the player has won
 * @param {string} player x|circle
 *
 * @returns boolean true|false
 */
export function checkWin(player) {
  const cellElements = Array.from(document.querySelectorAll("[data-cell]"));

  for (let solution of WINNING_COMBINATIONS) { // for each possible winning combination
    let win = true; // assume the player has won
    for (let place of solution) { // for each position in the winning combination
      win =
        win && cellElements[place].getAttribute("class").indexOf(player) !== -1; // check if the player has a mark in that position
        // the mark is set by the class x or circle with the function placeMark
    }
    if (win) return true;
  }
  return false;
}


// event listener for each of the cells

function handleClick(e) {
  // Tip: Replace null by the clicked element
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS; // who is playing?
  placeMark(cell, currentClass); // place the players mark in the cell
  if (checkWin(currentClass)) {  // check if the player has won
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();  // alternate between X and O
    setBoardHoverClass();  // activates the hovering class
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "Empate!";
  } else {
    winningMessageTextElement.innerText = `Jogador ${circleTurn ? "O" : "X"} venceu!`;
  }
  winningMessageElement.classList.add("show");
}

function isDraw() { // check if the game is a draw
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

function placeMark(cell, currentClass) {  // set the class of the cell to the player´s mark
  cell.classList.add(currentClass);
}

function swapTurns() {    // alternate between X and O
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  // remove all classes from the hovering class
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) { // depending on who is playing, add the hovering class
    board.classList.add(CIRCLE_CLASS);  // add circle
  } else {
    board.classList.add(X_CLASS); // add x
  }
}
