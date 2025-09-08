const boardHistory = new Map();
const pieces = [];
const tiles = [];
let selectedPiece = null;       // declares the vriable selectedPiece and assigns the value null
let currentTurn = `white`;         // creates a current turn variable and assigns white to it
turnIndicator()
let lastMove = null;
let halfMoveCounter = 0;
let GameHistory = [];
let MoveNumber = 1;

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
class piece{
constructor(type, color, position, element, hasMoved, captured, id){        // makes a constructor with the parameters type, color, position, element, hasMoved, captured
    this.type = type;                       // assigns the parameters to instance properties
    this.color = color;
    this.position = position;
    this.element = element;
    this.hasMoved = hasMoved;
    this.captured = captured;
    this.id = id;
    this.TimesMoved = 0;
}
}

function isOnBoard(row, col) {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
}

function isEmpty(row, col) {
  return !getPieceAt(row, col);
}

function getPieceAt(row, col) {
  return pieces.find(p => !p.captured && p.position[0] === row && p.position[1] === col);
}


class pawn extends piece{
constructor(color, position, id){
    const element = document.createElement(`div`);
    element.classList.add(`piece`, `pawn`, color);
    

    const pawnPiece = document.createElement(`img`);
    pawnPiece.src = `pictures/chess-pieces/${color}-pawn.PNG`;
    pawnPiece.classList.add(`piece`);
    pawnPiece.draggable = false;

    element.appendChild(pawnPiece);

    super(`pawn`, color, position, element, false, false, id);
}

getLegalMoves() {
  const moves = [];
  const [row, col] = this.position;

  const direction = this.color === "white" ? -1 : 1;

  const oneStep = [row + direction, col];
  const twoStep = [row + 2 * direction, col];

  // Check one step forward
  if (isOnBoard(oneStep[0], oneStep[1]) && isEmpty(oneStep[0], oneStep[1])) {
    moves.push(oneStep);

    // Check two steps forward only if first is also empty
    if (!this.hasMoved && isEmpty(twoStep[0], twoStep[1])) {
      moves.push(twoStep);

      
    }
  }



  // Check captures
  for (const dx of [-1, 1]) {
    const targetRow = row + direction;
    const targetCol = col + dx;

    if (isOnBoard(targetRow, targetCol)) {
      const targetPiece = getPieceAt(targetRow, targetCol);
      if (targetPiece && targetPiece.color !== this.color) {
        moves.push([targetRow, targetCol]);
      }
    }
  }

  for (const dx of [-1, 1]) {
  const sideCol = col + dx;
  const sidePawn = getPieceAt(row, sideCol);

  if (
    sidePawn &&
    sidePawn.type === "pawn" &&
    sidePawn.color !== this.color &&
    sidePawn === lastMove?.piece &&
    Math.abs(lastMove.from[0] - lastMove.to[0]) === 2 &&
    lastMove.to[0] === row
  ) {
    moves.push([row + direction, sideCol]);
  }
}
  return moves;
}

}
    
class rook extends piece{
constructor(color, position, id){
    const element = document.createElement('div');
    element.classList.add('piece', 'rook', color);

    const rookPiece = document.createElement(`img`);
    rookPiece.src = `pictures/chess-pieces/${color}-rook.PNG`;
    rookPiece.classList.add(`piece`);
    rookPiece.draggable = false;

    element.appendChild(rookPiece);


    super(`rook`, color, position, element, false, false, id);
}

getLegalMoves() {
  const moves = [];
  const [row, col] = this.position;

  const directions = [
    [-1, 0], // up
    [1, 0],  // down
    [0, -1], // left
    [0, 1]   // right
  ];

  for (const [dRow, dCol] of directions) {
    let r = row + dRow;
    let c = col + dCol;
    while (isOnBoard(r, c)) {
      const target = getPieceAt(r, c);
      if (!target) {
        moves.push([r, c]);
      } else {
        if (target.color !== this.color) {
          moves.push([r, c]); // capturing move
        }
        break; // stop looking further in this direction
      }
      r += dRow;
      c += dCol;
    }
  }

  return moves;
}

}

