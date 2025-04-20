const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const code = Math.floor(1000 + Math.random() * 9000).toString();
const digits = code.split('');

// Randomly pick 2 digits as a hint
const shuffled = [...digits].sort(() => 0.5 - Math.random());
const knownDigits = shuffled.slice(0, 2).join('');
console.log("💣 Defuse the bomb! Guess the 4-digit code.");
console.log("⏱️ You have 20 seconds and unlimited attempts!");
console.log(`🧩 HINT: These digits are definitely in the code → ${knownDigits}`);

const startTime = Date.now();
const timeLimit = 20000;

function ask() {
  const timeLeft = timeLimit - (Date.now() - startTime);
  if (timeLeft <= 0) {
    console.log("\n💥 Time's up! The bomb exploded! The correct code was: " + code);
    rl.close();
    return;
  }

  rl.question("⏳ Enter your 4-digit code guess: ", (input) => {
    if (input === code) {
      console.log("🎉 Bomb defused! You win!");
      rl.close();
      return;
    }

    if (!/^\d{4}$/.test(input)) {
      console.log("❌ Enter a valid 4-digit number.");
    } else {
      // Give hint: higher/lower for each digit
      let hint = '';
      for (let i = 0; i < 4; i++) {
        if (input[i] < code[i]) hint += `Digit ${i + 1} is 🔼 higher\n`;
        else if (input[i] > code[i]) hint += `Digit ${i + 1} is 🔽 lower\n`;
        else hint += `Digit ${i + 1} is ✅ correct\n`;
      }
      console.log(hint.trim());
    }

    ask(); // ask again until time runs out
  });
}

ask();
