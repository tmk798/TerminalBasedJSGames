const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function playRound() {
  const number = Math.floor(Math.random() * 100);
  rl.question(`🔢 Is ${number} even or odd? (Type 'even' or 'odd', or 'quit'): `, (input) => {
    if (input.toLowerCase() === 'quit') {
      console.log("👋 Thanks for playing!");
      rl.close();
      return;
    }

    const isEven = number % 2 === 0;
    if ((isEven && input === "even") || (!isEven && input === "odd")) {
      console.log("✅ Correct!");
    } else {
      console.log(`❌ Wrong! It was ${isEven ? "even" : "odd"}.`);
    }

    playRound();
  });
}

console.log("⚡ Welcome to Even or Odd game! Type 'quit' to stop.");
playRound();
