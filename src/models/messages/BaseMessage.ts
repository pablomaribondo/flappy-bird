import Model from "../BaseModel";
import { canvas, context, sprites } from "../../config";

class Message extends Model {
  constructor(sourceX: number, sourceY: number, width: number, height: number) {
    const x = canvas.width / 2 - width / 2;
    const y = 50;

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
  }
}

export default Message;
