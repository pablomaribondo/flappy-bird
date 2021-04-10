import { canvas, context, sprites } from "../config.js";

class Floor {
  constructor() {
    this.sourceX = 0;
    this.sourceY = 610;
    this.width = 224;
    this.height = 112;
    this.x = 0;
    this.y = canvas.height - 112;
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

  update() {
    const repeatsIn = this.width / 2;
    const movement = this.x - 1;

    this.x = movement % repeatsIn;
  }
}

export default Floor;
