import type { Vec3 } from "../types";
import { create } from "./create";

/**
 * Create a clone of the given vector.
 *
 * @param {Vec3} vector - vector to clone
 * @returns {Vec3} a new vector
 * @alias module:modeling/maths/vec3.clone
 */
export const clone = (vector: Vec3) => {
	const out = create();
	out[0] = vector[0];
	out[1] = vector[1];
	out[2] = vector[2];
	return out;
};
