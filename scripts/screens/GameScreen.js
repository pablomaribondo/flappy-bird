import Game from "../models/Game.js";

class GameScreen {
  draw() {
    Game.background.draw();
    Game.pipes.draw();
    Game.floor.draw();
    Game.flappyBird.draw();
  }

  click() {
    Game.flappyBird.hop();
  }

  update() {
    Game.pipes.update();
    Game.floor.update();
    Game.flappyBird.update();
  }
}

export default new GameScreen();
