import { db } from '../../db/AppDb';
import { generateId } from '../../utils';

export const createRoomHandler = async (
  connectionId: number
): Promise<void> => {
  const newRoomId = generateId();
  const user = await db.getUserById(connectionId);
  if (user) {
    await db.createRoom(newRoomId, user);
  }
};
