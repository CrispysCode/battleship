const Gameboard = require("./gameboardClass");
const Ship = require("../shipClass-01/shipClass");
describe("Gameboard", () => {
  it("should be able to place ships at specific coordinates", () => {
    const gameboard = new Gameboard();
    const ship = new Ship(5);
    gameboard.placeShip(ship, 0, 0, "horizontal");
    expect(gameboard.board[0][0]).toBe(ship);
  });

  it("should be able to receive an attack at specific coordinates", () => {
    const gameboard = new Gameboard();
    const ship = new Ship(5);
    gameboard.placeShip(ship, 0, 0, "horizontal");
    gameboard.receiveAttack(0, 0);
    expect(ship.hits).toBe(1);
  });

  it("should record missed attacks", () => {
    const gameboard = new Gameboard();
    gameboard.receiveAttack(0, 0);
    expect(gameboard.missedAttacks).toContainEqual([0, 0]);
  });

  it("should report whether or not all ships have been sunk", () => {
    const gameboard = new Gameboard();
    const ship = new Ship(5);
    gameboard.placeShip(ship, 0, 0, "horizontal");
    for (let i = 0; i < 5; i++) {
      gameboard.receiveAttack(0, i);
    }
    expect(gameboard.allShipsSunk()).toBe(true);
  });
  it("should prevent placing ships in overlapping positions", () => {
    const gameboard = new Gameboard();
    const ship1 = new Ship(3);
    const ship2 = new Ship(3);
    gameboard.placeShip(ship1, 0, 0, "horizontal");
    expect(() => {
      gameboard.placeShip(ship2, 0, 0, "horizontal");
    }).toThrow("Ship has already taken this position");
  });
});
