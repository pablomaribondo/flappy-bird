import Game from "../models/Game";

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

export { GameScreen }

export default new GameScreen();
