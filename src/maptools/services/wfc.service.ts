import {Terrain} from "../models/terrain.model";
import {Cell} from "../models/cell.model";
import {RandomUtilities} from "../utilities/random.utilities";
import {CellType} from "../enums/cell-type.enum";

export class WfcService {



    generateWithBasicStrategy(terrain: Terrain, seed: number) {
        const rnd = new RandomUtilities(seed);
        // create empty terrain array
        const cells: Cell[] = [];
        for (let y = 0; y < terrain.height; y++) {
            for (let x = 0; x < terrain.width; x++) {
                cells.push(new Cell({x, y, type: CellType.Grass}));
            }
        }
        // select a random starting point
        const x = rnd.nextInt(0, terrain.width);
        const y = rnd.nextInt(0, terrain.height);
        // place a random cell
        cells[y * terrain.width + x].type = rnd.nextEnum(CellType);
        // // TODO while map incomplete and map not stuck
        //     // TODO find least entropy cell with at least one empty neighbour
        //     // TODO chose random direction between the empty neighbours
        //     // TODO chose the neighbour cell type, basing on rules
        //     // TODO if map is stuck, restart from the beginning
        // // copy terrain matrix in terrain cells
        terrain.cells = cells;
    }
}
