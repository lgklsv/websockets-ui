import { db } from '../../db/AppDb';
import { ResReqBase } from '../types';
import { updateRoom } from './updateRoom';

export const addUserToRoomHandler = async (
  reqBody: ResReqBase,
  connectionId: number
): Promise<ResReqBase> => {
  const { indexRoom } = JSON.parse(reqBody.data) as RequestAdd;

  const user = await db.getUserById(connectionId);
  if (user) {
    await db.addUserToRoom(indexRoom, user);
  }

  // TODO: Create and Start game

  return await updateRoom();
};
