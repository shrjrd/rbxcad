/**
 * All shapes (primitives or the results of operations) can be transformed, such as scaled or rotated.
 * In all cases, the function returns the results, and never changes the original shapes.
 * @module modeling/transforms
 * @example
 * import { center, rotateX, translate } from '@jscad/modeling'
 */
export { align, AlignOptions } from "./align";
export * from "./center";
export * from "./mirror";
export * from "./rotate";
export * from "./scale";
export * from "./transform";
export * from "./translate";
