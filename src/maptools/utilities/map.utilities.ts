import {Cell} from "../models/cell.model";

export class MapUtilities {


    /**
     * Returns the adjacent cells (top, right, left, and bottom) of a specified cell in a 2D grid.
     *
     * @param {number} x - The x-coordinate of the cell for which adjacent cells are to be retrieved.
     * @param {number} y - The y-coordinate of the cell for which adjacent cells are to be retrieved.
     * @param {number} width - The total width of the grid.
     * @param {number} height - The total height of the grid.
     * @param {Cell[]} cells - The array of cells representing the grid.
     * @return {Cell[]} An array containing the adjacent cells in the following order: top, right, left, bottom. If
     * there is no adjacent cell in a specific direction, the corresponding value will be `null`.
     */
    static getAdjacentCells(x: number, y: number, width: number, height: number, cells: Cell[]): Cell[] {
        const adjacents: Cell[] = [];
        let currentOffset = (y-1) * width + x;
        // top cell
        if (y === 0) {
            adjacents.push(null as any);
        } else {
            const cell = cells[currentOffset];
            adjacents.push(new Cell({x, y: y-1, type: cell.type}));
        }
        // right cell
        currentOffset = currentOffset + width + 1;
        if (x === width - 1) {
            adjacents.push(null as any);
        } else {
            const cell = cells[currentOffset];
            adjacents.push(new Cell({x: x+1, y, type: cell.type}));
        }
        // left cell
        currentOffset = currentOffset - 2;
        if (x === 0) {
            adjacents.push(null as any);
        } else {
            const cell = cells[currentOffset];
            adjacents.push(new Cell({x: x-1, y, type: cell.type}));
        }
        // bottom cell
        currentOffset = currentOffset + width + 1;
        if (y === height - 1) {
            adjacents.push(null as any);
        } else {
            const cell = cells[currentOffset];
            adjacents.push(new Cell({x: x, y: y + 1, type: cell.type}));
        }

        return adjacents;
    }
}
