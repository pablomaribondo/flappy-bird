import { canvas, context, sprites } from "../config.js";

class Background {
  constructor() {
    this.sourceX = 390;
    this.sourceY = 0;
    this.width = 275;
    this.height = 204;
    this.x = 0;
    this.y = canvas.height - 204;
  }

  draw() {
    context.fillStyle = "#70c5ce";
    context.fillRect(0, 0, canvas.width, canvas.height);

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

    context.drawImage(
      sprites,
      this.sourceX,
      this.sourceY,
      this.width,
      this.height,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
}

export default Background;
