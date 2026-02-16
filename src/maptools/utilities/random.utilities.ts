/**
 * A utility class for generating pseudo-random numbers based on a seeded algorithm.
 */
export class RandomUtilities {
    seed: number;
    n: number;


    /**
     * Initializes a new instance of the class with a provided seed value or the current timestamp.
     *
     * @param {number} [seed=Date.now()] The initial seed value to initialize the instance. Defaults to the current timestamp if no value is provided.
     * @return {void} This constructor does not return a value.
     */
    constructor(seed: number = Date.now()) {
        this.seed = seed;
        this.n = 0;
    }


    /**
     * Generates the next pseudorandom number in the sequence, scaled by an optional multiplier.
     *
     * @param {number} [multiplier=1] - A scaling factor for the generated random number. Defaults to 1 if not provided.
     * @return {number} A pseudorandom number calculated based on the internal state and the specified multiplier.
     *
     * @example
     * const rnd = new RandomUtilities(74625);
     * for (let i = 0; i < 5; i++) {
     *     console.log(Math.trunc(rnd.next(10)));
     * }
     * // out: 5 1 7 3 9
     *
     * @note
     * Generation is inspired by this document: https://math.arizona.edu/~tgk/mc/book_chap3.pdf
     */
    next(multiplier: number = 1) {
        this.n++;
        const x = this.seed * 171 * this.n % 30269;
        return (x / 30269) % 1 * multiplier;
    }
}
