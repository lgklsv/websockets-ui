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

type GameCell = {
  x: number;
  y: number;
  status: 'init' | 'ship' | 'miss' | 'killed' | 'shot';
  ship: Ship | undefined;
};

interface Game {
  gameId: number;
  active: boolean;
  turn: number;
  readyStage: 'init' | 'one_ready' | 'both_ready';
  players: { index: number; ships: Ship[]; gameField: GameCell[][] }[];
}

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
  createGame: (players: Player[]) => Promise<number>;
  getGameById: (gameId: number) => Promise<Game | undefined>;
  updateGameById: (gameId: number, updatedGame: Game) => Promise<void>;
}
