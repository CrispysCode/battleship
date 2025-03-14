const Gameboard = require("../gameboardClass-02/gameboardClass");
const {
  User,
  Computer,
  createPlayer,
} = require("../playerClass-03/playerClass");
const Ship = require("../shipClass-01/shipClass");

class GameSetup {
  constructor() {
    this.userGameboard = new Gameboard();
    this.userPlayer = new createPlayer("user", this.userGameboard);

    this.computerGameboard = new Gameboard();
    this.computerPlayer = new createPlayer("computer", this.computerGameboard);
  }

  placeUserShips() {
    const ships = [
      { length: 5, x: 0, y: 0, position: "horizontal" },
      { length: 4, x: 2, y: 2, position: "horizontal" },
      { length: 3, x: 5, y: 5, position: "horizontal" },
      { length: 3, x: 7, y: 7, position: "horizontal" },
      { length: 2, x: 9, y: 0, position: "horizontal" },
    ];

    ships.forEach((shipSpot) => {
      const ship = new Ship(shipSpot.length);
      this.userGameboard.placeShip(
        ship,
        shipSpot.x,
        shipSpot.y,
        shipSpot.position,
      );
    });
  }

  placeComputerShips() {
    const ships = [
      { length: 5, x: 1, y: 1, position: "horizontal" },
      { length: 4, x: 3, y: 3, position: "horizontal" },
      { length: 3, x: 6, y: 6, position: "horizontal" },
      { length: 3, x: 8, y: 8, position: "horizontal" },
      { length: 2, x: 0, y: 9, position: "horizontal" },
    ];

    ships.forEach((shipSpot) => {
      const ship = new Ship(shipSpot.length);
      this.computerGameboard.placeShip(
        ship,
        shipSpot.x,
        shipSpot.y,
        shipSpot.position,
      );
    });
  }

  startGame() {
    this.placeUserShips();
    this.placeComputerShips();

    console.log("Game started");
    console.log("User Ships:", this.userGameboard.ships);
    console.log("Computer Ships:", this.computerGameboard.ships);
  }
}

module.exports = GameSetup;
