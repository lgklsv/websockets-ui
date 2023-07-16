export const isGameFieldAttackable = (gameField: GameCell[][]) => {
  let isAttackable = false;

  for (let i = 0; i < gameField.length; i++) {
    for (let j = 0; j < gameField[i].length; j++) {
      if (
        gameField[i][j].status === 'init' ||
        gameField[i][j].status === 'ship'
      ) {
        isAttackable = true;
      }
    }
  }
  return isAttackable;
};
