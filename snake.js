// Terminal Snake Game
const readline = require('readline');

// Create interface for reading from terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Enable raw mode to capture keypresses without requiring Enter
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}

// ANSI color codes
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  bgGreen: "\x1b[42m",
  bgRed: "\x1b[41m"
};

// Game configuration
const config = {
  width: 40,
  height: 20,
  initialSnakeLength: 5,
  frameRate: 100, // milliseconds
  foodTypes: [
    { symbol: '●', points: 1, color: colors.red },
    { symbol: '◆', points: 2, color: colors.yellow },
    { symbol: '■', points: 3, color: colors.magenta }
  ]
};

// Game state
let gameState = {
  snake: [],
  direction: 'right',
  nextDirection: 'right',
  food: null,
  score: 0,
  gameOver: false,
  paused: false,
  level: 1,
  foodEaten: 0,
  speed: 1
};

// Initialize the snake
function initializeSnake() {
  const centerX = Math.floor(config.width / 4);
  const centerY = Math.floor(config.height / 2);
  
  gameState.snake = [];
  for (let i = 0; i < config.initialSnakeLength; i++) {
    gameState.snake.push({ x: centerX - i, y: centerY });
  }
}

// Place food at random position
function placeFood() {
  // Select random food type
  const foodType = config.foodTypes[Math.floor(Math.random() * config.foodTypes.length)];
  
  // Find a free position
  let foodX, foodY;
  do {
    foodX = Math.floor(Math.random() * (config.width - 2)) + 1;
    foodY = Math.floor(Math.random() * (config.height - 2)) + 1;
  } while (isPositionOccupiedBySnake(foodX, foodY));
  
  gameState.food = { x: foodX, y: foodY, type: foodType };
}

// Check if position is occupied by snake
function isPositionOccupiedBySnake(x, y) {
  return gameState.snake.some(segment => segment.x === x && segment.y === y);
}

// Function to clear the terminal
function clearTerminal() {
  process.stdout.write('\x1Bc');
}

// Draw the game
function drawGame() {
  clearTerminal();
  let display = [];
  
  // Create border
  let topBorder = '╔' + '═'.repeat(config.width) + '╗';
  let bottomBorder = '╚' + '═'.repeat(config.width) + '╝';
  
  console.log(colors.bright + colors.cyan + topBorder + colors.reset);
  
  // Initialize empty display grid
  for (let y = 0; y < config.height; y++) {
    let row = colors.bright + colors.cyan + '║' + colors.reset;
    for (let x = 0; x < config.width; x++) {
      // Draw snake
      let isSnakeSegment = false;
      for (let i = 0; i < gameState.snake.length; i++) {
        if (gameState.snake[i].x === x && gameState.snake[i].y === y) {
          if (i === 0) {
            // Snake head
            row += colors.bright + colors.green + '█' + colors.reset;
          } else {
            // Snake body
            row += colors.green + '█' + colors.reset;
          }
          isSnakeSegment = true;
          break;
        }
      }
      
      // Draw food
      if (!isSnakeSegment && gameState.food && gameState.food.x === x && gameState.food.y === y) {
        row += gameState.food.type.color + gameState.food.type.symbol + colors.reset;
      } 
      // Draw empty space
      else if (!isSnakeSegment) {
        row += ' ';
      }
    }
    row += colors.bright + colors.cyan + '║' + colors.reset;
    console.log(row);
  }
  
  console.log(colors.bright + colors.cyan + bottomBorder + colors.reset);
  
  // Display score and info
  console.log(`${colors.bright + colors.yellow}Score: ${gameState.score} | Level: ${gameState.level} | Length: ${gameState.snake.length}${colors.reset}`);
  console.log(`${colors.white}Controls: ↑ ↓ ← → to move, P to pause, Q to quit${colors.reset}`);
  
  // Game over or paused message
  if (gameState.gameOver) {
    console.log(`\n${colors.bright + colors.red}Game Over!${colors.reset} Press R to restart.`);
  } else if (gameState.paused) {
    console.log(`\n${colors.bright + colors.yellow}Game Paused${colors.reset} Press P to resume.`);
  }
}

