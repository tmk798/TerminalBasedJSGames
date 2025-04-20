const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const target = Math.floor(Math.random() * 100) + 1;
console.log("🎯 Guess the number between 1 and 100!");

function askGuess() {
  rl.question("Your guess: ", (input) => {
    const guess = Number(input);

    if (isNaN(guess)) {
      console.log("❌ Enter a valid number.");
      return askGuess();
    }

    if (guess === target) {
      console.log("🎉 Correct! You win!");
      rl.close();
    } else if (guess < target) {
      console.log("🔼 Too low.");
      askGuess();
    } else {
      console.log("🔽 Too high.");
      askGuess();
    }
  });
}

askGuess();
