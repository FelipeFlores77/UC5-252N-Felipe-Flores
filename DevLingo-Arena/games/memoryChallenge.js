const readline = require("readline-sync");
const gameState = require("../gameState");

function memoryChallenge() {
  const words = [
    ["code", "debug", "function", "variable"],
    ["console", "terminal", "while", "switch"],
    
];



  words.forEach(w => {
    console.log("Memorize these words: ");
    console.log(w.join(" | "));

    readline.question("\nPress ENTER when you are ready!");

    console.clear();

    let answer = readline.question(
      "Write the words you remember separated by comma:"
    );

    

    if (answer === w.join(", ")) {
      console.log("Correct!");
      gameState.addPoints(10);
    } else {
      console.log(`Wrong! The right answer is '${w.join(", ")}'`);
      gameState.loseLife();
    }
  });
}

module.exports = memoryChallenge;
