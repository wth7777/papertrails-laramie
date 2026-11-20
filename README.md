# Papertrails Laramie

A high-plains frontier town level for [Papertrails](https://github.com/xikhar/papertrails) — an endless paper world built with Three.js + Wave Function Collapse.

## Live Demo
**Play now:** https://yourusername.github.io/papertrails-laramie/

## Location
**Albany County Detention Center** — 420 East Ivinson Avenue, Laramie, WY 82073
- Coordinates: 41.3113669, -105.5911007
- High-plains mountain-valley frontier town aesthetic

## Features
- **11×11 block grid** (5 blocks each direction from detention center)
- **Downtown core** with market square, government buildings, retail
- **University of Wyoming** district (~80 tiles east)
- **Union Pacific Railroad** main line (3 blocks south)
- **Laramie River** (40 tiles west)
- **Seamless music transitions**: overworld → lava → finale
- **Direct level links**: `?level=laramie_wyoming`

## Quick Start
```bash
npm install
npm run dev
# Open http://localhost:5273/?level=laramie_wyoming
```

## Deploy to GitHub Pages
1. Create repo on GitHub
2. Enable Pages: Settings → Pages → Source: GitHub Actions
3. Push to main branch → Auto-deploys via `.github/workflows/deploy.yml`

## Level Structure
- **Seed**: 7 (deterministic)
- **Grid**: 11×11 blocks (120m each) = 660×660 Papertrails tiles
- **Zones**: Downtown, Residential N/S, University, Railroad, River
- **Landmarks**: Detention Center (spawn), UWyo, UP Railroad, Laramie River

## Assets
Uses Papertrails assets from `xikhar/papertrails` (MIT licensed). Requires:
- GLTF models: `tiles.glb`, `traveller.glb`
- Textures: `graveyard-intro.ogg`, `graveyard-overworld.ogg`, `graveyard-lava.ogg`, `graveyard-finale.ogg`

## License
MIT — Original Papertrails by xikhar. Laramie level by contributors.
