import angleRadians from "./angleRadians";

/**
 * Calculate the angle of the given vector.
 *
 * @param {vec2} vector - vector of reference
 * @returns {Number} angle in degrees
 * @alias module:modeling/maths/vec2.angleDegrees
 */
const angleDegrees = (vector: Vec2): number => angleRadians(vector) * 57.29577951308232;

export default angleDegrees;
