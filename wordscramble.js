const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const words = ["javascript", "node", "terminal", "game", "coding"];
const word = words[Math.floor(Math.random() * words.length)];
const scrambled = word.split('').sort(() => 0.5 - Math.random()).join('');

console.log("💡 Unscramble the word!");
console.log(`🔀 Scrambled word: ${scrambled}`);

rl.question("Your guess: ", (input) => {
  if (input.toLowerCase() === word) {
    console.log("🎉 Correct! You're smart!");
  } else {
    console.log(`❌ Wrong! The correct word was "${word}"`);
  }
  rl.close();
});
