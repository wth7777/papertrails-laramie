import level1 from './level1.js';
import level2 from './level2.js';
import level3 from './level3.js';
import level4 from './level4.js';
import level5 from './level5.js';
import laramie_wyoming from './laramie_wyoming.js';
import bonus11 from './bonus11.js';
import bonus15 from './bonus15.js';

// World 1: level1 → level5, laramie_wyoming as optional bonus, chained via each level's `next` field.
export const LEVELS = { level1, level2, level3, level4, level5, laramie_wyoming, bonus11, bonus15 };

// Visual themes — picked per level via its `theme` field.
export const THEMES = {
  overworld: {
    sky: '#1a1a2e',
    terrainTop: 2,
    terrainFill: 122,
    parallax: true,
    musicKind: 'overworld',
  },
  underground: {
    sky: '#0d0d1a',
    terrainTop: 42,
    terrainFill: 142,
    parallax: true,
    musicKind: 'overworld',
  },
  snow: {
    sky: '#1a1a2e',
    terrainTop: 81,
    terrainFill: 121,
    parallax: true,
    dragFactor: 0.3,
    musicKind: 'overworld',
  },
  lava: {
    sky: '#1a0a05',
    terrainTop: 42,
    terrainFill: 142,
    parallax: true,
    musicKind: 'lava',
  },
};
