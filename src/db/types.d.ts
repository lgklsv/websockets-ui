interface User {
  index: number;
  name: string;
  password: string;
}

interface IAppDb {
  getUser: (username: string) => Promise<User | undefined>;
  getUserById: (index: number) => Promise<User | undefined>;
  getRooms: () => Promise<Room[]>;
  createRoom: (indexRoom: number, user: User) => Promise<void>;
}

interface Room {
  roomId: number;
  roomUsers: Omit<User, 'password'>[];
}
