import "./config.js";
import Game from "./models/Game.js";
import GetReadyScreen from "./screens/GetReadyScreen.js";

window.addEventListener("click", () => {
  if (Game.activeScreen.click) {
    Game.activeScreen.click();
  }
});

Game.changeScreen(GetReadyScreen);
Game.loop();
