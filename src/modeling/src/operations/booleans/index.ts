/**
 * All shapes (primitives or the results of operations) can be passed to boolean functions
 * to perform logical operations, e.g. remove a hole from a board.
 * In all cases, the function returns the results, and never changes the original shapes.
 * @module modeling/booleans
 * @example
 * import { intersect, scission, subtract, union } from '@jscad/modeling'
 */
export { intersect } from "./intersect";
export { scission } from "./scission";
export { subtract } from "./subtract";
export { union } from "./union";
