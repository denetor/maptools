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
            // TODO calculate entropy map for each cell
            const entropyMap = this.generateEntropyMap(terrain.width, terrain.height, cells);
            // console.log(TerrainUtilities.matrixToString(entropyMap, terrain.width, terrain.height));
            // TODO find empty cell with least entropy
            // TODO find adyacent cells of the selected empty cell
            // TODO chose the cell type, basing on rules
            // TODO if map is stuck, restart from the beginning
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
}
