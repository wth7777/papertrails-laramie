import Phaser from 'phaser';
import { isTouchDevice } from './input/TouchControls.js';
import PreloadScene from './scenes/PreloadScene.js';
import TitleScene from './scenes/TitleScene.js';
import IntroScene from './scenes/IntroScene.js';
import GameScene from './scenes/GameScene.js';
import HUDScene from './scenes/HUDScene.js';
import PauseScene from './scenes/PauseScene.js';
import GameOverScene from './scenes/GameOverScene.js';
import EndScene from './scenes/EndScene.js';
import { setupTouchControls } from './input/TouchControls.js';

// Parse URL parameter for direct level launch
const params = new URLSearchParams(window.location.search);
const levelParam = params.get('level');
let directLevel = null;
if (levelParam !== null) {
  const levelNum = parseInt(levelParam, 10);
  if (Number.isInteger(levelNum) && levelNum >= 1 && levelNum <= 5 && levelParam === String(levelNum)) {
    directLevel = `level${levelNum}`;
  }
  if (levelParam === 'laramie_wyoming') {
    directLevel = 'laramie_wyoming';
  }
}
const seedParam = params.get('seed');
if (seedParam !== null) {
  const seedNum = parseInt(seedParam, 10);
  if (Number.isInteger(seedNum)) window.__DIRECT_SEED__ = seedNum;
}
window.__DIRECT_LEVEL__ = directLevel;

// Show/wire the on-screen buttons before the game boots
setupTouchControls();

const BASE_WIDTH = 800;
const PORTRAIT_WIDTH = 540;
const HEIGHT = 450;
const portraitQuery = window.matchMedia('(orientation: portrait)');
const logicalWidth = () =>
  isTouchDevice() && portraitQuery.matches ? PORTRAIT_WIDTH : BASE_WIDTH;

const config = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: logicalWidth(),
  height: 450,
  backgroundColor: '#5c94fc',
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 1000 }, debug: false },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    fullscreenTarget: 'app',
  },
  scene: [
    PreloadScene,
    TitleScene,
    IntroScene,
    GameScene,
    HUDScene,
    PauseScene,
    GameOverScene,
    EndScene,
  ],
};

const game = new Phaser.Game(config);
import { sfx } from './audio/sfx.js';
sfx.setupPhaserUnlock(game);

portraitQuery.addEventListener('change', () => {
  game.scale.setGameSize(logicalWidth(), 450);
  game.scale.refresh();
});

if (import.meta.env.DEV) {
  window.__game = game;
}
