const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let score = 0;

function generateQuestion() {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const ops = ["+", "-", "*"];
  const op = ops[Math.floor(Math.random() * ops.length)];
  let answer;

  switch (op) {
    case "+": answer = num1 + num2; break;
    case "-": answer = num1 - num2; break;
    case "*": answer = num1 * num2; break;
  }

  rl.question(`💡 What is ${num1} ${op} ${num2}? (Type 'quit' to stop): `, (input) => {
    if (input.toLowerCase() === "quit") {
      console.log(`🧾 Final Score: ${score}`);
      rl.close();
      return;
    }

    if (parseInt(input) === answer) {
      console.log("✅ Correct!");
      score++;
    } else {
      console.log(`❌ Wrong! The correct answer was ${answer}.`);
    }

    generateQuestion();
  });
}

console.log("🧠 Math Quiz Time! Type 'quit' to exit.");
generateQuestion();
