import Phaser from 'phaser';
import { LEVELS } from '../levels/index.js';
export default class IntroScene extends Phaser.Scene {
  constructor() { super('IntroScene'); }
  init(data) { this.levelId = data.levelId ?? 'laramie_wyoming'; }
  create() {
    const { width, height } = this.scale;
    this.scene.stop('HUDScene');
    this.cameras.main.setBackgroundColor('#000000');
    this.add.text(width/2, height/2-60, LEVELS[this.levelId]?.name ?? 'LARAMIE', { fontFamily: 'monospace', fontSize: '32px', fontStyle: 'bold', color: '#fff' }).setOrigin(0.5);
    this.add.sprite(width/2-40, height/2+14, 'player', 'frame_0').setScale(0.2375);
    this.add.text(width/2-12, height/2+14, `x ${this.registry.get('lives')??3}`, { fontFamily: 'monospace', fontSize: '22px', fontStyle: 'bold', color: '#fff' }).setOrigin(0,0.5);
    this.time.delayedCall(2000, () => this.scene.start('GameScene', { levelId: this.levelId }));
  }
}
export default IntroScene;
