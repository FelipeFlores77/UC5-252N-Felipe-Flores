const readline = require('readline-sync');
const gameState = require('../gameState');

function quiz() {

    const questions = [
        {
            question: "She ____ my friend.",
            options: ["1) am", "2) is", "3) are"],
            answer: "2"
        },
        {
            question: "They ____ students.",
            options: ["1) is", "2) are", "3) am"],
            answer: "2"
        },
        {
            question: "We ____ taking a TDS course.",
            options: ["1) are", "2) am", "3) is"],
            answer: "2"
        },
        {
            question: "He and I ____ the same genre of music.",
            options: ["1) likies", "2) likes", "3) like"],
            answer: "3"
        }
    ];

    questions.forEach(q => {

        console.log("\n" + q.question);
        q.options.forEach(opt => console.log(opt));

        let answer = readline.question("Answer: ");

        if(answer === q.answer) {
            console.log("Correct!");
            gameState.addScore(10);
        } else {
            console.log("Wrong!");
            gameState.loseLife();
        }

    });

    readline.question("\nPress ENTER to continue...");
}

module.exports = quiz;