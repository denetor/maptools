import {Terrain} from "../models/terrain.model";
import {CellType} from "../enums/cell-type.enum";

export class TerrainUtilities {


    /**
     * Generates a string representation of the terrain based on its cells and their types.
     *
     * @param {Terrain} terrain - The terrain object containing dimensions and cell data.
     * @return {string} A string representation of the terrain or an error message if the terrain is invalid.
     */
    static toString(terrain: Terrain): string {
        if (!terrain) return 'No terrain provided';
        if (terrain.width === 0 || terrain.height === 0) return 'Invalid terrain dimensions';
        if (terrain.cells.length === 0) return 'No cells on terrain';
        let s = '';
        for (let y = 0; y < terrain.height; y++) {
            if (s.length > 0) s += "\n";
            for (let x = 0; x < terrain.width; x++) {
                const cell = terrain.cells[y * terrain.width + x];
                if (!cell) return ' ';
                switch (cell.type) {
                    case CellType.Grass: s += '--'; break;
                    case CellType.Sea: s += '~~'; break;
                    case CellType.Mountain: s += '/\\'; break;
                    case CellType.Hill: s += '=='; break;
                    default: s += '  ';
                }
            }
        }

        return s;
    }


    /**
     * Converts a flat array representing a matrix into a formatted string.
     *
     * @param {number[]} values - The flat array containing the matrix elements.
     * @param {number} width - The number of columns in the matrix.
     * @param {number} height - The number of rows in the matrix.
     * @return {string} A string representation of the matrix with rows separated by newlines.
     */
    static matrixToString(values: number[], width: number, height: number): string {
        let s = '';
        for (let y = 0; y < height; y++) {
            if (s.length > 0) s += "\n";
            for (let x = 0; x < width; x++) {
                const cell = values[y * width + x];
                s += cell + ' ';
            }
        }
        return s;
    }
}
