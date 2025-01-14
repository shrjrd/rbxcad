import { expect, test } from "@rbxts/jest-globals";

import { poly3 } from "../../geometries";
import mat4 from "../../maths/mat4";
import reTesselateCoplanarPolygons from "./reTesselateCoplanarPolygons";

const translatePoly3 = (offsets: Vec3, polygon: Poly3) => {
	const matrix = mat4.fromTranslation(mat4.create(), offsets);
	return poly3.transform(matrix, polygon);
};

const rotatePoly3 = (angles: Vec3, polygon: Poly3) => {
	const matrix = mat4.fromTaitBryanRotation(
		mat4.create(),
		angles[0] * 0.017453292519943295,
		angles[1] * 0.017453292519943295,
		angles[2] * 0.017453292519943295,
	);
	return poly3.transform(matrix, polygon);
};

test.only("retessellateCoplanarPolygons: should merge coplanar polygons", () => {
	const polyA = poly3.create([
		[-5, -5, 0],
		[5, -5, 0],
		[5, 5, 0],
		[-5, 5, 0],
	]);
	const polyB = poly3.create([
		[5, -5, 0],
		[8, 0, 0],
		[5, 5, 0],
	]);
	const polyC = poly3.create([
		[-5, 5, 0],
		[-8, 0, 0],
		[-5, -5, 0],
	]);
	const polyD = poly3.create([
		[-5, 5, 0],
		[5, 5, 0],
		[0, 8, 0],
	]);
	const polyE = poly3.create([
		[5, -5, 0],
		[-5, -5, 0],
		[0, -8, 0],
	]);

	// combine polygons in each direction
	let obs = reTesselateCoplanarPolygons([polyA, polyB]);
	expect(obs.size()).toBe(1);
	obs = reTesselateCoplanarPolygons([polyA, polyC]);
	expect(obs.size()).toBe(1);
	obs = reTesselateCoplanarPolygons([polyA, polyD]);
	expect(obs.size()).toBe(1);
	obs = reTesselateCoplanarPolygons([polyA, polyE]);
	expect(obs.size()).toBe(1);

	// combine several polygons in each direction
	obs = reTesselateCoplanarPolygons([polyB, polyA, polyC]);
	expect(obs.size()).toBe(1);
	obs = reTesselateCoplanarPolygons([polyC, polyA, polyB]);
	expect(obs.size()).toBe(1);

	obs = reTesselateCoplanarPolygons([polyD, polyA, polyE]);
	expect(obs.size()).toBe(1);
	obs = reTesselateCoplanarPolygons([polyE, polyA, polyD]);
	expect(obs.size()).toBe(1);

	// combine all polygons
	obs = reTesselateCoplanarPolygons([polyA, polyB, polyC, polyD, polyE]);
	expect(obs.size()).toBe(1);

	// now rotate everything and do again
	let polyH = rotatePoly3([-45, -45, -45], polyA);
	let polyI = rotatePoly3([-45, -45, -45], polyB);
	let polyJ = rotatePoly3([-45, -45, -45], polyC);
	let polyK = rotatePoly3([-45, -45, -45], polyD);
	let polyL = rotatePoly3([-45, -45, -45], polyE);

	obs = reTesselateCoplanarPolygons([polyH, polyI, polyJ, polyK, polyL]);
	expect(obs.size()).toBe(1);

	// now translate everything and do again
	polyH = translatePoly3([-15, -15, -15], polyA);
	polyI = translatePoly3([-15, -15, -15], polyB);
	polyJ = translatePoly3([-15, -15, -15], polyC);
	polyK = translatePoly3([-15, -15, -15], polyD);
	polyL = translatePoly3([-15, -15, -15], polyE);

	obs = reTesselateCoplanarPolygons([polyH, polyI, polyJ, polyK, polyL]);
	expect(obs.size()).toBe(1);
});
