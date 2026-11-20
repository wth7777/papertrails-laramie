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

// Parse URL parameter for direct level launch (?level=1 through ?level=5, or ?level=laramie_wyoming)
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
window.__DIRECT_LEVEL__ = directLevel;

// Parse seed parameter
const seedParam = params.get('seed');
if (seedParam !== null) {
  const seedNum = parseInt(seedParam, 10);
  if (Number.isInteger(seedNum)) window.__DIRECT_SEED__ = seedNum;
}

// Show/wire the on-screen buttons before the game boots, so the
// layout (game on top, controls below) is settled when Phaser measures
// its parent container.
import { setupTouchControls } from './input/TouchControls.js';
setupTouchControls();

// On phones in portrait the screen is narrow — a 800px-wide view ends up
// tiny. We narrow the LOGICAL view instead (540px ≈ 30 tiles of lookahead,
// the NES showed 16), so everything renders ~45% larger.
// NOTE: keep in sync with the #game-container aspect-ratio in index.html.
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
  height: HEIGHT,
  backgroundColor: '#5c94fc',
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1000 },
      debug: false,
    },
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

// Unlock Phaser's AudioContext on first user gesture
import { sfx } from './audio/sfx.js';
sfx.setupPhaserUnlock(game);

// Rotating the device switches between the wide and narrow logical view
const portraitQuery = window.matchMedia('(orientation: portrait)');
portraitQuery.addEventListener('change', () => {
  game.scale.setGameSize(logicalWidth(), HEIGHT);
  game.scale.refresh();
});

if (import.meta.env.DEV) {
  window.__game = game;
}
