import { getRandomNumberFromTo } from '../../../utils';
import { isAttackValid } from './validateAttack';
import { isGameFieldAttackable } from './validateAttackableGameField';

export const generateRandomAttackCords = (
  gameField: GameCell[][]
): { x: number; y: number } => {
  let x: number;
  let y: number;
  do {
    x = getRandomNumberFromTo(0, 9);
    y = getRandomNumberFromTo(0, 9);
  } while (!isAttackValid(gameField, x, y) && isGameFieldAttackable(gameField));

  return { x, y };
};
