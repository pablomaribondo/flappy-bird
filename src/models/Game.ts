import Background from "./Background";
import FlappyBird from "./FlappyBird";
import Floor from "./Floor";
import GameOverMessage from "./messages/GameOverMessage";
import GetReadyMessage from "./messages/GetReadyMessage";
import Pipes from "./Pipes";
import Scoreboard from "./Scoreboard";
import { GameOverScreen } from "../screens/GameOverScreen";
import { GameScreen } from "../screens/GameScreen";
import { GetReadyScreen } from "../screens/GetReadyScreen";

type Screen = Partial<GetReadyScreen & GameScreen & GameOverScreen> & Required<{draw(): void, update(): void}>;

class Game {
  static activeScreen: Screen;
  static background: Background;
  static flappyBird: FlappyBird;
  static floor: Floor;
  static frames: number = 0;
  static getReadyMessage: GetReadyMessage;
  static gameOverMessage: GameOverMessage;
  static pipes: Pipes;
  static scoreboard: Scoreboard;

  static changeScreen(newScreen: Screen) {
    Game.activeScreen = newScreen;

    if (Game.activeScreen.initialize) {
      Game.activeScreen.initialize();
    }
  }

  static loop() {
    Game.activeScreen.draw();
    Game.activeScreen.update();

    Game.frames += 1;

    requestAnimationFrame(Game.loop);
  }
}

export default Game;
