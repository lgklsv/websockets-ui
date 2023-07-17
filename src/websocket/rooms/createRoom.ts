import { db } from '../../db/AppDb';

export const createRoomHandler = async (
  connectionId: number
): Promise<void> => {
  const user = await db.getUserById(connectionId);
  if (user) {
    await db.createRoom(connectionId, user);
  }
};
