import { generateId, pickFirstPlayer } from '../utils';
import { generateEmptyGameField } from '../websocket/game/helpers';
import { generateBattleField } from '../websocket/game/helpers/generateBattleField';

class AppDb implements IAppDb {
  private users: User[] = [];
  private rooms: Room[] = [];
  private games: Game[] = [];
  private winners: Winner[] = [];

  // Users
  async getUser(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.name === username);
  }

  async getUserById(index: number): Promise<User | undefined> {
    return this.users.find((user) => user.index === index);
  }

  async addUser(newUser: User) {
    this.users.push(newUser);
  }

  async getRoomById(index: number): Promise<Room | undefined> {
    return this.rooms.find((room) => room.roomId === index);
  }

  // Rooms
  async updateRooms(): Promise<Room[]> {
    this.rooms = this.rooms.filter((room) => room.roomUsers.length < 2);
    return this.rooms;
  }

  async createRoom(indexRoom: number, user: User): Promise<void> {
    this.rooms.push({
      roomId: indexRoom,
      roomUsers: [
        { name: user.name, index: user.index, loggedIn: user.loggedIn },
      ],
    });
  }

  async addUserToRoom(
    indexRoom: number,
    user: User
  ): Promise<{ user1: Player | undefined; user2: Player | undefined }> {
    let user1: Player | undefined;
    let user2: Player | undefined;

    const roomIdx = this.rooms.findIndex((room) => room.roomId === indexRoom);
    const room = this.rooms[roomIdx];
    const userInRoom = room.roomUsers.find(
      (roomUser) => roomUser.index === user.index
    );

    if (!userInRoom && room.roomUsers.length < 2) {
      this.rooms[roomIdx].roomUsers.push({
        name: user.name,
        index: user.index,
        loggedIn: user.loggedIn,
      });
      user1 = room.roomUsers[0];
      user2 = user;
    }
    return { user1, user2 };
  }

  // Games
  async createGame(players: Player[]): Promise<number> {
    const gameId = generateId();
    const firstPlayer = pickFirstPlayer(players);
    const isBot = players[1].isBot;

    this.games.push({
      gameId,
      active: true,
      turn: isBot ? players[0].index : firstPlayer.index,
      readyStage: 'init',
      singlePlay: isBot,
      players: [
        {
          index: players[0].index,
          ships: [],
          gameField: generateEmptyGameField(),
        },
        {
          index: players[1].index,
          ships: [],
          gameField: isBot ? generateBattleField() : generateEmptyGameField(),
        },
      ],
    });

    return gameId;
  }

  async getGameById(gameId: number): Promise<Game | undefined> {
    return this.games.find((game) => game.gameId === gameId);
  }

  async updateGameById(gameId: number, updatedGame: Game): Promise<void> {
    const gameIdx = this.games.findIndex((game) => game.gameId === gameId);
    if (gameIdx === -1) return undefined;

    this.games[gameIdx] = updatedGame;
  }

  async changeTurn(gameId: number): Promise<void> {
    const gameIdx = this.games.findIndex((game) => game.gameId === gameId);
    if (gameIdx === -1) return;

    const prevTurn = this.games[gameIdx].turn;

    const nextTurnPlayer = this.games[gameIdx].players.find(
      (player) => player.index !== prevTurn
    );

    this.games[gameIdx].turn = nextTurnPlayer.index;
  }

  async getOpponentGameField(
    gameId: number,
    curPlayerIdx: number
  ): Promise<GameCell[][] | undefined> {
    const game = await db.getGameById(gameId);
    if (!game) return;

    const opponentPlayer = game.players.find(
      (player) => player.index !== curPlayerIdx
    );
    if (!opponentPlayer) return;

    return opponentPlayer.gameField;
  }

  // Winners
  async getWinners(): Promise<Winner[]> {
    return this.winners;
  }

  async updateWinners(indexPlayer: number): Promise<void> {
    const user = this.users.find((user) => user.index === indexPlayer);
    if (!user) return;

    const existingWinnerIdx = this.winners.findIndex(
      (w) => w.name === user.name
    );

    if (existingWinnerIdx !== -1) {
      this.winners[existingWinnerIdx].wins++;
    } else {
      this.winners.push({ name: user.name, wins: 1 });
    }
  }
}

export const db = new AppDb();
