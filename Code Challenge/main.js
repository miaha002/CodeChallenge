const readline = require('readline');
const fs = require('fs');
const Grid = require('./Grid.js'); // Import the Grid class from grid.js

// Read and preprocess word list
function loadWordList() {
  const wordList = fs.readFileSync('wordlist.txt', 'utf-8').split('\n');
  return new Set(wordList.map(word => word.trim()));
}

const validWordsSet = loadWordList();

  // Define a function named 'canFormWord' that takes two parameters: 'word' (the target word) and 'letters' (an array of available letters).
function canFormWord(word, letters) {
  // Create a new Map(key value pairs) object to store the counts of each letter.
  const letterCounts = new Map();

  // Loop through each 'letter' in the 'letters' array.
  for (const letter of letters) {
    // For each 'letter', set its count in the Map.
    // If the letter is not yet in the Map, default to 0 and increment by 1.
    letterCounts.set(letter, (letterCounts.get(letter) || 0) + 1);
  }

  // Loop through each 'char' (character) in the 'word'.
  for (const char of word) {
    // Check if the 'char' is present in the Map, and if its count is greater than 0.
    if (!letterCounts.has(char) || letterCounts.get(char) === 0) {
      // If either condition is not met, it's not possible to form the word.
      return false;
    }
    // Reduce the count of the 'char' in the Map, indicating that one instance has been used.
    letterCounts.set(char, letterCounts.get(char) - 1);
  }

  // If all characters in 'word' can be formed using the available letters, return true.
  return true;
}


function getRandomWord(length, letters) {
  // Get a list of words from validWordsSet that have the specified length
  const matchingWords = Array.from(validWordsSet).filter(word => word.length === length);

  // Filter further to find words that can be formed with the provided letters
  const possibleWords = matchingWords.filter(word => canFormWord(word, letters));

  // If there are possible words, select a random one
  if (possibleWords.length > 0) {
    const randomIndex = Math.floor(Math.random() * possibleWords.length);
    return possibleWords[randomIndex]; // Return a randomly selected word
  }

  // If no possible words were found, return null
  return null; // Indicate that no valid word was found
}


function getUserInput() {
  const UserInput = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return UserInput;
}

// This function populates the grid of the game with characters from the input string.
function populateGrid(game, inputString) {
// Initialize an index to keep track of the position in the input string.
let index = 0;
// Iterate through each row of the grid.
  for (let row = 0; row < game.size; row++) {
    // Iterate through each column of the grid.
    for (let column = 0; column < game.size; column++) {
      // Assign the character at the current index of the input string to the current position in the grid.
      game.grid[row][column] = inputString[index++];
    }
  }
}


// This function initializes a new game grid with the specified size given by the user.
function initializeGame(gridSize) {
  // Create a new Grid object with the given size.
  const game = new Grid(gridSize);

  // Return the newly created game grid.
  return game;
}


// This function attempts to add a random word to the grid.
// It takes the game grid, users input string, and a list of previously used words as arguments.
function addRandomWordToGrid(game, inputString, usedWords) {

  // Extract the first letter from the set list of valid words.
  const firstLetter = Array.from(validWordsSet)[0]?.[0];

  // Check if a valid first letter is found.
  if (firstLetter) {

    // Attempt to retrieve a random word from the list.
    const word = getRandomWord(game.size, inputString);

    // If a valid word is found.
    if (word) {

      // Add the word to the game grid.
      game.addWordFromList(word);

      // Add the word to the list of used words so it can't be used again.
      usedWords.push(word);
    } else {

      // Log a message if no valid word is found.
      throw new Error('No valid word found.');
    }
  } else {

    // Log a message if no words are found in the list.
    throw new Error('No words found in the list.');
  }
}


function StringInput(UserInput, gridSize) {
  // Prompt the user to enter a string of specified length
  UserInput.question(`Enter ${gridSize * gridSize} letters to populate the grid: `, (inputString) => {
    // Check if the input string is of the correct length
    if (inputString.length !== gridSize * gridSize) {
      // If not, display an error message
      console.log(`Error: Invalid input. The length of the string should be ${gridSize * gridSize} characters long.`);
      // Prompt the user again
      StringInput(UserInput, gridSize);
      return; // Exit the current function call
    }

    // Initialize a new game grid
    const game = initializeGame(gridSize);
    // Populate the game grid with the input string
    populateGrid(game, inputString);
    // Add a random word to the grid
    addRandomWordToGrid(game, inputString, usedWords);
    // Display the game grid
    game.displayGrid();
    // Close the user input interface
    UserInput.close();
  });
}


// Define the function startGame.
function startGame() {
  // Call getUserInput to get a readline interface.
  const UserInput = getUserInput();

  // Ask the user to enter the size of the grid.
  UserInput.question('Enter the size of the grid (minimum 4): ', (size) => {
    // Parse the input as an integer to get the gridSize.
    const gridSize = parseInt(size);

    // Check if gridSize is not a number less than 4.
    if (isNaN(gridSize) || gridSize < 4) {
      // Print an error message for invalid input.
      console.log('Error: Invalid input. Please enter a positive number greater than or equal to 4.');

      // Call startGame recursively to prompt the user again.
      startGame();

      // Exit the current function scope.
      return;
    }

    // If gridSize is valid, call StringInput function.
    StringInput(UserInput, gridSize);
  });
}

// Initialize an empty array used to store words it has used already.
let usedWords = [];

// Call the startGame function to initiate the game
startGame();

module.exports = {
  loadWordList,
  canFormWord,
  getRandomWord
};