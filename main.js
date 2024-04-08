// letters
const letters = "abcdefghijklmnopqrstuvwxyz!@#$%^&*+-*/";

// get array from letters

let lettersArray = Array.from(letters);

// select letters container
let lettersContainer = document.querySelector(".letters");

//generate letters
lettersArray.forEach((letter) => {
  //create span
  let span = document.createElement("span");

  //create letter text node
  let theLetter = document.createTextNode(letter);

  //append the letter to span
  span.appendChild(theLetter);

  //add class on sapn
  span.className = "letter-box";

  //append sapn to the letters container
  lettersContainer.appendChild(span);
});

//* Object Of Words + Categories

const words = {
  programming: [
    "Python",
    "Java",
    "C#",
    "JavaScript",
    "Ruby",
    "PHP",
    "C++",
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
  movies: [
    "The Shawshank Redemption",
    "The Godfather",
    "The Dark Knight",
    "Pulp Fiction",
    "The Good the Bad and the Ugly",
    "Forrest Gump",
    "Fight Club",
    "Inception",
    "Star Wars",
    "The Matrix",
    "Goodfellas",
    "One Flew Over the Cuckoo Nest",
  ],
  people: [
    "Marilyn Monroe",
    "Abraham Lincoln",
    "Nelson Mandela",
    "Queen Elizabeth II",
    "John F. Kennedy",
    "Martin Luther King",
    "Winston Churchill",
    "Donald Trump",
    "Bill Gates",
    "Muhammad Ali",
    "Mahatma Gandhi",
    "Mother Teresa",
    "Christopher Columbus",
    "Charles Darwin",
    "Elvis Presley",
    "Albert Einstein",
    "Paul McCartney",
    "Queen Victoria",
    "Pope Francis",
    "Jawaharlal Nehru",
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

//* Get Random Property

let allKeys = Object.keys(words);
// Random Number Depend On Keys Lengthh
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
// Category
let randomPropName = allKeys[randomPropNumber];
// Category Words
let randomPropValue = words[randomPropName];
// Random Number Depend on Words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
// The Chossen Word
let randomValueValue = randomPropValue[randomValueNumber];
console.log(randomValueValue); //* To See on the console what The Answer Is

//* Set Category Info  inside the HTML Document
document.querySelector(".game-info .category span").innerHTML = randomPropName;

//* Select Letters Guess Element
let lettersGuessContainer = document.querySelector(".letters-guess");

//* Convert Chosen Word To Array
let lettersAndSpace = Array.from(randomValueValue);

//* Create Spans Depend On Words
lettersAndSpace.forEach((letter) => {
  // Create Empty Span
  let emptySpan = document.createElement("span");

  //IF letter is Space
  if (letter === " ") {
    //* Add Class The Span
    emptySpan.className = "with-space";
  }

  // Append Span To The Letters Guess Container
  lettersGuessContainer.appendChild(emptySpan);
});

//* Select Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span ");


//* Set Wrong Attempts 
let worngAttempts = 0;

//* Select The Draw Elemnt
let theDraw = document.querySelector(".hangman-draw");

//* Handle Clicking On Letters
document.addEventListener("click", (e) => {
  //* Set The Chose Status
  let theStatus = false;

  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    //* Get Clicked Letter
    let theClickedLetter = e.target.innerHTML.toLowerCase();

    // The chosen word
    let theChosenWord = Array.from(randomValueValue.toLowerCase());
    theChosenWord.forEach((wordLetter, wordIndex) => {
      //* If The Clicked Letter Equal To One Of The Chosen Word Letter

      if (theClickedLetter === wordLetter) {
        //* Set The Status To true
        theStatus = true;

        //* loop on all guess spans
        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = theClickedLetter;
          }
        });
      }
    });

    // Outside Loop
    // If letter is wrong 
    if (theStatus!==true) {
      // Increase the wrong attempts 
      worngAttempts++;
      
      // Add Class Wrong on the draw 
      theDraw.classList.add(`wrong-${worngAttempts}`);

      // Play Fail Sound 
      document.getElementById("fail").play()

      if (worngAttempts === 8) {
        endGame();

        lettersContainer.classList.add("finished");
      }
    }
    else {
      document.getElementById("success").play();
    }
  }
});


//*End Game Function 

function endGame() {
  //Create popup Div 
  let div = document.createElement("div");

  // Create text 
  let divText = document.createTextNode(`Game Over, The Word Is ${randomValueValue}`)

  // Append Text To Div 
  div.appendChild(divText)
  // Add Class On Div 
  div.className = 'popup';

  //Append To The Body 
  document.body.appendChild(div);

}