import {Terrain} from "../models/terrain.model";
import {Cell} from "../models/cell.model";
import {RandomUtilities} from "../utilities/random.utilities";
import {CellType} from "../enums/cell-type.enum";
import {TerrainGenerationRule} from "../models/terrain-generation-rule.model";
import {MapUtilities} from "../utilities/map.utilities";
import {TerrainUtilities} from "../utilities/terrain.utilities";

export class WfcService {
    generationRules: TerrainGenerationRule[];



    constructor() {
        this.generationRules = [
            new TerrainGenerationRule({
                cellType: CellType.Grass,
                up: [
                    { cellType: CellType.Grass, probability: 0.7},
                    { cellType: CellType.Sea, probability: 0.1},
                    { cellType: CellType.Hill, probability: 0.19},
                    { cellType: CellType.Mountain, probability: 0.01},
                ],
                right: [
                    { cellType: CellType.Grass, probability: 0.7},
                    { cellType: CellType.Sea, probability: 0.1},
                    { cellType: CellType.Hill, probability: 0.19},
                    { cellType: CellType.Mountain, probability: 0.01},
                ],
                down: [
                    { cellType: CellType.Grass, probability: 0.7},
                    { cellType: CellType.Sea, probability: 0.1},
                    { cellType: CellType.Hill, probability: 0.19},
                    { cellType: CellType.Mountain, probability: 0.01},
                ],
                left: [
                    { cellType: CellType.Grass, probability: 0.7},
                    { cellType: CellType.Sea, probability: 0.1},
                    { cellType: CellType.Hill, probability: 0.19},
                    { cellType: CellType.Mountain, probability: 0.01},
                ],
            }),
            new TerrainGenerationRule({
                cellType: CellType.Sea,
                up: [
                    { cellType: CellType.Sea, probability: 0.8},
                    { cellType: CellType.Grass, probability: 0.19},
                    { cellType: CellType.Mountain, probability: 0.01},
                ],
                right: [
                    { cellType: CellType.Sea, probability: 0.8},
                    { cellType: CellType.Grass, probability: 0.19},
                    { cellType: CellType.Mountain, probability: 0.01},
                ],
                down: [
                    { cellType: CellType.Sea, probability: 0.8},
                    { cellType: CellType.Grass, probability: 0.19},
                    { cellType: CellType.Mountain, probability: 0.01},
                ],
                left: [
                    { cellType: CellType.Sea, probability: 0.8},
                    { cellType: CellType.Grass, probability: 0.19},
                    { cellType: CellType.Mountain, probability: 0.01},
                ],
            }),
            new TerrainGenerationRule({
                cellType: CellType.Hill,
                up: [
                    { cellType: CellType.Hill, probability: 0.5},
                    { cellType: CellType.Grass, probability: 0.25},
                    { cellType: CellType.Mountain, probability: 0.24},
                    { cellType: CellType.Sea, probability: 0.01},
                ],
                right: [
                    { cellType: CellType.Hill, probability: 0.5},
                    { cellType: CellType.Grass, probability: 0.25},
                    { cellType: CellType.Mountain, probability: 0.24},
                    { cellType: CellType.Sea, probability: 0.01},
                ],
                down: [
                    { cellType: CellType.Hill, probability: 0.5},
                    { cellType: CellType.Grass, probability: 0.25},
                    { cellType: CellType.Mountain, probability: 0.24},
                    { cellType: CellType.Sea, probability: 0.01},
                ],
                left: [
                    { cellType: CellType.Hill, probability: 0.5},
                    { cellType: CellType.Grass, probability: 0.25},
                    { cellType: CellType.Mountain, probability: 0.24},
                    { cellType: CellType.Sea, probability: 0.01},
                ],
            }),
            new TerrainGenerationRule({
                cellType: CellType.Mountain,
                up: [
                    { cellType: CellType.Mountain, probability: 0.5},
                    { cellType: CellType.Hill, probability: 0.44},
                    { cellType: CellType.Grass, probability: 0.05},
                    { cellType: CellType.Sea, probability: 0.01},
                ],
                right: [
                    { cellType: CellType.Mountain, probability: 0.5},
                    { cellType: CellType.Hill, probability: 0.44},
                    { cellType: CellType.Grass, probability: 0.05},
                    { cellType: CellType.Sea, probability: 0.01},
                ],
                down: [
                    { cellType: CellType.Mountain, probability: 0.5},
                    { cellType: CellType.Hill, probability: 0.44},
                    { cellType: CellType.Grass, probability: 0.05},
                    { cellType: CellType.Sea, probability: 0.01},
                ],
                left: [
                    { cellType: CellType.Mountain, probability: 0.5},
                    { cellType: CellType.Hill, probability: 0.44},
                    { cellType: CellType.Grass, probability: 0.05},
                    { cellType: CellType.Sea, probability: 0.01},
                ],
            }),
        ]
    }





