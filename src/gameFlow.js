const GameSetup = require("./gameSetup-04/gameSetup");
const RenderGame = require("./renderModule");
const Gameboard = require("./gameboardClass-02/gameboardClass");



class GameFlow {
  constructor(gameSetup) {
    this.gameSetup = gameSetup;
    this.computerBoard = document.querySelector('.computerBoard');
    this.userBoard = document.querySelector('.userBoard');
    this.currentPlayer = 'user';
    
    this.setupAttackListeners();
  }

  setupAttackListeners() {
    this.computerBoard.addEventListener('click', this.handleUserAttack.bind(this));
  }

  handleUserAttack(event) {
    if (this.currentPlayer !== 'user') return;

    const x = parseInt(event.target.dataset.x);
    const y = parseInt(event.target.dataset.y);

    this.gameSetup.computerGameboard.receiveAttack(x, y);
    this.renderBoards();

    if (this.gameSetup.computerGameboard.allShipsSunk()) {
      console.log('User wins!');
      return;
    }

    this.currentPlayer = 'computer';
    this.computerTurn();
  }

  computerTurn() {
    let x, y;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (this.isIllegalMove(x, y));

    this.gameSetup.userGameboard.receiveAttack(x, y);
    this.renderBoards();

    if (this.gameSetup.userGameboard.allShipsSunk()) {
      console.log('Computer wins!');
      return;
    }

    this.currentPlayer = 'user';
  }

  isIllegalMove(x, y) {
    return this.gameSetup.userGameboard.missedAttacks.some(
      attack => attack[0] === x && attack[1] === y
    ) || this.gameSetup.userGameboard.hitLocations.has(`${x},${y}`);
  }

  renderBoards() {
    this.renderUserBoard();
    this.renderComputerBoard();
  }

  renderUserBoard() {
    this.userBoard.innerHTML = "";
    const board = this.gameSetup.userGameboard.board;
    const missedAttacks = this.gameSetup.userGameboard.missedAttacks;
    const hitLocations = this.gameSetup.userGameboard.hitLocations;

    board.forEach((row, x) => {
      row.forEach((cell, y) => {
        const boardCell = document.createElement("div");
        boardCell.classList.add("cell");
        boardCell.dataset.x = x;
        boardCell.dataset.y = y;

        if (missedAttacks.some(attack => attack[0] === x && attack[1] === y)) {
          boardCell.classList.add("attacked");
        }

        if (cell !== null) {
          boardCell.classList.add("ship");
          boardCell.dataset.shipLength = cell.length;

          if (hitLocations.has(`${x},${y}`)) {
            boardCell.classList.add("hit");
          }
        }
        this.userBoard.appendChild(boardCell);
      });
    });
  }

  renderComputerBoard() {
    this.computerBoard.innerHTML = "";
    const board = this.gameSetup.computerGameboard.board;
    const missedAttacks = this.gameSetup.computerGameboard.missedAttacks;
    const hitLocations = this.gameSetup.computerGameboard.hitLocations;

    board.forEach((row, x) => {
      row.forEach((cell, y) => {
        const boardCell = document.createElement("div");
        boardCell.classList.add("cell");
        boardCell.dataset.x = x;
        boardCell.dataset.y = y;

        if (missedAttacks.some(attack => attack[0] === x && attack[1] === y)) {
          boardCell.classList.add("attacked");
        }
        if (cell !== null) {
          boardCell.classList.add("ship");
          boardCell.dataset.shipLength = cell.length;

          if (hitLocations.has(`${x},${y}`)) {
            boardCell.classList.add("hit");
          }
        }

        this.computerBoard.appendChild(boardCell);
      });
    });
  }
}

module.exports = GameFlow;