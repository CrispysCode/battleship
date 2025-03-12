describe('Gameboard', () => {
  it('should be able to place ships at specific coordinates', () => {
    const gameboard = new Gameboard();
    const ship = new Ship(5);
    gameboard.placeShip(ship, 0, 0, 'horizontal');
    expect(gameboard.getShipAt(0, 0)).toBe(ship);
  });

  it('should be able to receive an attack at specific coordinates', () => {
    const gameboard = new Gameboard();
    const ship = new Ship(5);
    gameboard.placeShip(ship, 0, 0, 'horizontal');
    gameboard.receiveAttack(0, 0);
    expect(ship.hits).toBe(1);
  });

  it('should record missed attacks', () => {
    const gameboard = new Gameboard();
    gameboard.receiveAttack(0, 0);
    expect(gameboard.getMissedAttacks()).toContainEqual([0, 0]);
  });

  it('should report whether or not all ships have been sunk', () => {
    const gameboard = new Gameboard();
    const ship = new Ship(5);
    gameboard.placeShip(ship, 0, 0, 'horizontal');
    for (let i = 0; i < 5; i++) {
      gameboard.receiveAttack(0, i);
    }
    expect(gameboard.allShipsSunk()).toBe(true);
  });

  it('should not report all ships sunk if not all ships have been sunk', () => {
    const gameboard = new Gameboard();
    const ship = new Ship(5);
    gameboard.placeShip(ship, 0, 0, 'horizontal');
    for (let i = 0; i < 4; i++) {
      gameboard.receiveAttack(0, i);
    }
    expect(gameboard.allShipsSunk()).toBe(false);
  });
});