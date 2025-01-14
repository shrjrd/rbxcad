import mat4 from "../../maths/mat4";
import vec2 from "../../maths/vec2";

/*
 * Apply the transforms of the given geometry.
 * NOTE: This function must be called BEFORE exposing any data. See toSides().
 * @param {geom2} geometry - the geometry to transform
 * @returns {geom2} the given geometry
 *
 * @example
 * geometry = applyTransforms(geometry)
 */
const applyTransforms = (geometry: Geom2): Geom2 => {
	if (mat4.isIdentity(geometry.transforms)) return geometry;

	// apply transforms to each side
	geometry.sides = geometry.sides.map((side) => {
		const p0 = vec2.transform(vec2.create(), side[0], geometry.transforms);
		const p1 = vec2.transform(vec2.create(), side[1], geometry.transforms);
		return [p0, p1];
	});
	geometry.transforms = mat4.create();
	return geometry;
};

export default applyTransforms;
