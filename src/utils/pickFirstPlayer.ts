export const pickFirstPlayer = (players: Player[]): Player => {
  return players[Math.floor(Math.random() * players.length)];
};
