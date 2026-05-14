const readline = require('readline-sync');
const gameState = require('../gameState');

function detectiveStory() {

    console.log("\nYou are a detective solving a mystery.");

    console.log("\nChoose the correct word:");
    console.log("The suspect ____ nervous.");

    console.log("1) look");
    console.log("2) looks");
    console.log("3) looking");

    let answer = readline.question("Option: ");

    if(answer === "2") {
        console.log("Clue discovered!");
        gameState.addScore(15);
    } else {
        console.log("Wrong clue!");
        gameState.loseLife();
    }

    readline.question("\nPress ENTER to continue...");
}

module.exports = detectiveStory;