class knight extends piece{
    constructor(color, position, id){
        const element = document.createElement('div');
        element.classList.add('piece', 'knight', color);

    const knightPiece = document.createElement(`img`);
    knightPiece.src = `pictures/chess-pieces/${color}-knight.PNG`;
    knightPiece.classList.add(`piece`);
    knightPiece.draggable = false;

    element.appendChild(knightPiece);

        
        super(`knight`, color, position, element, false, false, id);
    }

    getLegalMoves() {
      const moves = [];
      const [row, col] = this.position;

      const directions = [
        [-2, -1], // up left
        [-2, 1],  // up right
        [-1, 2],  // right up
        [1, 2],   // right down
        [-1, -2], // left up
        [1, -2],  // left down
        [2, -1],  // down left
        [2, 1]   // down right
      ];

      for (const [dRow, dCol] of directions) {
        let r = row + dRow;
        let c = col + dCol;
       
        if ( isOnBoard(r, c)) {
          const target = getPieceAt(r, c);
          if ( !target || target.color !== this.color) {
            moves.push([r, c]);
          }
        }
      }
      
      return moves;
    }

}

class bishop extends piece{
    constructor(color, position, id){
         const element = document.createElement('div');
         element.classList.add('piece', 'bishop', color);

    const bishopPiece = document.createElement(`img`);
    bishopPiece.src = `pictures/chess-pieces/${color}-bishop.PNG`;
    bishopPiece.classList.add(`piece`);
    bishopPiece.draggable = false;

    element.appendChild(bishopPiece);


         super(`bishop`, color, position, element, false, false, id);
    }

    getLegalMoves() {
      const moves = [];
      const [row, col] = this.position;

      const directions = [
        [-1, -1],  // up left
        [-1, 1],   // up right
        [1, -1],   // down left
        [1, 1]     // down right
      ];

      for (const [dRow, dCol] of directions) {
        let r = row + dRow;
        let c = col + dCol;
        while (isOnBoard(r, c)) {
          const target = getPieceAt(r, c);
          if (!target) {
            moves.push([r, c]);
          }
          else {
            if (target.color !== this.color) {
              moves.push([r, c]);   // capturing move
            }
            break;     // stop looking further in this direction
          }
          r += dRow;
          c += dCol;
        }
      }

      return moves;
    }

}

class queen extends piece{
    constructor(color, position, id){
        const element = document.createElement('div');
        element.classList.add('piece', 'queen', color);

    const queenPiece = document.createElement(`img`);
    queenPiece.src = `pictures/chess-pieces/${color}-queen.PNG`;
    queenPiece.classList.add(`piece`);
    queenPiece.draggable = false;

    element.appendChild(queenPiece);


        super(`queen`, color, position, element, false, false, id);
    }

    getLegalMoves() {
      const moves = [];
      const [row, col] = this.position;

      const directions = [
        [-1, 0],   // up
        [-1, -1],  // up left
        [-1, 1],   // up right
        [0, -1],   // left
        [0, 1],    // right
        [1, 0],    // down
        [1, -1],   // down left
        [1, 1]     // down right
      ]

      for (const [dRow, dCol] of directions) {
        let r = row + dRow;
        let c = col + dCol;
        while (isOnBoard(r, c)) {
          const target = getPieceAt(r, c);
          if (!target) {
            moves.push([r, c]);
          }
          else {
            if (target.color !== this.color) {
              moves.push([r, c]); // capturing move
            }
            break;
          }
          r += dRow;
          c += dCol;
        }
      }

      return moves;
    }

}

class king extends piece{
    constructor(color, position, id){
        const element = document.createElement('div');
        element.classList.add('piece', 'king', color);
        

    const kingPiece = document.createElement(`img`);
    kingPiece.src = `pictures/chess-pieces/${color}-king.PNG`;
    kingPiece.classList.add(`piece`);
    kingPiece.draggable = false;

    element.appendChild(kingPiece);

        super(`king`, color, position, element, false, false, id);
    }

