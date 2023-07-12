class AppDb implements IAppDb {
  private users: User[] = [];
  private rooms: Room[] = [];
  // private games: Game[] = [];

  async getUser(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.name === username);
  }

  async getUserById(index: number): Promise<User | undefined> {
    return this.users.find((user) => user.index === index);
  }

  async addUser(newUser: User) {
    this.users.push(newUser);
  }

  async getRoomById(index: number): Promise<Room | undefined> {
    return this.rooms.find((room) => room.roomId === index);
  }

  async updateRooms(): Promise<Room[]> {
    this.rooms = this.rooms.filter((room) => room.roomUsers.length < 2);
    return this.rooms;
  }

  async createRoom(indexRoom: number, user: User): Promise<void> {
    this.rooms.push({
      roomId: indexRoom,
      roomUsers: [{ name: user.name, index: user.index }],
    });
  }

  async addUserToRoom(
    indexRoom: number,
    user: User
  ): Promise<{ user1: Player | undefined; user2: Player | undefined }> {
    let user1: Player | undefined;
    let user2: Player | undefined;

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
      user1 = room.roomUsers[0];
      user2 = user;
    }
    return { user1, user2 };
  }
}

export const db = new AppDb();
