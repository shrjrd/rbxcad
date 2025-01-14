import { expect, test } from "@rbxts/jest-globals";

import { comparePoints, comparePolygonsAsPoints } from "../../../test/helpers";
import { geom2, geom3, path2 } from "../../geometries";
import { center, centerX, centerY, centerZ } from "./index";

test("center: centering of a path2 produces expected changes to points", () => {
	const geometry = path2.fromPoints({}, [
		[5, 0],
		[0, 3],
		[-1, 0],
	]);

	// center about X
	let centered = center({ axes: [true, false, false] }, geometry) as Path2;
	let pts = path2.toPoints(centered);
	const exp: Vec2[] = [
		[3, 0],
		[-2, 3],
		[-3, 0],
	];
	expect(() => path2.validate(centered)).never.toThrow();
	expect(comparePoints(pts, exp)).toBe(true);

	centered = centerX(geometry) as Path2;
	pts = path2.toPoints(centered);
	expect(() => path2.validate(centered)).never.toThrow();
	expect(comparePoints(pts, exp)).toBe(true);
});

test("center: centering of a geom2 produces expected changes to points", () => {
	const geometry = geom2.fromPoints([
		[0, 0],
		[10, 0],
		[0, 10],
	]);

	// center about Y
	let centered = center({ axes: [false, true, false] }, geometry) as Geom2;
	let pts = geom2.toPoints(centered);
	const exp: Vec2[] = [
		[0, -5],
		[10, -5],
		[0, 5],
	];
	expect(() => geom2.validate(centered)).never.toThrow();
	expect(comparePoints(pts, exp)).toBe(true);

	centered = centerY(geometry) as Geom2;
	pts = geom2.toPoints(centered);
	expect(() => geom2.validate(centered)).never.toThrow();
	expect(comparePoints(pts, exp)).toBe(true);
});

