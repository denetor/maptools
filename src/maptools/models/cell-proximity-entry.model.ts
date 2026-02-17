import {CellType} from "../enums/cell-type.enum";



export class CellProximityEntry {
    cellType: CellType;
    probability: number;


    constructor(config: Partial<CellProximityEntry> = {}) {
        this.cellType = config?.cellType ?? CellType.Grass;
        this.probability = config?.probability ?? 1;
    }
}
