const sprites = new Image();
sprites.src = "../assets/sprites/sprites.png";

const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;

export { sprites, canvas, context };
