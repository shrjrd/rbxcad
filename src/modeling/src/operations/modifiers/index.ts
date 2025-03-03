/**
 * All shapes (primitives or the results of operations) can be modified to correct issues, etc.
 * In all cases, these functions returns the results, and never changes the original geometry.
 * @module modeling/modifiers
 * @example
 * import { generalize, snap, retessellate } from '@jscad/modeling'
 */
export { generalize } from "./generalize";
export { retessellate } from "./retessellate";
export { snap } from "./snap";
