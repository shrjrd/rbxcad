import type { Vec3 } from "../types";
import { dot } from "./dot";

/**
 * Calculate the angle between two vectors.
 *
 * @param {Vec3} a - first operand
 * @param {Vec3} b - second operand
 * @returns {number} angle (radians)
 * @alias module:modeling/maths/vec3.angle
 */
export const angle = (a: Vec3, b: Vec3) => {
	const ax = a[0];
	const ay = a[1];
	const az = a[2];
	const bx = b[0];
	const by = b[1];
	const bz = b[2];
	const mag1 = math.sqrt(ax * ax + ay * ay + az * az);
	const mag2 = math.sqrt(bx * bx + by * by + bz * bz);
	const mag = mag1 * mag2;
	// DEVIATION: 0, NaN, and "" are falsy in TS.
	const cosine = mag > 0 ? dot(a, b) / mag : 0;
	return math.acos(math.min(math.max(cosine, -1), 1));
};
