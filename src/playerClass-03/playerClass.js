class User {
  constructor(gameboard) {
    this.type = "user";
    this.gameboard = gameboard;
  }
}

class Computer {
  constructor(gameboard) {
    this.type = "computer";
    this.gameboard = gameboard;
  }
}

function createPlayer(type, gameboard) {
  if (type === "user") {
    return new User(gameboard);
  } else if (type === "computer") {
    return new Computer(gameboard);
  } 
}
module.exports = { User, Computer, createPlayer };