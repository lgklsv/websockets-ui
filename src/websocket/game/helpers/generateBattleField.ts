import { DEFAULT_BOT_SHIPS } from '../../../const';
import { generateEmptyGameField } from './generateEmptyGameField';
import { populateGameField } from './populateGameField';

export const generateBattleField = (): GameCell[][] => {
  return populateGameField(generateEmptyGameField(), DEFAULT_BOT_SHIPS);
};
