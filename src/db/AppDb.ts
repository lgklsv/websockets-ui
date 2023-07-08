class AppDb implements IAppDb {
  private users: User[] = [];

  async getUser(id: number): Promise<User | undefined> {
    return this.users.find((user) => user.index === id);
  }

  async addUser(newUser: User) {
    this.users.push(newUser);
  }
}

export const db = new AppDb();
