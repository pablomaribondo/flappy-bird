import Message from "./BaseMessage";

class GameOverMessage extends Message {
  constructor() {
    const sourceX = 134;
    const sourceY = 153;
    const width = 226;
    const height = 200;

    super(sourceX, sourceY, width, height);
  }
}

export default GameOverMessage;
