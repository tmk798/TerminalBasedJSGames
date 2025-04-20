// Terminal-based Dancing Robot Animation with Colors
const readline = require('readline');

// Create interface for terminal control
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Color codes
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  bgBlack: "\x1b[40m",
  bgRed: "\x1b[41m",
  bgGreen: "\x1b[42m",
  bgYellow: "\x1b[43m",
  bgBlue: "\x1b[44m",
  bgMagenta: "\x1b[45m",
  bgCyan: "\x1b[46m",
  bgWhite: "\x1b[47m"
};

// Animation frames for dancing robot with colors
const robotFrames = [
  // Frame 1: Robot standing
  `
${colors.bright}${colors.cyan}
      =================
      |    ${colors.yellow}ROBOT${colors.cyan}     |
      =================
         ${colors.magenta}|  ${colors.blue}[o_o]${colors.magenta}  |
         |   ${colors.white}|_|${colors.magenta}   |
         |${colors.yellow} --|+|--${colors.magenta} |
        ${colors.green}/|\\${colors.magenta}  ${colors.white}|_|${colors.magenta}  ${colors.green}/|\\${colors.magenta}
        ${colors.green}/ \\${colors.magenta}     ${colors.green}/ \\${colors.magenta}
${colors.reset}
  ${colors.bright}${colors.white}Dancing robot booting up...${colors.reset}
  `,

  // Frame 2: Robot starting to dance - arms up
  `
${colors.bright}${colors.cyan}
      =================
      |    ${colors.yellow}ROBOT${colors.cyan}     |
      =================
         ${colors.magenta}|  ${colors.blue}[^_^]${colors.magenta}  |
         |   ${colors.white}|_|${colors.magenta}   |
         |${colors.yellow}   |+|   ${colors.magenta}|
        ${colors.green}\\|/${colors.magenta}  ${colors.white}|_|${colors.magenta}  ${colors.green}\\|/${colors.magenta}
        ${colors.green}/ \\${colors.magenta}     ${colors.green}/ \\${colors.magenta}
${colors.reset}
  ${colors.bright}${colors.green}Ready to dance!${colors.reset}
  `,

  // Frame 3: Robot dancing - leg up
  `
${colors.bright}${colors.cyan}
      =================
      |    ${colors.yellow}ROBOT${colors.cyan}     |
      =================
         ${colors.magenta}|  ${colors.blue}[o_o]${colors.magenta}  |
         |   ${colors.white}|_|${colors.magenta}   |
         |${colors.yellow} --|+|--${colors.magenta} |
        ${colors.green}/|\\${colors.magenta}  ${colors.white}|_|${colors.magenta}  ${colors.green}/|\\${colors.magenta}
        ${colors.green}/ ${colors.magenta}      ${colors.green}\\ \\${colors.magenta}
${colors.reset}
  ${colors.bright}${colors.yellow}Dancing started!${colors.reset}
  `,

  // Frame 4: Robot dancing - other leg up
  `
${colors.bright}${colors.cyan}
      =================
      |    ${colors.yellow}ROBOT${colors.cyan}     |
      =================
         ${colors.magenta}|  ${colors.blue}[o_o]${colors.magenta}  |
         |   ${colors.white}|_|${colors.magenta}   |
         |${colors.yellow} --|+|--${colors.magenta} |
        ${colors.green}/|\\${colors.magenta}  ${colors.white}|_|${colors.magenta}  ${colors.green}/|\\${colors.magenta}
        ${colors.green}/ /${colors.magenta}      ${colors.green}\\${colors.magenta}
${colors.reset}
  ${colors.bright}${colors.blue}Watch those moves!${colors.reset}
  `,

  // Frame 5: Robot spinning - twist right
  `
${colors.bright}${colors.cyan}
      =================
      |    ${colors.yellow}ROBOT${colors.cyan}     |
      =================
         ${colors.magenta}|  ${colors.blue}[o_o]${colors.magenta}  |
         |   ${colors.white}|_|${colors.magenta}   |
         |${colors.yellow}   |+|->${colors.magenta} |
        ${colors.green}/|\\${colors.magenta}  ${colors.white}|_|${colors.magenta}  ${colors.green}/|\\${colors.magenta}
        ${colors.green}/ \\${colors.magenta}     ${colors.green}/ \\${colors.magenta}
${colors.reset}
  ${colors.bright}${colors.red}Spin it right!${colors.reset}
  `,

  // Frame 6: Robot spinning - twist left
  `
${colors.bright}${colors.cyan}
      =================
      |    ${colors.yellow}ROBOT${colors.cyan}     |
      =================
         ${colors.magenta}|  ${colors.blue}[o_o]${colors.magenta}  |
         |   ${colors.white}|_|${colors.magenta}   |
         |${colors.yellow} <-|+|   ${colors.magenta}|
        ${colors.green}/|\\${colors.magenta}  ${colors.white}|_|${colors.magenta}  ${colors.green}/|\\${colors.magenta}
        ${colors.green}/ \\${colors.magenta}     ${colors.green}/ \\${colors.magenta}
${colors.reset}
  ${colors.bright}${colors.red}Spin it left!${colors.reset}
  `,

  // Frame 7: Robot dancing - arms waving
  `
${colors.bright}${colors.cyan}
      =================
      |    ${colors.yellow}ROBOT${colors.cyan}     |
      =================
         ${colors.magenta}|  ${colors.blue}[>_<]${colors.magenta}  |
         |   ${colors.white}|_|${colors.magenta}   |
         |${colors.yellow} ~-|+|-~${colors.magenta} |
        ${colors.green}/|\\${colors.magenta}  ${colors.white}|_|${colors.magenta}  ${colors.green}/|\\${colors.magenta}
        ${colors.green}/ \\${colors.magenta}     ${colors.green}/ \\${colors.magenta}
${colors.reset}
  ${colors.bright}${colors.magenta}Dance wave!${colors.reset}
  `,

  // Frame 8: Robot jumping
  `
${colors.bright}${colors.cyan}
      =================
      |    ${colors.yellow}ROBOT${colors.cyan}     |
      =================
         ${colors.magenta}|  ${colors.blue}[^_^]${colors.magenta}  |
         |   ${colors.white}|_|${colors.magenta}   |
         |${colors.yellow} --|+|--${colors.magenta} |
        ${colors.green}/|\\${colors.magenta}  ${colors.white}|_|${colors.magenta}  ${colors.green}/|\\${colors.magenta}
        ${colors.green}\\   /${colors.magenta}     ${colors.green}\\   /${colors.magenta}
${colors.reset}
  ${colors.bright}${colors.yellow}Jump!${colors.reset}
  `,

  // Frame 9: Robot in the air
  `
${colors.bright}${colors.cyan}
      =================
      |    ${colors.yellow}ROBOT${colors.cyan}     |
      =================
       ${colors.magenta}  |  ${colors.blue}\\o//${colors.magenta}  |
       ${colors.magenta}  |   ${colors.white}|_|${colors.magenta}   |
       ${colors.magenta}  |${colors.yellow} --|+|--${colors.magenta} |
      ${colors.magenta}  ${colors.green}/|\\${colors.magenta}  ${colors.white}|_|${colors.magenta}  ${colors.green}/|\\${colors.magenta}
    ${colors.magenta}    ${colors.green}/ \\${colors.magenta}     ${colors.green}/ \\${colors.magenta}
${colors.reset}
  ${colors.bright}${colors.green}Wheee!${colors.reset}
  `,

  // Frame 10: Robot landing
  `
${colors.bright}${colors.cyan}
      =================
      |    ${colors.yellow}ROBOT${colors.cyan}     |
      =================
         ${colors.magenta}|  ${colors.blue}[o_o]${colors.magenta}  |
         |   ${colors.white}|_|${colors.magenta}   |
         |${colors.yellow} --|+|--${colors.magenta} |
        ${colors.green}/|\\${colors.magenta}  ${colors.white}|_|${colors.magenta}  ${colors.green}/|\\${colors.magenta}
        ${colors.green}/ \\${colors.magenta}     ${colors.green}/ \\${colors.magenta}
${colors.reset}
  ${colors.bright}${colors.blue}Landed!${colors.reset}
  `,

  // Frame 11: Robot moonwalk - step 1
  `
${colors.bright}${colors.cyan}
      =================
      |    ${colors.yellow}ROBOT${colors.cyan}     |
      =================
         ${colors.magenta}|  ${colors.blue}[o_~]${colors.magenta}  |
         |   ${colors.white}|_|${colors.magenta}   |
         |${colors.yellow} --|+|--${colors.magenta} |
        ${colors.green}/|\\${colors.magenta}  ${colors.white}|_|${colors.magenta}  ${colors.green}/|\\${colors.magenta}
        ${colors.green}/   \\${colors.magenta}   ${colors.green}/   \\${colors.magenta}
${colors.reset}
  ${colors.bright}${colors.red}Moonwalk starting...${colors.reset}
  `,

  // Frame 12: Robot moonwalk - step 2
  `
${colors.bright}${colors.cyan}
      =================
      |    ${colors.yellow}ROBOT${colors.cyan}     |
      =================
         ${colors.magenta}|  ${colors.blue}[~_o]${colors.magenta}  |
         |   ${colors.white}|_|${colors.magenta}   |
         |${colors.yellow} --|+|--${colors.magenta} |
        ${colors.green}/|\\${colors.magenta}  ${colors.white}|_|${colors.magenta}  ${colors.green}/|\\${colors.magenta}
        ${colors.green}\\   /${colors.magenta}   ${colors.green}\\   /${colors.magenta}
${colors.reset}
  ${colors.bright}${colors.yellow}Moonwalking...${colors.reset}
  `,

  // Frame 13: Robot breakdance - step 1
  `
${colors.bright}${colors.cyan}
      =================
      |    ${colors.yellow}ROBOT${colors.cyan}     |
      =================
         ${colors.magenta}|  ${colors.blue}[o_O]${colors.magenta}  |
        ${colors.green}\\${colors.magenta}|   ${colors.white}|_|${colors.magenta}   |${colors.green}/
        ${colors.green}\\${colors.magenta}|${colors.yellow} --|+|--${colors.magenta} |${colors.green}/
         ${colors.green}\\${colors.magenta}  ${colors.white}|_|${colors.magenta}  ${colors.green}/
           ${colors.green}\\   /${colors.magenta}
${colors.reset}
  ${colors.bright}${colors.magenta}Breakdance time!${colors.reset}
  `,

  // Frame 14: Robot breakdance - step 2
  `
${colors.bright}${colors.cyan}
      =================
      |    ${colors.yellow}ROBOT${colors.cyan}     |
      =================
         ${colors.magenta}|  ${colors.blue}[O_o]${colors.magenta}  |
        ${colors.green}//${colors.magenta}|   ${colors.white}|_|${colors.magenta}   |${colors.green}\\\\
        ${colors.green}//${colors.magenta}|${colors.yellow} --|+|--${colors.magenta} |${colors.green}\\\\
         ${colors.green}//${colors.magenta}  ${colors.white}|_|${colors.magenta}  ${colors.green}\\\\
           ${colors.green}/   \\${colors.magenta}
${colors.reset}
  ${colors.bright}${colors.blue}Robot got moves!${colors.reset}
  `,

  // Frame 15: Robot spinning finale - step 1
  `
${colors.bright}${colors.cyan}
      =================
      |    ${colors.yellow}ROBOT${colors.cyan}     |
      =================
         ${colors.magenta}|  ${colors.blue}[@_@]${colors.magenta}  |
         |   ${colors.white}|_|${colors.magenta}   |
         |${colors.yellow} --|+|--${colors.magenta} |
        ${colors.green}\\|/${colors.magenta}  ${colors.white}|_|${colors.magenta}  ${colors.green}\\|/${colors.magenta}
        ${colors.green}/ \\${colors.magenta}     ${colors.green}/ \\${colors.magenta}
${colors.reset}
  ${colors.bright}${colors.green}Preparing finale!${colors.reset}
  `,

  // Frame 16: Robot spinning finale - step 2
  `
${colors.bright}${colors.cyan}
      =================
      |    ${colors.yellow}ROBOT${colors.cyan}     |
      =================
         ${colors.magenta}|  ${colors.blue}[*_*]${colors.magenta}  |
         |   ${colors.white}|_|${colors.magenta}   |
       ${colors.green}\\${colors.magenta} |${colors.yellow} --|+|--${colors.magenta} | ${colors.green}/
        ${colors.green}\\|/${colors.magenta}  ${colors.white}|_|${colors.magenta}  ${colors.green}\\|/${colors.magenta}
        ${colors.green}/ \\${colors.magenta}     ${colors.green}/ \\${colors.magenta}
${colors.reset}
  ${colors.bright}${colors.red}Spinning finale!${colors.reset}
  `,

  // Frame 17: Robot bow
  `
${colors.bright}${colors.cyan}
      =================
      |    ${colors.yellow}ROBOT${colors.cyan}     |
      =================
         ${colors.magenta}|  ${colors.blue}[^_^]${colors.magenta}  |
      ${colors.magenta}    |   ${colors.white}|_|${colors.magenta}   |
      ${colors.magenta}    |${colors.yellow} --|+|--${colors.magenta} |
      ${colors.magenta}   ${colors.green}/|\\${colors.magenta}  ${colors.white}|_|${colors.magenta}  ${colors.green}/|\\${colors.magenta}
      ${colors.magenta}   ${colors.green}/ \\${colors.magenta}     ${colors.green}/ \\${colors.magenta}
${colors.reset}
  ${colors.bright}${colors.yellow}*takes a bow*${colors.reset}
  `,

  // Frame 18: Robot standing - dance complete
  `
${colors.bright}${colors.cyan}
      =================
      |    ${colors.yellow}ROBOT${colors.cyan}     |
      =================
         ${colors.magenta}|  ${colors.blue}[o_o]${colors.magenta}  |
         |   ${colors.white}|_|${colors.magenta}   |
         |${colors.yellow} --|+|--${colors.magenta} |
        ${colors.green}/|\\${colors.magenta}  ${colors.white}|_|${colors.magenta}  ${colors.green}/|\\${colors.magenta}
        ${colors.green}/ \\${colors.magenta}     ${colors.green}/ \\${colors.magenta}
${colors.reset}
  ${colors.bright}${colors.white}Dance complete!${colors.reset}
  `
];

