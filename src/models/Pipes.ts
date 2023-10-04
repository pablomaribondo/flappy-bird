import { canvas, context, sprites } from "../config";
import GetReadyScreen from "../screens/GetReadyScreen";
import Game from "./Game";

type Pipe = {
  sourceX: number;
  sourceY: number;
}

type Pair = {
  x: number;
  y: number;
  bottomPipe?: {
    x: number;
    y: number;
  }
  topPipe?: {
    x: number;
    y: number;
  }
}

class Pipes {
  width: number = 52;
  height: number = 400;
  bottom: Pipe = {
    sourceX: 0,
    sourceY: 169,
  };
  top: Pipe = {
    sourceX: 52,
    sourceY: 169,
  };
  gap: number = 90;
  pairs: Pair[] = [];

  draw() {
    this.pairs.forEach((pair) => {
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

  collision(pair: Pair) {
    const head = Game.flappyBird.y;
    const foot = Game.flappyBird.y + Game.flappyBird.height;

    if (Game.flappyBird.x >= pair.x) {
      if (pair?.topPipe && head <= pair.topPipe.y) {
        return true;
      }

      if (pair?.bottomPipe && foot >= pair.bottomPipe.y) {
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

    this.pairs.forEach((pair) => {
      pair.x -= 2;

      if (this.collision(pair)) {
        Game.changeScreen(GetReadyScreen);
      }

      if (pair.x + this.width <= 0) {
        this.pairs.shift();
      }
    });
  }
}

export default Pipes;
