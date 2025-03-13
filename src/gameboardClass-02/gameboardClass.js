const Ship = require("/");
class Gameboard {
  constructor() {
    this.board = Array(15)
      .fill(null)
      .map(() => Array(15).fill(null));
    this.missedAttacks = [];
    this.ships = [];
  }

  placeShip(ship, x, y, pos) {
    if (pos === "horizontal") {
      for (let i = 0; i < ship.length; i++) {
        if (x < 0 || x >= 15 || y + i < 0 || y + i >= 15) {
          throw new Error("Ship placement invalid");
        }
        if (this.board[x][y + i] !== null) {
          throw new Error("Ship has already taken this position");
        }
        this.board[x][y + i] = ship;
      }
    } else {
      for (let i = 0; i < ship.lenght; i++) {
        if (x + 1 < 0 || x + i >= 15 || y < 0 || y + i >= 15) {
          throw new Error("Ship placement invalid");
        }
        if (this.board[x + i][y] !== null) {
          throw new Error("Ship has already taken this position");
        }
        this.board[x + i][y] = ship;
      }
    }
    this.ships.push(ship);
  }
}

module.exports = Gameboard;
