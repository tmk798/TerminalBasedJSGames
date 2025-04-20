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
      console.log("❌ Please enter a valid number.");
      return askGuess();
    }

    if (guess === target) {
      console.log("🎉 Correct! You guessed the number!");
      rl.close();
    } else if (guess < target) {
      console.log("🔼 Too low. Try again.");
      askGuess();
    } else {
      console.log("🔽 Too high. Try again.");
      askGuess();
    }
  });
}

askGuess();
