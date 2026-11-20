import Phaser from 'phaser';
import Player from '../objects/Player.js';

class GameScene extends Phaser.Scene {
  constructor() { super('GameScene'); }
  init(data) { this.levelId = data.levelId ?? 'laramie_wyoming'; this.seed = data.seed ?? 7; }
  create() {
    this.cameras.main.setBackgroundColor('#1a1a2e');
    this.physics.world.setBounds(0, 0, 600*2, 300*2);
    this.physics.world.gravity.y = 1000;
    
    this.player = new Player(this, 0, 0);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setZoom(1.67);
    this.cameras.main.setBounds(0, 0, 600*2, 300*2);
    
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys({ A: Phaser.Input.Keyboard.KeyCodes.A, D: Phaser.Input.Keyboard.KeyCodes.D, W: Phaser.Input.Keyboard.KeyCodes.W, SPACE: Phaser.Input.Keyboard.KeyCodes.SPACE, SHIFT: Phaser.Input.Keyboard.KeyCodes.SHIFT });
  }
  update() {
    if (!this.player) return;
    const { left: cl, right: cr, up: cu, space: cs } = this.cursors;
    const keyA = this.keys.A, keyD = this.keys.D, keyW = this.keys.W, keyShift = this.keys.SHIFT;
    const left = cl.isDown || keyA.isDown;
    const right = cr.isDown || keyD.isDown;
    const jump = (cu.isDown || keyW.isDown) && this.player.body.onFloor();
    const attack = keyShift.isDown;
    
    if (left && !right) { this.player.body.setAccelerationX(-1600); this.player.setFlipX(true); }
    else if (right && !left) { this.player.body.setAccelerationX(1600); this.player.setFlipX(false); }
    else { this.player.body.setAccelerationX(0); }
    
    if (jump) { this.player.body.setVelocityY(-480); }
    if (!cs.isDown && this.player.body.velocity.y < -160) { this.player.body.setVelocityY(-160); }
    this.player.body.setGravityY(this.player.body.velocity.y > 0 ? 900 : 0);
    
    if (attack) { /* attack */ }
  }
}
export default GameScene;
