interface User {
  index: number;
  name: string;
  password: string;
}

interface IAppDb {
  getUser: (username: string) => Promise<User | undefined>;
}
