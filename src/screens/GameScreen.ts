import Game from "../models/Game";
import Scoreboard from "../models/Scoreboard";

class GameScreen {
  draw() {
    Game.background.draw();
    Game.pipes.draw();
    Game.floor.draw();
    Game.flappyBird.draw();
    Game.scoreboard.draw();
  }

  click() {
    Game.flappyBird.hop();
  }

  update() {
    Game.pipes.update();
    Game.floor.update();
    Game.flappyBird.update();
    Game.scoreboard.update();
  }

  initialize() {
    Game.scoreboard = new Scoreboard();
  }
}

export { GameScreen }

export default new GameScreen();
