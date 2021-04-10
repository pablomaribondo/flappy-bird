import Background from "../models/Background.js";
import FlappyBird from "../models/FlappyBird.js";
import Floor from "../models/Floor.js";
import Game from "../models/Game.js";
import GetReadyMessage from "../models/GetReadyMessage.js";
import Pipes from "../models/Pipes.js";
import GameScreen from "./GameScreen.js";

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
  }

  update() {
    Game.floor.update();
  }
}

export default new GetReadyScreen();
