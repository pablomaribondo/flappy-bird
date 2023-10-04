import Pipes from "./Pipes";
import Floor from "./Floor";
import Background from "./Background";
import GetReadyMessage from "./GetReadyMessage";
import FlappyBird from "./FlappyBird";
import { GameScreen } from "../screens/GameScreen";
import { GetReadyScreen } from "../screens/GetReadyScreen";

type Screen = Partial<GetReadyScreen & GameScreen> & Required<{draw(): void, update(): void}>;

class Game {
  static activeScreen: Screen;
  static background: Background;
  static flappyBird: FlappyBird;
  static floor: Floor;
  static frames: number = 0;
  static getReadyMessage: GetReadyMessage;
  static pipes: Pipes;

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