// Function to clear the terminal
function clearTerminal() {
  process.stdout.write('\x1Bc');
}

// Add music notes and stars for visual effects
function addRandomEffects(frame) {
  const effects = ['♪', '♫', '★', '✧', '✦', '✩', '✯', '✨'];
  const positions = [
    { x: 2, y: 2 }, { x: 15, y: 3 }, { x: 5, y: 4 }, 
    { x: 20, y: 5 }, { x: 3, y: 6 }, { x: 18, y: 7 }, 
    { x: 25, y: 2 }, { x: 7, y: 5 }
  ];
  
  // Convert frame to array of lines
  const lines = frame.split('\n');
  
  // Add 3 random effects
  for (let i = 0; i < 3; i++) {
    const effect = effects[Math.floor(Math.random() * effects.length)];
    const position = positions[Math.floor(Math.random() * positions.length)];
    
    if (lines[position.y] && position.x < lines[position.y].length) {
      const colorChoices = [colors.yellow, colors.cyan, colors.green, colors.magenta];
      const randomColor = colorChoices[Math.floor(Math.random() * colorChoices.length)];
      
      // Insert effect at position
      const line = lines[position.y];
      lines[position.y] = line.substring(0, position.x) + 
                        randomColor + effect + colors.reset + 
                        line.substring(position.x + 1);
    }
  }
  
  return lines.join('\n');
}

