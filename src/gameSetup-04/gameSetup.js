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

  placeUserShips() {
    const ships = [
      { length: 5, x: 0, y: 0, position: "horizontal" },
      { length: 4, x: 2, y: 2, position: "horizontal" },
      { length: 3, x: 5, y: 5, position: "horizontal" },
      { length: 3, x: 7, y: 7, position: "horizontal" },
      { length: 2, x: 9, y: 0, position: "horizontal" },
    ];

    ships.forEach((shipSpot, index) => {
      console.log(`Attempting to place ship ${index + 1}:`, {
        ship: shipSpot.ship.constructor.name,
        x: shipSpot.x,
        y: shipSpot.y,
        position: shipSpot.position,
      });

      try {
  
        this.userGameboard.placeShip(
          shipSpot.ship,
          shipSpot.x,
          shipSpot.y,
          shipSpot.position,
        );
      } catch (error) {
        console.error(`Error placing ship ${index + 1}:`, error);
        throw error;
      }
    });
  }

  placeComputerShips() {
    const ships = [
      { ship: new Carrier(), x: 1, y: 1, position: "vertical" },
      { ship: new Battleship(), x: 3, y: 3, position: "vertical" },
      { ship: new Cruiser(), x: 6, y: 6, position: "horizontal" },
      { ship: new Submarine(), x: 8, y: 7, position: "vertical" },
      { ship: new Destroyer(), x: 0, y: 8, position: "horizontal" },
    ];

    ships.forEach((shipSpot, index) => {
      console.log(`Attempting to place ship ${index + 1}:`, {
        ship: shipSpot.ship.constructor.name,
        x: shipSpot.x,
        y: shipSpot.y,
        position: shipSpot.position,
      });

      try {
        this.computerGameboard.placeShip(
          shipSpot.ship,
          shipSpot.x,
          shipSpot.y,
          shipSpot.position,
        );
      } catch (error) {
        console.error(`Error placing ship ${index + 1}:`, error);
        throw error;
      }
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
