class Model {
  sourceX: number;
  sourceY: number;
  width: number;
  height: number;
  x: number;
  y: number;

  constructor(
    sourceX: number,
    sourceY: number,
    width: number,
    height: number,
    x: number,
    y: number
  ) {
    this.sourceX = sourceX;
    this.sourceY = sourceY;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }
}

export default Model;
