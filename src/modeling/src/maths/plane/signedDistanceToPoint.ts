import type { Vec3, Plane } from "../types";
import * as vec3 from "../vec3/index";

/**
 * Calculate the distance to the given point.
 *
 * @param {Plane} plane - plane of reference
 * @param {Vec3} point - point of reference
 * @return {number} signed distance to point
 * @alias module:modeling/maths/plane.signedDistanceToPoint
 */
export const signedDistanceToPoint = (plane: Plane, point: Vec3) => vec3.dot(plane, point) - plane[3];
