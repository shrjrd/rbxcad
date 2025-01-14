import geom3 from "../../geometries/geom3";
import mayOverlap from "./mayOverlap";
import { Tree } from "./trees";

/**
 * Return a new 3D geometry representing the space in the first geometry but not
 * in the second geometry. None of the given geometries are modified.
 * @param {geom3} geometry1 - a geometry
 * @param {geom3} geometry2 - a geometry
 * @returns {geom3} new 3D geometry
 */
const subtractGeom3Sub = (geometry1: Geom3, geometry2: Geom3) => {
	if (!mayOverlap(geometry1, geometry2)) {
		return geom3.clone(geometry1);
	}

	const a = new Tree(geom3.toPolygons(geometry1));
	const b = new Tree(geom3.toPolygons(geometry2));
	//print("Tree a", a.toString());
	//print("Tree b", b.toString());
	a.invert();
	//print("Tree a after invert", a.toString());
	a.clipTo(b);
	//print("Tree a after a.clipTo(b)", a.toString());
	//print("Tree b before b.clipTo(a, true)", b.toString());
	b.clipTo(a, true);
	//print("Tree b after clipTo(a, true)", b.toString());
	a.addPolygons(b.allPolygons());
	//print("Tree a after addPolygons(b.allPolygons())", a.toString());
	a.invert();
	//print("Tree a after invert", a.toString());

	const newpolygons = a.allPolygons();
	return geom3.create(newpolygons);
};

export default subtractGeom3Sub;
