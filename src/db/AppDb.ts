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
}

export const db = new AppDb();
