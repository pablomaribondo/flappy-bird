import { canvas, context, sprites } from "../config";

class Floor {
  sourceX = 0;
  sourceY = 610;
  width = 224;
  height = 112;
  x = 0;
  y = canvas.height - 112;

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
