import abs from "./abs";
import create from "./create";
import cross from "./cross";

/**
 * Create a new vector that is orthogonal to the given vector.
 *
 * @param {vec3} out - receiving vector
 * @param {vec3} vector - vector of reference
 * @returns {vec3} out
 * @alias module:modeling/maths/vec3.orthogonal
 */
const orthogonal = (out: Vec3, vector: Vec3): Vec3 => {
	const bV = abs(create(), vector);

	const b0 = 0 + (bV[0] < bV[1] && bV[0] < bV[2] ? 1 : 0);

	const b1 = 0 + (bV[1] <= bV[0] && bV[1] < bV[2] ? 1 : 0);

	const b2 = 0 + (bV[2] <= bV[0] && bV[2] <= bV[1] ? 1 : 0);

	return cross(out, vector, [b0, b1, b2]);
};

export default orthogonal;