// Function to animate the dancing robot
function animateRobot() {
  let frameIndex = 0;
  
  console.log(`${colors.bright}${colors.yellow}Dancing Robot Animation${colors.reset} - Press Ctrl+C to exit`);
  
  // Display animation frames with delay
  const animation = setInterval(() => {
    clearTerminal();
    // Add random music notes/stars effects to each frame
    console.log(addRandomEffects(robotFrames[frameIndex]));
    
    frameIndex++;
    
    // End animation when all frames have been shown
    if (frameIndex >= robotFrames.length) {
      clearInterval(animation);
      console.log(`${colors.bright}${colors.green}Animation finished!${colors.reset} Press Enter to watch the robot dance again or Ctrl+C to exit.`);
      
      // Allow restart on Enter key
      rl.question('', () => {
        animateRobot();
      });
    }
  }, 500); // Frame rate - 500ms for nice tempo
}

// Start the animation
console.log(`\n${colors.bright}${colors.yellow}Welcome to the Dancing Robot Show!${colors.reset}`);
console.log(`${colors.cyan}Get ready for an amazing robot dance performance${colors.reset}`);
console.log(`\nPress Enter to start the show or Ctrl+C to exit`);

rl.question('', () => {
  animateRobot();
});

// Handle application exit
rl.on('SIGINT', () => {
  console.log(`\n${colors.bright}${colors.green}Exiting Dancing Robot Animation. Goodbye!${colors.reset}`);
  process.exit(0);
});
