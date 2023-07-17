export const isKilled = (ship: Ship, gameField: GameCell[][]): boolean => {
  // Vertical
  let isKilled = true;
  if (ship.direction) {
    for (let i = 0; i < ship.length; i++) {
      if (gameField[ship.position.x][ship.position.y + i].status === 'ship') {
        isKilled = false;
      }
    }
  }
  // Horizontal
  else {
    for (let i = 0; i < ship.length; i++) {
      if (gameField[ship.position.x + i][ship.position.y].status === 'ship') {
        isKilled = false;
      }
    }
  }
  return isKilled;
};
