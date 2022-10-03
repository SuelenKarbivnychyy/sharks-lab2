const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const WORDS = [
  'strawberry',
  'orange',
  'apple',
  'banana',
  'pineapple',
  'kiwi',
  'peach',
  'pecan',
  'eggplant',
  'durian',
  'peanut',
  'chocolate',
];

let numWrong = 0;



// Loop over the chars in `word` and create divs.
//

const createDivsForChars = (word) => {
  const wordContainer = document.querySelector('#word-container');
  for (const letter of word) {
    wordContainer.insertAdjacentHTML('beforeend', `<div class="letter-box ${letter}"></div>`);
  }
};

// Loop over each letter in `ALPHABET` and generate buttons.
//
const generateLetterButtons = () => {
  const letterButtonContainer = document.querySelector('#letter-buttons');
  for (const char of ALPHABET) {
    letterButtonContainer.insertAdjacentHTML('beforeend', `<button>${char}</button>`);
  }
};

// Set the `disabled` property of `buttonEl` to `true.
//
// `buttonEl` is an `HTMLElement` object.
//
const disableLetterButton = (buttonEl) => {
  buttonEl.disabled = true;
};

// Return `true` if `letter` is in the word.
//
const isLetterInWord = (letter) => document.querySelector(`div.${letter}`) !== null;

// Called when `letter` is in word. Update contents of divs with `letter`.
//
const handleCorrectGuess = (letter) => {  
  //check if user's won the game
  
  let correctGuess = document.querySelectorAll(`.letter-box.${letter}`);
  // console.log(correctGuess);

  for (element of correctGuess) {    
    element.innerHTML = letter;
  }

  if (winnerNewGame() === true) {
    document.getElementById('win').style.display = "";    
  }
};

//
// Called when `letter` is not in word.
//
// Increment `numWrong` and update the shark image.
// If the shark gets the person (5 wrong guesses), disable
// all buttons and show the "play again" message.

const handleWrongGuess = () => {
  numWrong += 1;  
  
  let imgPath = `/static/images/guess${numWrong}.png`;    //setting the new path for the htnl img
  let sharkImg = document.querySelector('img');          //Getting the img using querySelector
  sharkImg.src = imgPath;                               //Setting the src from html to be the new path
  // console.log(imgPath)
  
  if (numWrong == 5) {
    let disableButton = document.querySelectorAll(`button`);
    // console.log(disableButton)
    for (button of disableButton){
      disableLetterButton(button);
    } 
  document.getElementById("play-again").style.display = "";
            
  }
};

//  Reset game state. Called before restarting the game.
const resetGame = () => {
  window.location = '/sharkwords';
};

const winnerNewGame = () => {
  for (const element of document.getElementsByClassName('letter-box')) {
    console.log(element);
    if (element.innerHTML === "" ){
      return false
    };    
  };
  return true;
};

// This is like if __name__ == '__main__' in Python
//
(function startGame() {
  // For now, we'll hardcode the word that the user has to guess.
  const word = 'hello';

  createDivsForChars(word);
  generateLetterButtons();
  

  for (const button of document.querySelectorAll('button')) {
    button.addEventListener('click', () => { 
      let letterGuess = button.innerHTML;
      disableLetterButton(button);

      if (word.includes(letterGuess)) {
        handleCorrectGuess(letterGuess);      //calling the correctguess function inside other function
      } else {
        handleWrongGuess();
      }

    });
  
    // add an event handler to handle clicking on a letter button
  let reeStartGame = document.getElementById("play-again");
  // console.log(reeStartGame)
  reeStartGame.addEventListener('click', () => {
    resetGame();
  });
    
  }

  // add an event handler to handle clicking on the Play Again button
  let playAgain = document.getElementById('win');
  playAgain.addEventListener('click', () => {
    resetGame();
  });

})();
