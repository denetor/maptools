import {Terrain} from "../models/terrain.model";
import {Cell} from "../models/cell.model";
import {RandomUtilities} from "../utilities/random.utilities";

export class WfcService {



    generateWithBasicStrategy(terrain: Terrain, seed: number) {
        // create terrain matrix
        const cells: Cell[][] = [];
        // select a random starting point
        const rnd = new RandomUtilities(seed);
        const x = rnd.next(terrain.width);
        const y = rnd.next(terrain.height);
        // TODO place a random cell
        // TODO while map incomplete and map not stuck
            // TODO find least entropy cell with at least one empty neighbour
            // TODO chose random direction between the empty neighbours
            // TODO chose the neighbour cell type, basing on rules
            // TODO if map is stuck, restart from the beginning
        // TODO copy terrain matrix in terrain cells
    }
}
