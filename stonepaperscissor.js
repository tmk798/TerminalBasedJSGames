const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const choices = ['stone', 'paper', 'scissors'];

function playGame() {
  rl.question('Choose stone, paper, or scissors (type "exit" to quit): ', (userChoice) => {
    if (userChoice.toLowerCase() === 'exit') {
      console.log('Goodbye!');
      rl.close();
      return;
    }

    if (!choices.includes(userChoice.toLowerCase())) {
      console.log('Invalid choice. Please choose stone, paper, or scissors.');
      playGame();
      return;
    }

    const computerChoice = choices[Math.floor(Math.random() * 3)];
    console.log(`Computer chose: ${computerChoice}`);

    if (userChoice.toLowerCase() === computerChoice) {
      console.log('It\'s a tie!');
    } else if (
      (userChoice.toLowerCase() === 'stone' && computerChoice === 'scissors') ||
      (userChoice.toLowerCase() === 'paper' && computerChoice === 'stone') ||
      (userChoice.toLowerCase() === 'scissors' && computerChoice === 'paper')
    ) {
      console.log('You win!');
    } else {
      console.log('You lose!');
    }

    playGame();
  });
}

playGame();
