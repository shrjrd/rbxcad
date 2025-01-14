const Number_EPSILON = 2.220446049250313e-16;
import vec3 from "../../../maths/vec3";

/**
 * Determine if the given slices have the same edges.
 * @param {slice} a - the first slice to compare
 * @param {slice} b - the second slice to compare
 * @returns {Boolean} true if the slices are equal
 * @alias module:modeling/extrusions/slice.equals
 */
const equals = (a: Slice, b: Slice) => {
	const aedges = a.edges;
	const bedges = b.edges;

	if (aedges.size() !== bedges.size()) {
		return false;
	}

	const isEqual = aedges.reduce((acc: boolean, aedge: [Vec3, Vec3], i: number) => {
		const bedge = bedges[i];
		const d = vec3.squaredDistance(aedge[0], bedge[0]);
		return acc && d < Number_EPSILON;
	}, true);

	return isEqual;
};

export default equals;
