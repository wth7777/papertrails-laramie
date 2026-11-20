// OWNER: wfc agent. Tunables for src/world/wfc.js + src/world/tiles.js.
// The generator is a chunked wave function collapse (see the header of src/world/wfc.js).
export const wfc = {
 // ---- legacy keys of the scaffold stub (kept so nothing that reads them breaks; unused by the real WFC)
 window: 3,
 pathDensity: 0.28,
 riverRowPeriod: 7,
 bridgeDensity: 0.3,

 /** Chunk edge in cells. FIXED at 8 in wfc.js (the hand-laid start around cell (0,0) assumes it). */
 chunk: 8,
 /** Local coordinates of world cell (0,0) inside its chunk, so the start is in a chunk interior. */
 originLocal: [3, 4],
 /** Chunks kept in memory before the oldest are evicted (regenerated identically on demand). 2048 chunks = 131k cells. */
 maxChunks: 2048,

 // ---- solver
 /** Full attempts (new plan + new collapse) per chunk before the stub fallback. The last `strictAttempts` forbid side lanes. */
 maxAttempts: 10,
 strictAttempts: 3,
 /** Backtracks allowed inside one attempt before it is abandoned and restarted. */
 maxBacktracks: 48,

 // ---- macro river field (labels on chunk corners; a border carries a river where its two corners differ)
 /** Mean distance between neighbouring rivers, in chunks, measured across the flow. */
 riverSpacing: 2.7,
 /** Max tilt (radians) of the general flow direction away from west-east; seeded. */
 riverTilt: 0.75,
 /** Low-frequency warp of the river lines: amplitude (chunks) and period (chunks). */
 riverWarp: 1.4,
 riverWarpPeriod: 4.5,
 /** In-chunk course: longest straight run (cells), cost noise (meander strength), cost of a bend. */
 riverMaxRun: 4,
 riverNoise: 3.0,
 riverTurnCost: 0.9,
 /** Brooks (spring -> short stream) in river-less chunks: chance per chunk, min end-to-end span, min length. */
 brookChance: 0.3,
 brookMinSpan: 5,
 brookMinLen: 6,

 // ---- macro road graph (every chunk owns one road to N or E => one connected network; extras add loops)
 roadExtra: 0.18,
 /** Chance that a road through a chunk (two crossings) detours via a waypoint (longer, windier roads). */
 roadDetour: 0.25,
 /** Chance that a chunk with four road crossings joins them in one crossroads (else T-junctions). */
 crossroads: 0.85,
 roadMaxRun: 4,
 roadNoise: 1.6,
 roadTurnCost: 1.8,
 /** Extra routing cost for a road stepping onto a river cell (a bridge). Low = roads like to cross. */
 bridgeCost: 0.6,
 /** Straight runs allowed by the validator: touching a chunk border / anywhere (cells). 4 + 4 <= 8 across a seam. */
 maxBorderRun: 4,
 maxInnerRun: 6,

 // ---- biome fields (value noise, period in cells)
 forestPeriod: 10.0,
 hillPeriod: 12.0,
 /** Hill field threshold (smoothstep lo / hi on the value noise). Composition pass: 0.42 / 0.6 -> 0.47 / 0.64 = clusters of 2-4 hill tiles instead of 6 x 7 blocks. */
 hillLo: 0.47,
 hillHi: 0.64,
 /** A landmark tile within this many cells (Chebyshev) of another landmark in the chunk is strongly discouraged (x0.12). */
 landmarkSpacing: 3,

 // ---- Laramie, WY specific overrides -------------------------------------------
/** Optional per-level overrides. Import and merge into wfc at runtime if level === 'laramie_wyoming'. */
export const laramieOverrides = {
  // Macro rivers: single main river ~3 chunks apart, slight eastward tilt for Laramie River
  riverSpacing: 3.0,
  riverTilt: 0.1,
  riverWarp: 1.0,
  riverWarpPeriod: 4.0,

  // Roads: slightly denser downtown grid, strong crossroads preference
  roadExtra: 0.15,
  crossroads: 0.75,
  bridgeCost: 0.5,

  // Biome: heartland at origin, gradual transitions
  hillLo: 0.47,
  hillHi: 0.64,

  // Solver: allow a few more attempts for complex river/road intersections
  maxAttempts: 12,
  strictAttempts: 4,
  maxBacktracks: 64,
};

export const laramieStartBoosts = {
  startNear: [
    { tile: 'house', radius: 2, weight: 5.0 },        // Detention center at spawn
    { tile: 'market_square', radius: 3, weight: 3.0 }, // Downtown core
    { tile: 'village', radius: 2, weight: 2.0 },
    { tile: 'pond', radius: 3, weight: 1.5 }
  ],
  startHamlet: { radius: 8, weight: 2.5 },
  startPond: { radius: 5, weight: 1.2 }
};

// ---- biome fields (value noise, period in cells)
forestPeriod: 10.0,
hillPeriod: 12.0,
/** Hill field threshold (smoothstep lo / hi on the value noise). Composition pass: 0.42 / 0.6 -> 0.47 / 0.64 = clusters of 2-4 hill tiles instead of 6 x 7 blocks. */
hillLo: 0.47,
hillHi: 0.64,
/** A landmark tile within this many cells (Chebyshev) of another landmark in the chunk is strongly discouraged (x0.12). */
landmarkSpacing: 3,
