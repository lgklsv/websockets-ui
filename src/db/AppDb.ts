import { generateEmptyGameField, generateId, pickFirstPlayer } from '../utils';

class AppDb implements IAppDb {
  private users: User[] = [];
  private rooms: Room[] = [];
  private games: Game[] = [];

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
      roomUsers: [{ name: user.name, index: user.index }],
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

    this.games.push({
      gameId,
      active: true,
      turn: firstPlayer.index,
      readyStage: 'init',
      players: [
        {
          index: players[0].index,
          ships: [],
          gameField: generateEmptyGameField(),
        },
        {
          index: players[1].index,
          ships: [],
          gameField: generateEmptyGameField(),
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
}

export const db = new AppDb();
