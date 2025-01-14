/**
 * Convert the given angle (radians) to degrees.
 * @param {Number} radians - angle in radians
 * @returns {Number} angle in degrees
 * @alias module:modeling/utils.radToDeg
 */
const radToDeg = (radians: number): number => radians * 57.29577951308232;

export default radToDeg;
export { radToDeg };
