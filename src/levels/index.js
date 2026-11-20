import laramie_wyoming from './laramie_wyoming.js';

export const LEVELS = { laramie_wyoming };

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
