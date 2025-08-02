//ul list
const guessedLettersList = document.querySelector(".guessed-letters");
//button
const guessButton = document.querySelector(".guess");
//text input
const letterInput = document.querySelector(".letter");
//empty paragraph where word in progress will appear
const wordProgress = document.querySelector(".word-in-progress");
//display of remaining guesses
const remaining = document.querySelector(".remaining");
//span where the remaining guesses will display
const guessesLeft = document.querySelector(".remaining span");
//messeages will appear when player guesses a letter
const message = document.querySelector(".message");
//play again button
const playAgainButton = document.querySelector(".play-again");

//test word
let word = "magnolia";
//array to hold all guessed letters
let guessedLetters = [];

// set number of guesses the play gets
let remainingGuesses = 8;

const getWord = async function () {
    const res = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await res.text();
    const wordArray = words.split("\n");
    //console.log(wordArray);
    // pick a random index
    const randomIndex = Math.floor(Math.random() *wordArray.length);
    //remove stray whitespace or newline characters
    word = wordArray[randomIndex].trim();
    wordSymbols(word);
};
getWord();


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
    guess= guess.toUpperCase();
    //display if player guessed letter already
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed this letter, try again.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        //call so letter displays if it hasn't been guessed
        wrongGuess();
        countRemainingGuesses(guess);
        //call so letter displays if correct guess
        wordInProgress(guessedLetters);
    }
};

//show guessed letters on screen
const wrongGuess = function (){
    //empty ul
    guessedLettersList.innerHTML = "";
    //create and add new li
    for (const letter of guessedLetters){
        const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersList.append(li);
    }
};

//show word in progress
const wordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    //split word string into an array
    const wordArray = wordUpper.split("");
    const revealWord = [];
    //check if word array contains letters from the guessed letters
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)){
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("⚫");
        }
    }
    //update the empty array where the word in progress is
        wordProgress.innerText = revealWord.join("");  
        playerWin();  
};

//change # of guesses line
const countRemainingGuesses = function (guess){
   const upperWord = word.toUpperCase();
        if (!upperWord.includes(guess)){
            message.innerText = `The word does not have this letter`;
            remainingGuesses -= 1;
        } else {
           message.innerText = `Woo hoo! You got a letter!`;            
        }        
        if (remainingGuesses === 0){
           message.innerHTML =  `Game over! The word was <span class="highlight">${word}</span>.`;
           //call to remove old game info if start over button is clicked
           startOver();
    }   else if 
        (remainingGuesses === 1){
            guessesLeft.innerText = `${remainingGuesses} guess`;
        }
        else {
            guessesLeft.innerText = `${remainingGuesses} guesses`;
        }

    
};

//player wins
const playerWin = function (){
    if (word.toUpperCase() === wordProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
        // call to remove old game info if start over button is clicked
        startOver();
    }
};

const startOver = function (){
    guessButton.classList.add("hide");
    remaining.classList.add("hide");
    guessesLeft.classList.add("hide");
    guessedLettersList.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function (){
    // reset values and grab a new word
    message.classList.remove("win");
    guessedLetters= [];
    remainingGuesses = 8;
    guessesLeft.innerText = `${remainingGuesses} guesses`;
    guessedLettersList.innerHTML = "";
    message.innerText = "";

    //get a new word
    getWord();

    //show original game settings
    guessButton.classList.remove("hide");
    remaining.classList.remove("hide");
    guessesLeft.classList.remove("hide");
    guessedLettersList.classList.remove("hide");
    playAgainButton.classList.add("hide");

});
