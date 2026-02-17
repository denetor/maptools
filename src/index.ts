import {TerrainGeneratorService} from "./maptools/services/terrain-generator.service";
import {TerrainUtilities} from "./maptools/utilities/terrain.utilities";
import {RandomUtilities} from "./maptools/utilities/random.utilities";

// test terrain generator
const t = TerrainGeneratorService.generate({width: 10, height: 5, seed: 74625, strategy: 'basic'});
console.log(TerrainUtilities.toString(t));

// test random function
// const rnd = new RandomUtilities(74625);
// for (let i = 0; i < 5; i++) {
//     console.log(rnd.next());
// }
