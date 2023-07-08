class AppDb implements IAppDb {
  private users: User[] = [];

  async getUser(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.name === username);
  }

  async addUser(newUser: User) {
    this.users.push(newUser);
  }
}

export const db = new AppDb();
