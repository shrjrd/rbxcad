/**
 * All shapes (primitives or the results of operations) can be expanded (or contracted.)
 * In all cases, the function returns the results, and never changes the original shapes.
 * @module modeling/expansions
 * @example
 * const { expand, offset } = require('@jscad/modeling').expansions
 */
import expand from "./expand";
import offset from "./offset";

export { expand, offset };
export default {
	expand,
	offset,
};
