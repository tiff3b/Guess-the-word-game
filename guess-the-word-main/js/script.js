//ul list
const guessedLettersList = document.querySelector(".guessed-letters");
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
//array to hold all guessed letters
const guessedLetters = [];

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
    // empty message text
    message.innerText = "";
    //capture value of input
    const guess = letterInput.value;
    //validate input for button handler
    const attemptGuess = playerGuess(guess); 
    //pass to capture input
    if (attemptGuess) {
            makeGuess(guess);    
            }    
    //empty value of input
    letterInput.value = "";    
});
// function to check players input
const playerGuess = function (input) {
    //regular expression to insure player enters a letter
    const acceptedLetter = /[a-zA-Z]/;
    //check if input is empty
    if (input.length === 0){
        message.innerText = "Please enter a letter";
    //check if more than 1 letter is entered
    } else if (input.length > 1) {
        message.innerText = "Please enter one letter only";
    //check if something other than a letter is entered.
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Enter a letter from A to Z";
    } else {
        return input;
    }
};

//capture the input
const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    //display if player guessed letter already
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed this letter, try again.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
};