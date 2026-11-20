const MUTE_KEY = 'papertrails-muted';
class Sfx {
  constructor() {
    this.ctx=null; this.master=null; this.musicGain=null; this.musicSource=null; this.musicBuffer=null; this.muted=false;
    try { this.muted = localStorage.getItem('papertrails-muted')==='1'; } catch {}
    const unlock=()=>{this.ensure();};
    window.addEventListener('pointerdown',unlock,{once:true}); window.addEventListener('keydown',unlock,{once:true});
  }
  ensure(){if(!this.ctx){const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;this.ctx=new AC();this.master=this.ctx.createGain();this.master.gain.value=this.muted?0:1;this.master.connect(this.ctx.destination);this.musicGain=this.ctx.createGain();this.musicGain.gain.value=0.5;this.musicGain.connect(this.master);}if(this.ctx.state==='suspended')this.ctx.resume();}
  setMuted(m){this.muted=m;try{localStorage.setItem('papertrails-muted',m?'1':'0');}catch{}if(this.master)this.master.gain.value=m?0:1;}
  startMusic(){this.ensure();if(!this.ctx)return;this.stopMusic();const buf=this.ctx.createBuffer(1,1,44100);this.musicSource=this.ctx.createBufferSource();this.musicSource.buffer=buf;this.musicSource.loop=true;this.musicSource.connect(this.musicGain);this.musicSource.start(0);}
  stopMusic(){if(this.musicSource){this.musicSource.stop();this.musicSource.disconnect();this.musicSource=null;}}
}
export const sfx=new Sfx();
