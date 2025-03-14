const Ship = require("./shipClass-01/shipClass.js");
const Gameboard = require("./gameboardClass-02/gameboardClass.js");
const {
  User,
  Computer,
  createPlayer,
} = require("./playerClass-03/playerClass.js");
const GameSetup = require("./gameSetup-04/gameSetup.js");
const RenderGame = require("./renderModule.js");
import "./styles.css";

document.addEventListener("DOMContentLoaded", () => {
 const startBtn = document.querySelector(".startBtn");
 startBtn.addEventListener("click", () => {
  const gameSetup = new GameSetup();
  gameSetup.startGame();

  const renderGame = new RenderGame(gameSetup);
  renderGame.renderBoards();
 })
})