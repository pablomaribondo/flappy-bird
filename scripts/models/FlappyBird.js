import { context, sprites } from "../config.js";
import Game from "./Game.js";
import GetReadyScreen from "../screens/GetReadyScreen.js";

const hitEffect = new Audio();
hitEffect.src = "../assets/sounds/hit.wav";

class FlappyBird {
  constructor() {
    this.sourceX = 0;
    this.sourceY = 0;
    this.width = 33;
    this.height = 24;
    this.x = 10;
    this.y = 50;
    this.gravity = 0.1;
    this.velocity = 0;
    this.jump = 3;

    this.moves = [
      { sourceX: 0, sourceY: 0 },
      { sourceX: 0, sourceY: 26 },
      { sourceX: 0, sourceY: 52 },
      { sourceX: 0, sourceY: 26 },
    ];

    this.actualFrame = 0;
  }

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

  colision() {
    const flappyBirdY = this.y + this.height;
    const floorY = Game.floor.y;

    return flappyBirdY >= floorY;
  }

  update() {
    if (this.colision()) {
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
