import create from "./create";

/**
 * Creates a new vector with the given values.
 *
 * @param {Number} x - X component
 * @param {Number} y - Y component
 * @param {Number} z - Z component
 * @param {Number} w - W component
 * @returns {vec4} a new vector
 * @alias module:modeling/maths/vec4.fromValues
 */
const fromValues = (x: number, y: number, z: number, w: number): Vec4 | _Plane => {
	const out = create();
	out[0] = x;
	out[1] = y;
	out[2] = z;
	out[3] = w;
	return out;
};

export default fromValues;
