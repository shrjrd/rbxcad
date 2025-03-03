/**
 * Represents a bezier easing function.
 * @see {@link bezier} for data structure information.
 * @module modeling/curves/bezier
 * @example
 * import { curves } from '@jscad/modeling'
 * const { bezier } = curves
 */
export { create } from "./create";
export { tangentAt } from "./tangentAt";
export { valueAt } from "./valueAt";
export { lengths } from "./lengths";
export { length } from "./length";
export { arcLengthToT, ArcLengthToTOptions } from "./arcLengthToT";

export type { Bezier } from "./type";
