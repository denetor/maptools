import {CellType} from "../enums/cell-type.enum";

export class Cell {
    x: number;
    y: number;
    type: CellType


    constructor(config: Partial<Cell> = {}) {
        this.x = config?.x ?? 0;
        this.y = config?.y ?? 0;
        this.type = config?.type ?? CellType.Grass;
    }

}
