import {TerrainGeneratorService} from "./maptools/services/terrain-generator.service";
import {TerrainUtilities} from "./maptools/utilities/terrain.utilities";

const t = TerrainGeneratorService.generate();
console.log(TerrainUtilities.toString(t));
