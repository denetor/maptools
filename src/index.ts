import {TerrainGeneratorService} from "./maptools/services/terrain-generator.service";
import {TerrainUtilities} from "./maptools/utilities/terrain.utilities";
import {RandomUtilities} from "./maptools/utilities/random.utilities";

// const t = TerrainGeneratorService.generate();
// console.log(TerrainUtilities.toString(t));


const rnd = new RandomUtilities(74625);
for (let i = 0; i < 5; i++) {
    console.log(Math.trunc(rnd.next(10)));
}