    getLegalMoves() {
      let moves = [];
      const [row, col] = this.position;

      const directions = [
        [-1, 0],   // up
        [-1, -1],  // up left
        [-1, 1],   // up right 
        [0, -1],   // left
        [0, 1],    // right
        [1, 0],    // bottom
        [1, -1],   // bottom left
        [1, 1]     // bottom right
      ];

      for (const [dRow, dCol] of directions) {
        let r = row + dRow;
        let c = col + dCol;

        if (isOnBoard(r, c)) {
          const target = getPieceAt(r, c);
          if(!target || target.color !== this.color) {
            moves.push([r, c]);
          }
        }
      }

      if (!this.hasMoved && !isInCheck(this.color)) {
        //kingside
        const rookK = getPieceAt(row, 7);
        if ( 
          rookK && rookK.type === `rook` && !rookK.hasMoved &&
          isEmpty(row, 5) && isEmpty(row, 6) && 
          simulateMoveAndCheck(this, [row, 5]) &&
          simulateMoveAndCheck(this, [row, 6]) 
        ) {
          moves.push([row, 6]);
        }

        //queenside
        const rookQ = getPieceAt(row, 0);
        if(
          rookQ && rookQ.type === `rook` && !rookQ.hasMoved &&
          isEmpty(row, 1) && isEmpty(row, 2) && isEmpty(row, 3) &&
          simulateMoveAndCheck(this, [row, 3]) &&
          simulateMoveAndCheck(this, [row, 2])
        ) {
          moves.push([row, 2]);
        }
      }

      const enemyKing = pieces.find(
  p => p.type === "king" && p.color !== this.color && !p.captured
);

  if (enemyKing) {
    moves = moves.filter(
      move => !areKingsAdjacent(move, enemyKing.position)
    );
  }

      return moves;
    }

}

function setupPieces(){
  currentTurn = `white`;
  turnIndicator()
  MoveNumber = 1;
  
  // Remove old DOM elements
  for (const piece of pieces) {
    piece.element.remove();
  }

  // Clear the pieces array
  pieces.length = 0;

for (let col = 0; col < 8; col++) { 
 const whitePawn = new pawn("white", [6, col], `WPawn${col}`);
 tiles[6][col].div.appendChild(whitePawn.element);
 pieces.push(whitePawn);
 }
 
 for (let col = 0; col < 8; col++) {
   const blackPawn = new pawn("black", [1, col], `BPawn${col}`);
   tiles[1][col].div.appendChild(blackPawn.element);
   pieces.push(blackPawn);
 }
 
 const whiteRook1 = new rook('white', [7, 0], `WRook1`);
 const whiteRook2 = new rook('white', [7, 7], `WRook2`);
 const blackRook1 = new rook('black', [0, 0], `BRook1`);
 const blackRook2 = new rook('black', [0, 7], `BRook2`);
 tiles[7][0].div.appendChild(whiteRook1.element);
 tiles[7][7].div.appendChild(whiteRook2.element);
 tiles[0][0].div.appendChild(blackRook1.element);
 tiles[0][7].div.appendChild(blackRook2.element);
 pieces.push(whiteRook1);
 pieces.push(whiteRook2);
 pieces.push(blackRook1);
 pieces.push(blackRook2);
 
 const whiteKnight1 = new knight('white', [7, 1], `WKnight1`);
 const whiteKnight2 = new knight('white', [7, 6], `WKnight2`);
 const blackKnight1 = new knight('black', [0, 1], `BKnight1`);
 const blackKnight2 = new knight('black', [0, 6], `BKnight2`);
 tiles[7][1].div.appendChild(whiteKnight1.element);
 tiles[7][6].div.appendChild(whiteKnight2.element);
 tiles[0][1].div.appendChild(blackKnight1.element);
 tiles[0][6].div.appendChild(blackKnight2.element);
 pieces.push(whiteKnight1);
 pieces.push(whiteKnight2);
 pieces.push(blackKnight1);
 pieces.push(blackKnight2);
 
 const whiteBishop1 = new bishop('white', [7, 2], `WBishop1`);
 const whiteBishop2 = new bishop('white', [7, 5], `WBishop2`);
 const blackBishop1 = new bishop('black', [0, 2], `BBishop1`);
 const blackBishop2 = new bishop('black', [0, 5], `BBishop2`);
 tiles[7][2].div.appendChild(whiteBishop1.element);
 tiles[7][5].div.appendChild(whiteBishop2.element);
 tiles[0][2].div.appendChild(blackBishop1.element);
 tiles[0][5].div.appendChild(blackBishop2.element);
 pieces.push(whiteBishop1);
 pieces.push(whiteBishop2);
 pieces.push(blackBishop1);
 pieces.push(blackBishop2);
 
 const whiteQueen = new queen('white', [7, 3], `WQueen`);
 const blackQueen = new queen('black', [0, 3], `BQueen`);
 tiles[7][3].div.appendChild(whiteQueen.element);
 tiles[0][3].div.appendChild(blackQueen.element);
 pieces.push(whiteQueen);
 pieces.push(blackQueen);
 
 const whiteKing = new king('white', [7, 4], `WKing`);
 const blackKing = new king('black', [0, 4], `BKing`);
 tiles[7][4].div.appendChild(whiteKing.element);
 tiles[0][4].div.appendChild(blackKing.element);
 pieces.push(whiteKing);
 pieces.push(blackKing);

for (const piece of pieces) {
  piece.element.addEventListener("click", (event) => {
    event.stopPropagation();              // Stop bubbling to tile
    
    const [row, col] = piece.position;

   if (selectedPiece) {
    const legalMoves = getLegalMovesSafe(selectedPiece);
    const isCapture = legalMoves.some(move => move[0] === row && move[1] === col);  

    if (isCapture) {
        handleTileClick(row, col); // Simulate move & capture
        return;
      }
    }
    
   if (piece.color === currentTurn) {
      handlePieceClick(piece);
    }
    
  });
}
}

