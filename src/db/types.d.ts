interface User {
  index: number;
  name: string;
  password: string;
}

type Player = Omit<User, 'password'>;

interface IAppDb {
  getUser: (username: string) => Promise<User | undefined>;
  getUserById: (index: number) => Promise<User | undefined>;
  updateRooms: () => Promise<Room[]>;
  getRoomById: (index: number) => Promise<Room | undefined>;
  createRoom: (indexRoom: number, user: User) => Promise<void>;
  addUserToRoom: (
    indexRoom: number,
    user: User
  ) => Promise<{ user1: Player | undefined; user2: Player | undefined }>;
}

interface Room {
  roomId: number;
  roomUsers: Player[];
}
