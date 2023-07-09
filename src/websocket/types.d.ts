import { MES_TYPES } from '../const';

export type AvailableMesTypes = `${MES_TYPES}`;

export interface ResReqBase {
  type: AvailableMesTypes;
  data: string;
  id: 0;
}
