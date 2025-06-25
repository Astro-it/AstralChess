

const pieces = [];      // creates a pieces array
const tiles = [];       // creates a tiles array
let selectedPiece = null;       // declares the vriable selectedPiece and assigns the value null
let currentTurn = `white`;         // creates a current turn variable and assigns white to it


class tile{         //creates a tile class
constructor(row, column){           // makes a constructor with the parameters row and column
this.row = row;                             // assigns the parameters to the instance properties
this.column = column;
this.div = document.createElement("div");       // creates a div element and assigns it to this.div
board.appendChild(this.div);            // appends this.div to the board
this.color = true;          // sets the this.color boolean to true 
}
set color(color){       // creates a set for the tile colors
if ((this.row + this.column) % 2 === 0){        /* makes it so that when row + column % 2 === 0 the css class white-tile is added
                                                   and if not the css class black-tile is added which makes the chess board pattern */
    this.div.classList.add(`white-tile`);          
}
else{
    this.div.classList.add(`black-tile`);
}
}
}

for (let row = 0; row < 8; row++){          // this is a for loop to create all the tiles with the right col and row positions
tiles[row] = [];

for (let col = 0; col < 8; col++){
const t = new tile(row, col);
tiles[row][col] = t;

t.color = true;         // triggers the setter and applies the tile color

t.div.addEventListener("click", () => handleTileClick(row, col));
}
}
class piece{            // creates a class for all pieces
constructor(type, color, position, element, hasMoved, captured){        // makes a constructor with the parameters type, color, position, element, hasMoved, captured
    this.type = type;                       // assigns the parameters to instance properties
    this.color = color;
    this.position = position;
    this.element = element;
    this.hasMoved = hasMoved;
    this.captured = captured;
}
}
class pawn extends piece{
constructor(color, position){
    const element = document.createElement(`div`);
    element.classList.add(`piece`, `pawn`, color);
    element.innerText = color === `white` ? "♙" : "♟︎";
    super(`pawn`, color, position, element, false, false);
}
}
    
class rook extends piece{
constructor(color, position){
    const element = document.createElement('div');
    element.classList.add('piece', 'rook', color);
    element.innerText = color === `white` ? '♖' : "♜";
    super(`rook`, color, position, element, false, false);
}
}

class knight extends piece{
    constructor(color, position){
        const element = document.createElement('div');
        element.classList.add('piece', 'knight', color);
        element.innerText = color === `white` ? '♘' : "♞";
        super(`knight`, color, position, element, false, false);
    }
}

class bishop extends piece{
    constructor(color, position){
         const element = document.createElement('div');
         element.classList.add('piece', 'bishop', color);
         element.innerText = color === `white` ? '♗' : "♝";
         super(`bishop`, color, position, element, false, false);
    }
}

class queen extends piece{
    constructor(color, position){
        const element = document.createElement('div');
        element.classList.add('piece', 'queen', color);
        element.innerText = color === `white` ? '♕' : "♛";
        super(`queen`, color, position, element, false, false);
    }
}

class king extends piece{
    constructor(color, position){
        const element = document.createElement('div');
        element.classList.add('piece', 'king', color);
        element.innerText = color === `white` ? '♔' : "♚";
        super(`king`, color, position, element, false, false);
    }
}

function setupPieces(){
for (let col = 0; col < 8; col++) { 
 const whitePawn = new pawn("white", [6, col]); 
 tiles[6] 
 [col].div.appendChild(whitePawn.element);
 pieces.push(whitePawn);
 }
 
 for (let col = 0; col < 8; col++) {
   const blackPawn = new pawn("black", [1, col]);
   tiles[1]
   [col].div.appendChild(blackPawn.element);
   pieces.push(blackPawn);
 }
 
 const whiteRook1 = new rook('white', [7, 0]);
 const whiteRook2 = new rook('white', [7, 7]);
 const blackRook1 = new rook('black', [0, 0]);
 const blackRook2 = new rook('black', [0, 7]);
 tiles[7][0].div.appendChild(whiteRook1.element);
 tiles[7][7].div.appendChild(whiteRook2.element);
 tiles[0][0].div.appendChild(blackRook1.element);
 tiles[0][7].div.appendChild(blackRook2.element);
 pieces.push(whiteRook1);
 pieces.push(whiteRook2);
 pieces.push(blackRook1);
 pieces.push(blackRook2);
 
 const whiteKnight1 = new knight('white', [7, 1]);
 const whiteKnight2 = new knight('white', [7, 6]);
 const blackKnight1 = new knight('black', [0, 1]);
 const blackKnight2 = new knight('black', [0, 6]);
 tiles[7][1].div.appendChild(whiteKnight1.element);
 tiles[7][6].div.appendChild(whiteKnight2.element);
 tiles[0][1].div.appendChild(blackKnight1.element);
 tiles[0][6].div.appendChild(blackKnight2.element);
 pieces.push(whiteKnight1);
 pieces.push(whiteKnight2);
 pieces.push(blackKnight1);
 pieces.push(blackKnight2);
 
 const whiteBishop1 = new bishop('white', [7, 2]);
 const whiteBishop2 = new bishop('white', [7, 5]);
 const blackBishop1 = new bishop('black', [0, 2]);
 const blackBishop2 = new bishop('black', [0, 5]);
 tiles[7][2].div.appendChild(whiteBishop1.element);
 tiles[7][5].div.appendChild(whiteBishop2.element);
 tiles[0][2].div.appendChild(blackBishop1.element);
 tiles[0][5].div.appendChild(blackBishop2.element);
 pieces.push(whiteBishop1);
 pieces.push(whiteBishop2);
 pieces.push(blackBishop1);
 pieces.push(blackBishop2);
 
 const whiteQueen = new queen('white', [7, 3]);
 const blackQueen = new queen('black', [0, 3]);
 tiles[7][3].div.appendChild(whiteQueen.element);
 tiles[0][3].div.appendChild(blackQueen.element);
 pieces.push(whiteQueen);
 pieces.push(blackQueen);
 
 const whiteKing = new king('white', [7, 4]);
 const blackKing = new king('black', [0, 4]);
 tiles[7][4].div.appendChild(whiteKing.element);
 tiles[0][4].div.appendChild(blackKing.element);
 pieces.push(whiteKing);
 pieces.push(blackKing);

for (const piece of pieces) {
  piece.element.addEventListener("click", (event) => {
    event.stopPropagation();              // Stop bubbling to tile
    handlePieceClick(piece);             // Handle selecting/deselecting
  });
}

}


function handlePieceClick(piece){
    if (piece.color !== currentTurn) return;

    if (selectedPiece === piece){
        selectedPiece.element.classList.remove(`selected`);
        selectedPiece = null;
    }
    else{
        if (selectedPiece){
            selectedPiece.element.classList.remove("selected");
        }
        selectedPiece = piece;
        piece.element.classList.add(`selected`);
    }
}

function handleTileClick(row, col) {
  if (!selectedPiece) return;

  // Move the selected piece's element
  tiles[row][col].div.appendChild(selectedPiece.element);

  // Update its position
  selectedPiece.position = [row, col];

  // Remove highlight
  selectedPiece.element.classList.remove("selected");

  // Clear selection
  selectedPiece = null;

  //switch turn 
  currentTurn = currentTurn === `white` ? `black` : `white`;
}


setupPieces();
