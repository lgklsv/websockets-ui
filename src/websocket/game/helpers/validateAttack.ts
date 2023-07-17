export const isAttackValid = (
  gameField: GameCell[][],
  x: number,
  y: number
): boolean => {
  return (
    gameField[x] &&
    gameField[x][y] &&
    (gameField[x][y].status === 'init' || gameField[x][y].status === 'ship')
  );
};
