const sprites = new Image();
sprites.src = "../assets/sprites/sprites.png";

const canvas = document.getElementById("game-canvas");
const context = canvas.getContext("2d");

export { sprites, canvas, context };
