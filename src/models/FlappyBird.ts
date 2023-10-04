import Game from "./Game";
import GameOverScreen from "../screens/GameOverScreen";
import Model from "./BaseModel";
import hitEffect from "../effects/hitEffect";
import { context, sprites } from "../config";

class FlappyBird extends Model {
  actualFrame: number;
  gravity: number;
  jump: number;
  moves: { sourceX: number; sourceY: number }[];
  velocity: number;

  constructor() {
    const sourceX = 0;
    const sourceY = 0;
    const width = 33;
    const height = 24;
    const x = 10;
    const y = 50;

    super(sourceX, sourceY, width, height, x, y);

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

  collision() {
    const flappyBirdY = this.y + this.height;
    const floorY = Game.floor.y;

    return flappyBirdY >= floorY;
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

  update() {
    if (this.collision()) {
      hitEffect.play();
      Game.changeScreen(GameOverScreen);
      return;
    }

    this.velocity += this.gravity;
    this.y += this.velocity;
  }

  updateFrame() {
    if (Game.frames % 10 === 0) {
      const increment = this.actualFrame + 1;
      this.actualFrame = increment % this.moves.length;
    }
  }
}

export default FlappyBird;