function showPromotionOptions (piece, callback) {
  if (!piece || !piece.position || !Array.isArray(piece.position)) {
    console.error("Invalid piece or position:", piece);
    return;
  }

  const [row, col] = piece.position;
  const color = piece.color;

  const overlay = document.createElement(`div`);
  overlay.classList.add(row === 0 ? "promotion-overlayW" : "promotion-overlayB");

  const options = ["queen", "rook", "bishop", "knight"];
    const symbols = color === "white" 
    ? ["♕", "♖", "♗", "♘"]
    : ["♛", "♜", "♝", "♞"];
  
  for (let i = 0; i < options.length; i++) {
    const type = options[i];
    const symbol = symbols[i];

    const button = document.createElement("button");
    button.innerText = symbol;

    // Add classes
    button.classList.add("promotion-btn", type);

    // Simulate tile background (optional: alternate colors)
    const tileColorClass = (row + col + i) % 2 === 0 ? "white-tile" : "black-tile";
    button.classList.add(tileColorClass);

    // On click: remove overlay and call back with piece type
    button.addEventListener("click", () => {
      document.body.removeChild(overlay);
      callback(type);
    });

    overlay.appendChild(button);
  }

  document.body.appendChild(overlay);
}

function promotePawn(pawn, newType) {
  const [row, col] = pawn.position;

  //remove pawn
  pawn.captured = true;
  pawn.element.remove();

  let newPiece;
  switch (newType) {
    case `queen`:
      newPiece = new queen(pawn.color, [row, col]);
      break;
    case `rook`:
      newPiece = new rook(pawn.color, [row, col]);
      break;
    case `bishop`:
      newPiece = new bishop(pawn.color, [row, col]);
      break;
    case `knight`:
      newPiece = new knight(pawn.color, [row, col]);
      break;
  }

  tiles[row][col].div.appendChild(newPiece.element);
  
  pieces.push(newPiece);

  newPiece.element.addEventListener("click", (event) => {
    event.stopPropagation();

    const [r, c] = newPiece.position;

        if (selectedPiece) {
      const legalMoves = getLegalMovesSafe(selectedPiece);
      const isCapture = legalMoves.some(move => move[0] === r && move[1] === c);
      if (isCapture) {
        handleTileClick(r, c);
        return;
      }
    }

      if (newPiece.color === currentTurn) {
      handlePieceClick(newPiece);
    }
  });
}


