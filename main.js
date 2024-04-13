/**
 * Hangman Game
 *
 * This script generates a simple hangman game where the player
 * guesses letters to reveal a hidden word from predefined categories.
 * The game provides feedback on correct and incorrect guesses,
 * and displays a popup when the game ends.
 */

// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// Get Array From Letters
let lettersArray = Array.from(letters);

// Select Letters Container
let lettersContainer = document.querySelector(".letters");

// Generate Letters
lettersArray.forEach((letter) => {
  // Create Span
  let span = document.createElement("span");

  // Create Letter Text Node
  let theLetter = document.createTextNode(letter);

  // Append The Letter To Span
  span.appendChild(theLetter);

  // Add Class On Span
  span.className = "letter-box";

  // Append Span To The Letters Container
  lettersContainer.appendChild(span);
});

// Object Of Words + Categories
const words = {
  programming: [
    "Python",
    "Java",
    "JavaScript",
    "Ruby",
    "Swift",
    "Go",
    "Kotlin",
    "Rust",
    "TypeScript",
    "Scala",
    "Perl",
    "Haskell",
    "Lua",
    "Erlang",
    "Clojure",
    "Dart",
    "SQL",
  ],

  countries: [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
  ],
};

// Get Random Property

let allKeys = Object.keys(words);

// Random Number Depend On Keys Length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);

// Category
let randomPropName = allKeys[randomPropNumber];

// Category Words
let randomPropValue = words[randomPropName];

// Random Number Depend On Words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

// The Chosen Word
let randomValueValue = randomPropValue[randomValueNumber];

// Set Category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// Select Letters Guess Element
let lettersGuessContainer = document.querySelector(".letters-guess");

// Convert Chosen Word To Array
let lettersAndSpace = Array.from(randomValueValue);

// Create Spans Depened On Word
lettersAndSpace.forEach((letter) => {
  // Create Empty Span
  let emptySpan = document.createElement("span");

  // If Letter Is Space
  if (letter === " ") {
    // Add Class To The Span
    emptySpan.className = "with-space";
  }

  // Append Span To The Letters Guess Container
  lettersGuessContainer.appendChild(emptySpan);
});

// Select Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span");

// Set Wrong Attempts
let wrongAttempts = 0;

// Select The Draw Element
let theDraw = document.querySelector(".hangman-draw");

// Handle Clicking On Letters
document.addEventListener("click", (e) => {
  // Set The Choose Status
  let theStatus = false;

  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    // Get Clicked Letter
    let theClickedLetter = e.target.innerHTML.toLowerCase();

    // The Chosen Word
    let theChosenWord = Array.from(randomValueValue.toLowerCase());

    theChosenWord.forEach((wordLetter, WordIndex) => {
      // If The Clicked Letter Equal To One Of The Chosen Word Letter
      if (theClickedLetter == wordLetter) {
        // Set Status To Correct
        theStatus = true;

        // Loop On All Guess Spans
        guessSpans.forEach((span, spanIndex) => {
          if (WordIndex === spanIndex) {
            span.innerHTML = theClickedLetter;
          }
        });
      }
    });

    // Outside Loop

    // If Letter Is Wrong
    if (theStatus !== true) {
      // Increase The Wrong Attempts
      wrongAttempts++;

      // Add Class Wrong On The Draw Element
      theDraw.classList.add(`wrong-${wrongAttempts}`);

      // Play Fail Sound
      document.getElementById("fail").play();

      if (wrongAttempts === 8) {
        endGame(false);
        lettersContainer.classList.add("finished");
      }
    } else {
      // Play Success Sound
      document.getElementById("success").play();

      // Check if all letters are guessed correctly
      let allLettersGuessed = true;
      guessSpans.forEach((span) => {
        if (span.innerHTML === "") {
          allLettersGuessed = false;
        }
      });
      if (allLettersGuessed) {
        endGame(true);
      }
    }
  }
});

/**
 * End Game Function
 *
 * This function handles the end of the game by displaying a popup
 * message. It takes a parameter 'isWinner' to determine whether the
 * player has won or lost.
 *
 * @param {boolean} isWinner - Indicates whether the player has won.
 */
function endGame(isWinner) {
  // Create Popup Div
  let div = document.createElement("div");

  // Create Text
  let divText;
  if (isWinner) {
    divText = document.createTextNode("Congratulations! You won!");
    div.className = "win-popup";
  } else {
    divText = document.createTextNode(
      `Game Over, The Word Is ${randomValueValue}`
    );
    // Add Class On Div
    div.className = "popup";
  }

  // Append Text To Div
  div.appendChild(divText);

  // Append To The Body
  document.body.appendChild(div);
}

console.log(randomValueValue);
