import {Terrain} from "../models/terrain.model";
import {Cell} from "../models/cell.model";
import {RandomUtilities} from "../utilities/random.utilities";
import {CellType} from "../enums/cell-type.enum";
import {TerrainGenerationRule} from "../models/terrain-generation-rule.model";
import {MapUtilities} from "../utilities/map.utilities";
import {TerrainUtilities} from "../utilities/terrain.utilities";


class LeastEntropyCell {
    x: number;
    y: number;
    entropy: number;
    cell: Cell;
}


class AdjacentCells {
    up: Cell;
    right: Cell;
    down: Cell;
    left: Cell;
}


class WFCCellRule {
    cellType: CellType;
    probability: number;
}


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
                    { cellType: CellType.Mountain, probability: 0.25},
                ],
                right: [
                    { cellType: CellType.Hill, probability: 0.5},
                    { cellType: CellType.Grass, probability: 0.25},
                    { cellType: CellType.Mountain, probability: 0.25},
                ],
                down: [
                    { cellType: CellType.Hill, probability: 0.5},
                    { cellType: CellType.Grass, probability: 0.25},
                    { cellType: CellType.Mountain, probability: 0.25},
                ],
                left: [
                    { cellType: CellType.Hill, probability: 0.5},
                    { cellType: CellType.Grass, probability: 0.25},
                    { cellType: CellType.Mountain, probability: 0.25},
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
            // find empty cell with the least entropy
            let leastEntropyCell: LeastEntropyCell = null as any;
            try {
                leastEntropyCell = this.getLeastEntropyCell(terrain.width, terrain.height, entropyMap, cells);
                console.log(leastEntropyCell);
            } catch (e) {
                console.log('Exception caught: map is stuck');
            }
            if (leastEntropyCell && leastEntropyCell.entropy > 0) {
                // find adjacent cells of the selected empty cell
                const adjacentCells: AdjacentCells = this.getAdjacentCells(leastEntropyCell.x, leastEntropyCell.y, terrain.width, terrain.height, cells);
                console.log(adjacentCells);
                // chose the cell type, basing on rules
                const newCell: Cell = this.resolveCell(leastEntropyCell, adjacentCells, cells, terrain.width, terrain.height, rnd);
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
    getLeastEntropyCell(width: number, height: number, entropyMap: number[], cells: Cell[]): LeastEntropyCell {
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
    getAdjacentCells(x: number, y: number, width: number, height: number, cells: Cell[]): AdjacentCells {
        const adjacentCells: AdjacentCells = {up: null, right: null, down: null, left: null} as any;
        const cellOffset = y * width + x;
        console.log({cellOffset});
        if (y > 0 && cellOffset > width - 1) {
            adjacentCells.up = cells[cellOffset - width];
        }
        if (x < width - 1 && cellOffset < cells.length - 1) {
            adjacentCells.right = cells[cellOffset + 1];
        }
        if (y < height - 1 && cellOffset < cells.length - width) {
            adjacentCells.down = cells[cellOffset + width];
        }
        if (x > 0 && cellOffset > 0) {
            adjacentCells.left = cells[cellOffset - 1];
        }

        return adjacentCells;
    }



    resolveCell(leastEntropyCell: LeastEntropyCell, adjacentCells: AdjacentCells, cells: Cell[], width: number, height: number, rnd: RandomUtilities): Cell {
        let cell: Cell = null as any;
        let intersectionRules: WFCCellRule[] = [];
        let pristine: boolean = true;
        // for each adajcent cell
        for (const key in adjacentCells) {
            const adjacentCell: Cell = adjacentCells[key];
            // if adjacent cell is not null
            if (adjacentCell && adjacentCell.cellType != CellType.Void) {
                // list all rules toward the leastEntropyCell
                let adjacentRules: WFCCellRule[] = this.getRulesToAdjacentCell(adjacentCell, key);
                if (intersectionRules.length === 0) {
                    if (pristine) {
                        // copy all rules to intersectionRules
                        intersectionRules = adjacentRules;
                        pristine = false;
                    } else {
                        // remove from intersectionRules all rules not in the rules just read
                        this.removeMissingRules(intersectionRules, adjacentRules);
                    }
                }
            }
        }
        if (intersectionRules.length > 0) {
            // select a weighted random rule from intersectionRules and return the cell type
            cell = this.getCellFromRules(intersectionRules, rnd);
        } else {
            // return void cell: map generation is stuck :-(
            cell = new Cell({x: leastEntropyCell.x, y: leastEntropyCell.y, type: CellType.Void});
        }

        return cell;
    }


    /**
     * Retrieves applicable rules for an adjacent cell based on its type and the specified direction.
     *
     * @param {Cell} adjacentCell - The adjacent cell whose rules need to be evaluated.
     * @param {string} direction - The relative direction ('up', 'right', 'down', 'left') from the current cell.
     * @return {Array} An array of rules applicable to the adjacent cell in the specified direction. Returns an empty array if no rules match.
     */
    getRulesToAdjacentCell(adjacentCell: Cell, direction: string): Array<any> {
        const rule = this.generationRules.find((generationRule) => generationRule.cellType === adjacentCell.type);
        if (rule) {
            switch (direction) {
                case 'up':
                    // return the duplicate of the rule.down array
                    return rule.down.slice();
                case 'right':
                    return rule.left.slice();
                case 'down':
                    return rule.up.slice();
                case 'left':
                    return rule.right.slice();
            }
        }
        return [];
    }


    /**
     * Removes rules from the provided list that are not present in the reference list.
     *
     * @param {WFCCellRule[]} rules - The list of rules to be filtered. Rules missing in the reference list will be removed from this array.
     * @param {WFCCellRule[]} reference - The reference list of rules to compare against based on `cellType`.
     * @return {void} This method does not return a value. The `rules` array is modified in place.
     */
    removeMissingRules(rules: WFCCellRule[], reference: WFCCellRule[]): void {
        const referenceTypes = new Set(reference.map(r => r.cellType));
        for (let i = rules.length - 1; i >= 0; i--) {
            if (!referenceTypes.has(rules[i].cellType)) {
                rules.splice(i, 1);
            }
        }
    }


    /**
     * Determines a `Cell` based on the provided rules and randomness.
     *
     * @param {WFCCellRule[]} rules - The list of rules, where each rule contains a cell type and its associated probability.
     * @param {RandomUtilities} rnd - A utility for generating random values.
     * @return {Cell} A new `Cell` instance determined by the rules and random selection process.
     */
    getCellFromRules(rules: WFCCellRule[], rnd: RandomUtilities): Cell {
        const total = rules.reduce((sum, r) => sum + r.probability, 0);
        let pick = rnd.next() * total;
        for (const rule of rules) {
            pick -= rule.probability;
            if (pick <= 0) {
                return new Cell({x: 0, y: 0, type: rule.cellType});
            }
        }
        return new Cell({x: 0, y: 0, type: rules[rules.length - 1].cellType});
    }



}
