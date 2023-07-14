export const populateGameField = (
  gameField: GameCell[][],
  ships: Ship[]
): GameCell[][] => {
  ships.forEach((ship) => {
    // Vertical
    console.log(ship);
    if (ship.direction) {
      for (let i = 0; i < ship.length; i++) {
        gameField[ship.position.x][ship.position.y + i] = {
          ...gameField[ship.position.x][ship.position.y + i],
          status: 'ship',
          ship,
        };
      }
    }
    // Horizontal
    else {
      for (let i = 0; i < ship.length; i++) {
        gameField[ship.position.x + i][ship.position.y] = {
          ...gameField[ship.position.x + i][ship.position.y],
          status: 'ship',
          ship,
        };
      }
    }
  });
  return gameField;
};
