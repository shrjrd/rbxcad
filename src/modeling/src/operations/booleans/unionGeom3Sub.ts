import { Array as JsArray } from "@rbxts/luau-polyfill";

import geom3 from "../../geometries/geom3";
import mayOverlap from "./mayOverlap";
import { Tree } from "./trees";

/*
 * Return a new 3D geometry representing the space in the given geometries.
 * @param {geom3} geometry1 - geometry to union
 * @param {geom3} geometry2 - geometry to union
 * @returns {geom3} new 3D geometry
 */
const unionSub = (geometry1: Geom3, geometry2: Geom3) => {
	if (!mayOverlap(geometry1, geometry2)) {
		return unionForNonIntersecting(geometry1, geometry2);
	}

	const a = new Tree(geom3.toPolygons(geometry1));
	const b = new Tree(geom3.toPolygons(geometry2));

	a.clipTo(b, false);
	//print("a Tree after clipTo", a.toString());
	// b.clipTo(a, true); // ERROR: doesn't work
	b.clipTo(a);
	//print("b Tree after clipTo", b.toString());
	b.invert();
	//print("b Tree after invert", b.toString());
	b.clipTo(a);
	//print("b Tree after clipTo", b.toString());
	b.invert();
	//print("b Tree after invert", b.toString());

	//const newpolygons = a.allPolygons().concat(b.allPolygons());
	const newpolygons = JsArray.concat(a.allPolygons(), b.allPolygons());
	const result = geom3.create(newpolygons);
	return result;
};

// Like union, but when we know that the two solids are not intersecting
// Do not use if you are not completely sure that the solids do not intersect!
const unionForNonIntersecting = (geometry1: Geom3, geometry2: Geom3) => {
	let newpolygons = geom3.toPolygons(geometry1);
	//newpolygons = newpolygons.concat(geom3.toPolygons(geometry2));
	newpolygons = JsArray.concat(newpolygons, geom3.toPolygons(geometry2));
	return geom3.create(newpolygons);
};

export default unionSub;
