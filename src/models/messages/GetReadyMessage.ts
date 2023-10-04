import Message from "./BaseMessage";

class GetReadyMessage extends Message {
  constructor() {
    const sourceX = 134;
    const sourceY = 0;
    const width = 174;
    const height = 152;

    super(sourceX, sourceY, width, height);
  }
}

export default GetReadyMessage;
