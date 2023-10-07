HOW TO RUN AND PLAY:
Download and Install Node.js:

Ensure you have a file named wordlist.txt containing a list of words, each on a separate line. This file should be in the same directory as main.js

Open a terminal or command prompt on your computer.

Use the cd command to navigate to the directory where you have saved the game files.

Type the following command to start the game: node main.js.
This will initiate the game and prompt you for the size of the grid [n x n] (minimum 4).

Input the size of the grid and press Enter.

You will be asked to enter a set of letters to populate the grid. The number of letters should match the size of the grid squared. For example, if the grid size is 4, 
you need to provide 16 letters.

The program will generate a grid using the provided letters and attempt to add a random valid word to the grid from the wordlist.txt that will fit the size of the grid horizontally
and vertically, but no diagonally.

The program will display the grid with the letters placed in it.

If you want to play again, restart the game by typing node main.js in the terminal.

------------------------------------------------------------------------------

HOW TO RUN TESTS
Step 1: Install Mocha and Chai
npm install mocha chai --save-dev

Step 2: Run Test Cases
To run test cases, use the following command in your terminal:
npx mocha
