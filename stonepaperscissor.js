const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const choices = ["stone", "paper", "scissors"];

console.log("🪨📄✂️ Welcome to Stone Paper Scissors!");
console.log("Type 'quit' to exit anytime.");
console.log("Rules:");
console.log("- Stone beats Scissors");
console.log("- Paper beats Stone");
console.log("- Scissors beats Paper");
console.log("- Same choice = Draw\n");

function playGame() {
  rl.question("Enter your choice (stone, paper, scissors, or quit): ", function (userInput) {
    const userChoice = userInput.toLowerCase();

    if (userChoice === "quit") {
      console.log("👋 Thanks for playing!");
      rl.close();
      return;
    }

    if (!choices.includes(userChoice)) {
      console.log("❌ Invalid choice! Please enter stone, paper, or scissors.");
      return playGame();
    }

    const computerChoice = choices[Math.floor(Math.random() * 3)];
    console.log(`💻 Computer chose: ${computerChoice}`);

    if (userChoice === computerChoice) {
      console.log("🤝 It's a draw!");
    } else if (
      (userChoice === "stone" && computerChoice === "scissors") ||
      (userChoice === "paper" && computerChoice === "stone") ||
      (userChoice === "scissors" && computerChoice === "paper")
    ) {
      console.log("🎉 You win!");
    } else {
      console.log("💻 Computer wins!");
    }

    console.log(); // Line break
    playGame();
  });
}

playGame();
