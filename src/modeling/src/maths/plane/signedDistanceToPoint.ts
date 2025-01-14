import vec3 from "../vec3";

/**
 * Calculate the distance to the given point.
 *
 * @param {plane} plane - plane of reference
 * @param {vec3} point - point of reference
 * @return {Number} signed distance to point
 * @alias module:modeling/maths/plane.signedDistanceToPoint
 */
const signedDistanceToPoint = (plane: _Plane, point: Vec3) => vec3.dot(plane, point) - plane[3];

export default signedDistanceToPoint;
