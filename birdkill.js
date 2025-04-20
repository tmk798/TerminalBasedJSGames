// Terminal Bird Shooting Game
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
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  bgBlack: "\x1b[40m",
  bgBlue: "\x1b[44m"
};

// Game configuration
const config = {
  width: 60,
  height: 20,
  frameRate: 100, // milliseconds
  birdSpawnRate: 0.2, // Probability of a new bird per frame
  maxBirds: 5, // Maximum number of birds at once
  gunPosition: 10, // Gun position from the bottom
  difficulty: 1, // Starting difficulty level
};

// Game state
let gameState = {
  birds: [], // Array of bird objects
  bullets: [], // Array of bullet objects
  gunX: Math.floor(config.width / 2), // Gun position
  score: 0,
  missedShots: 0,
  totalShots: 0,
  gameOver: false,
  level: 1,
  birdsHit: 0
};

// Bird types (with different point values and symbols)
const birdTypes = [
  { symbol: ">~(o)>", points: 10, speed: 1, color: colors.yellow },
  { symbol: ">^(o)^>", points: 20, speed: 2, color: colors.cyan },
  { symbol: ">=(@)=>", points: 30, speed: 3, color: colors.magenta }
];

// Function to clear the terminal
function clearTerminal() {
  process.stdout.write('\x1Bc');
}

// Function to create a new bird
function createBird() {
  const birdType = birdTypes[Math.floor(Math.random() * birdTypes.length)];
  const yPosition = Math.floor(Math.random() * (config.height - 5)) + 1;
  
  // Determine if bird comes from left or right
  const fromLeft = Math.random() > 0.5;
  
  return {
    x: fromLeft ? 0 : config.width - birdType.symbol.length,
    y: yPosition,
    type: birdType,
    direction: fromLeft ? 1 : -1, // 1 = right, -1 = left
    symbol: fromLeft ? birdType.symbol : birdType.symbol.split('').reverse().join('') // Flip bird if coming from right
  };
}

// Function to create a new bullet
function createBullet() {
  return {
    x: gameState.gunX,
    y: config.height - config.gunPosition,
    symbol: '|',
    active: true
  };
}

// Function to draw the game
function drawGame() {
  clearTerminal();
  let display = [];
  
  // Initialize empty display grid
  for (let i = 0; i < config.height; i++) {
    display.push(new Array(config.width).fill(' '));
  }
  
  // Draw birds
  gameState.birds.forEach(bird => {
    const birdSymbol = bird.symbol;
    for (let i = 0; i < birdSymbol.length; i++) {
      if (bird.x + i >= 0 && bird.x + i < config.width) {
        display[bird.y][bird.x + i] = bird.type.color + birdSymbol[i] + colors.reset;
      }
    }
  });
  
  // Draw bullets
  gameState.bullets.forEach(bullet => {
    if (bullet.active && bullet.y >= 0 && bullet.y < config.height) {
      display[bullet.y][bullet.x] = colors.bright + colors.white + bullet.symbol + colors.reset;
    }
  });
  
  // Draw gun
  const gunPosition = config.height - config.gunPosition;
  display[gunPosition][gameState.gunX] = colors.green + '^' + colors.reset;
  display[gunPosition + 1][gameState.gunX - 1] = colors.green + '/' + colors.reset;
  display[gunPosition + 1][gameState.gunX] = colors.green + '|' + colors.reset;
  display[gunPosition + 1][gameState.gunX + 1] = colors.green + '\\' + colors.reset;
  
  // Draw sky background
  for (let y = 0; y < config.height - config.gunPosition - 2; y++) {
    for (let x = 0; x < config.width; x++) {
      if (display[y][x] === ' ') {
        // Randomly add stars
        if (Math.random() < 0.001) {
          display[y][x] = colors.white + '.' + colors.reset;
        }
      }
    }
  }
  
  // Draw ground
  for (let y = config.height - config.gunPosition + 2; y < config.height; y++) {
    for (let x = 0; x < config.width; x++) {
      display[y][x] = colors.green + '#' + colors.reset;
    }
  }
  
  // Render the display
  console.log(display.map(row => row.join('')).join('\n'));
  
  // Display score and stats
  console.log('─'.repeat(config.width));
  console.log(`${colors.bright}${colors.yellow}Score: ${gameState.score} | ${colors.cyan}Level: ${gameState.level} | ${colors.green}Birds Hit: ${gameState.birdsHit} | ${colors.red}Missed Shots: ${gameState.missedShots}/${gameState.totalShots}${colors.reset}`);
  console.log(`${colors.bright}${colors.white}Controls: ← → to move, SPACE to shoot, Q to quit${colors.reset}`);
}

