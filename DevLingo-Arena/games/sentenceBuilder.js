const readline = require('readline-sync');
const gameState = require('../gameState');

function sentenceBuilder() {
    const Challenge = [
        {
            words: ["developer", "is", "he", "a"]
        },
        {
            words: ["a", "singer", "is", "she"]
        },
        {
            words: ["at", "unisinos", "offer", "SENAC", "we", "courses"]
        }
    ]

    Challenge.forEach(c => {

        console.log("Reorder the words to form a setence");
        console.log(c.words.join(" | "))

        let answer = readline.question("Write the setence in the right order")

        if (answer === c.answer) {
            console.log("Correct");
            console.log.addPoints(10)
        } else {
            console.log(`Wrong! The right answer is $(c.answer)`);
            gameState.loseLife()
        }
    })}
module.exports = sentenceBuilder;