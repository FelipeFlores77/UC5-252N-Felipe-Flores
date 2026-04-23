const readline = require('readline-sync')
const hangmanStages = [
    `
      +---+
      |   |
          |
          |
          |
          |
    =========
    `,
    `
      +---+
      |   |
      O   |
          |
          |
          |
    =========
    `,
    `
      +---+
      |   |
      O   |
      |   |
          |
          |
    =========
    `,
    `
      +---+
      |   |
      O   |
     /|   |
          |
          |
    =========
    `,
    `
      +---+
      |   |
      O   |
     /|\\  |
          |
          |
    =========
    `,
    `
      +---+
      |   |
      O   |
     /|\\  |
     /    |
          |
    =========
    `,
    `
      +---+
      |   |
      O   |
     /|\\  |
     / \\  |
          |
    =========
    `
];
const levels = {
    1: {
        name: "easy",
        attempts: 8,
        words: ["House", "Car", "School", "Book", "Water", "Food", "Friend", "Family", "Dog", "Cat", "Teacher", "Student", "Work", "Play", "Study", "Eat", "Drink", "Run", "Walk", "Sleep", "Happy", "Sad", "Big", "Small", "Fast", "Slow", "Day", "Night", "Sun", "Moon", "Computer", "Phone", "Table", "Chair", "Door", "Window", "Street", "City", "Music", "Game"
        ]
    },
    2: {
        name: "Medium",
        attempts: 6,
        words: [
            "airport", "battery", "calendar", "diamond", "engineer",
            "festival", "gallery", "history", "internet", "journey",
            "kitchen", "language", "machine", "natural", "office",
            "package", "quality", "railway", "science", "teacher",
            "universe", "victory", "weather", "xylophone", "yesterday",
            "zoology", "account", "balance", "company", "digital"
        ],
        3: {
            name: "Hard",
            attempts: 5,
            words: ["algorithm", "encryption", "cybersecurity", "blockchain", "virtualization",
                "microprocessor", "authentication", "cryptography", "bandwidth", "firewall",
                "datacenter", "neuralnetwork", "machinelearning", "artificialintelligence", "cloudcomputing",
                "database", "debugging", "framework", "repository", "scalability",
                "interoperability", "nanotechnology", "biometrics", "automation", "programming",
                "operatingsystem", "virtualreality", "augmentedreality", "internetofthings", "deeplearning"]
        }
    }
}


//mostra menu
console.log("=== HANGMAN GAME ====");
console.log("Choose difficulty:");
console.log("1 - Easy");
console.log("2 - Medium");
console.log("3 - Hard");

//lê oque o usuario digitou 
let levelChoice = readline.question("Enter (1/2/3): ");

//tenta pegar o nivel escolhido
//se o usuario digitar algo invalido (ex: 9, abc), usa o nivel 1 como padrao
let level = levels[levelChoice] || levels[1];

//escolher uma palavra aleatoria
//Math.random() gera numero entre 0 e 1
//multiplicamos pelo tamanho do array
//Math.floor() arredonda pra baixo
const choseWord = level.words[Math.floor(Math.random() * level.words.length)].toLowerCase();

//array vazio - vai guardar as letras que o jogador ja tentou
let guessedLetters = [];

//numero de tentativas comeca baseado no nivel
let attempts = level.attempts;

// ==========================
//FUNÇÃO: displayword
// ==========================
//essa função monta a palavra na tela (com _ nas letras escondidas)
function displayWord() {
    // split transforma a string em array
    // *cat - ["c", "a", "t"]

    return choseWord.split("").map((letter) => {
        return guessedLetters.includes(letter) ? letter : "_"
    }).join(" ")

    //map percorre cada letra e retorna um novo array
    //se a letra ja foi descoberta moistra ela
    //se nao mostra "_"

    //coordenador ternario é quase um if else simples
    //condicao ? valorTrue : valorFalse

    //join junta tudo em string novamente com espaço
    //["c","_","t"] -> "c_t"


    

}

//========================
    // FUNCAO IsWordComplete
    //========================

    //verifica se o jogador ja descobriu TODAS as letras

function isWordComplete() {
    return choseWord.split("").every((letter) => guessedLetters.includes(letter));
}

function drawHangman() {
    const stageIndex = hangmanStages.length - 1 - attempts;

    //logica;
    // quato MENOS tentativas mais avancado o desenho

    return hangmanStages[Math.max(0, stageIndex)];

    //Math.max evita indice negativo
}

//==============================
// LOOP PRINCIPAL
//==============================

//enquanto ainda tiver tentativas jogo continua
while (attempts > 0) {
    console.clear();

    console.log(`=== ${level.name.toUpperCase()} MDE ===`)
    console.log(drawHangman());
    console.log("\nWord", displayWord());
    console.log("Attempts left:", attempts);
    console.log("Guessed:", guessedLetters.join(", ") || "none");

    //pega input do jogador
    let guess = readline.question("\nGuess a letter or the full word: ").toLowerCase();

    //toLowerCase transforma tudo em minusculo
    //evita problema tipo "A" != "a"

    //==========================
    //CHUTE DE PALAVRA INTEIRA
    //==========================

    if (guess.length > 1) {
        //se digitou mais de 1 caractere assumimos que é palavra

        if (guess === choseWord) {
            console.log("\nYou guessed the word!");
            break; //sai do loop , venceu
        } else {
            console.log("Wrong word!");
            attempts--; //perde tentativa
            readline.question("Press ENTER...");
            continue; //volta pro inicio do loop
        }
    }

    //=====================
    // VALIDAÇÃO COM REGEX
    //=====================

    if (!guess.match(/^[a-z]$/)) {
        console.log("Type only ONE letter (a-z).");
        readline.question("Press ENTER...");
        continue;

    }

    //========================
    // EVITAR LETRA REPETIDA
    //========================

    if (guessedLetters.includes(guess)) {
        console.log("You already tried that letter.");
        readline.question("Press ENTER...");
        continue;
    }

    //adiciona letra no array
    guessedLetters.push(guess);

    //=======================
    //VERIFICA SE ACERTOU
    //=======================

    if (choseWord.includes(guess)) {
        console.log("Correct");
    } else {
        console.log("Wrong!");
        attempts--;
    }

    //=====================
    //VERIFICA VITORIA
    //=====================

    if (isWordComplete()) {
        console.clear();
        console.log(displayWord());
        console.log("\n You won!");
        break;
    }
    readline.question("Press ENTER...");
}
//========================
//FIM DO JOGO
//========================
//se saiu do jogo porque acabou tentativas,perdeu
if (attempts === 0) {
    console.clear();
    console.log(drawHangman());
    console.log("\nGame over!");
    console.log("The word was:", choseWord);
}