import type { Vec3 } from "../types";
/**
 * Represents a three dimensional vector.
 * See fromValues().
 */

/**
 * Creates a new vector initialized to [0,0,0].
 *
 * @returns {Vec3} a new vector
 * @alias module:modeling/maths/vec3.create
 */
export const create = (): Vec3 => [0, 0, 0];
