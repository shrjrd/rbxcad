/**
 * Represents a 3D geometry consisting of a list of edges.
 * @typedef {Object} slice
 * @property {Array} edges - list of edges, each edge containing two points (3D)
 */

/**
 * Creates a new empty slice.
 *
 * @returns {slice} a new slice
 * @alias module:modeling/extrusions/slice.create
 */
const create = (edges?: [Vec3, Vec3][]) => {
	if (!edges) {
		edges = [];
	}
	return { edges };
};

export default create;
