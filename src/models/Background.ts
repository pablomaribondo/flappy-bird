import Model from "./BaseModel";
import { canvas, context, sprites } from "../config";

class Background extends Model {
  constructor() {
    const sourceX = 390;
    const sourceY = 0;
    const width = 275;
    const height = 204;
    const x = 0;
    const y = canvas.height - height;

    super(sourceX, sourceY, width, height, x, y);
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