function isDrawByInsufficientMaterial() {
  const activePieces = pieces.filter(p => !p.captured);
  const pieceTypes = activePieces.map(p => p.type);
  const numPieces = activePieces.length;

  if (numPieces === 2) {
    // King vs King
    return true;
  }

  if (numPieces === 3) {
    const minorPiece = activePieces.find(p => p.type !== "king");
    if (minorPiece && (minorPiece.type === "bishop" || minorPiece.type === "knight")) {
      // King and bishop or knight vs king
      return true;
    }
  }

  if (numPieces === 4) {
    // King and bishop vs king and bishop (same color square)
    const bishops = activePieces.filter(p => p.type === "bishop");
    if (bishops.length === 2) {
      const squareColors = bishops.map(b => {
        const [r, c] = b.position;
        return (r + c) % 2 === 0 ? "light" : "dark";
      });
      if (squareColors[0] === squareColors[1]) {
        return true;
      }
    }
  }

  return false;
}


function getBoardStateKey() {
  const activePieces = pieces
    .filter(p => !p.captured)
    .map(p => `${p.type}_${p.color}_${p.position[0]}_${p.position[1]}`)
    .sort() // ensure same position gives same string
    .join("|");

  return `${currentTurn}:${activePieces}`;
}

function simulateMoveAndCheck(piece, [row, col]) {
  const originalPos = [...piece.position];
  const targetPiece = getPieceAt(row, col);

  piece.position = [row, col];
  if(targetPiece) targetPiece.captured = true;

  const safe = !isInCheck(piece.color);

  piece.position = originalPos;
  if (targetPiece) targetPiece.captured = false;

  return safe;
}

function areKingsAdjacent(pos1, pos2) {
  const [r1, c1] = pos1;
  const [r2, c2] = pos2;
  return Math.abs(r1 - r2) <= 1 && Math.abs(c1 - c2) <= 1;
}

function isInCheck(color) {
  const king = pieces.find(p => p.type === "king" && p.color === color && !p.captured);
  if (!king) return false;

  for (const piece of pieces) {
    if (piece.color !== color && !piece.captured && piece.type !== `king`) {
      const moves = piece.getLegalMoves();
      if (moves.some(([r, c]) => r === king.position[0] && c === king.position[1])) {
        return true;
      }
    }
  }

  return false;
}

function getAnyPieceAt(row, col) {
  return pieces.find(p => p.position[0] === row && p.position[1] === col);
}

function getLegalMovesSafe(piece) {
  const legalMoves = piece.getLegalMoves();
  const safeMoves = [];

  for (const [row, col] of legalMoves) {
    const originalPos = [...piece.position];
    const targetPiece = getPieceAt(row, col);

    // Simulate move
    piece.position = [row, col];
    if (targetPiece) targetPiece.captured = true;

    const kingSafe = !isInCheck(piece.color);

    // Undo move
    piece.position = originalPos;
    if (targetPiece) targetPiece.captured = false;

    if (kingSafe) safeMoves.push([row, col]);
  }

  return safeMoves;
}

function isCheckmateOrStalemate(color) {
  const allPieces = pieces.filter(p => p.color === color && !p.captured);

  for (const p of allPieces) {
    const moves = getLegalMovesSafe(p);
    if (moves.length > 0) return false;
  }

  return isInCheck(color) ? "checkmate" : "stalemate";
}

