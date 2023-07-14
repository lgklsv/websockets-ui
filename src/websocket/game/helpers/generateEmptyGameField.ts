export const generateEmptyGameField = (): GameCell[][] => {
  const matrix = [];
  for (var i = 0; i < 10; i++) {
    matrix[i] = [];
    for (var j = 0; j < 10; j++) {
      matrix[i][j] = { x: i, y: j, status: 'init', ship: undefined };
    }
  }
  return matrix;
};
