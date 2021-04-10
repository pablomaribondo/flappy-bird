class Game {
  static activeScreen;
  static background;
  static flappyBird;
  static floor;
  static frames = 0;
  static getReadyMessage;
  static pipes;

  static changeScreen(newScreen) {
    Game.activeScreen = newScreen;

    if (Game.activeScreen.initialize) {
      Game.activeScreen.initialize();
    }
  }

  static loop() {
    Game.activeScreen.draw();
    Game.activeScreen.update();

    Game.frames += 1;

    requestAnimationFrame(Game.loop);
  }
}

export default Game;
