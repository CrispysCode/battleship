const {
  Carrier,
  Battleship,
  Cruiser,
  Submarine,
  Destroyer,
} = require("./shipClass-01/shipClass.js");
const Gameboard = require("./gameboardClass-02/gameboardClass.js");
const {
  User,
  Computer,
  createPlayer,
} = require("./playerClass-03/playerClass.js");
const GameSetup = require("./gameSetup-04/gameSetup.js");
const GameFlow = require("./gameFlow.js");

import shipPlacement from "./shipPlacement.js";
import "./styles.css";

const startBtn = document.querySelector(".startBtn");
const userBoard = document.querySelector(".userBoard");
const computerBoard = document.querySelector(".computerBoard");
const gameSetup = new GameSetup();
const gameStatus = document.querySelector(".status");

shipPlacement(gameSetup);
document.addEventListener("DOMContentLoaded", () => {
  for (let i = 0; i < 100; i++) {
    const userCell = document.createElement("div");
    const computerCell = document.createElement("div");
    userCell.classList.add("cell");
    userCell.dataset.x = Math.floor(i / 10);
    userCell.dataset.y = i % 10;
    userBoard.appendChild(userCell);
    computerCell.classList.add("cell");
    computerCell.dataset.x = Math.floor(i / 10);
    computerCell.dataset.y = i % 10;
    computerBoard.appendChild(computerCell);
  }
});
startBtn.addEventListener("click", () => {
  gameSetup.startGame();
  gameStatus.textContent = "You Start!";
  const gameFlow = new GameFlow(gameSetup);
  gameFlow.renderBoards();
});
