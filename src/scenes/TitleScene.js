import Phaser from 'phaser';
import { loadHighScore } from '../highscore.js';
import { sfx } from '../audio/sfx.js';

class TitleScene extends Phaser.Scene {
  constructor() { super('TitleScene'); }

  create() {
    const { width, height } = this.scale;
    this.scene.stop('HUDScene');
    this.scale.once('resize', () => this.scene.restart());

    this.add.image(width/2, height/2, 'title-bg').setDisplaySize(width, height);
    this.fog = this.add.tileSprite(width/2, height/2, width, height, 'graveyard-bg').setScrollFactor(0).setDepth(-5).setAlpha(0.3);

    this.cuz = this.add.sprite(width*0.3-25, height*0.73, 'player', 'frame_0').setScale(0.99).setDepth(10).setOrigin(0.5, 0.85);
    this.cuz.anims.play('player-idle');

    this.add.text(width/2, height*0.18, "PAPERTRAILS — LARAMIE", { fontFamily: 'monospace', fontSize: Math.min(48,width/14)+'px', fontStyle: 'bold', color: '#ffe066' }).setOrigin(0.5).setStroke('#7a3045',6).setShadow(0,4,'#00000080',0,true,true);
    this.add.text(width/2, height*0.28, 'High Plains Frontier Town', { fontFamily: 'monospace', fontSize: Math.min(18,width/36)+'px', color: '#fff' }).setOrigin(0.5).setStroke('#000',3);
    this.add.text(width/2, height*0.34, `HI ${String(loadHighScore()).padStart(6,'0')}`, { fontFamily: 'monospace', fontSize: Math.min(20,width/30)+'px', fontStyle: 'bold', color: '#9dff8d' }).setOrigin(0.5).setStroke('#000',3);

    const prompt = this.add.text(width/2, height*0.75, 'PRESS START / TAP TO BEGIN', { fontFamily: 'monospace', fontSize: Math.min(22,width/28)+'px', fontStyle: 'bold', color: '#fff' }).setOrigin(0.5).setStroke('#000',4);
    this.tweens.add({ targets: prompt, alpha: 0.25, duration: 550, yoyo: true, repeat: -1 });

    const start = () => { this.registry.set('score',0); this.registry.set('coins',0); this.registry.set('lives',3); this.scene.start('IntroScene', { levelId: 'laramie_wyoming' }); };
    this.input.keyboard.once('keydown-SPACE', start);
    this.input.keyboard.once('keydown-ENTER', start);
    this.input.once('pointerdown', start);
    sfx.startMusic('title');
  }
  update() { if (this.fog) { this.fog.tilePositionX += 0.04; this.fog.tilePositionY += 0.02; } }
}
export default TitleScene;