test("center: centering of a geom3 produces expected changes to polygons", () => {
	const points: Vec3[][] = [
		[
			[-2, -7, -12],
			[-2, -7, 18],
			[-2, 13, 18],
			[-2, 13, -12],
		],
		[
			[8, -7, -12],
			[8, 13, -12],
			[8, 13, 18],
			[8, -7, 18],
		],
		[
			[-2, -7, -12],
			[8, -7, -12],
			[8, -7, 18],
			[-2, -7, 18],
		],
		[
			[-2, 13, -12],
			[-2, 13, 18],
			[8, 13, 18],
			[8, 13, -12],
		],
		[
			[-2, -7, -12],
			[-2, 13, -12],
			[8, 13, -12],
			[8, -7, -12],
		],
		[
			[-2, -7, 18],
			[8, -7, 18],
			[8, 13, 18],
			[-2, 13, 18],
		],
	];
	const geometry = geom3.fromPoints(points);

	// center about X
	let centered = center({ axes: [true, false, false] }, geometry) as Geom3;
	let pts = geom3.toPoints(centered);
	let exp: Vec3[][] = [
		[
			[-5, -7, -12],
			[-5, -7, 18],
			[-5, 13, 18],
			[-5, 13, -12],
		],
		[
			[5, -7, -12],
			[5, 13, -12],
			[5, 13, 18],
			[5, -7, 18],
		],
		[
			[-5, -7, -12],
			[5, -7, -12],
			[5, -7, 18],
			[-5, -7, 18],
		],
		[
			[-5, 13, -12],
			[-5, 13, 18],
			[5, 13, 18],
			[5, 13, -12],
		],
		[
			[-5, -7, -12],
			[-5, 13, -12],
			[5, 13, -12],
			[5, -7, -12],
		],
		[
			[-5, -7, 18],
			[5, -7, 18],
			[5, 13, 18],
			[-5, 13, 18],
		],
	];
	expect(() => geom3.validate(centered)).never.toThrow();
	expect(comparePolygonsAsPoints(pts, exp)).toBe(true);

	centered = centerX(geometry) as Geom3;
	pts = geom3.toPoints(centered);
	expect(() => geom3.validate(centered)).never.toThrow();
	expect(comparePolygonsAsPoints(pts, exp)).toBe(true);

	// center about Y
	centered = center({ axes: [false, true, false] }, geometry) as Geom3;
	pts = geom3.toPoints(centered);
	exp = [
		[
			[-2, -10, -12],
			[-2, -10, 18],
			[-2, 10, 18],
			[-2, 10, -12],
		],
		[
			[8, -10, -12],
			[8, 10, -12],
			[8, 10, 18],
			[8, -10, 18],
		],
		[
			[-2, -10, -12],
			[8, -10, -12],
			[8, -10, 18],
			[-2, -10, 18],
		],
		[
			[-2, 10, -12],
			[-2, 10, 18],
			[8, 10, 18],
			[8, 10, -12],
		],
		[
			[-2, -10, -12],
			[-2, 10, -12],
			[8, 10, -12],
			[8, -10, -12],
		],
		[
			[-2, -10, 18],
			[8, -10, 18],
			[8, 10, 18],
			[-2, 10, 18],
		],
	];
	expect(() => geom3.validate(centered)).never.toThrow();
	expect(comparePolygonsAsPoints(pts, exp)).toBe(true);

	centered = centerY(geometry) as Geom3;
	pts = geom3.toPoints(centered);
	expect(() => geom3.validate(centered)).never.toThrow();
	expect(comparePolygonsAsPoints(pts, exp)).toBe(true);

	// center about Z
	centered = center({ axes: [false, false, true] }, geometry) as Geom3;
	pts = geom3.toPoints(centered);
	exp = [
		[
			[-2, -7, -15],
			[-2, -7, 15],
			[-2, 13, 15],
			[-2, 13, -15],
		],
		[
			[8, -7, -15],
			[8, 13, -15],
			[8, 13, 15],
			[8, -7, 15],
		],
		[
			[-2, -7, -15],
			[8, -7, -15],
			[8, -7, 15],
			[-2, -7, 15],
		],
		[
			[-2, 13, -15],
			[-2, 13, 15],
			[8, 13, 15],
			[8, 13, -15],
		],
		[
			[-2, -7, -15],
			[-2, 13, -15],
			[8, 13, -15],
			[8, -7, -15],
		],
		[
			[-2, -7, 15],
			[8, -7, 15],
			[8, 13, 15],
			[-2, 13, 15],
		],
	];
	expect(() => geom3.validate(centered)).never.toThrow();
	expect(comparePolygonsAsPoints(pts, exp)).toBe(true);

	centered = centerZ(geometry) as Geom3;
	pts = geom3.toPoints(centered);
	expect(() => geom3.validate(centered)).never.toThrow();
	expect(comparePolygonsAsPoints(pts, exp)).toBe(true);
});

test("center: centering of multiple objects produces expected changes", () => {
	const junk = "hello";
	const geometry1 = path2.fromPoints({}, [
		[-5, 5],
		[5, 5],
		[-5, -5],
		[10, -5],
	]);
	const geometry2 = geom2.fromPoints([
		[-5, -5],
		[0, 5],
		[10, -5],
	]);

	const centered = center(
		{ axes: [true, true, false], relativeTo: [10, 15, 0] },
		junk as unknown as object,
		geometry1,
		geometry2,
	) as object[];

	expect(centered[0]).toBe(junk);

	const pts1 = path2.toPoints(centered[1] as Path2);
	const exp1: Vec2[] = [
		[2.5, 20],
		[12.5, 20],
		[2.5, 10],
		[17.5, 10],
	];
	expect(() => path2.validate(centered[1] as Path2)).never.toThrow();
	expect(comparePoints(pts1, exp1)).toBe(true);

	const pts2 = geom2.toPoints(centered[2] as Geom2);
	const exp2: Vec2[] = [
		[2.5, 10],
		[7.5, 20],
		[17.5, 10],
	];
	expect(() => geom2.validate(centered[2] as Geom2)).never.toThrow();
	expect(comparePoints(pts2, exp2)).toBe(true);
});
