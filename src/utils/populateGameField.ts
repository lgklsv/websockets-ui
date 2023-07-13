export const populateGameField = (
  gameField: GameCell[][],
  ships: Ship[]
): GameCell[][] => {
  ships.forEach((ship) => {
    // Vertical
    if (ship.direction) {
      for (let i = 0; i < ship.length; i++) {
        gameField[ship.position.y + i][ship.position.x] = {
          ...gameField[ship.position.y + i][ship.position.x],
          status: 'ship',
          ship,
        };
      }
    }
    // Horizontal
    else {
      for (let i = 0; i < ship.length; i++) {
        gameField[ship.position.y][ship.position.x + i] = {
          ...gameField[ship.position.y][ship.position.x + i],
          status: 'ship',
          ship,
        };
      }
    }
  });
  return gameField;
};
