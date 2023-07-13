interface RequestAddShips {
  gameId: number;
  ships: Ship[];
  indexPlayer: number;
}

interface RequestAttack {
  gameId: number;
  x: number;
  y: number;
  indexPlayer: number;
}

type ResCellStatus = 'miss' | 'killed' | 'shot';
