import type { Vec3 } from "../maths/types";
import { expect, test } from "@rbxts/jest-globals";

import { comparePolygonsAsPoints } from "../../test/helpers/index";
import { geom3 } from "../geometries/index";
import { measureArea, measureVolume } from "../measurements/index";
import { polyhedron } from "./index";
import { RGBA } from "../colors/types";

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
	let faces: number[][] = [
		[0, 1, 2, 3],
		[5, 6, 7, 4],
		[0, 5, 4, 1],
		[3, 2, 7, 6],
		[0, 3, 6, 5],
		[1, 4, 7, 2],
	];
	const colors: RGBA[] = [
		[0, 0, 0, 1],
		[1, 0, 0, 1],
		[0, 1, 0, 1],
		[0, 0, 1, 1],
		[0.5, 0.5, 0.5, 1],
		[1, 1, 1, 1],
	];
	let obs = polyhedron({ points, faces, colors });
	let pts = geom3.toPoints(obs);
	let exp = [
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
	expect(measureArea(obs)).toBe(24);
	expect(measureVolume(obs)).toBe(7.999999999999999);
	expect(pts.size()).toBe(6);
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
	expect(measureArea(obs)).toBe(965.6854249492379);
	expect(measureVolume(obs)).toBe(1333.3333333333333);
	expect(pts.size()).toBe(6);
	expect(comparePolygonsAsPoints(pts, exp)).toBe(true);
});