// Function to update the game state
function updateGame() {
  if (gameState.gameOver) return;
  
  // Update bird positions
  gameState.birds.forEach(bird => {
    bird.x += bird.type.speed * bird.direction * (gameState.level * 0.5);
  });
  
  // Update bullet positions
  gameState.bullets.forEach(bullet => {
    if (bullet.active) {
      bullet.y--;
    }
  });
  
  // Check for bullet collisions with birds
  gameState.bullets = gameState.bullets.filter(bullet => {
    if (!bullet.active) return false;
    
    // Check if bullet is off-screen
    if (bullet.y < 0) {
      gameState.missedShots++;
      return false;
    }
    
    // Check for collision with birds
    let hit = false;
    gameState.birds = gameState.birds.filter(bird => {
      const bulletX = bullet.x;
      const bulletY = bullet.y;
      
      // Check if bullet position overlaps with bird
      if (bulletY === bird.y && bulletX >= bird.x && bulletX < bird.x + bird.symbol.length) {
        // Bird is hit!
        gameState.score += bird.type.points;
        gameState.birdsHit++;
        hit = true;
        
        // Increase level every 5 birds hit
        if (gameState.birdsHit % 5 === 0) {
          gameState.level++;
        }
        
        return false; // Remove bird
      }
      return true; // Keep bird
    });
    
    return !hit; // Remove bullet if it hit something
  });
  
  // Remove birds that have gone off-screen
  gameState.birds = gameState.birds.filter(bird => {
    if (bird.direction > 0) {
      return bird.x < config.width;
    } else {
      return bird.x + bird.symbol.length > 0;
    }
  });
  
  // Possibly spawn a new bird
  if (Math.random() < config.birdSpawnRate * gameState.level * 0.5 && gameState.birds.length < config.maxBirds) {
    gameState.birds.push(createBird());
  }
}

// Main game loop
function gameLoop() {
  updateGame();
  drawGame();
  
  if (!gameState.gameOver) {
    setTimeout(gameLoop, config.frameRate);
  } else {
    console.log(`\n${colors.bright}${colors.red}Game Over! Your final score: ${gameState.score}${colors.reset}`);
    console.log(`${colors.bright}${colors.yellow}You hit ${gameState.birdsHit} birds and reached level ${gameState.level}!${colors.reset}`);
    console.log(`${colors.bright}${colors.white}Press 'R' to restart or 'Q' to quit${colors.reset}`);
  }
}

// Handle keypress
process.stdin.on('keypress', (str, key) => {
  if (key.name === 'q') {
    console.log('Thanks for playing!');
    process.exit(0);
  } else if (key.name === 'r' && gameState.gameOver) {
    // Restart game
    gameState = {
      birds: [],
      bullets: [],
      gunX: Math.floor(config.width / 2),
      score: 0,
      missedShots: 0,
      totalShots: 0,
      gameOver: false,
      level: 1,
      birdsHit: 0
    };
    gameLoop();
  }
  
  if (!gameState.gameOver) {
    if (key.name === 'right' && gameState.gunX < config.width - 2) {
      gameState.gunX++;
    } else if (key.name === 'left' && gameState.gunX > 1) {
      gameState.gunX--;
    } else if (key.name === 'space') {
      gameState.bullets.push(createBullet());
      gameState.totalShots++;
    }
  }
});

// Start the game
console.log(`${colors.bright}${colors.yellow}Terminal Bird Shooting Game${colors.reset}`);
console.log(`${colors.bright}${colors.white}Get ready to shoot some birds!${colors.reset}`);
console.log(`${colors.white}Loading...${colors.reset}`);

setTimeout(() => {
  gameLoop();
}, 1000);

// Handle exit
process.on('exit', () => {
  console.log('Thanks for playing!');
});  