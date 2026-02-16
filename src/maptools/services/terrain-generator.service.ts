import {Terrain} from "../models/terrain.model";
import {Cell} from "../models/cell.model";

export class TerrainGeneratorService {


    /**
     * Generates a new terrain instance based on the provided configuration.
     *
     * @param {object} config The configuration object for terrain generation.
     * @param {number} [config.width=10] The width of the terrain to be generated.
     * @param {number} [config.height=10] The height of the terrain to be generated.
     * @param {string} [config.strategy] The strategy to use for generating terrain cells.
     * @return {Terrain} The generated terrain instance.
     */
    static generate(config: any = {}): Terrain {
        const terrain = new Terrain({
            width: config?.width ?? 10,
            height: config?.height ?? 10,
        });
        switch (config?.strategy) {
            default:
                this.generateCellsWithFlatStrategy(terrain);
        }

        return terrain;
    }


    /**
     * Generates cells for the given terrain using a flat strategy, initializing each cell with a 'grass' type.
     *
     * @param {Terrain} terrain - The terrain object to generate cells for. The dimensions of the terrain
     * (height and width) are used to create a grid of cells, each associated with a specific position.
     * @return {void} This method does not return a value, it modifies the `cells` property of the given terrain object.
     */
    static generateCellsWithFlatStrategy(terrain: Terrain) {
        for (let y = 0; y < terrain.height; y++) {
            for (let x = 0; x < terrain.width; x++) {
                terrain.cells.push(new Cell({x, y, type: 'grass'}));
            }
        }
    }

}
