const KEY='papertrails-highscore';
export function loadHighScore(){try{return Number(localStorage.getItem(KEY))||0;}catch{return 0;}}
export function saveHighScore(score){try{if(score>loadHighScore())localStorage.setItem(KEY,String(score));}catch{}}
