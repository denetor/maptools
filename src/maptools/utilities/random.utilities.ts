/**
 * A utility class for generating pseudo-random numbers based on a seeded algorithm.
 */
export class RandomUtilities {
    seed: number;


    /**
     * Initializes a new instance of the class with a provided seed value or the current timestamp.
     *
     * @param {number} [seed=Date.now()] The initial seed value to initialize the instance. Defaults to the current timestamp if no value is provided.
     * @return {void} This constructor does not return a value.
     */
    constructor(seed: number = Date.now()) {
        this.seed = seed;
    }


    /**
     * Generates the next pseudo-random number in the sequence.
     * This method updates the internal state based on a deterministic algorithm
     * and produces a floating-point number between 0 (inclusive) and 1 (exclusive).
     * It uses Mulberry32 algorithm.
     *
     * @return {number} A pseudo-random number in the range [0, 1).
     */
    next() {
        // seed incrementing ('| 0' ensures the number remains a 32 bit integer)
        this.seed = (this.seed + 0x6D2B79F5) | 0;
        // "mixing" (mescolamento) bit to bit
        let t = Math.imul(this.seed ^ (this.seed >>> 15), this.seed | 1);
        // linear pattern breaking
        t = (t + Math.imul(t ^ (t >>> 7), t | 61)) | 0;
        // result between 0 and 1
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }


    /**
     * Generates a random integer within the specified range [min, max] inclusive.
     *
     * @param {number} min - The minimum value of the range.
     * @param {number} max - The maximum value of the range.
     * @return {number} A random integer between min and max, inclusive.
     */
    nextInt(min: number, max: number): number {
        return Math.floor(this.next() * (max - min + 1)) + min;
    }


    /**
     * Selects and returns a random value from the given enumeration.
     *
     * @param {Object} enumeration - An object representing the enumeration from which a value will be randomly selected.
     * @return {*} A randomly selected value from the provided enumeration.
     */
    nextEnum(enumeration: any) {
        const values = Object.keys(enumeration);
        const randomNum = this.nextInt(0, values.length);
        const enumKey = values[Math.floor(randomNum)];
        return enumeration[enumKey];
    }

}
