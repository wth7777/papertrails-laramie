import Phaser from 'phaser';

class HUDScene extends Phaser.Scene {
  constructor() { super('HUDScene'); }
  create() {
    const { width, height } = this.scale;
    this.scoreText = this.add.text(16, 16, 'SCORE 000000', { fontFamily: 'monospace', fontSize: '18px', color: '#fff' }).setStroke('#000',3).setScrollFactor(0).setDepth(100);
    this.coinText = this.add.text(width-16, 16, 'COINS 000', { fontFamily: 'monospace', fontSize: '18px', color: '#fff' }).setOrigin(1,0).setStroke('#000',3).setScrollFactor(0).setDepth(100);
    this.timeText = this.add.text(width/2, 16, 'TIME 300', { fontFamily: 'monospace', fontSize: '18px', color: '#fff' }).setOrigin(0.5,0).setStroke('#000',3).setScrollFactor(0).setDepth(100);
    this.livesText = this.add.text(width-16, height-16, 'LIVES 3', { fontFamily: 'monospace', fontSize: '18px', color: '#fff' }).setOrigin(1,1).setStroke('#000',3).setScrollFactor(0).setDepth(100);
    this.registry.events.on('changedata', (p,k,v)=>{if(k==='score')this.scoreText.setText(`SCORE ${String(v).padStart(6,'0')}`);if(k==='coins')this.coinText.setText(`COINS ${String(v).padStart(3,'0')}`);if(k==='time')this.timeText.setText(`TIME ${v}`);if(k==='lives')this.livesText.setText(`LIVES ${v}`);}, this);
  }
}
export default HUDScene;
