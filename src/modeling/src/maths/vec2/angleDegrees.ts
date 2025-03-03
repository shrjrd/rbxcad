import type { Vec2 } from "../types";
import { angleRadians } from "./angleRadians";

/**
 * Calculate the angle of the given vector.
 *
 * @param {Vec2} vector - vector of reference
 * @returns {number} angle in degrees
 * @alias module:modeling/maths/vec2.angleDegrees
 */
export const angleDegrees = (vector: Vec2) => angleRadians(vector) * 57.29577951308232;
