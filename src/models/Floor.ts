import Model from "./BaseModel";
import { canvas, context, sprites } from "../config";

class Floor extends Model {
  constructor() {
    const sourceX = 0;
    const sourceY = 610;
    const width = 224;
    const height = 112;
    const x = 0;
    const y = canvas.height - height;

    super(sourceX, sourceY, width, height, x, y);
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
