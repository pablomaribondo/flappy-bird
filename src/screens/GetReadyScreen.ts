import Background from "../models/Background";
import FlappyBird from "../models/FlappyBird";
import Floor from "../models/Floor";
import Game from "../models/Game";
import GameOverMessage from "../models/messages/GameOverMessage";
import GameScreen from "./GameScreen";
import GetReadyMessage from "../models/messages/GetReadyMessage";
import Pipes from "../models/Pipes";

class GetReadyScreen {
  draw() {
    Game.background.draw();
    Game.floor.draw();
    Game.flappyBird.draw();
    Game.getReadyMessage.draw();
  }

  click() {
    Game.changeScreen(GameScreen);
  }

  initialize() {
    Game.background = new Background();
    Game.flappyBird = new FlappyBird();
    Game.floor = new Floor();
    Game.pipes = new Pipes();
    Game.getReadyMessage = new GetReadyMessage();
    Game.gameOverMessage = new GameOverMessage();
  }

  update() {
    Game.floor.update();
  }
}

export { GetReadyScreen }

export default new GetReadyScreen();
