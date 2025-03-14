const Gameboard = require("../gameboardClass-02/gameboardClass");
const { User, Computer, createPlayer } = require("./playerClass");

describe("Player", () => {
  it("should create a new user player with a gameboard", () => {
    const gameboard = new Gameboard();
    const player = createPlayer("user", gameboard);
    expect(player.type).toBe("user");
    expect(player.gameboard).toBe(gameboard);
  });

  it("should create a new computer player with a gameboard", () => {
    const gameboard = new Gameboard();
    const player = createPlayer("computer", gameboard);
    expect(player.type).toBe("computer");
    expect(player.gameboard).toBe(gameboard);
  });
});
