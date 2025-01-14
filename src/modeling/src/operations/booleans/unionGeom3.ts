import flatten from "../../utils/flatten";
import retessellate from "../modifiers/retessellate";
import unionSub from "./unionGeom3Sub";

/*
 * Return a new 3D geometry representing the space in the given 3D geometries.
 * @param {...objects} geometries - list of geometries to union
 * @returns {geom3} new 3D geometry
 */
const union = (...geometries: Geom3[]) => {
	geometries = flatten(geometries);

	// combine geometries in a way that forms a balanced binary tree pattern
	let i;
	for (i = 1; i < geometries.size(); i += 2) {
		geometries.push(unionSub(geometries[i - 1], geometries[i]));
	}
	let newgeometry = geometries[i - 1];
	newgeometry = retessellate(newgeometry);
	return newgeometry;
};

export default union;
