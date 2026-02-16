import {Cell} from "./cell.model";

export class Terrain {
    width: number;
    height: number;
    cells: Cell[];


    constructor(config: Partial<Terrain> = {}) {
        this.width = config?.width ?? 0;
        this.height = config?.height ?? 0;
        this.cells = config?.cells ?? [];
    }
}
