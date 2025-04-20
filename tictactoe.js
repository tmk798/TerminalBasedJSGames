// Terminal Tic Tac Toe Game
const readline = require('readline');

// Create interface for reading from terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Game state
let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];
let currentPlayer = 'X';
let gameActive = true;

// Function to print the current board state
function printBoard() {
  console.clear();
  console.log('Terminal Tic Tac Toe\n');
  console.log(' ' + board[0][0] + ' | ' + board[0][1] + ' | ' + board[0][2] + ' ');
  console.log('---+---+---');
  console.log(' ' + board[1][0] + ' | ' + board[1][1] + ' | ' + board[1][2] + ' ');
  console.log('---+---+---');
  console.log(' ' + board[2][0] + ' | ' + board[2][1] + ' | ' + board[2][2] + ' ');
  console.log('\nPlayer ' + currentPlayer + '\'s turn');
}

// Function to check if a player has won
function checkWin() {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (board[i][0] !== ' ' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
      return true;
    }
  }
  
  // Check columns
  for (let j = 0; j < 3; j++) {
    if (board[0][j] !== ' ' && board[0][j] === board[1][j] && board[1][j] === board[2][j]) {
      return true;
    }
  }
  
  // Check diagonals
  if (board[0][0] !== ' ' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    return true;
  }
  if (board[0][2] !== ' ' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    return true;
  }
  
  return false;
}

// Function to check if the board is full (draw)
function checkDraw() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === ' ') {
        return false;
      }
    }
  }
  return true;
}

// Function to handle a player's move
function makeMove(row, col) {
  // Check if the cell is already occupied
  if (board[row][col] !== ' ') {
    console.log('That position is already taken. Try again.');
    return false;
  }
  
  // Update the board
  board[row][col] = currentPlayer;
  
  // Check for win or draw
  if (checkWin()) {
    printBoard();
    console.log('\nPlayer ' + currentPlayer + ' wins!');
    gameActive = false;
    return true;
  } else if (checkDraw()) {
    printBoard();
    console.log('\nIt\'s a draw!');
    gameActive = false;
    return true;
  }
  
  // Switch player
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  return true;
}

// Function to handle player input
function handleInput() {
  printBoard();
  
  rl.question('Enter your move (row,col) or "q" to quit: ', (answer) => {
    if (answer.toLowerCase() === 'q') {
      console.log('Thanks for playing!');
      rl.close();
      return;
    }
    
    const parts = answer.split(',');
    if (parts.length !== 2) {
      console.log('Invalid input. Please enter row,col (e.g., 0,0 for top-left)');
      handleInput();
      return;
    }
    
    const row = parseInt(parts[0].trim());
    const col = parseInt(parts[1].trim());
    
    if (isNaN(row) || isNaN(col) || row < 0 || row > 2 || col < 0 || col > 2) {
      console.log('Invalid position. Row and column must be between 0 and 2.');
      handleInput();
      return;
    }
    
    const moveSuccessful = makeMove(row, col);
    
    if (gameActive) {
      handleInput();
    } else {
      rl.question('\nPlay again? (y/n): ', (answer) => {
        if (answer.toLowerCase() === 'y') {
          // Reset game
          board = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
          ];
          currentPlayer = 'X';
          gameActive = true;
          handleInput();
        } else {
          console.log('Thanks for playing!');
          rl.close();
        }
      });
    }
  });
}

// Start the game
console.log('Welcome to Terminal Tic Tac Toe!');
console.log('Enter positions as row,col (0-2,0-2)');
console.log('For example: 0,0 is the top-left corner\n');
handleInput();