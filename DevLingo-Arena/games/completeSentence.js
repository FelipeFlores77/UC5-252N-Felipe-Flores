const readline = require('readline-sync');
const gameState = require('../gameState');

function completeSentence() {

    const sentences = [
        { text: "I ____ a developer.", answer: "am" },
        { text: "She ____ coding now.", answer: "is" },
        { text: "He ____ a mechanic.", answer: "is"},
        { text: "They ____ playing ball.", answer: "are"}
    ];

    sentences.forEach(s => {

        console.log("\nComplete:");
        console.log(s.text);

        let answer = readline.question("Word: ").toLowerCase();

        if(answer === s.answer) {
            console.log("Correct!");
            gameState.addScore(10);
        } else {
            console.log("Wrong! Correct answer:", s.answer);
            gameState.loseLife();
        }

    });

    readline.question("\nPress ENTER to continue...");
}

module.exports = completeSentence;