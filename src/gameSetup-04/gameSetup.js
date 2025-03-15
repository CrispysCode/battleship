const Gameboard = require("../gameboardClass-02/gameboardClass");
const {
  User,
  Computer,
  createPlayer,
} = require("../playerClass-03/playerClass");
const {
  Carrier,
  Battleship,
  Cruiser,
  Submarine,
  Destroyer,
} = require("../shipClass-01/shipClass.js");

class GameSetup {
  constructor() {
    this.userGameboard = new Gameboard();
    this.userPlayer = new createPlayer("user", this.userGameboard);

    this.computerGameboard = new Gameboard();
    this.computerPlayer = new createPlayer("computer", this.computerGameboard);
  }

  placeComputerShips() {
    const ships = [
      new Carrier(),
      new Battleship(),
      new Cruiser(),
      new Submarine(),
      new Destroyer(),
    ];

    ships.forEach((ship, index) => {
      let x, y, position;
      let validPlacement = false;

      while (!validPlacement) {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
        position = Math.random() < 0.5 ? "horizontal" : "vertical";

        try {
          this.computerGameboard.placeShip(ship, x, y, position);
          validPlacement = true;
        } catch (error) {
          console.log(`Error placing ship ${index + 1}:`, error);
        }
      }
      console.log(`Placed ship ${index + 1}:`, {
        ship: ship.constructor.name,
        x: x,
        y: y,
        position: position,
      });
    });
  }

  startGame() {
    this.placeComputerShips();

    console.log("Game started");
    console.log("User Ships:", this.userGameboard.ships);
    console.log("Computer Ships:", this.computerGameboard.ships);
  }
}

module.exports = GameSetup;
