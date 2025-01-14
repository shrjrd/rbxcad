import vec3 from "../../../maths/vec3";

const edgesToString = (edges: [Vec3, Vec3][]) =>
	edges.reduce((result, edge) => (result += `[${vec3.toString(edge[0])}, ${vec3.toString(edge[1])}], `), "");

/**
 * @param {slice} slice - the slice
 * @return {String} the string representation
 * @alias module:modeling/extrusions/slice.toString
 */
const toString = (slice: Slice) => `[${edgesToString(slice.edges)}]`;

export default toString;
