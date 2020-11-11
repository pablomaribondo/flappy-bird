const hitEffect = new Audio();
hitEffect.src = "./assets/hit.wav";

const sprites = new Image();
sprites.src = "./sprites.png";

const canvas = document.getElementById("game-canvas");
const context = canvas.getContext("2d");

const background = {
  sourceX: 390,
  sourceY: 0,
  width: 275,
  height: 204,
  x: 0,
  y: canvas.height - 204,

  draw() {
    context.fillStyle = "#70c5ce";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.drawImage(
      sprites,
      background.sourceX,
      background.sourceY,
      background.width,
      background.height,
      background.x,
      background.y,
      background.width,
      background.height
    );

    context.drawImage(
      sprites,
      background.sourceX,
      background.sourceY,
      background.width,
      background.height,
      background.x + background.width,
      background.y,
      background.width,
      background.height
    );
  },
};

const colision = (flappyBird, floor) => {
  const flappyBirdY = flappyBird.y + flappyBird.height;
  const floorY = floor.y;

  return flappyBirdY >= floorY;
};

const createFlappyBird = () => {
  const flappyBird = {
    sourceX: 0,
    sourceY: 0,
    width: 33,
    height: 24,
    x: 10,
    y: 50,
    gravity: 0.25,
    velocity: 0,
    jump: 4.6,

    draw() {
      context.drawImage(
        sprites,
        flappyBird.sourceX,
        flappyBird.sourceY,
        flappyBird.width,
        flappyBird.height,
        flappyBird.x,
        flappyBird.y,
        flappyBird.width,
        flappyBird.height
      );
    },

    hop() {
      flappyBird.velocity = -flappyBird.jump;
    },

    update() {
      if (colision(flappyBird, floor)) {
        hitEffect.play();
        setTimeout(() => {
          changeScreen(screens.getReady);
        }, 500);
        return;
      }

      flappyBird.velocity += flappyBird.gravity;
      flappyBird.y += flappyBird.velocity;
    },
  };

  return flappyBird;
};

const floor = {
  sourceX: 0,
  sourceY: 610,
  width: 224,
  height: 112,
  x: 0,
  y: canvas.height - 112,

  draw() {
    context.drawImage(
      sprites,
      floor.sourceX,
      floor.sourceY,
      floor.width,
      floor.height,
      floor.x,
      floor.y,
      floor.width,
      floor.height
    );

    context.drawImage(
      sprites,
      floor.sourceX,
      floor.sourceY,
      floor.width,
      floor.height,
      floor.x + floor.width,
      floor.y,
      floor.width,
      floor.height
    );
  },
};

const getReadyMessage = {
  sourceX: 134,
  sourceY: 0,
  width: 174,
  height: 152,
  x: canvas.width / 2 - 174 / 2,
  y: 50,

  draw() {
    context.drawImage(
      sprites,
      getReadyMessage.sourceX,
      getReadyMessage.sourceY,
      getReadyMessage.width,
      getReadyMessage.height,
      getReadyMessage.x,
      getReadyMessage.y,
      getReadyMessage.width,
      getReadyMessage.height
    );
  },
};

const globals = {};
let activeScreen = {};

const changeScreen = (newScreen) => {
  activeScreen = newScreen;

  if (activeScreen.initialize) {
    activeScreen.initialize();
  }
};

const screens = {
  getReady: {
    draw() {
      background.draw();
      floor.draw();
      globals.flappyBird.draw();
      getReadyMessage.draw();
    },
    click() {
      changeScreen(screens.game);
    },
    initialize() {
      globals.flappyBird = createFlappyBird();
    },
    update() {},
  },
  game: {
    draw() {
      background.draw();
      floor.draw();
      globals.flappyBird.draw();
    },
    click() {
      globals.flappyBird.hop();
    },
    update() {
      globals.flappyBird.update();
    },
  },
};

const loop = () => {
  activeScreen.draw();
  activeScreen.update();

  requestAnimationFrame(loop);
};

window.addEventListener("click", () => {
  if (activeScreen.click) {
    activeScreen.click();
  }
});

changeScreen(screens.getReady);
loop();
