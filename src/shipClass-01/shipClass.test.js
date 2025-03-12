describe('Ship tests', () => {
  it('when calling hit() ship.hit should be +1', () => {
    const ship = new Ship(5);
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  it('isSunk() should return true if ship has been hit its length amount', () => {
    const ship = new Ship(5);
    for (let i = 0; i < 5; i++) {
      ship.hit();
    }
    expect(ship.isSunk()).toBe(true);
  });
});