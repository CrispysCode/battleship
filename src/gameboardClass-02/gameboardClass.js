class Gameboard {
  constructor() {
    this.board = Array(10)
      .fill(null)
      .map(() => Array(10).fill(null));
    this.missedAttacks = [];
    this.ships = [];
    this.hitLocations = new Set();
  }

  placeShip(ship, x, y, pos) {
    if (pos === "horizontal") {
      for (let i = 0; i < ship.length; i++) {
        if (x < 0 || x >= 10 || y + i < 0 || y + i >= 10) {
          throw new Error("Ship placement invalid");
        }
        if (this.board[x][y + i] !== null) {
          throw new Error("Ship has already taken this position");
        }
        
      }
      for (let i = 0; i < ship.length; i++) {
        this.board[x][y + i] = ship;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        if (x + i < 0 || x + i >= 10 || y < 0 || y + i >= 10) {
          throw new Error("Ship placement invalid");
        }
        if (this.board[x + i][y] !== null) {
          throw new Error("Ship has already taken this position");
        }
      }
      for (let i = 0; i < ship.length; i++) {
        this.board[x + i][y] = ship;
      }
    }
    this.ships.push(ship);
  }

  receiveAttack(x, y) {
    if (this.board[x][y] !== null) {
      this.board[x][y].hit();
      this.hitLocations.add(`${x},${y}`);
    } else {
      this.missedAttacks.push([x, y]);
    }
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}

module.exports = Gameboard;
