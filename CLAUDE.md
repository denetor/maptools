# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Run the application (ts-node src/index.ts)
```

No build, lint, or test commands are configured yet.

**Node version**: 24 (use `nvm use 24`)

## Architecture

TypeScript project implementing **Wave Function Collapse (WFC)** for procedural terrain generation.

### Layers

- **Models** (`src/maptools/models/`): Core data structures — `Terrain` (grid with width/height/cells), `Cell` (x, y, CellType), `TerrainGenerationRule` (adjacency rules with probability weights), `CellProximityEntry` (allowed neighbor types)
- **Enums** (`src/maptools/enums/`): `CellType` (Void, Grass, Sea, Hill, Mountain), `Direction` (Up/Right/Down/Left)
- **Services** (`src/maptools/services/`): Business logic
  - `TerrainGeneratorService`: Entry point with named strategies (`'basic'` → WFC, default → flat grass map)
  - `WfcService`: WFC algorithm — entropy calculation, least-entropy cell selection, rule-based cell type assignment
- **Utilities** (`src/maptools/utilities/`): `RandomUtilities` (seeded Mulberry32 PRNG), `TerrainUtilities` (ASCII rendering), `MapUtilities` (grid neighbor lookup)

### WFC Algorithm Flow

1. Start with a terrain of `Void` cells
2. Pick the cell with the least entropy (`getLeastEntropyCell`)
3. Assign a cell type based on adjacency rules (`getCellFromRules`)
4. Recalculate entropy for affected neighbors
5. Repeat until all cells are assigned

**Status**: `WfcService.generateWithBasicStrategy()` is work-in-progress with several TODO markers.

### Generation Rules

Hard-coded in `WfcService` — each `CellType` has a list of `TerrainGenerationRule` entries specifying which cell types are allowed adjacent and their probability weights. These rules drive the WFC collapse.