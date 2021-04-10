import { canvas, context, sprites } from "../config.js";
import GetReadyScreen from "../screens/GetReadyScreen.js";
import Game from "./Game.js";

class Pipes {
  constructor() {
    this.width = 52;
    this.height = 400;
    this.bottom = {
      sourceX: 0,
      sourceY: 169,
    };
    this.top = {
      sourceX: 52,
      sourceY: 169,
    };
    this.gap = 90;
    this.pairs = [];
  }

  draw() {
    this.pairs.forEach(pair => {
      const topPipeX = pair.x;
      const topPipeY = pair.y;

      context.drawImage(
        sprites,
        this.top.sourceX,
        this.top.sourceY,
        this.width,
        this.height,
        topPipeX,
        topPipeY,
        this.width,
        this.height
      );

      const bottomPipeX = pair.x;
      const bottomPipeY = this.height + this.gap + pair.y;

      context.drawImage(
        sprites,
        this.bottom.sourceX,
        this.bottom.sourceY,
        this.width,
        this.height,
        bottomPipeX,
        bottomPipeY,
        this.width,
        this.height
      );

      pair.topPipe = {
        x: topPipeX,
        y: this.height + topPipeY,
      };

      pair.bottomPipe = {
        x: bottomPipeX,
        y: bottomPipeY,
      };
    });
  }

  colision(pair) {
    const head = Game.flappyBird.y;
    const foot = Game.flappyBird.y + Game.flappyBird.height;

    if (Game.flappyBird.x >= pair.x) {
      if (head <= pair.topPipe.y) {
        return true;
      }

      if (foot >= pair.bottomPipe.y) {
        return true;
      }

      return false;
    }
  }

  update() {
    if (Game.frames % 100 === 0) {
      this.pairs.push({
        x: canvas.width,
        y: -150 * (Math.random() + 1),
      });
    }

    this.pairs.forEach(pair => {
      pair.x -= 2;

      if (this.colision(pair)) {
        Game.changeScreen(GetReadyScreen);
      }

      if (pair.x + this.width <= 0) {
        this.pairs.shift();
      }
    });
  }
}

export default Pipes;
