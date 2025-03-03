import type { Vec2 } from "../types";
/**
 * Rotates the given vector by the given angle.
 *
 * @param {Vec2} out - receiving vector
 * @param {Vec2} vector - vector to rotate
 * @param {Vec2} origin - origin of the rotation
 * @param {number} radians - angle of rotation (radians)
 * @returns {Vec2} out
 * @alias module:modeling/maths/vec2.rotate
 */
export const rotate = (out: Vec2, vector: Vec2, origin: Vec2, radians: number) => {
	const x = vector[0] - origin[0];
	const y = vector[1] - origin[1];
	const c = math.cos(radians);
	const s = math.sin(radians);

	out[0] = x * c - y * s + origin[0];
	out[1] = x * s + y * c + origin[1];

	return out;
};
