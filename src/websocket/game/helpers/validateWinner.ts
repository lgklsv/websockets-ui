export const isWinner = (gameField: GameCell[][]): boolean => {
  let isWinner = true;

  for (let i = 0; i < gameField.length; i++) {
    for (let j = 0; j < gameField[i].length; j++) {
      if (gameField[i][j].status === 'ship') {
        isWinner = false;
      }
    }
  }

  return isWinner;
};
