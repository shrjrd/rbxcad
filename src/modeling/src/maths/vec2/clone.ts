import type { Vec2 } from "../types";
import { create } from "./create";

/**
 * Create a clone of the given vector.
 *
 * @param {Vec2} vector - vector to clone
 * @returns {Vec2} a new vector
 * @alias module:modeling/maths/vec2.clone
 */
export const clone = (vector: Vec2) => {
	const out = create();
	out[0] = vector[0];
	out[1] = vector[1];
	return out;
};