    generateWithBasicStrategy(terrain: Terrain, seed: number) {
        const rnd = new RandomUtilities(seed);
        // create empty terrain array
        const cells: Cell[] = [];
        for (let y = 0; y < terrain.height; y++) {
            for (let x = 0; x < terrain.width; x++) {
                cells.push(new Cell({x, y, type: CellType.Void}));
            }
        }
        // select a random starting point
        const x = rnd.nextInt(0, terrain.width);
        const y = rnd.nextInt(0, terrain.height);
        // place a random cell
        cells[y * terrain.width + x].type = rnd.nextEnum(CellType);
        // TODO while map incomplete and map not stuck
            // calculate entropy map for each cell
            const entropyMap = this.generateEntropyMap(terrain.width, terrain.height, cells);
            console.log(TerrainUtilities.matrixToString(entropyMap, terrain.width, terrain.height));
            // find empty cell with least entropy
            let leastEntropyCell: { x: number, y: number, entropy: number, cell: Cell } = null as any;
            try {
                leastEntropyCell = this.getLeastEntropyCell(terrain.width, terrain.height, entropyMap, cells);
                console.log(leastEntropyCell);
            } catch (e) {
                console.log('Exception caught: map is stuck');
            }
            if (leastEntropyCell && leastEntropyCell.entropy > 0) {
                // find adyacent cells of the selected empty cell
                const adjacentCells: { up: Cell, right: Cell, down: Cell, left: Cell } =
                    this.getAdjacentCells(leastEntropyCell.x, leastEntropyCell.y, terrain.width, terrain.height, cells);
                console.log(adjacentCells);
                // TODO chose the cell type, basing on rules
                const newCell: Cell = this.getCellFromRules(leastEntropyCell, adjacentCells, cells, terrain.width, terrain.height);
                // TODO if map is stuck, restart from the beginning
            }
        // copy terrain matrix in terrain cells
        terrain.cells = cells;
    }


    /**
     * Generates an entropy map based on the given cells, their types, and adjacency relationships.
     * Entropy indicates the uncertainty or variability in a cell's state, with a lower value signifying less uncertainty.
     *
     * @param {number} width - The width of the grid representing the map.
     * @param {number} height - The height of the grid representing the map.
     * @param {Cell[]} cells - A one-dimensional array of `Cell` objects representing the map grid.
     * @return {number[]} An array of numbers where each number represents the entropy value for the corresponding cell in the grid.
     */
    generateEntropyMap(width: number, height: number, cells: Cell[]): number[] {
        const entropyMap: number[] = [];
        // for each map cell
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                // max entropy (if the considered cell is already full)
                let entropy = 9;
                if (cells[y * width + x].type === CellType.Void) {
                    // if considered cell is void, calculate entropy based on adjacent cells nr.
                    entropy = 4;
                    // get adjacent cells array
                    const adjacents = MapUtilities.getAdjacentCells(x, y, width, height, cells);
                    // for each adjacent cell calculate entropy
                    for (let i = 0; i < adjacents.length; i++) {
                        if (adjacents[i] && adjacents[i].type !== CellType.Void) {
                            entropy--;
                        }
                    }
                }
                entropyMap.push(entropy);
            }
        }

        return entropyMap;
    }


    /**
     * Identifies the cell with the lowest entropy value within a given grid, based on an entropy map.
     * If the entropy reaches `0`, it throws an error indicating that the map is stuck.
     * If the entropy value is `1`, it exits early and returns the corresponding cell.
     *
     * @param width The width of the grid.
     * @param height The height of the grid.
     * @param entropyMap An array where each index corresponds to the entropy of a cell at that position.
     * @param cells An array of `Cell` objects representing the grid structure.
     * @return An object containing the `x` and `y` coordinates, `entropy` value, and the `Cell` object of the cell with the least entropy.
     */
    getLeastEntropyCell(width: number, height: number, entropyMap: number[], cells: Cell[]): {x: number, y: number, entropy: number, cell: Cell} {
        const leastEntropy: {x: number, y: number, entropy: number, cell: Cell} = {x: 0, y: 0, entropy: 9, cell: cells[0]};
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const cellIndex = y * width + x;
                if (cells[cellIndex].type === CellType.Void && entropyMap[cellIndex] < leastEntropy.entropy) {
                    leastEntropy.x = x;
                    leastEntropy.y = y;
                    leastEntropy.entropy = entropyMap[cellIndex];
                    leastEntropy.cell = cells[cellIndex];
                }
                if (leastEntropy.entropy === 1) {
                    return leastEntropy;
                } else if (leastEntropy.entropy === 0) {
                    throw new Error('Map is stuck');
                }
            }
        }

        return leastEntropy;
    }


    /**
     * Retrieves the adjacent cells of a given cell in a grid based on its position.
     *
     * @param {number} x The x-coordinate of the target cell in the grid.
     * @param {number} y The y-coordinate of the target cell in the grid.
     * @param {number} width The total width of the grid (number of columns).
     * @param {number} height The total height of the grid (number of rows).
     * @param {Cell[]} cells An array representing all cells in the grid.
     * @return {{up: Cell, right: Cell, down: Cell, left: Cell}} An object containing the adjacent cells (`up`, `right`, `down`, `left`). Missing directions will not be included if the cell is on a boundary or edge.
     */
    getAdjacentCells(x: number, y: number, width: number, height: number, cells: Cell[]): {up: Cell, right: Cell, down: Cell, left: Cell} {
        const adyacentCells: {up: Cell, right: Cell, down: Cell, left: Cell} = {up: null, right: null, down: null, left: null} as any;
        const cellOffset = y * width + x;
        console.log({cellOffset});
        if (y > 0 && cellOffset > width - 1) {
            adyacentCells.up = cells[cellOffset - width];
        }
        if (x < width - 1 && cellOffset < cells.length - 1) {
            adyacentCells.right = cells[cellOffset + 1];
        }
        if (y < height - 1 && cellOffset < cells.length - width) {
            adyacentCells.down = cells[cellOffset + width];
        }
        if (x > 0 && cellOffset > 0) {
            adyacentCells.left = cells[cellOffset - 1];
        }

        return adyacentCells;
    }



    getCellFromRules(leastEntropyCell, adjacentCells, cells: Cell[], width: number, height: number): Cell {
        let cell: Cell = null as any;
        // TODO for each adjacent cell
            // TODO

        return cell;
    }
}
