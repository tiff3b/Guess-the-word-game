const guessedLettersList = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const guessesLeft = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";

let guessedLetters = [];

let remainingGuesses = 8;

const getWord = async function () {
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await res.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    wordSymbols(word);
};
getWord();

const wordSymbols = function (word) {
    const symbols = [];
    for (const letter of word) {
        console.log(letter);
        symbols.push("⚫");
    }
    wordProgress.innerText = symbols.join("");
};

wordSymbols(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = "";
    const guess = letterInput.value;
    const attemptGuess = playerGuess(guess);
    if (attemptGuess) {
        makeGuess(guess);
    }
    letterInput.value = "";
});
const playerGuess = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Please enter a letter";
    } else if (input.length > 1) {
        message.innerText = "Please enter one letter only";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Enter a letter from A to Z";
    } else {
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed this letter, try again.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        wrongGuess();
        countRemainingGuesses(guess);
        wordInProgress(guessedLetters);
    }
};

const wrongGuess = function () {
    guessedLettersList.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersList.append(li);
    }
};

const wordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("⚫");
        }
    }
    wordProgress.innerText = revealWord.join("");
    playerWin();
};

const countRemainingGuesses = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `The word does not have this letter`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Woo hoo! You got a letter!`;
    }
    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
        startOver();
    } else if
        (remainingGuesses === 1) {
        guessesLeft.innerText = `${remainingGuesses} guess`;
    }
    else {
        guessesLeft.innerText = `${remainingGuesses} guesses`;
    }


};

const playerWin = function () {
    if (word.toUpperCase() === wordProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
        startOver();
    }
};

const startOver = function () {
    guessButton.classList.add("hide");
    remaining.classList.add("hide");
    guessesLeft.classList.add("hide");
    guessedLettersList.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
    message.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    guessesLeft.innerText = `${remainingGuesses} guesses`;
    guessedLettersList.innerHTML = "";
    message.innerText = "";

    getWord();

    guessButton.classList.remove("hide");
    remaining.classList.remove("hide");
    guessesLeft.classList.remove("hide");
    guessedLettersList.classList.remove("hide");
    playAgainButton.classList.add("hide");

});
