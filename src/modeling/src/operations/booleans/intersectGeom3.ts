import flatten from "../../utils/flatten";
import retessellate from "../modifiers/retessellate";
import intersectSub from "./intersectGeom3Sub";

/*
 * Return a new 3D geometry representing space in both the first geometry and
 * in the subsequent geometries. None of the given geometries are modified.
 * @param {...geom3} geometries - list of 3D geometries
 * @returns {geom3} new 3D geometry
 */
const intersect = (...geometries: Geom3[]) => {
	geometries = flatten(geometries);

	let newgeometry = geometries.shift()!;
	geometries.forEach((geometry) => {
		newgeometry = intersectSub(newgeometry, geometry);
	});

	newgeometry = retessellate(newgeometry);
	return newgeometry;
};

export default intersect;
