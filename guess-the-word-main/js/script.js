//ul list
const guessedLetters = document.querySelector(".guessed-letters");
//button
const guessButton = document.querySelector(".guess");
//text input
const letterInput = document.querySelector(".letter");
//empty paragraph where word in progress will appear
const wordProgress = document.querySelector(".word-in-progress");
//display of remaining guesses
const remainingGuesses = document.querySelector(".remaining");
//span where the remaining guesses will display
const guessesLeft = document.querySelector(".remaining span");
//messeages will appear when player guesses a letter
const message = document.querySelector(".message");
//play again button
const playAgainButton = document.querySelector(".play-again");


//test word
const word = "magnolia";

//add placeholders for letters guessed
const wordSymbols = function (word){
    const symbols = [];
    for (const letter of word) {
        console.log(letter);
        symbols.push("⚫");
    }
    wordProgress.innerText = symbols.join("");
};

wordSymbols(word);

guessButton.addEventListener("click", function (e) {
    //prevent default reloading behavior
    e.preventDefault();
    //capture value of input
    const guess = letterInput.value;
    console.log(guess);
    //empty value of input
    letterInput.value = "";
});