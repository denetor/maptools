import {CellType} from "../enums/cell-type.enum";
import {CellProximityEntry} from "./cell-proximity-entry.model";


export class TerrainGenerationRule {
    cellType: CellType;
    up: CellProximityEntry[];
    right: CellProximityEntry[];
    down: CellProximityEntry[];
    left: CellProximityEntry[];


    constructor(config: Partial<TerrainGenerationRule> = {}) {
        this.cellType = config?.cellType ?? CellType.Grass;
        this.up = config?.up ?? [];
        this.right = config?.right ?? [];
        this.down = config?.down ?? [];
        this.left = config?.left ?? [];
    }
}
