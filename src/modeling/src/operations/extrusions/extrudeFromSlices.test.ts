import { expect, test } from "@rbxts/jest-globals";

import comparePolygonsAsPoints from "../../../test/helpers/comparePolygonsAsPoints";
import { geom2, geom3, poly3 } from "../../geometries";
import { TAU } from "../../maths/constants";
import mat4 from "../../maths/mat4";
import { circle } from "../../primitives";
import { extrudeFromSlices, slice } from "./index";

test("extrudeFromSlices (defaults)", () => {
	const geometry2 = geom2.fromPoints([
		[10, 10],
		[-10, 10],
		[-10, -10],
		[10, -10],
	]);

	let geometry3 = extrudeFromSlices({}, geometry2);
	let pts = geom3.toPoints(geometry3);
	const exp: Vec3[][] = [
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
			[-10, -10, 1],
			[10, -10, 1],
			[10, 10, 1],
		],
		[
			[10, 10, 1],
			[-10, 10, 1],
			[-10, -10, 1],
		],
		[
			[10, 10, 0],
			[10, -10, 0],
			[-10, -10, 0],
		],
		[
			[-10, -10, 0],
			[-10, 10, 0],
			[10, 10, 0],
		],
	];
	expect(pts.size()).toBe(12);
	expect(comparePolygonsAsPoints(pts, exp)).toBe(true);

	const poly2 = poly3.create([
		[10, 10, 0],
		[-10, 10, 0],
		[-10, -10, 0],
		[10, -10, 0],
	]);
	geometry3 = extrudeFromSlices({}, poly2);
	pts = geom3.toPoints(geometry3);

	expect(() => geom3.validate(geometry3)).never.toThrow();
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
	hex = slice.fromPoints(poly3.toPoints(hex));

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
	expect(pts.size()).toBe(96);
});

test("extrudeFromSlices (same shape, changing dimensions)", () => {
	const base = slice.fromPoints([
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
				let newslice = slice.transform(mat4.fromTranslation(mat4.create(), [0, 0, count * 2]), base);
				newslice = slice.transform(mat4.fromScaling(mat4.create(), [1 + count, 1 + count / 2, 1]), newslice);
				return newslice;
			},
		},
		base,
	);
	const pts = geom3.toPoints(geometry3);
	// expected to throw because capEnd is false (non-closed geometry)
	expect(() => geom3.validate(geometry3)).toThrow();
	expect(pts.size()).toBe(26);
});

test("extrudeFromSlices (changing shape, changing dimensions)", () => {
	const base: Geom2 = circle({ radius: 4, segments: 4 });
	const geometry3 = extrudeFromSlices(
		{
			numberOfSlices: 5,
			callback: (progress: number, count: number, base: Geom2) => {
				const newshape = circle({ radius: 5 + count, segments: 4 + count });
				let newslice = slice.fromSides(geom2.toSides(newshape));
				newslice = slice.transform(mat4.fromTranslation(mat4.create(), [0, 0, count * 10]), newslice);
				return newslice;
			},
		},
		base,
	);
	const pts = geom3.toPoints(geometry3);
	//t.notThrows.skip(() => geom3.validate(geometry3));
	expect(() => geom3.validate(geometry3)).never.toThrow();
	expect(pts.size()).toBe(304);
});

test("extrudeFromSlices (holes)", () => {
	const geometry2 = geom2.create([
		[
			[-10, 10],
			[-10, -10],
		],
		[
			[-10, -10],
			[10, -10],
		],
		[
			[10, -10],
			[10, 10],
		],
		[
			[10, 10],
			[-10, 10],
		],
		[
			[-5, -5],
			[-5, 5],
		],
		[
			[5, -5],
			[-5, -5],
		],
		[
			[5, 5],
			[5, -5],
		],
		[
			[-5, 5],
			[5, 5],
		],
	]);
	const geometry3 = extrudeFromSlices({}, geometry2);
	const pts = geom3.toPoints(geometry3);
	const exp: Vec3[][] = [
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
			[10, -10, 1],
			[10, 10, 1],
			[5, 5, 1],
		],
		[
			[-5, 5, 1],
			[5, 5, 1],
			[10, 10, 1],
		],
		[
			[10, -10, 1],
			[5, 5, 1],
			[5, -5, 1],
		],
		[
			[-5, 5, 1],
			[10, 10, 1],
			[-10, 10, 1],
		],
		[
			[-10, -10, 1],
			[10, -10, 1],
			[5, -5, 1],
		],
		[
			[-5, -5, 1],
			[-5, 5, 1],
			[-10, 10, 1],
		],
		[
			[-10, -10, 1],
			[5, -5, 1],
			[-5, -5, 1],
		],
		[
			[-5, -5, 1],
			[-10, 10, 1],
			[-10, -10, 1],
		],
		[
			[5, 5, 0],
			[10, 10, 0],
			[10, -10, 0],
		],
		[
			[10, 10, 0],
			[5, 5, 0],
			[-5, 5, 0],
		],
		[
			[5, -5, 0],
			[5, 5, 0],
			[10, -10, 0],
		],
		[
			[-10, 10, 0],
			[10, 10, 0],
			[-5, 5, 0],
		],
		[
			[5, -5, 0],
			[10, -10, 0],
			[-10, -10, 0],
		],
		[
			[-10, 10, 0],
			[-5, 5, 0],
			[-5, -5, 0],
		],
		[
			[-5, -5, 0],
			[5, -5, 0],
			[-10, -10, 0],
		],
		[
			[-10, -10, 0],
			[-10, 10, 0],
			[-5, -5, 0],
		],
	];
	expect(() => geom3.validate(geometry3)).never.toThrow();
	expect(pts.size()).toBe(32);
	expect(comparePolygonsAsPoints(pts, exp)).toBe(true);
});
