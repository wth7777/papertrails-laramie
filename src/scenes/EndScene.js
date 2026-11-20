import Phaser from 'phaser';
import { saveHighScore, loadHighScore } from '../highscore.js';
import { sfx } from '../audio/sfx.js';

class EndScene extends Phaser.Scene {
  constructor() { super('EndScene'); }
  create() {
    const { width, height } = this.scale;
    this.scene.stop('HUDScene');
    sfx.stopMusic(); sfx.startMusic('title');
    saveHighScore(this.registry.get('score')??0);
    const hs = loadHighScore();
    this.cameras.main.setBackgroundColor('#0a0a0f');
    this.add.text(width/2, height*0.1, 'YOU MADE IT OUT ALIVE!', { fontFamily: 'monospace', fontSize: Math.min(36,width/20)+'px', fontStyle: 'bold', color: '#ffcc00' }).setOrigin(0.5).setStroke('#7a3045',4).setShadow(2,4,'#000',0,true,true);
    this.add.text(width/2, height*0.52, 'THE END', { fontFamily: 'monospace', fontSize: Math.min(56,width/12)+'px', fontStyle: 'bold', color: '#ff4444' }).setOrigin(0.5).setStroke('#3a0a0a',6).setShadow(3,6,'#000',0,true,true);
    this.add.text(width/2, height*0.62, `FINAL SCORE ${String(this.registry.get('score')??0).padStart(6,'0')}`, { fontFamily: 'monospace', fontSize: Math.min(22,width/30)+'px', color: '#fff' }).setOrigin(0.5).setStroke('#000',3);
    this.add.text(width/2, height*0.68, `HIGH SCORE ${String(loadHighScore()).padStart(6,'0')}`, { fontFamily: 'monospace', fontSize: Math.min(18,width/36)+'px', color: '#9dff8d' }).setOrigin(0.5).setStroke('#000',2);

    const btnY = height*0.8, spacing = 140;
    const playBtn = this.add.rectangle(width/2-spacing/2, btnY, 220, 56, 0x2a1a2e).setStrokeStyle(3,0xffcc00).setDepth(5).setInteractive(new Phaser.Geom.Rectangle(-110,-28,220,56), Phaser.Geom.Rectangle.Contains);
    const playText = this.add.text(width/2-spacing/2, btnY, 'PLAY AGAIN', { fontFamily: 'monospace', fontSize: '20px', fontStyle: 'bold', color: '#ffe066' }).setOrigin(0.5).setDepth(6);
    const titleBtn = this.add.rectangle(width/2+spacing/2, btnY, 220, 56, 0x2a1a2e).setStrokeStyle(3,0x7a3045).setDepth(5).setInteractive(new Phaser.Geom.Rectangle(-110,-28,220,56), Phaser.Geom.Rectangle.Contains);
    const titleText = this.add.text(width/2+spacing/2, btnY, 'RETURN TO TITLE', { fontFamily: 'monospace', fontSize: '20px', fontStyle: 'bold', color: '#ffaaaa' }).setOrigin(0.5).setDepth(6);

    [playBtn, titleBtn].forEach((b,i)=>{ b.on('pointerdown',()=>i===0?this.playAgain():this.returnToTitle()); b.on('pointerover',()=>{ if(!this.transitioning) this.select(i); }); });
    this.buttons = [{rect:playBtn,txt:playText},{rect:titleBtn,txt:titleText}];
    this.selected=0; this.transitioning=false;
    this.cursors=this.input.keyboard.createCursorKeys(); this.enter=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER); this.esc=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.input.keyboard.on('keydown-SPACE',e=>e.preventDefault());
  }
  update(){ if(this.transitioning) return; if(Phaser.Input.Keyboard.JustDown(this.cursors.left)||Phaser.Input.Keyboard.JustDown(this.cursors.up)){this.selected=(this.selected-1+2)%2;this.updateSel();} if(Phaser.Input.Keyboard.JustDown(this.cursors.right)||Phaser.Input.Keyboard.JustDown(this.cursors.down)){this.selected=(this.selected+1)%2;this.updateSel();} if(Phaser.Input.Keyboard.JustDown(this.enter))this.select(this.selected); if(Phaser.Input.Keyboard.JustDown(this.esc))this.select(1); }
  select(i){ if(this.transitioning) return; this.transitioning=true; this.tweens.add({targets:this.buttons[i].rect,scaleX:0.95,scaleY:0.95,duration:80,yoyo:true,onComplete:()=>i===0?this.playAgain():this.returnToTitle()}); }
  playAgain(){ this.registry.set('score',0);this.registry.set('coins',0);this.registry.set('lives',3);this.registry.set('time',300);this.registry.set('world','1-1');this.registry.remove('consumed');this.scene.start('IntroScene',{levelId:'laramie_wyoming'}); }
  returnToTitle(){ this.scene.start('TitleScene'); }
}
export default EndScene;
