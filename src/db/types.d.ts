interface User {
  index: number;
  name: string;
  password: string;
}

interface IAppDb {
  getUser: (id: number) => Promise<User | undefined>;
}
