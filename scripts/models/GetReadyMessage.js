import { canvas, context, sprites } from "../config.js";

class GetReadyMessage {
  constructor() {
    this.sourceX = 134;
    this.sourceY = 0;
    this.width = 174;
    this.height = 152;
    this.x = canvas.width / 2 - 174 / 2;
    this.y = 50;
  }

  draw() {
    context.drawImage(
      sprites,
      this.sourceX,
      this.sourceY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

export default GetReadyMessage;
