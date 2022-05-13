enum Player {
  X = 'X',
  O = 'O',
}

enum GameState {
  PLAYING = 'PLAYING',
  ENDED = 'ENDED',
}

class Tile {
  private value: Player | undefined;

  constructor() {
    this.value = undefined;
  }

  getValue(): Player | undefined {
    return this.value;
  }

  setValue(newVal: Player): void {
    this.value = newVal;
  }

  clearTile(): void {
    this.value = undefined;
  }

  equals(tile: Tile): boolean {
    return this.value === tile.value;
  }

  isPopulated(): boolean {
    return this.value !== undefined;
  }
}

class Board {
  private tiles: Tile[][];

  constructor() {
    this.tiles = [[new Tile(), new Tile(), new Tile()],
                  [new Tile(), new Tile(), new Tile()],
                  [new Tile(), new Tile(), new Tile()]];
  }

  reset(): void {
    this.tiles.forEach(
      row => row.forEach(
        tile => tile.clearTile(),
      ),
    );
  }

  setTile(row: number, col: number, player: Player): void {
    if (this.tiles[row][col].isPopulated()) {
      throw new Error('That place is already taken!');
    }
    this.tiles[row][col].setValue(player);
  }

  isGameOver(): boolean {
    // verticals
    outer: for (let i = 0; i < 3; i++) {
      const firstTile = this.tiles[0][i];
      if (!firstTile.isPopulated()) continue outer;
      for (let j = 1; j < 3; j++) {
        if (!this.tiles[j][i].equals(firstTile)) continue outer;
      }
      return true;
    }

    // horizontals
    outer: for (let i = 0; i < 3; i++) {
      const firstTile = this.tiles[i][0];
      if (!firstTile.isPopulated()) continue outer;
      for (let j = 1; j < 3; j++) {
        if (!this.tiles[i][j].equals(firstTile)) continue outer;
      }
      return true;
    }

    // left diagonal
    let firstTile = this.tiles[0][0];
    if (firstTile.isPopulated()) {
      let win = true;
      for (let i = 1; i < 3; i++) {
        if (!this.tiles[i][i].equals(firstTile)) {
          win = false;
          break;
        }
      }
      if (win) return true;
    }

    // right diagonal
    firstTile = this.tiles[2][0];
    if (firstTile.isPopulated()) {
      let win = true;
      for (let i = 1; i < 3; i++) {
        if (!this.tiles[3 - i][i].equals(firstTile)) {
          win = false;
          break;
        }
      }
      if (win) return true;
    }

    return false;
  }

  printBoard(): void {
    const board = this.tiles.map(row => row.map(tile => tile.getValue()));
    console.log(board);
  }
}

class Game {
  private board: Board;
  private turn: Player;
  private state: GameState;

  constructor() {
    this.board = new Board();
    this.turn = Player.X;
    this.state = GameState.PLAYING;
  }

  reset(): void {
    this.board.reset();
    this.state = GameState.PLAYING;
  }

  getCurrentPlayer(): Player {
    return this.turn;
  }

  setTile(row: number, col: number): void {
    if (this.state !== GameState.PLAYING) {
      throw new Error('The game is over!');
    }

    this.board.setTile(row, col, this.turn);

    if (this.board.isGameOver()) {
      console.log(`Player ${this.turn} won!`);
      this.state = GameState.ENDED;
    }

    this.turn = this.turn === Player.X ? Player.O : Player.X;
  }

  printBoard(): void {
    this.board.printBoard();
  }
}

const game = new Game();
console.log(`Current player: ${game.getCurrentPlayer()}`);
game.setTile(0, 0);
console.log(`Current player: ${game.getCurrentPlayer()}`);
game.setTile(1,0);
game.setTile(1, 0);
game.printBoard();
game.setTile(2,2);
game.printBoard();
game.setTile(2,1);
game.printBoard();
game.setTile(1,1);
game.printBoard();
game.setTile(0,2);