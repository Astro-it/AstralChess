Astral Chess

A simple, fun chess game built with JavaScript to learn and practice coding. No AI or online multiplayer yet — Play chess locally against another player on the same device.


Rules:

These are the rules for the classic chess mode implemented in this project.
Future versions may include different modes with their own rule sets, such as 5D chess or 4-player chess.

This chess gamemode follows the standard official chess rules:

Objective: Checkmate your opponent's king, meaning the king is under threat and cannot escape capture.

Basic Moves:

• Pawns move forward one square (two squares on their first move) and capture diagonally.

• Rooks move any number of squares vertically or horizontally.

• Knights move in an "L" shape: two squares in one direction, then one square perpendicular.

• Bishops move any number of squares diagonally.

• Queens move any number of squares vertically, horizontally, or diagonally.

• Kings move one square in any direction.

Special Moves:

• Castling: The king moves two squares toward a rook, and the rook moves to the square next to the king. Conditions: neither piece has moved before, no pieces between them, the king is not in check, and the king does not move through or land on a threatened square.

• En Passant: If a pawn moves two squares forward from its starting position and lands beside an opponent's pawn, the opponent can capture it as if it had moved only one square, but only immediately on the next move.

• Pawn Promotion: When a pawn reaches the opponent’s back rank (last row), it can be promoted to a queen, rook, bishop, or knight, usually a queen.

Check and Checkmate:

• If your king is under attack (in check), you must make a move to remove the threat.

• If no move can remove the check, the game ends in checkmate and the attacking player wins.

Draw Conditions:

• Stalemate (player to move is not in check but has no legal moves).

• Insufficient material to checkmate (e.g., only kings left).

• Threefold repetition (the same position occurs three times).

• Fifty-move rule (fifty moves pass with no pawn movement or capture).


Features:

• Classic chess rules fully implemented (including castling, en passant, and promotion)

• Local two-player mode — play on the same device with a friend or yourself

• Visual move indicators for selected pieces


Installation:

Clone the repository

git clone https://github.com/Astro-it/AstralChess.git

Run the game
Open index.html in your browser
or Use a local development server (e.g., Live Server in VSCode)

Just want to play?
You can play the game directly in your browser here:
astralchess.com

Roadmap:

• custom drawn chess pieces (in progress)
• Undo move functionality
• Timer/clock for moves
• AI opponent
• Multiplayer online mode
• 5d chess (this is probably going to be really hard and take very long)
• 4 player chess


Contributing:

This project is mainly for learning and fun! But if you want to help, feel free to fork the repo and open pull requests. Any feedback or ideas are welcome!


License:

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](LICENSE) file for details.


Contact
If you have tips, ideas, or just want to say hi, reach me at astrovolerei@gmail.com
