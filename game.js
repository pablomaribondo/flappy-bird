const hitEffect = new Audio();
hitEffect.src = "./assets/hit.wav";

const sprites = new Image();
sprites.src = "./sprites.png";

const canvas = document.getElementById("game-canvas");
const context = canvas.getContext("2d");

let frames = 0;

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
    gravity: 0.1,
    velocity: 0,
    jump: 3,

    moves: [
      { sourceX: 0, sourceY: 0 },
      { sourceX: 0, sourceY: 26 },
      { sourceX: 0, sourceY: 52 },
      { sourceX: 0, sourceY: 26 },
    ],

    actualFrame: 0,

    updateFrame() {
      if (frames % 10 === 0) {
        const increment = flappyBird.actualFrame + 1;
        flappyBird.actualFrame = increment % flappyBird.moves.length;
      }
    },

    draw() {
      flappyBird.updateFrame();
      const { sourceX, sourceY } = flappyBird.moves[flappyBird.actualFrame];

      context.drawImage(
        sprites,
        sourceX,
        sourceY,
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
      if (colision(flappyBird, globals.floor)) {
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

const createFloor = () => {
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

    update() {
      const repeatsIn = floor.width / 2;
      const movement = floor.x - 1;

      floor.x = movement % repeatsIn;
    },
  };

  return floor;
};

const createPipes = () => {
  const pipes = {
    width: 52,
    height: 400,
    bottom: {
      sourceX: 0,
      sourceY: 169,
    },
    top: {
      sourceX: 52,
      sourceY: 169,
    },
    gap: 90,
    pairs: [],

    draw() {
      pipes.pairs.forEach((pair) => {
        const topPipeX = pair.x;
        const topPipeY = pair.y;

        context.drawImage(
          sprites,
          pipes.top.sourceX,
          pipes.top.sourceY,
          pipes.width,
          pipes.height,
          topPipeX,
          topPipeY,
          pipes.width,
          pipes.height
        );

        const bottomPipeX = pair.x;
        const bottomPipeY = pipes.height + pipes.gap + pair.y;

        context.drawImage(
          sprites,
          pipes.bottom.sourceX,
          pipes.bottom.sourceY,
          pipes.width,
          pipes.height,
          bottomPipeX,
          bottomPipeY,
          pipes.width,
          pipes.height
        );

        pair.topPipe = {
          x: topPipeX,
          y: pipes.height + topPipeY,
        };

        pair.bottomPipe = {
          x: bottomPipeX,
          y: bottomPipeY,
        };
      });
    },

    colision(pair) {
      const head = globals.flappyBird.y;
      const foot = globals.flappyBird.y + globals.flappyBird.height;

      if (globals.flappyBird.x >= pair.x) {
        if (head <= pair.topPipe.y) {
          return true;
        }

        if (foot >= pair.bottomPipe.y) {
          return true;
        }

        return false;
      }
    },

    update() {
      if (frames % 100 === 0) {
        pipes.pairs.push({
          x: canvas.width,
          y: -150 * (Math.random() + 1),
        });
      }

      pipes.pairs.forEach((pair) => {
        pair.x -= 2;

        if (pipes.colision(pair)) {
          changeScreen(screens.getReady);
        }

        if (pair.x + pipes.width <= 0) {
          pipes.pairs.shift();
        }
      });
    },
  };

  return pipes;
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
      globals.floor.draw();
      globals.flappyBird.draw();
      getReadyMessage.draw();
    },
    click() {
      changeScreen(screens.game);
    },
    initialize() {
      globals.flappyBird = createFlappyBird();
      globals.floor = createFloor();
      globals.pipes = createPipes();
    },
    update() {
      globals.floor.update();
    },
  },
  game: {
    draw() {
      background.draw();
      globals.pipes.draw();
      globals.floor.draw();
      globals.flappyBird.draw();
    },
    click() {
      globals.flappyBird.hop();
    },
    update() {
      globals.pipes.update();
      globals.floor.update();
      globals.flappyBird.update();
    },
  },
};

const loop = () => {
  activeScreen.draw();
  activeScreen.update();

  frames += 1;

  requestAnimationFrame(loop);
};

window.addEventListener("click", () => {
  if (activeScreen.click) {
    activeScreen.click();
  }
});

changeScreen(screens.getReady);
loop();
