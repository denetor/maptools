import {Terrain} from "../models/terrain.model";

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
                    case 'grass': s += '_'; break;
                    case 'sea': s += '~'; break;
                    case 'mountain': s += 'M'; break;
                    case 'desert': s += 'D'; break;
                    case "hill": s += 'H'; break;
                    default: s += ' ';
                }
            }
        }

        return s;
    }
}
