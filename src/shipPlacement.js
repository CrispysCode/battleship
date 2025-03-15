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

const shipPlacement = (setup) => {
  gameSetup = setup;
  const shipContainer = document.querySelector(".ships-container");
  const userBoard = document.querySelector(".userBoard");

  shipContainer.querySelectorAll(".ship").forEach((ship) => {
    ship.addEventListener("dragstart", (e) => {
      currentShip = {
        length: parseInt(e.target.dataset.length),
        name: e.target.dataset.name
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

    updatePreview(x, y, currentShip.length);
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
  document.addEventListener("keypress", (e) => {
    if (e.key === "r" || e.key === "R") {
      orientation = orientation === "horizontal" ? "vertical" : "horizontal";
      
      // Update preview if ship is being dragged
      if (currentShip) {
        const hoveredCell = document.querySelector('.ship-preview');
        if (hoveredCell) {
          const x = parseInt(hoveredCell.dataset.x);
          const y = parseInt(hoveredCell.dataset.y);
          updatePreview(x, y, currentShip.length);
        }
      }
    }
  });
};

function updatePreview(x, y, length) {
  clearPreview();

  for (let i = 0; i < length; i++) {
    const cellX = orientation === 'horizontal' ? x : x + i;
    const cellY = orientation === 'horizontal' ? y + i : y;

    const cell = document.querySelector(
      `.userBoard .cell[data-x="${cellX}"][data-y="${cellY}"]`
    );

    if (cell) {
      cell.classList.add('ship-preview');
    }
  }
}

function clearPreview() {
  document.querySelectorAll('.ship-preview').forEach(el => {
    el.classList.remove('ship-preview');
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

  gameSetup.userGameboard.placeShip(ship, x, y, orientation);

  // Remove ship from container
  const shipElement = document.querySelector(
    `[data-name="${shipData.name}"]`
  );
  shipElement.remove();

  // Render ship
  renderShipOnBoard(x, y, ship.length, orientation, shipData.name);
  
  // Clear current ship and preview
  currentShip = null;
  clearPreview();
}

function renderShipOnBoard(x, y, length, orientation, shipName) {
  for (let i = 0; i < length; i++) {
    const cellX = orientation === "horizontal" ? x : x + i;
    const cellY = orientation === "horizontal" ? y + i : y;

    const cell = document.querySelector(
      `.userBoard .cell[data-x="${cellX}"][data-y="${cellY}"]`
    );

    if (cell) {
      cell.classList.add("userShip");
      cell.classList.add(`${shipName.toLowerCase()}-ship`);
    }
  }
}

export default shipPlacement;