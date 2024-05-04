//selecting necessary elements from the DOM

const inputs = document.querySelector(".inputs"),
  hintTag = document.querySelector(".hint span"),
  guessLeft = document.querySelector(".guess-left span"),
  wrongLetter = document.querySelector(".wrong-letter span"),
  resetBtn = document.querySelector(".reset-btn"),
  typingInput = document.querySelector(".typing-input");


// creat empty arrays and the necessary information has been called in the word.js
let word,
  maxGuesses,
  incorrectLetters = [],
  correctLetters = [];

  //function to select a random word and initialize the game
function randomWord() {
  let ranItem = wordList[Math.floor(Math.random() * wordList.length)];
  word = ranItem.word;
  maxGuesses = word.length >= 6 ? 5 : 3;
  correctLetters = [];
  incorrectLetters = [];
  // displaying hint, remaining guesses, and clearing previous inputs
  hintTag.innerText = ranItem.hint;
  guessLeft.innerText = maxGuesses;
  wrongLetter.innerText = incorrectLetters;

  // generating input elements for each letter of the word
  let html = "";
  for (let i = 0; i < word.length; i++) {
    html += `<input type="text" disabled>`;
    inputs.innerHTML = html;
  }
}
randomWord(); // calling the function and start the game

// function to handle user input and check guesses
function initGame(e) {
  let key = e.target.value.toLowerCase();
  // checking if the input is a letter, not guessed before, and not incorrect
  if (
    key.match(/^[A-Za-z]+$/) &&
    !incorrectLetters.includes(` ${key}`) &&
    !correctLetters.includes(key)
  ) {
     // if the letter is in the word, update correctLetters array and display it
    if (word.includes(key)) {
      for (let i = 0; i < word.length; i++) {
        if (word[i] == key) {
          correctLetters += key;
          inputs.querySelectorAll("input")[i].value = key;
        }
      }
    } else {
      maxGuesses--;
      incorrectLetters.push(` ${key}`);
    }
    // update remaining guesses and display incorrect letters
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrectLetters;
  }
  // clear input
  typingInput.value = "";

  // checking for game end conditions after a short delay
  setTimeout(() => {
    if (correctLetters.length === word.length) {
      Swal.fire(`You are a genius!. The word is: ${word.toUpperCase()}`);
      return randomWord();
    } else if (maxGuesses < 1) {
      Swal.fire("Game over! Loserrr😎");
      for (let i = 0; i < word.length; i++) {
        inputs.querySelectorAll("input")[i].value = word[i];
      }
    }
  }, 100);
}

resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());
