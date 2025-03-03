/**
 * Represents a plane in 3D coordinate space as determined by a normal (perpendicular to the plane)
 * and distance from 0,0,0.
 * @see {@link plane} for data structure information.
 * @module modeling/maths/plane
 */

/**
 * @see [vec4.clone()]{@link module:modeling/maths/vec4.clone}
 * @alias module:modeling/maths/plane.clone
 */
export { clone } from "../vec4/clone";
/**
 * @see [vec4.copy()]{@link module:modeling/maths/vec4.copy}
 * @alias module:modeling/maths/plane.copy
 */
export { copy } from "../vec4/copy";
/**
 * @see [vec4.create()]{@link module:modeling/maths/vec4.create}
 * @alias module:modeling/maths/plane.create
 */
export { create } from "../vec4/create";
/**
 * @see [vec4.equals()]{@link module:modeling/maths/vec4.equals}
 * @alias module:modeling/maths/plane.equals
 */
export { equals } from "../vec4/equals";
export { flip } from "./flip";
export { fromNormalAndPoint } from "./fromNormalAndPoint";
/**
 * @see [vec4.fromValues()]{@link module:modeling/maths/vec4.fromValues}
 * @alias module:modeling/maths/plane.fromValues
 */
export { fromValues } from "../vec4/fromValues";
export { fromPoints } from "./fromPoints";
export { fromPointsRandom } from "./fromPointsRandom";
export { projectionOfPoint } from "./projectionOfPoint";
export { signedDistanceToPoint } from "./signedDistanceToPoint";
/**
 * @see [vec4.toString()]{@link module:modeling/maths/vec4.toString}
 * @alias module:modeling/maths/plane.toString
 */
export { toString } from "../vec4/toString";
export { transform } from "./transform";

export type { Plane } from "./type";
