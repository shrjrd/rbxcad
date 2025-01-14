import { NEPS } from "../constants";

/*
 * Returns zero if n is within epsilon of zero, otherwise return n
 */
const rezero = (n: number) => (math.abs(n) < NEPS ? 0 : n);

/**
 * Return math.sin but accurate for TAU / 4 rotations.
 * Fixes rounding errors when sin should be 0.
 *
 * @param {Number} radians - angle in radians
 * @returns {Number} sine of the given angle
 * @alias module:modeling/utils.sin
 * @example
 * sin(TAU / 2) == 0
 * sin(TAU) == 0
 */
const sin = (radians: number) => rezero(math.sin(radians));

/**
 * Return math.cos but accurate for TAU / 4 rotations.
 * Fixes rounding errors when cos should be 0.
 *
 * @param {Number} radians - angle in radians
 * @returns {Number} cosine of the given angle
 * @alias module:modeling/utils.cos
 * @example
 * cos(TAU * 0.25) == 0
 * cos(TAU * 0.75) == 0
 */
const cos = (radians: number) => rezero(math.cos(radians));

export { cos, sin };
