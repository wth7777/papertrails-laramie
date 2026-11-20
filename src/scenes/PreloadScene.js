import Phaser from 'phaser';
import { sfx } from '../audio/sfx.js';

const TILEMAP_DIR = 'assets/kenney_pixel-platformer/Tilemap';

export default class PreloadScene extends Phaser.Scene {
  constructor() { super('PreloadScene'); }

  preload() {
    const { width, height } = this.scale;
    this.add.rectangle(width / 2, height / 2, 324, 22, 0x222230);
    const bar = this.add.rectangle(width / 2 - 158, height / 2, 316, 12, 0x5c94fc).setOrigin(0, 0.5).setScale(0, 1);
    this.load.on('progress', (v) => bar.setScale(v, 1));

    // Spritesheets
    const TILEMAP_DIR = 'assets/kenney_pixel-platformer/Tilemap';
    this.load.spritesheet('tiles', `${TILEMAP_DIR}/tilemap_packed.png`, { frameWidth: 18, frameHeight: 18 });
    this.load.spritesheet('chars', `${TILEMAP_DIR}/tilemap-characters_packed.png`, { frameWidth: 24, frameHeight: 24 });
    this.load.spritesheet('bg', `${TILEMAP_DIR}/tilemap-backgrounds_packed.png`, { frameWidth: 24, frameHeight: 24 });
    this.load.atlas('player', 'assets/player/cousin-atlas.png', 'assets/player/cousin-atlas.json');
    this.load.atlas('zombie', 'assets/zombie/zombie-atlas.png', 'assets/zombie/zombie-atlas.json');
    this.load.atlas('graveyard-tiles', 'assets/graveyard/tiles.png', 'assets/graveyard/tiles.json');
    this.load.image('graveyard-bg', 'assets/parallax-bg.jpg');
    this.load.image('lava-level-bg', 'assets/lava-level-bg.jpg');
    this.load.image('goblin-level-bg', 'assets/goblin-level-bg.jpg');
    this.load.image('title-bg', 'assets/title/title-bg.jpg');
    this.load.atlas('graveyard-decor', 'assets/graveyard-sprites/graveyard-new-atlas-corrected.png', 'assets/graveyard-sprites/graveyard-new-atlas-corrected.json');
    this.load.atlas('tattooshop', 'assets/tattooshop/tattooshop.png', 'assets/tattooshop/tattooshop.json');
    this.load.atlas('wolf', 'assets/wolf/wolf.png', 'assets/wolf/wolf.json');
    this.load.atlas('lava', 'assets/lava/lava.png', 'assets/lava/lava.json');
    this.load.atlas('goblin', 'assets/goblin/goblin.png', 'assets/goblin/goblin.json');
    this.load.atlas('lady-in-grey', 'assets/graveyard-sprites/lady-in-grey.png', 'assets/graveyard-sprites/lady-in-grey.json');

    // Music
    this.load.audio('graveyard-music', 'assets/audio/graveyard-music.ogg');
    this.load.audio('graveyard-title-music', 'assets/audio/graveyard-title-music.ogg');
    sfx.preloadMusic('graveyard-music', 'assets/audio/graveyard-music.ogg');
    sfx.preloadMusic('graveyard-title-music', 'assets/audio/graveyard-title-music.ogg');
    sfx.preloadExternalSfx('lady-in-grey', 'assets/lady-in-grey.wav');
  }

  create() {
    this.textures.createCanvas('__warmup', 1, 1)?.destroy();

    // Kenney textures for coins, bricks, etc.
    this.makeTilingTexture('tex-grass-top', 'tiles', [2]);
    this.makeTilingTexture('tex-dirt', 'tiles', [122]);
    this.makeTilingTexture('tex-hills', 'bg', [8, 9, 10, 11], { r: 223, g: 246, b: 245 });
    this.makeFireballTexture();

    this.makeRecoloredTexture('gem-fire', 'tiles', 67, (r,g,b) => [b,g,r]);
    this.makeRecoloredTexture('gem-star', 'tiles', 67, (r,g,b) => { const l = Math.min(255, Math.round(Math.max(r,g,b)*1.15)); return [l,l,l]; });

    const spark = this.textures.createCanvas('spark', 4, 4);
    spark.context.fillStyle = '#ffffff'; spark.context.fillRect(0,0,4,4); spark.refresh();
    this.makeRecoloredTexture('mushroom-1up', 'tiles', 128, (r,g,b) => [g,r,b]);

    // Graveyard terrain
    const GROUND_SCALE = 18 / 128;
    this.makeScaledTilingTexture('tex-graveyard-ground', 'graveyard-tiles', 'ground_dirt', GROUND_SCALE);
    this.makeScaledTexture('graveyard-ground-single', 'graveyard-tiles', 'ground_dirt', GROUND_SCALE);
    const PLATFORM_SCALE = 18 / 64;
    this.makeScaledTexture('graveyard-platform-left', 'graveyard-tiles', 'platform_stone_2_1', PLATFORM_SCALE);
    this.makeScaledTilingTexture('tex-graveyard-platform-mid', 'graveyard-tiles', 'platform_stone_2_2', PLATFORM_SCALE);
    this.makeScaledTexture('graveyard-platform-right', 'graveyard-tiles', 'platform_stone_2_3', PLATFORM_SCALE);
    this.makeScaledTexture('graveyard-platform-single', 'graveyard-tiles', 'platform_stone_2_2_center', PLATFORM_SCALE);

    this.createAnimations();

    this.registry.set('score', 0);
    this.registry.set('coins', 0);
    this.registry.set('lives', 3);
    this.registry.set('time', 300);
    this.registry.set('world', '1-1');

    // Direct level launch support
    if (window.__DIRECT_LEVEL__ && window.__DIRECT_LEVEL__ !== 'level1') {
      this.scene.start('GameScene', { levelId: window.__DIRECT_LEVEL__, seed: window.__DIRECT_SEED__ });
    } else {
      this.scene.start('TitleScene');
    }
  }

  makeTilingTexture(dest, src, frames, colorKey=null) { /* ... */ }
  makeScaledTilingTexture(dest, src, frame, scale) { /* ... */ }
  makeScaledTexture(dest, src, frame, scale) { /* ... */ }
  makeRecoloredTexture(dest, src, frame, transform) { /* ... */ }
  makeFireballTexture() { /* ... */ }
  createAnimations() { /* ... */ }
}
export default PreloadScene;
