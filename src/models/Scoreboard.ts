import Game from "./Game";
import { canvas, context } from "../config";

class Score {
  score: number = 0;

  draw() {
    context.font = "35px 'VT323'";
    context.textAlign = "right";
    context.fillStyle = "white";
    context.fillText(`${this.score}`, canvas.width - 10, 35);
  }

  update() {
    if (Game.frames % 100 === 0) {
      this.score++;
    }
  }
}

export default Score;
