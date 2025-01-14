import intersect from "./intersect";
import scission from "./scission";
import subtract from "./subtract";
import union from "./union";

/**
 * All shapes (primitives or the results of operations) can be passed to boolean functions
 * to perform logical operations, e.g. remove a hole from a board.
 * In all cases, the function returns the results, and never changes the original shapes.
 * @module modeling/booleans
 * @example
 * const { intersect, subtract, union } = require('@jscad/modeling').booleans
 */
export default {
	intersect,
	scission,
	subtract,
	union,
};

export { intersect, scission, subtract, union };
