import { db } from '../../db/AppDb';
import { generateId } from '../../utils';
import { updateRoom } from './updateRoom';

export const createRoom = async (connectionId: number): Promise<ResReqBase> => {
  const newRoomId = generateId();
  const user = await db.getUserById(connectionId);
  if (user) {
    await db.createRoom(newRoomId, user);
  }

  return await updateRoom();
};