function handlePieceClick(piece){
  const [row, col] = piece.position;

    if (piece.color !== currentTurn) return;

    clearHighlights();

    if (selectedPiece === piece){
        tiles[row][col].div.classList.remove(`selected`);
        selectedPiece = null;
    }
    else{
        if (selectedPiece){
          const [prevRow, prevCol] = selectedPiece.position;
          tiles[prevRow][prevCol].div.classList.remove("selected");
        }
        selectedPiece = piece;
        tiles[row][col].div.classList.add("selected");

         const legalMoves = getLegalMovesSafe(piece);
        for (const [row, col] of legalMoves) {
            tiles[row][col].div.classList.add("legalMoves");
        }

    }
}

function handleTileClick(row, col) {
  if (!selectedPiece) return;
  if (selectedPiece.captured) return;

  const [oldRow, oldCol] = selectedPiece.position;

  const originalPos = [...selectedPiece.position];

    // Get the legal moves
  const legalMoves = getLegalMovesSafe(selectedPiece);

  const isLegal = legalMoves.some(
    move => move[0] === row && move[1] === col
  );

 if (!isLegal) return;

 // Check if there's a piece to capture
const target = getPieceAt(row, col);
if (target && target.color !== selectedPiece.color) {
  target.captured = true;
  target.element.remove(); // Remove the piece visually from the board
}

  // Move the selected piece's element
  tiles[row][col].div.appendChild(selectedPiece.element);

  // Update its position
  selectedPiece.position = [row, col];

  selectedPiece.TimesMoved++;

  if(selectedPiece.TimesMoved > 0) {
    selectedPiece.hasMoved = true;
  }
  else{
    selectedPiece.hasMoved = false;
  }

      lastMove = {
  piece: selectedPiece,
  from: originalPos,
  to: [row, col]
};

 if (
  selectedPiece.type === "pawn" &&
  Math.abs(col - originalPos[1]) === 1 &&
  !target // square is empty, diagonal = en passant
) {
  const capturedPawn = getAnyPieceAt(oldRow, col); // row before the move, and the column you move into
  if (
    capturedPawn &&
    capturedPawn.type === "pawn" &&
    capturedPawn.color !== selectedPiece.color
  ) {
    capturedPawn.captured = true;
    capturedPawn.element.remove();
  }
}

  if (selectedPiece.type === `king` && Math.abs(col - oldCol) === 2) {
    const rookCol = col === 6 ? 7 : 0;
    const newRookCol = col === 6 ? 5 : 3;
    const rook = getPieceAt(row, rookCol);

    if (rook) {
      tiles[row][newRookCol].div.appendChild(rook.element);
      rook.position = [row, newRookCol];
      rook.hasMoved = true;
    }
  }

    // Check if move resets the 50-move counter
const wasPawnMove = selectedPiece.type === "pawn" && 
              (oldRow !== row || oldCol !== col);
              
const wasCapture = target && target.color !== selectedPiece.color;

if (wasPawnMove || wasCapture) {
  halfMoveCounter = 0;
   console.log("Reset 50-move counter due to", wasPawnMove ? "pawn move" : "capture");
} else {
  halfMoveCounter++;
  console.log("50-move counter incremented:", halfMoveCounter);
}

clearHighlights();

if (
  selectedPiece.type === "pawn" &&
  (row === 0 || row === 7)
) {
  showPromotionOptions(selectedPiece, (newType) => {
    promotePawn(selectedPiece, newType);
    // Switch turn only after promotion is done
    currentTurn = currentTurn === "white" ? "black" : "white";
    turnIndicator()
  });
  return; // Skip rest of the function until promotion is complete
}

recordMove(selectedPiece, originalPos, [row, col], target, getBoardStateKey());

    // Remove highlight
  tiles[oldRow][oldCol].div.classList.remove("selected");

  // Clear selection
  selectedPiece = null;

  const result = isCheckmateOrStalemate(currentTurn === "white" ? "black" : "white");

  if (result) {
  // Delay alert slightly so DOM updates first
  setTimeout(() => {
    if (result === "checkmate") {
      alert(`${currentTurn} wins by checkmate!`);
    } else if (result === "stalemate") {
      alert("Draw by stalemate!");
    }
  }, 50); // 50 ms
  return;
}
 
// half move counter
if (halfMoveCounter >= 100) {
  setTimeout(() => {
    alert("Draw by 50-move rule!");
  }, 50);
  return;
}

// draw by insufficient material
if (isDrawByInsufficientMaterial()) {
  setTimeout(() => {
    alert("Draw by insufficient material!");
  }, 50);
  return;
}

//threefold repetition
const key = getBoardStateKey();
const count = boardHistory.get(key) || 0;
boardHistory.set(key, count + 1);

console.log("Current board repetition count for this state is:", boardHistory.get(key));

if (boardHistory.get(key) >= 3) {
  setTimeout(() => {
  alert("Draw by threefold repetition!") }, 50);
  return;
}


  //switch turn 
  currentTurn = currentTurn === `white` ? `black` : `white`;

  if(currentTurn == `white`){
    MoveNumber++
  }
  console.log(`MoveNumber = ${MoveNumber}`);
  turnIndicator();
  console.log(GameHistory);
}

