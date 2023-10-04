import { context, sprites } from "../config";
import Game from "./Game";
import GetReadyScreen from "../screens/GetReadyScreen";

const hitEffect = new Audio();
hitEffect.src = "../assets/sounds/hit.wav";

class FlappyBird {
  sourceX = 0;
  sourceY = 0;
  width = 33;
  height = 24;
  x = 10;
  y = 50;
  gravity = 0.1;
  velocity = 0;
  jump = 3;

  moves = [
    { sourceX: 0, sourceY: 0 },
    { sourceX: 0, sourceY: 26 },
    { sourceX: 0, sourceY: 52 },
    { sourceX: 0, sourceY: 26 },
  ];

  actualFrame = 0;

  updateFrame() {
    if (Game.frames % 10 === 0) {
      const increment = this.actualFrame + 1;
      this.actualFrame = increment % this.moves.length;
    }
  }

  draw() {
    this.updateFrame();
    const { sourceX, sourceY } = this.moves[this.actualFrame];

    context.drawImage(
      sprites,
      sourceX,
      sourceY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  hop() {
    this.velocity = -this.jump;
  }

  collision() {
    const flappyBirdY = this.y + this.height;
    const floorY = Game.floor.y;

    return flappyBirdY >= floorY;
  }

  update() {
    if (this.collision()) {
      hitEffect.play();
      setTimeout(() => {
        Game.changeScreen(GetReadyScreen);
      }, 500);
      return;
    }

    this.velocity += this.gravity;
    this.y += this.velocity;
  }
}

export default FlappyBird;
