import Game from "../models/Game";
import GetReadyScreen from "./GetReadyScreen";

class GameOverScreen {
  draw() {
    Game.gameOverMessage.draw()
  }

  click() {
    Game.changeScreen(GetReadyScreen)
  }

  update() {}
}

export { GameOverScreen }

export default new GameOverScreen();