// Update the game state
function updateGame() {
  if (gameState.gameOver || gameState.paused) return;
  
  // Update direction
  gameState.direction = gameState.nextDirection;
  
  // Calculate new head position
  const head = { ...gameState.snake[0] };
  switch (gameState.direction) {
    case 'up':
      head.y--;
      break;
    case 'down':
      head.y++;
      break;
    case 'left':
      head.x--;
      break;
    case 'right':
      head.x++;
      break;
  }
  
  // Check for collisions with walls
  if (head.x < 0 || head.x >= config.width || head.y < 0 || head.y >= config.height) {
    gameState.gameOver = true;
    return;
  }
  
  // Check for collisions with self
  if (isPositionOccupiedBySnake(head.x, head.y)) {
    gameState.gameOver = true;
    return;
  }
  
  // Add new head to snake
  gameState.snake.unshift(head);
  
  // Check if snake eats food
  if (gameState.food && head.x === gameState.food.x && head.y === gameState.food.y) {
    // Increase score
    gameState.score += gameState.food.type.points;
    gameState.foodEaten++;
    
    // Level up every 5 food items
    if (gameState.foodEaten % 5 === 0) {
      gameState.level++;
      gameState.speed = 1 + (gameState.level * 0.1); // Speed increases with level
    }
    
    // Place new food
    placeFood();
  } else {
    // Remove tail if no food eaten
    gameState.snake.pop();
  }
}

// Main game loop
function gameLoop() {
  updateGame();
  drawGame();
  
  if (!gameState.gameOver) {
    // Adjust speed based on level
    const adjustedFrameRate = Math.floor(config.frameRate / gameState.speed);
    setTimeout(gameLoop, adjustedFrameRate);
  }
}

// Handle keypress
process.stdin.on('keypress', (str, key) => {
  if (key.name === 'q') {
    console.log('Thanks for playing!');
    process.exit(0);
  } else if (key.name === 'r' && gameState.gameOver) {
    // Restart game
    initializeGame();
  } else if (key.name === 'p') {
    // Toggle pause
    gameState.paused = !gameState.paused;
    if (!gameState.paused) {
      gameLoop();
    }
  }
  
  if (!gameState.paused && !gameState.gameOver) {
    // Change direction - prevent 180 degree turns
    if (key.name === 'up' && gameState.direction !== 'down') {
      gameState.nextDirection = 'up';
    } else if (key.name === 'down' && gameState.direction !== 'up') {
      gameState.nextDirection = 'down';
    } else if (key.name === 'left' && gameState.direction !== 'right') {
      gameState.nextDirection = 'left';
    } else if (key.name === 'right' && gameState.direction !== 'left') {
      gameState.nextDirection = 'right';
    }
  }
});

// Initialize game
function initializeGame() {
  gameState = {
    snake: [],
    direction: 'right',
    nextDirection: 'right',
    food: null,
    score: 0,
    gameOver: false,
    paused: false,
    level: 1,
    foodEaten: 0,
    speed: 1
  };
  
  initializeSnake();
  placeFood();
  gameLoop();
}

// Show welcome screen
function showWelcomeScreen() {
  clearTerminal();
  console.log('\n' + colors.bright + colors.green + '  SNAKE GAME' + colors.reset + '\n');
  console.log(colors.cyan + '  Use arrow keys to move the snake.');
  console.log('  Eat food to grow and score points.');
  console.log('  Avoid hitting walls and yourself.');
  console.log('  Different food types give different points:');
  console.log(`    ${colors.red}●${colors.reset} = 1 point`);
  console.log(`    ${colors.yellow}◆${colors.reset} = 2 points`);
  console.log(`    ${colors.magenta}■${colors.reset} = 3 points${colors.reset}`);
  console.log('\n  Controls:');
  console.log('  - Arrow keys: Move');
  console.log('  - P: Pause/Resume');
  console.log('  - R: Restart (when game over)');
  console.log('  - Q: Quit\n');
  console.log(colors.bright + colors.white + '  Press any key to start...' + colors.reset);
  
  // Wait for keypress to start
  const startHandler = function(str, key) {
    process.stdin.removeListener('keypress', startHandler);
    initializeGame();
  };
  
  process.stdin.on('keypress', startHandler);
}

// Start the game
showWelcomeScreen();

// Handle exit
process.on('exit', () => {
  console.log('Thanks for playing!');
});