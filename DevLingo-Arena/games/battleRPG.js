const readline = require('readline-sync');
const gameState = require('../gameState');

function battleRPG() {

    let enemyHP = 30;

    console.log("\nA Grammar Monster appears!");

    while(enemyHP > 0) {

        console.log("\nEnemy HP:", enemyHP);
        console.log("Answer correctly to attack.");

        let answer = readline.question("Past of 'go': ");

        if(answer.toLowerCase() === "went") {
            console.log("Hit!");
            enemyHP -= 10;
            gameState.addScore(10);
        } else {
            console.log("Miss! You got hit.");
            gameState.loseLife();
            break;
        }
    }

    if(enemyHP <= 0) {
        console.log("Monster defeated!");
    }

    readline.question("\nPress ENTER to continue...");
}

module.exports = battleRPG;
