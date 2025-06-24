class tile{
constructor(row, column){
this.row = row;
this.column = column;
this.div = document.createElement("div");
board.appendChild(this.div);
this.color = true;
}
set color(color){
if ((this.row + this.column) % 2 === 0){
    this.div.classList.add(`white-tile`);
}
else{
    this.div.classList.add(`black-tile`);
}
}
}
const tiles = [];
for (let row = 0; row < 8; row++){
tiles[row] = [];
for (let col = 0; col < 8; col++){
const t = new tile(row, col);
tiles[row][col] = t;
}
}
class piece{
constructor(type, color, position, element, hasMoved, captured){
    this.type = type;
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
 
}

const pieces = [];

setupPieces();
