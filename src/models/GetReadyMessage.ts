import { canvas, context, sprites } from "../config";

class GetReadyMessage {
  sourceX = 134;
  sourceY = 0;
  width = 174;
  height = 152;
  x = canvas.width / 2 - 174 / 2;
  y = 50;

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
