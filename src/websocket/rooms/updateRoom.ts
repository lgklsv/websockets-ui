import { MES_TYPES } from '../../const';
import { db } from '../../db/AppDb';

export const updateRoom = async (): Promise<ResReqBase> => {
  const rooms = await db.getRooms();

  return {
    type: MES_TYPES.UPDATE_ROOM,
    data: JSON.stringify(rooms),
    id: 0,
  };
};
