/**
 * Calculates the length of the given vector.
 *
 * @param {vec2} vector - vector of reference
 * @returns {Number} length
 * @alias module:modeling/maths/vec2.length
 */
const length = (vector: Vec2): number => math.sqrt(vector[0] * vector[0] + vector[1] * vector[1]);

export default length;
