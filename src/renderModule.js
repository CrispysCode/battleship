const GameSetup = require("./gameSetup-04/gameSetup");

class RenderGame {
  constructor(gameSetup) {
    this.gameSetup = gameSetup;
    this.userGameboard = gameSetup.userGameboard;
    this.computerGameboard = gameSetup.computerGameboard;
    this.userBoard = document.querySelector(".user-board");
    this.computerBoard = document.querySelector(".computer-board");
  }

  renderUserBoard() {
    this.userBoard.textContent = "";
    const board = this.userGameboard.board;

    board.forEach((row, x) => {
      row.forEach((cell, y) => {
        const boardCell = document.createElement("div");
        boardCell.classList.add("cell");
        boardCell.dataset.x = x;
        boardCell.dataset.y = y;

        if (cell !== null) {
          boardCell.classList.add("ship");
          boardCell.dataset.shipLength = cell.length;
        }
        this.userBoard.appendChild(boardCell);
      });
    });
  }

  renderComputerBoard() {
    this.computerBoard.textContent = "";
    const board = this.computerGameboard.board;

    board.forEach((row, x) => {
      row.forEach((cell, y) => {
        const boardCell = document.createElement("div");
        boardCell.classList.add("cell");
        boardCell.dataset.x = x;
        boardCell.dataset.y = y;

        if (cell !== null) {
          boardCell.classList.add("ship");
          boardCell.dataset.x = x;
          boardCell.dataset.y = y;
        }

        this.computerBoard.appendChild(boardCell);
      });
    });
  }
  renderBoards() {
    this.renderUserBoard();
    this.renderComputerBoard();
  }
}