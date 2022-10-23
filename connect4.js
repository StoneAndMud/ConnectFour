/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

 const WIDTH = 7;
 const HEIGHT = 6;

 let currPlayer = 1; // active player: 1 or 2
 let board = []; // array of rows, each row is array of cells  (board[y][x])
 
 /** makeBoard: create in-JS board structure:
  *    board = array of rows, each row is array of cells  (board[y][x])
  */
 function makeBoard() {
   // TODO: set "board" to empty HEIGHT x WIDTH matrix array
   board = [
     [null, null, null, null, null, null, null],
     [null, null, null, null, null, null, null],
     [null, null, null, null, null, null, null],
     [null, null, null, null, null, null, null],
     [null, null, null, null, null, null, null],
     [null, null, null, null, null, null, null],
   ]
 }
 
 /** makeHtmlBoard: make HTML table and row of column tops. */
 function makeHtmlBoard() {
   // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
   const htmlBoard = document.getElementById('board');
 
   // TODO: add comment for this code
   const top = document.createElement("tr"); // Create a table row and give it the variable name 'top'
   top.setAttribute("id", "column-top"); // give 'top' the id of 'column-top'
   top.addEventListener("click", handleClick); // add a Click eventListener to 'top'
 
   for (let x = 0; x < WIDTH; x++) { // loop through the amount of times set by our Width, which is 7
     const headCell = document.createElement("td"); // create a table data element and give it the variable name 'headCell'
     headCell.setAttribute("id", x); // give that headCell the id of the number it is currently looping through, which is its x position in the array.
     top.append(headCell); // append the headCell to the table row.
   }
   htmlBoard.append(top); // append that top row to the htmlBoard
 
   // TODO: add comment for this code
   for (let y = HEIGHT - 1; y >= 0; y--) { // loop through the amount of times set by our Height, which is 6
     const row = document.createElement("tr"); // create a table row element and name it row
     for (let x = 0; x < WIDTH; x++) { // loop through the amount of times set by our Width, which is 7
       const cell = document.createElement("td"); // create a table data element and name it cell
       cell.setAttribute("id", `${y}-${x}`); // give that cell an id of its coords aka 'y - x'.
       row.append(cell); // append that cell to the row
     }
     htmlBoard.append(row); // append that row to the board.
   }
 }
 
 /** findSpotForCol: given column x, return top empty y (null if filled) */
 function findSpotForCol(x) {
   // TODO: write the real version of this, rather than always returning 0
   for (let y = 0; y < HEIGHT; y++) {
     const spaceChecker = board[y][x];
     if (spaceChecker === null) {
       return y
     } 
   }
   // all were filled so it returns null V
   return null
 }
 
 /** placeInTable: update DOM to place piece into HTML table of board */
 function placeInTable(y, x) {
   const id = `${y}-${x}`;
   console.log(`placeInTable - I need to play in ${id}`);
   // TODO: make a div and insert into correct table cell
   const token = document.createElement('div');
   if (currPlayer === 1) {
    token.setAttribute('class', 'player1');
   } else {
    token.setAttribute('class', 'player2');
   }
  //  token.setAttribute('class', 'piece');
   const targetCell = document.getElementById(id);
   targetCell.append(token);
 }
 
 /** endGame: announce game end */
 function endGame(msg) {
   // TODO: pop up alert message
   setTimeout(() => {
    alert(`${msg}`)
    window.location.reload();
  }, 21)
 }
 
 function isBoardFull() {
  return board.every(row => !row.includes(null));
 }

 /** handleClick: handle click of column top to play piece */
 function handleClick(evt) {
   // get x from ID of clicked cell
   const x = +evt.target.id;
   
   console.log(`handleClick - clicked on id ${x}`);
 
   // get next spot in column (if none, ignore click)
   const y = findSpotForCol(x);
   console.log(`findSpotForCol ${x} returned ${y}`)
   if (y === null) {
     return;
   }
 
   // place piece in board and add to HTML table
   // TODO: add line to update in-memory board
   placeInTable(y, x);
   board[y][x] = currPlayer;
 
   // check for win
   if (checkForWin()) {
     return endGame(`Congratulations! Player ${currPlayer} Has won!`);
   }
 
   // check for tie
   // TODO: check if all cells in board are filled; if so call, call endGame
   if(isBoardFull()) {
    return endGame('Tie Game!');
   }

   // switch players
   // TODO: switch currPlayer 1 <-> 2
   if (currPlayer === 1) {
    currPlayer = 2;
    const playerIndicator = document.getElementById('playerIndicator');
    playerIndicator.innerText = "Player 2, It's Your Turn, Pick A Column"
   } else { 
    currPlayer = 1;
    playerIndicator.innerText = "Player 1, It's Your Turn, Pick A Column"
  }
 }
 
 /** checkForWin: check board cell-by-cell for "does a win start here?" */
 function checkForWin() {
   function _win(cells) {
     // Check four cells to see if they're all color of current player
     //  - cells: list of four (y, x) cells
     //  - returns true if all are legal coordinates & all match currPlayer
 
     return cells.every(
       ([y, x]) =>
         y >= 0 &&
         y < HEIGHT &&
         x >= 0 &&
         x < WIDTH &&
         board[y][x] === currPlayer
     );
   }
 
   // TODO: read and understand this code. Add comments to help you.
 
   for (let y = 0; y < HEIGHT; y++) { // Loop Through Board Rows/ Arrays
     for (let x = 0; x < WIDTH; x++) { // Loop Through Each Coord In Each Row/ AKA Width
       const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; // Create horiz template to use to check for later, By having your original coord, and adding 1, 2 ,3 to X to find a group of 4
       const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]]; // Create vert template to use to check for later, By having your original coord, and adding 1, 2 ,3 to Y to find a group of 4
       const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]; // Create diagDR template to use to check for later, By having your original coord, and adding 1, 2 ,3 to X AND Y to find a group of 4
       const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]; // Create diagDR template to use to check for later, By having your original coord, and adding 1, 2 ,3 to Y WHILE Subtracting 1,2,3 from X to find a group of 4
 
       if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) { // If Any Of These Templates return True, Return To to _win Function
         return true;
       }
     }
   }
 }
 
 makeBoard();
 makeHtmlBoard();
 