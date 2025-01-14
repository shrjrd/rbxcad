import create from "./create";

/**
 * Creates a new vector initialized with the given values.
 *
 * @param {Number} x - X coordinate
 * @param {Number} y - Y coordinate
 * @returns {vec2} a new vector
 * @alias module:modeling/maths/vec2.fromValues
 */
const fromValues = (x: number, y: number): Vec2 => {
	const out = create();
	out[0] = x;
	out[1] = y;
	return out;
};

export default fromValues;
