import vec3 from "../../../maths/vec3";
import create from "./create";

/**
 * Transform the given slice using the given matrix.
 * @param {mat4} matrix - transform matrix
 * @param {slice} slice - slice to transform
 * @returns {slice} the transformed slice
 * @alias module:modeling/extrusions/slice.transform
 *
 * @example
 * let matrix = mat4.fromTranslation([1, 2, 3])
 * let newslice = transform(matrix, oldslice)
 */
const transform = (matrix: Mat4, slice: Slice) => {
	const edges: [Vec3, Vec3][] = slice.edges.map((edge) => [
		vec3.transform(vec3.create(), edge[0], matrix),
		vec3.transform(vec3.create(), edge[1], matrix),
	]);
	return create(edges);
};

export default transform;
