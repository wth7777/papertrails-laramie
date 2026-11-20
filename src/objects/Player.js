import Phaser from 'phaser';

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player', 'frame_0');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    this.setScale(0.2);
    this.setOrigin(0.5, 0.5);
    this.body.setSize(80, 110);
    this.body.setOffset(174, 143);
    this.body.setMaxVelocity(240, 900);
    this.body.setDragX(1300);
  }
}
export default Player;
