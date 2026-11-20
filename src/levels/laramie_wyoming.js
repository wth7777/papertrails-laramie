import { sparse, ground, gap } from './builder.js';

// WORLD 1-LARAMIE — High-plains frontier town centered on Albany County Detention Center
const W = 300;

export default {
  name: 'WORLD 1-LARAMIE',
  theme: 'overworld',
  musicKind: 'overworld',
  next: 'end',
  time: 400,
  width: W,
  rows: [
    // Distant landmarks (far from spawn)
    sparse(W, [80, 'manor']),           // University of Wyoming ~80 tiles east
    sparse(W, [80, 'church']),          // University chapel
    sparse(W, [80, 'market_square']),   // University student union area

    // Downtown core (around spawn)
    sparse(W, [0, 'market_square']),    // Downtown core at spawn
    sparse(W, [0, 'house']),            // Detention center at spawn
    sparse(W, [1, 'village']),          // Downtown buildings
    sparse(W, [-1, 'village']),
    sparse(W, [0, 1, 'village']),
    sparse(W, [1, 0, 'village']),
    sparse(W, [-1, 1, 'village']),
    sparse(W, [-1, 0, 'village']),

    // Railroad district (3 blocks south = 30 tiles)
    sparse(W, [0, -30, 'river_straight']),  // Union Pacific main line (proxy)
    sparse(W, [1, -30, 'river_straight']),
    sparse(W, [-1, -30, 'river_straight']),
    sparse(W, [2, -30, 'bridge']),
    sparse(W, [-2, -30, 'bridge']),
    sparse(W, [3, -30, 'warehouse']),
    sparse(W, [-3, -30, 'warehouse']),

    // Laramie River (40 tiles west)
    sparse(W, [-40, 'river_straight']),
    sparse(W, [-41, 'river_straight']),
    sparse(W, [-39, 'river_straight']),
    sparse(W, [-40, 1, 'river_corner']),
    sparse(W, [-41, 1, 'river_corner']),
    sparse(W, [-39, -1, 'river_corner']),
    sparse(W, [-40, -1, 'river_corner']),
    sparse(W, [-40, 2, 'river_reeds']),
    sparse(W, [-41, -2, 'river_reeds']),
    sparse(W, [-39, 2, 'river_reeds']),

    // University district (80 tiles east)
    sparse(W, [80, 0, 'manor']),        // Old Main
    sparse(W, [80, 1, 'church']),       // Coe Library
    sparse(W, [80, -1, 'market_square']), // Student Union
    sparse(W, [81, 0, 'village']),      // Arena Auditorium
    sparse(W, [79, 2, 'village_b']),    // Dormitories

    // Downtown core (around spawn)
    sparse(W, [0, 0, 'market_square']),  // Town square
    sparse(W, [1, 0, 'village']),        // Commercial
    sparse(W, [-1, 0, 'village_b']),     // Government buildings
    sparse(W, [0, 1, 'village']),        // Retail
    sparse(W, [0, -1, 'village']),       // Retail
    sparse(W, [1, 1, 'house']),          // Detention center
    sparse(W, [-1, 1, 'house']),         // Courthouse
    sparse(W, [1, -1, 'village']),       // Commercial
    sparse(W, [-1, -1, 'village_b']),    // Government

    // Railroad district (30 tiles south)
    sparse(W, [0, -30, 'river_straight']), // Railroad main line (proxy)
    sparse(W, [1, -30, 'river_straight']),
    sparse(W, [-1, -30, 'river_straight']),
    sparse(W, [2, -30, 'bridge']),
    sparse(W, [-2, -30, 'bridge']),
    sparse(W, [3, -30, 'warehouse']),
    sparse(W, [-3, -30, 'warehouse']),
    sparse(W, [4, -30, 'rocks']),
    sparse(W, [-4, -30, 'rocks']),

    // Laramie River (40 tiles west)
    sparse(W, [-40, 0, 'river_straight']),
    sparse(W, [-41, 0, 'river_straight']),
    sparse(W, [-39, 0, 'river_straight']),
    sparse(W, [-40, 1, 'river_corner']),
    sparse(W, [-41, 1, 'river_corner']),
    sparse(W, [-39, -1, 'river_corner']),
    sparse(W, [-40, -1, 'river_corner']),
    sparse(W, [-40, 2, 'river_reeds']),
    sparse(W, [-41, -2, 'river_reeds']),
    sparse(W, [-39, 2, 'river_reeds']),

    // University district (80 tiles east)
    sparse(W, [80, 0, 'manor']),        // Old Main
    sparse(W, [80, 1, 'church']),       // Coe Library
    sparse(W, [80, -1, 'market_square']), // Student Union
    sparse(W, [81, 0, 'village']),      // Arena Auditorium
    sparse(W, [79, 2, 'village_b']),    // Dormitories

    // Downtown core details
    sparse(W, [0, 0, 'house']),         // Detention center (spawn)
    sparse(W, [1, 0, 'village']),       // Commercial
    sparse(W, [-1, 0, 'village_b']),    // Government
    sparse(W, [0, 1, 'village']),       // Retail
    sparse(W, [0, -1, 'village']),      // Retail
    sparse(W, [1, 1, 'house']),         // Detention center corner
    sparse(W, [-1, 1, 'house']),        // Courthouse
    sparse(W, [1, -1, 'village']),      // Commercial
    sparse(W, [-1, -1, 'village_b']),   // Government

    // Railroad district (30 tiles south)
    sparse(W, [0, -30, 'river_straight']),
    sparse(W, [1, -30, 'river_straight']),
    sparse(W, [-1, -30, 'river_straight']),
    sparse(W, [2, -30, 'bridge']),
    sparse(W, [-2, -30, 'bridge']),
    sparse(W, [3, -30, 'warehouse']),
    sparse(W, [-3, -30, 'warehouse']),
    sparse(W, [4, -30, 'rocks']),
    sparse(W, [-4, -30, 'rocks']),

    // Laramie River (40 tiles west)
    sparse(W, [-40, 0, 'river_straight']),
    sparse(W, [-41, 0, 'river_straight']),
    sparse(W, [-39, 0, 'river_straight']),
    sparse(W, [-40, 1, 'river_corner']),
    sparse(W, [-41, 1, 'river_corner']),
    sparse(W, [-39, -1, 'river_corner']),
    sparse(W, [-40, -1, 'river_corner']),
    sparse(W, [-40, 2, 'river_reeds']),
    sparse(W, [-41, -2, 'river_reeds']),
    sparse(W, [-39, 2, 'river_reeds']),

    // University district (80 tiles east)
    sparse(W, [80, 0, 'manor']),
    sparse(W, [80, 1, 'church']),
    sparse(W, [80, -1, 'market_square']),
    sparse(W, [81, 0, 'village']),
    sparse(W, [79, 2, 'village_b']),

    // Ground layers
    ground(50) + gap(4) + ground(46) + gap(5) + ground(55) + gap(6) + ground(42) + gap(7) + ground(85),
    ground(50) + gap(4) + ground(46) + gap(5) + ground(55) + gap(6) + ground(42) + gap(7) + ground(85),
  ],
};
