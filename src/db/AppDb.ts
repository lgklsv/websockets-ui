class AppDb implements IAppDb {
  private users: User[] = [];
  private rooms: Room[] = [];

  async getUser(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.name === username);
  }

  async getUserById(index: number): Promise<User | undefined> {
    return this.users.find((user) => user.index === index);
  }

  async addUser(newUser: User) {
    this.users.push(newUser);
  }

  async getRooms(): Promise<Room[]> {
    return this.rooms;
  }

  async createRoom(indexRoom: number, user: User): Promise<void> {
    this.rooms.push({
      roomId: indexRoom,
      roomUsers: [{ name: user.name, index: user.index }],
    });
  }

  async addUserToRoom(indexRoom: number, user: User): Promise<void> {
    const roomIdx = this.rooms.findIndex((room) => room.roomId === indexRoom);
    const room = this.rooms[roomIdx];
    const userInRoom = room.roomUsers.find(
      (roomUser) => roomUser.index === user.index
    );

    if (!userInRoom && room.roomUsers.length < 2) {
      this.rooms[roomIdx].roomUsers.push({
        name: user.name,
        index: user.index,
      });
    }
  }
}

export const db = new AppDb();
