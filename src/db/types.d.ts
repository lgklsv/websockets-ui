interface User {
  index: number;
  name: string;
  password: string;
}

type Player = Omit<User, 'password'>;

interface Room {
  roomId: number;
  roomUsers: Player[];
}

interface Ship {
  position: {
    x: number;
    y: number;
  };
  direction: boolean;
  length: number;
  type: 'small' | 'medium' | 'large' | 'huge';
}

// interface Game {
//   finished: boolean;
//   turn: number;
//   gameId: number;
//   sentShipsCounter: 0 | 1 | 2;
//   players: { index: number; field: Field }[];
//   hittedFields: { x: number; y: number }[];
// }

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
