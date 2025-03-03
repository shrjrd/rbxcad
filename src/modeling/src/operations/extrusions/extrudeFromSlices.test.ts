import type { Geom2, Slice, Poly3 } from "../../geometries/types";
import { expect, test } from "@rbxts/jest-globals";

import { comparePolygonsAsPoints } from "../../../test/helpers/index";
import { geom2, geom3, poly3, slice } from "../../geometries/index";
import { TAU } from "../../maths/constants";
import { mat4 } from "../../maths/index";
import { measureArea, measureVolume } from "../../measurements/index";
import { circle, square } from "../../primitives/index";
import { extrudeFromSlices } from "./index";

test("extrudeFromSlices (defaults)", () => {
	const geometry2 = square({ size: 20 });

	let geometry3 = extrudeFromSlices({}, geometry2);
	let pts = geom3.toPoints(geometry3);
	const exp = [
		[
			[-10, -10, 0],
			[10, -10, 0],
			[10, -10, 1],
		],
		[
			[-10, -10, 0],
			[10, -10, 1],
			[-10, -10, 1],
		],
		[
			[10, -10, 0],
			[10, 10, 0],
			[10, 10, 1],
		],
		[
			[10, -10, 0],
			[10, 10, 1],
			[10, -10, 1],
		],
		[
			[10, 10, 0],
			[-10, 10, 0],
			[-10, 10, 1],
		],
		[
			[10, 10, 0],
			[-10, 10, 1],
			[10, 10, 1],
		],
		[
			[-10, 10, 0],
			[-10, -10, 0],
			[-10, -10, 1],
		],
		[
			[-10, 10, 0],
			[-10, -10, 1],
			[-10, 10, 1],
		],
		[
			[10, 10, 1],
			[-10, 10, 1],
			[-10, -10, 1],
		],
		[
			[-10, -10, 1],
			[10, -10, 1],
			[10, 10, 1],
		],
		[
			[-10, -10, 0],
			[-10, 10, 0],
			[10, 10, 0],
		],
		[
			[10, 10, 0],
			[10, -10, 0],
			[-10, -10, 0],
		],
	];
	expect(measureArea(geometry3)).toBe(880);
	expect(measureVolume(geometry3)).toBe(400.00000000000006);
	expect(pts.size()).toBe(12);
	expect(comparePolygonsAsPoints(pts, exp)).toBe(true);

	const poly2 = poly3.create([
		[-10, -10, 0],
		[10, -10, 0],
		[10, 10, 0],
		[-10, 10, 0],
	]);
	geometry3 = extrudeFromSlices({}, poly2);
	pts = geom3.toPoints(geometry3);

	expect(() => geom3.validate(geometry3)).never.toThrow();
	expect(measureArea(geometry3)).toBe(880);
	expect(measureVolume(geometry3)).toBe(400.00000000000006);
	expect(pts.size()).toBe(12);
	expect(comparePolygonsAsPoints(pts, exp)).toBe(true);
});

test("extrudeFromSlices (torus)", () => {
	const sqrt3 = math.sqrt(3) / 2;
	const radius = 10;

	let hex: Poly3 | Slice = poly3.create([
		[radius, 0, 0],
		[radius / 2, radius * sqrt3, 0],
		[-radius / 2, radius * sqrt3, 0],
		[-radius, 0, 0],
		[-radius / 2, -radius * sqrt3, 0],
		[radius / 2, -radius * sqrt3, 0],
	]);
	hex = poly3.transform(mat4.fromTranslation(mat4.create(), [0, 20, 0]), hex);
	hex = slice.fromVertices(poly3.toVertices(hex));

	const angle = TAU / 8;
	const geometry3 = extrudeFromSlices(
		{
			numberOfSlices: TAU / angle,
			capStart: false,
			capEnd: false,
			close: true,
			callback: (progress: number, index: number, base: Slice) => {
				return slice.transform(mat4.fromXRotation(mat4.create(), angle * index), base);
			},
		},
		hex,
	);
	const pts = geom3.toPoints(geometry3);
	expect(() => geom3.validate(geometry3)).never.toThrow();
	expect(measureArea(geometry3)).toBe(7070.694617452831);
	expect(measureVolume(geometry3)).toBe(29393.876913398108);
	expect(pts.size()).toBe(96);
});

test("extrudeFromSlices (same shape, changing dimensions)", () => {
	const base = slice.fromVertices([
		[0, 0, 0],
		[1, 0, 0],
		[1, 1, 0],
		[0, 1, 0],
	]);
	const geometry3 = extrudeFromSlices(
		{
			numberOfSlices: 4,
			capStart: true,
			capEnd: false,
			callback: (progress: number, count: number, base: Slice) => {
				let newSlice = slice.transform(mat4.fromTranslation(mat4.create(), [0, 0, count * 2]), base);
				newSlice = slice.transform(mat4.fromScaling(mat4.create(), [1 + count, 1 + count / 2, 1]), newSlice);
				return newSlice;
			},
		},
		base,
	);
	const pts = geom3.toPoints(geometry3);
	// expected to throw because capEnd is false (non-closed geometry)
	expect(() => geom3.validate(geometry3)).toThrow();
	expect(measureArea(geometry3)).toBe(53.70100297794013);
	expect(measureVolume(geometry3)).toBe(8.5);
	expect(pts.size()).toBe(26);
});

