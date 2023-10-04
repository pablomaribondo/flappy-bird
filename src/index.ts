import "./config";
import Game from "./models/Game";
import GetReadyScreen from "./screens/GetReadyScreen";

window.addEventListener("click", () => {
  if (Game.activeScreen.click) {
    Game.activeScreen.click();
  }
});

Game.changeScreen(GetReadyScreen);
Game.loop();
