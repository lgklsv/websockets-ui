import { MES_TYPES } from '../../const';
import { db } from '../../db/AppDb';
import { ResReqBase } from '../types';

export const addUserToRoomHandler = async (
  reqBody: ResReqBase,
  connectionId: number
): Promise<ResReqBase> => {
  const { indexRoom } = JSON.parse(reqBody.data) as RequestAdd;

  const user = await db.getUserById(connectionId);
  if (user) {
    const { user1, user2 } = await db.addUserToRoom(indexRoom, user);
    console.log(user1, user2);

    if (user1 && user2) {
      return {
        type: MES_TYPES.CREATE_GAME,
        data: JSON.stringify({
          idGame: user1.index,
          idPlayer: user2.index,
        }),
        id: 0,
      };
    }
  }
};
