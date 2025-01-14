import { expect, test } from "@rbxts/jest-globals";

import comparePolygonsAsPoints from "../../test/helpers/comparePolygonsAsPoints";
import geom3 from "../geometries/geom3";
import { polyhedron } from "./index";

test("polyhedron (points and faces)", () => {
	// points and faces form a cube
	let points: Vec3[] = [
		[-1, -1, -1],
		[-1, -1, 1],
		[-1, 1, 1],
		[-1, 1, -1],
		[1, -1, 1],
		[1, -1, -1],
		[1, 1, -1],
		[1, 1, 1],
	];
	let faces = [
		[0, 1, 2, 3],
		[5, 6, 7, 4],
		[0, 5, 4, 1],
		[3, 2, 7, 6],
		[0, 3, 6, 5],
		[1, 4, 7, 2],
	];
	const colors = [
		[0, 0, 0, 1],
		[1, 0, 0, 1],
		[0, 1, 0, 1],
		[0, 0, 1, 1],
		[0.5, 0.5, 0.5, 1],
		[1, 1, 1, 1],
	];
	let obs = polyhedron({ points, faces, colors });
	let pts = geom3.toPoints(obs);
	let exp: Vec3[][] = [
		[
			[-1, -1, -1],
			[-1, -1, 1],
			[-1, 1, 1],
			[-1, 1, -1],
		],
		[
			[1, -1, -1],
			[1, 1, -1],
			[1, 1, 1],
			[1, -1, 1],
		],
		[
			[-1, -1, -1],
			[1, -1, -1],
			[1, -1, 1],
			[-1, -1, 1],
		],
		[
			[-1, 1, -1],
			[-1, 1, 1],
			[1, 1, 1],
			[1, 1, -1],
		],
		[
			[-1, -1, -1],
			[-1, 1, -1],
			[1, 1, -1],
			[1, -1, -1],
		],
		[
			[-1, -1, 1],
			[1, -1, 1],
			[1, 1, 1],
			[-1, 1, 1],
		],
	];
	expect(() => geom3.validate(obs)).never.toThrow();
	expect(pts.size()).toEqual(6);
	expect(comparePolygonsAsPoints(pts, exp)).toBe(true);

	// test orientation
	points = [
		[10, 10, 0],
		[10, -10, 0],
		[-10, -10, 0],
		[-10, 10, 0],
		[0, 0, 10],
	];
	faces = [
		[0, 1, 4],
		[1, 2, 4],
		[2, 3, 4],
		[3, 0, 4],
		[1, 0, 3],
		[2, 1, 3],
	];
	obs = polyhedron({ points: points, faces: faces, orientation: "inward" });
	pts = geom3.toPoints(obs);
	exp = [
		[
			[0, 0, 10],
			[10, -10, 0],
			[10, 10, 0],
		],
		[
			[0, 0, 10],
			[-10, -10, 0],
			[10, -10, 0],
		],
		[
			[0, 0, 10],
			[-10, 10, 0],
			[-10, -10, 0],
		],
		[
			[0, 0, 10],
			[10, 10, 0],
			[-10, 10, 0],
		],
		[
			[-10, 10, 0],
			[10, 10, 0],
			[10, -10, 0],
		],
		[
			[-10, 10, 0],
			[10, -10, 0],
			[-10, -10, 0],
		],
	];
	expect(() => geom3.validate(obs)).never.toThrow();
	expect(pts.size()).toEqual(6);
	expect(comparePolygonsAsPoints(pts, exp)).toBe(true);
});
