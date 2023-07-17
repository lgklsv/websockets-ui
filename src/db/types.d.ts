interface User {
  index: number;
  name: string;
  password: string;
  loggedIn: boolean;
}

type Player = Omit<User, 'password'> & { isBot?: boolean };

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

type PlayersInGame = {
  index: number;
  ships: Ship[];
  gameField: GameCell[][];
}[];

interface Game {
  gameId: number;
  active: boolean;
  turn: number;
  readyStage: 'init' | 'one_ready' | 'both_ready';
  singlePlay: boolean;
  players: PlayersInGame;
}

interface Winner {
  name: string;
  wins: number;
}

interface IAppDb {
  getUser: (username: string) => Promise<User | undefined>;
  getUserById: (index: number) => Promise<User | undefined>;
  addUser: (newUser: User) => Promise<void>;
  loginUser: (name: string, index: number) => Promise<void>;
  logoutUser: (index: number) => Promise<void>;
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
  changeTurn: (gameId: number) => Promise<void>;
  getOpponentGameField: (
    gameId: number,
    curPlayerIdx: number
  ) => Promise<GameCell[][] | undefined>;
  getWinners: () => Promise<Winner[]>;
  updateWinners: (indexPlayer: number) => Promise<void>;
}
