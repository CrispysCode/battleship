const {
  Carrier,
  Battleship,
  Cruiser,
  Submarine,
  Destroyer,
} = require("./shipClass-01/shipClass");

let gameSetup;
let currentShip = null;
let orientation = "horizontal";
const renderText = document.querySelector(".renderText");
const shipContainer = document.querySelector(".ships-container");
const userBoard = document.querySelector(".userBoard");
const output = document.querySelector(".status");

const shipPlacement = (setup) => {
  gameSetup = setup;

  shipContainer.querySelectorAll(".ship").forEach((ship) => {
    ship.addEventListener("dragstart", (e) => {
      currentShip = {
        length: parseInt(e.target.dataset.length),
        name: e.target.dataset.name,
        orientation: orientation,
      };
    });

    ship.addEventListener("dragend", () => {
      currentShip = null;
      clearPreview();
    });
  });

  userBoard.addEventListener("dragover", (e) => {
    e.preventDefault();
    if (!currentShip) return;

    const x = parseInt(e.target.dataset.x);
    const y = parseInt(e.target.dataset.y);

    const target = e.target;

    if (!target.dataset.x || !target.dataset.y) {
      console.error('error', target);
      return;
    }
    renderShipOnBoard(
      x,
      y,
      currentShip.length,
      currentShip.orientation,
      "",
      true,
    );
  });

  userBoard.addEventListener("drop", (e) => {
    e.preventDefault();
    if (!currentShip) return;

    const x = parseInt(e.target.dataset.x);
    const y = parseInt(e.target.dataset.y);

    try {
      placeShip(x, y, currentShip);
    } catch (error) {
      console.error("Invalid ship placement:", error);
    }
  });

  // Orientation toggle
  document.addEventListener("keydown", (e) => {
    if (e.key === "r") {
      orientation = orientation === "horizontal" ? "vertical" : "horizontal";
      renderText.innerHTML = `${orientation}`.toUpperCase();

      if (currentShip) {
        currentShip.orientation = orientation;
        const previewCell = document.querySelector(".userBoard .ship-preview");
        if (previewCell) {
          const x = parseInt(previewCell.dataset.x);
          const y = parseInt(previewCell.dataset.y);
          renderShipOnBoard(x, y, currentShip.length, orientation, "", true);
        }
      }
    }
  });
};

function clearPreview() {
  document.querySelectorAll(".ship-preview").forEach((el) => {
    el.classList.remove("ship-preview");
  });
}

function placeShip(x, y, shipData) {
  const shipMap = {
    Carrier: Carrier,
    Battleship: Battleship,
    Cruiser: Cruiser,
    Submarine: Submarine,
    Destroyer: Destroyer,
  };

  const ShipClass = shipMap[shipData.name];
  const ship = new ShipClass();

  gameSetup.userGameboard.placeShip(ship, x, y, shipData.orientation);

  // Remove ship from container
  const shipElement = document.querySelector(`[data-name="${shipData.name}"]`);
  shipElement.remove();

  // Render ship
  renderShipOnBoard(x, y, ship.length, shipData.orientation, shipData.name);

  const remainingShips = document.querySelectorAll(".ships-container .ship");

  if (remainingShips.length === 0) {
    output.textContent = "PRESS START";
  }
  // Clear current ship and preview
  currentShip = null;
  clearPreview();
}

function renderShipOnBoard(
  x,
  y,
  length,
  orientation,
  shipName,
  isPreview = false,
) {
  clearPreview();
  for (let i = 0; i < length; i++) {
    const cellX = orientation === "horizontal" ? x : x + i;
    const cellY = orientation === "horizontal" ? y + i : y;

    const cell = document.querySelector(
      `.userBoard .cell[data-x="${cellX}"][data-y="${cellY}"]`,
    );

    if (cell) {
      if (isPreview) {
        cell.classList.add("ship-preview");
      } else {
        cell.classList.add("userShip");
        cell.classList.add(`${shipName.toLowerCase()}-ship`);
      }
    }
  }
}

export default shipPlacement;