test("extrudeFromSlices (changing shape, changing dimensions)", () => {
	const base = circle({ radius: 4, segments: 4 });
	const geometry3 = extrudeFromSlices(
		{
			numberOfSlices: 5,
			callback: (progress: number, count: number, base: Geom2) => {
				const newShape = circle({ radius: 5 + count, segments: 4 + count });
				let newSlice = slice.fromGeom2(newShape);
				newSlice = slice.transform(mat4.fromTranslation(mat4.create(), [0, 0, count * 10]), newSlice);
				return newSlice;
			},
		},
		base,
	);
	const pts = geom3.toPoints(geometry3);
	//t.notThrows.skip(() => geom3.validate(geometry3));
	//expect(() => geom3.validate(geometry3)).never.toThrow();
	expect(measureArea(geometry3)).toBe(1965.8643589631802);
	expect(measureVolume(geometry3)).toBe(5260.067107417433);
	expect(pts.size()).toBe(304);
});

test("extrudeFromSlices (holes)", () => {
	const geometry2 = geom2.create([
		[
			[-10, 10],
			[-10, -10],
			[10, -10],
			[10, 10],
		],
		[
			[-5, -5],
			[-5, 5],
			[5, 5],
			[5, -5],
		],
	]);
	const geometry3 = extrudeFromSlices({}, geometry2);
	const pts = geom3.toPoints(geometry3);
	const exp = [
		[
			[-10, 10, 0],
			[-10, -10, 0],
			[-10, -10, 1],
		],
		[
			[-10, 10, 0],
			[-10, -10, 1],
			[-10, 10, 1],
		],
		[
			[-10, -10, 0],
			[10, -10, 0],
			[10, -10, 1],
		],
		[
			[-10, -10, 0],
			[10, -10, 1],
			[-10, -10, 1],
		],
		[
			[10, -10, 0],
			[10, 10, 0],
			[10, 10, 1],
		],
		[
			[10, -10, 0],
			[10, 10, 1],
			[10, -10, 1],
		],
		[
			[10, 10, 0],
			[-10, 10, 0],
			[-10, 10, 1],
		],
		[
			[10, 10, 0],
			[-10, 10, 1],
			[10, 10, 1],
		],
		[
			[-5, -5, 0],
			[-5, 5, 0],
			[-5, 5, 1],
		],
		[
			[-5, -5, 0],
			[-5, 5, 1],
			[-5, -5, 1],
		],
		[
			[-5, 5, 0],
			[5, 5, 0],
			[5, 5, 1],
		],
		[
			[-5, 5, 0],
			[5, 5, 1],
			[-5, 5, 1],
		],
		[
			[5, 5, 0],
			[5, -5, 0],
			[5, -5, 1],
		],
		[
			[5, 5, 0],
			[5, -5, 1],
			[5, 5, 1],
		],
		[
			[5, -5, 0],
			[-5, -5, 0],
			[-5, -5, 1],
		],
		[
			[5, -5, 0],
			[-5, -5, 1],
			[5, -5, 1],
		],
		[
			[-5, 5, 1],
			[5, 5, 1],
			[10, 10, 1],
		],
		[
			[10, -10, 1],
			[10, 10, 1],
			[5, 5, 1],
		],
		[
			[-5, 5, 1],
			[10, 10, 1],
			[-10, 10, 1],
		],
		[
			[10, -10, 1],
			[5, 5, 1],
			[5, -5, 1],
		],
		[
			[-5, -5, 1],
			[-5, 5, 1],
			[-10, 10, 1],
		],
		[
			[-10, -10, 1],
			[10, -10, 1],
			[5, -5, 1],
		],
		[
			[-5, -5, 1],
			[-10, 10, 1],
			[-10, -10, 1],
		],
		[
			[-10, -10, 1],
			[5, -5, 1],
			[-5, -5, 1],
		],
		[
			[10, 10, 0],
			[5, 5, 0],
			[-5, 5, 0],
		],
		[
			[5, 5, 0],
			[10, 10, 0],
			[10, -10, 0],
		],
		[
			[-10, 10, 0],
			[10, 10, 0],
			[-5, 5, 0],
		],
		[
			[5, -5, 0],
			[5, 5, 0],
			[10, -10, 0],
		],
		[
			[-10, 10, 0],
			[-5, 5, 0],
			[-5, -5, 0],
		],
		[
			[5, -5, 0],
			[10, -10, 0],
			[-10, -10, 0],
		],
		[
			[-10, -10, 0],
			[-10, 10, 0],
			[-5, -5, 0],
		],
		[
			[-5, -5, 0],
			[5, -5, 0],
			[-10, -10, 0],
		],
	];
	expect(() => geom3.validate(geometry3)).never.toThrow();
	expect(measureArea(geometry3)).toBe(720);
	expect(measureVolume(geometry3)).toBe(300);
	expect(pts.size()).toBe(32);
	expect(comparePolygonsAsPoints(pts, exp)).toBe(true);
});
