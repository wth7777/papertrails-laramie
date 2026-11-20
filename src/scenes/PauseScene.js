import Phaser from 'phaser';
export default class PauseScene extends Phaser.Scene {
  constructor() { super('PauseScene'); }
  init(data) { this.parentScene = data.parentScene; }
  create() {
    const { width, height } = this.scale;
    this.add.rectangle(width/2, height/2, width, height, 0x000000, 0.7);
    this.add.text(width/2, height/2-60, 'PAUSED', { fontFamily: 'monospace', fontSize: '40px', fontStyle: 'bold', color: '#fff' }).setOrigin(0.5);
    this.add.text(width/2, height/2+20, 'PRESS ESC TO RESUME', { fontFamily: 'monospace', fontSize: '18px', color: '#aaa' }).setOrigin(0.5);
    this.input.keyboard.once('keydown-ESC', () => { this.scene.resume(this.parentScene); this.scene.stop(); });
  }
}
export default PauseScene;
