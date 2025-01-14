/**
 * Represents a bezier easing function.
 * @see {@link bezier} for data structure information.
 * @module modeling/curves/bezier
 */
import arcLengthToT from "./arcLengthToT";
import create from "./create";
import length from "./length";
import lengths from "./lengths";
import tangentAt from "./tangentAt";
import valueAt from "./valueAt";

export { arcLengthToT, create, length, lengths, tangentAt, valueAt };
export default { create, valueAt, tangentAt, lengths, length, arcLengthToT };
