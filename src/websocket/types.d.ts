import { MES_TYPES } from '../const';

export type AvailableMesTypes = `${MES_TYPES}`;

export interface ResReqBase {
  type: AvailableMesTypes;
  data: string;
  id: 0;
}

export interface ResponseReg {
  name: string;
  index: number;
  error: boolean;
  errorText: string;
}

export interface RequestReg {
  name: string;
  password: string;
}