function clearHighlights() {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      tiles[row][col].div.classList.remove("selected", "legalMoves");
    }
  }
}

setupPieces();
function turnIndicator() {
  const whiteTurnIndicator = document.getElementById('turn-indicator-white');
  const blackTurnIndicator = document.getElementById('turn-indicator-black');

   if (!whiteTurnIndicator || !blackTurnIndicator) {
    console.warn('Turn indicator elements not found (check IDs/classes).');
    return;
  }

  if (currentTurn === 'white') {
    whiteTurnIndicator.classList.add('active');
    blackTurnIndicator.classList.remove('active');
  } else if (currentTurn === 'black') {
    blackTurnIndicator.classList.add('active');
    whiteTurnIndicator.classList.remove('active');
  }
}


const restartBtn = document.getElementById(`restart-btn`);
restartBtn.addEventListener(`click`, resetGame);

function resetGame(){
  setupPieces()
  boardHistory.clear();
  GameHistory.length = 0;
  halfMoveCounter = 0;
  console.log(`The Game was Restartet`);
}




function recordMove(piece, from, to, target, key){
  GameHistory.push({
    BoardStateKey: key,
    from: [...from],
    to: [...to],
    pieceId: piece.id,
    capturedPiece: target ? target : null,
    hasMoved: piece.hasMoved,
    halfMoveCounter: halfMoveCounter,
    turn: currentTurn,
    MoveNumber : MoveNumber,
    TimesMoved : piece.TimesMoved,
  });
}


const UndoButton = document.getElementById(`undo-btn`);
UndoButton.addEventListener(`click`, UndoMove);

function UndoMove(){
const PoppedMove = GameHistory.pop();
 if (!PoppedMove) return;

console.log(PoppedMove);
const PreviousMove = PoppedMove.from;
const [PrevRow,PrevCol] = PreviousMove;
const piece = pieces.find(p => p.id === PoppedMove.pieceId);
if (!piece) return;

tiles[PrevRow][PrevCol].div.appendChild(piece.element);
piece.position = [PrevRow, PrevCol];

if (PoppedMove.capturedPiece) {
   const Captured = PoppedMove.capturedPiece
   if (Captured) {
     const [Row, Col] = Captured.position;
     tiles[Row][Col].div.appendChild(Captured.element);
     Captured.position = [Row, Col];
     Captured.captured = false;
   }
 } 

currentTurn = PoppedMove.turn;
piece.TimesMoved = Math.max(0, piece.TimesMoved - 1);
if(piece.TimesMoved > 0) {
  piece.hasMoved = true;
}
else{
  piece.hasMoved = false;
}

halfMoveCounter = Math.max(0, halfMoveCounter - 1);

const key = PoppedMove.BoardStateKey
console.log(key);
const count = boardHistory.get(key) || 0;

if (count > 1) {
  boardHistory.set(key, count - 1);
} else {
  boardHistory.delete(key);
}

console.log("After undo, board repetition count for this state is:", boardHistory.get(key) || 0);
turnIndicator()
}




setupPieces();  