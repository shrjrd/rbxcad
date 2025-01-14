import vec3 from "../../maths/vec3";

/**
 * @param {poly3} polygon - the polygon to measure
 * @returns {Array} an array of two vectors (3D);  minimum and maximum coordinates
 * @alias module:modeling/geometries/poly3.measureBoundingBox
 */
const measureBoundingBox = (polygon: Poly3) => {
	const vertices = polygon.vertices;
	const numvertices = vertices.size();
	const min = numvertices === 0 ? vec3.create() : vec3.clone(vertices[0]);
	const max = vec3.clone(min);
	for (let i = 1; i < numvertices; i++) {
		vec3.min(min, min, vertices[i]);
		vec3.max(max, max, vertices[i]);
	}
	return [min, max];
};

export default measureBoundingBox;
