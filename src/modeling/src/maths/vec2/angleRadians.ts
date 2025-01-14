/**
 * Calculate the angle of the given vector.
 *
 * @param {vec2} vector - vector of reference
 * @returns {Number} angle in radians
 * @alias module:modeling/maths/vec2.angleRadians
 */
const angleRadians = (vector: Vec2): number => math.atan2(vector[1], vector[0]); // y=sin, x=cos

export default angleRadians;
