import { NEPS } from "../constants";

/**
 * Compare two normals (unit vectors) for near equality.
 * @param {vec3} a - normal a
 * @param {vec3} b - normal b
 * @returns {Boolean} true if a and b are nearly equal
 * @alias module:modeling/maths/utils.aboutEqualNormals
 */
const aboutEqualNormals = (a: Vec3, b: Vec3): boolean =>
	math.abs(a[0] - b[0]) <= NEPS && math.abs(a[1] - b[1]) <= NEPS && math.abs(a[2] - b[2]) <= NEPS;

export default aboutEqualNormals;
