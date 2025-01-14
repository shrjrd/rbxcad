/**
 * All shapes (primitives or the results of operations) can be modified to correct issues, etc.
 * In all cases, these functions returns the results, and never changes the original geometry.
 * @module modeling/modifiers
 * @example
 * const { snap } = require('@jscad/modeling').modifiers
 */

import generalize from "./generalize";
import retessellate from "./retessellate";
import snap from "./snap";

export default {
	generalize,
	snap,
	retessellate,
};

export { generalize, retessellate, snap };
