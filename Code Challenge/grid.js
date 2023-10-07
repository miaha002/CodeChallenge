// Define a class named Grid
class Grid {
  // Constructor function called when a new instance of Grid is created
  constructor(size) {
      this.size = size; // Set the size of the grid
      this.grid = this.generateGrid(); // Generate the grid
  }

  // Function to place a word on the grid
  placeWord(word, startRow, startCol, direction) {
      if (direction === 'horizontal') { // Check if the direction is horizontal
          // Loop through each letter of the word
          for (let letter = 0; letter < word.length; letter++) {
              this.grid[startRow][startCol + letter] = word[letter]; // Place the letter on the grid
          }
      } else if (direction === 'vertical') { // Check if the direction is vertical
          // Loop through each letter of the word
          for (let letter = 0; letter < word.length; letter++) {
              this.grid[startRow + letter][startCol] = word[letter]; // Place the letter on the grid
          }
      } else {
          throw new Error('Invalid direction. Use "horizontal" or "vertical".'); // Throw an error for an invalid direction
      }
  }

  // Function to create a word from the grid
  createWord(startRow, startCol, length, direction) {
      let word = ''; // Initialize an empty string for the word
      let currentRow = startRow; // Set the starting row position
      let currentCol = startCol; // Set the starting column position

      // Loop through the specified length of the word
      for (let letterPosition = 0; letterPosition < length; letterPosition++) {
          if (direction === 'horizontal') { // Check if the direction is horizontal
              word += this.grid[currentRow][currentCol + letterPosition]; // Add the letter to the word
          } else if (direction === 'vertical') { // Check if the direction is vertical
              word += this.grid[currentRow + letterPosition][currentCol]; // Add the letter to the word
          }
      }

      return word; // Return the created word
  }

  // Function to generate a grid filled with empty spaces
  generateGrid() {
      let grid = []; // Initialize an empty array for the grid

      // Loop through the specified size of the grid
      for (let currentSize = 0; currentSize < this.size; currentSize++) {
          let row = []; // Initialize an empty array for a row

          // Loop through the specified size of the grid
          for (let gridSpace = 0; gridSpace < this.size; gridSpace++) {
              row.push(' '); // Add an empty space to the row (Initialize the grid with empty spaces)
          }

          grid.push(row); // Add the row to the grid
      }

      return grid; // Return the generated grid
  }

  // Function to add a word to the grid from a predefined list
  addWordFromList(word) {
      if (word.length === this.size) { // Check if the word length matches the size of the grid
          this.placeWord(word, 0, 0, 'horizontal'); // Place the word horizontally on the grid
          this.placeWord(word, 0, 0, 'vertical'); // Place the word vertically on the grid
          return true; // Return true if the word was successfully added
      }

      return false; // Return false if the word length doesn't match the grid size
  }

  // Function to display the grid
  displayGrid() {
      for (let row of this.grid) {
          console.log(row.join(' ')); // Print each row of the grid with spaces between the letters
      }
  }
}

module.exports = Grid; // Export the Grid class