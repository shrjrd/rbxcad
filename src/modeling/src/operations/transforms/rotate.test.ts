import { expect, test } from "@rbxts/jest-globals";

import { comparePoints, comparePolygonsAsPoints } from "../../../test/helpers";
import { geom2, geom3, path2 } from "../../geometries";
import { TAU } from "../../maths/constants";
import { rotate, rotateX, rotateY, rotateZ } from "./index";

test("rotate: rotating of a path2 produces expected changes to points", () => {
	const geometry = path2.fromPoints({}, [
		[1, 0],
		[0, 1],
		[-1, 0],
	]);

	// rotate about Z
	let rotated = rotate([0, 0, TAU / 4], geometry) as Path2;
	let obs = path2.toPoints(rotated);
	const exp: Vec2[] = [
		[0, 1],
		[-1, 0],
		[-0, -1],
	];
	expect(comparePoints(obs, exp)).toBe(true);

	rotated = rotateZ(TAU / 4, geometry) as Path2;
	obs = path2.toPoints(rotated);
	expect(() => path2.validate(rotated)).never.toThrow();
	expect(comparePoints(obs, exp)).toBe(true);
});

test("rotate: rotating of a geom2 produces expected changes to points", () => {
	const geometry = geom2.fromPoints([
		[0, 0],
		[1, 0],
		[0, 1],
	]);

	// rotate about Z
	let rotated = rotate([0, 0, -TAU / 4], geometry) as Geom2;
	let obs = geom2.toPoints(rotated);
	const exp: Vec2[] = [
		[0, 0],
		[0, -1],
		[1, 0],
	];
	expect(() => geom2.validate(rotated)).never.toThrow();
	expect(comparePoints(obs, exp)).toBe(true);

	rotated = rotateZ(-TAU / 4, geometry) as Geom2;
	obs = geom2.toPoints(rotated);
	expect(() => geom2.validate(rotated)).never.toThrow();
	expect(comparePoints(obs, exp)).toBe(true);
});

test("rotate: rotating of a geom3 produces expected changes to polygons", () => {
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

	// rotate about X
	let rotated = rotate([TAU / 4], geometry) as Geom3;
	let obs = geom3.toPoints(rotated);
	let exp: Vec3[][] = [
		[
			[-2, 12, -7.000000000000001],
			[-2, -18, -6.999999999999999],
			[-2, -18, 13.000000000000002],
			[-2, 12, 13],
		],
		[
			[8, 12, -7.000000000000001],
			[8, 12, 13],
			[8, -18, 13.000000000000002],
			[8, -18, -6.999999999999999],
		],
		[
			[-2, 12, -7.000000000000001],
			[8, 12, -7.000000000000001],
			[8, -18, -6.999999999999999],
			[-2, -18, -6.999999999999999],
		],
		[
			[-2, 12, 13],
			[-2, -18, 13.000000000000002],
			[8, -18, 13.000000000000002],
			[8, 12, 13],
		],
		[
			[-2, 12, -7.000000000000001],
			[-2, 12, 13],
			[8, 12, 13],
			[8, 12, -7.000000000000001],
		],
		[
			[-2, -18, -6.999999999999999],
			[8, -18, -6.999999999999999],
			[8, -18, 13.000000000000002],
			[-2, -18, 13.000000000000002],
		],
	];
	expect(() => geom3.validate(rotated)).never.toThrow();
	expect(comparePolygonsAsPoints(obs, exp)).toBe(true);

	rotated = rotateX(TAU / 4, geometry) as Geom3;
	obs = geom3.toPoints(rotated);
	expect(() => geom3.validate(rotated)).never.toThrow();
	expect(comparePolygonsAsPoints(obs, exp)).toBe(true);

	// rotate about Y
	rotated = rotate([0, -TAU / 4], geometry) as Geom3;
	obs = geom3.toPoints(rotated);
	exp = [
		[
			[12, -7, -2.000000000000001],
			[-18, -7, -1.999999999999999],
			[-18, 13, -1.999999999999999],
			[12, 13, -2.000000000000001],
		],
		[
			[12, -7, 7.999999999999999],
			[12, 13, 7.999999999999999],
			[-18, 13, 8.000000000000002],
			[-18, -7, 8.000000000000002],
		],
		[
			[12, -7, -2.000000000000001],
			[12, -7, 7.999999999999999],
			[-18, -7, 8.000000000000002],
			[-18, -7, -1.999999999999999],
		],
		[
			[12, 13, -2.000000000000001],
			[-18, 13, -1.999999999999999],
			[-18, 13, 8.000000000000002],
			[12, 13, 7.999999999999999],
		],
		[
			[12, -7, -2.000000000000001],
			[12, 13, -2.000000000000001],
			[12, 13, 7.999999999999999],
			[12, -7, 7.999999999999999],
		],
		[
			[-18, -7, -1.999999999999999],
			[-18, -7, 8.000000000000002],
			[-18, 13, 8.000000000000002],
			[-18, 13, -1.999999999999999],
		],
	];
	expect(() => geom3.validate(rotated)).never.toThrow();
	expect(comparePolygonsAsPoints(obs, exp)).toBe(true);

	rotated = rotateY(-TAU / 4, geometry) as Geom3;
	obs = geom3.toPoints(rotated);
	expect(comparePolygonsAsPoints(obs, exp)).toBe(true);

	// rotate about Z
	rotated = rotate([0, 0, TAU / 2], geometry) as Geom3;
	obs = geom3.toPoints(rotated);
	exp = [
		[
			[2.000000000000001, 7, -12],
			[2.000000000000001, 7, 18],
			[1.9999999999999984, -13, 18],
			[1.9999999999999984, -13, -12],
		],
		[
			[-7.999999999999999, 7.000000000000001, -12],
			[-8.000000000000002, -12.999999999999998, -12],
			[-8.000000000000002, -12.999999999999998, 18],
			[-7.999999999999999, 7.000000000000001, 18],
		],
		[
			[2.000000000000001, 7, -12],
			[-7.999999999999999, 7.000000000000001, -12],
			[-7.999999999999999, 7.000000000000001, 18],
			[2.000000000000001, 7, 18],
		],
		[
			[1.9999999999999984, -13, -12],
			[1.9999999999999984, -13, 18],
			[-8.000000000000002, -12.999999999999998, 18],
			[-8.000000000000002, -12.999999999999998, -12],
		],
		[
			[2.000000000000001, 7, -12],
			[1.9999999999999984, -13, -12],
			[-8.000000000000002, -12.999999999999998, -12],
			[-7.999999999999999, 7.000000000000001, -12],
		],
		[
			[2.000000000000001, 7, 18],
			[-7.999999999999999, 7.000000000000001, 18],
			[-8.000000000000002, -12.999999999999998, 18],
			[1.9999999999999984, -13, 18],
		],
	];
	expect(() => geom3.validate(rotated)).never.toThrow();
	expect(comparePolygonsAsPoints(obs, exp)).toBe(true);

	rotated = rotateZ(TAU / 2, geometry) as Geom3;
	obs = geom3.toPoints(rotated);
	expect(() => geom3.validate(rotated)).never.toThrow();
	expect(comparePolygonsAsPoints(obs, exp)).toBe(true);
});

test("rotate: rotating of multiple objects produces expected changes", () => {
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

	const rotated = rotate([0, 0, TAU / 4], junk as unknown as object, geometry1, geometry2) as object[];

	expect(rotated[0]).toBe(junk);

	const obs1 = path2.toPoints(rotated[1] as Path2);
	const exp1: Vec2[] = [
		[-5, -5],
		[-5, 5],
		[5, -5],
		[5.000000000000001, 10],
	];
	expect(() => path2.validate(rotated[1] as Path2)).never.toThrow();
	expect(comparePoints(obs1, exp1)).toBe(true);

	const obs2 = geom2.toPoints(rotated[2] as Geom2);
	const exp2: Vec2[] = [
		[5, -5],
		[-5, 3.061616997868383e-16],
		[5.000000000000001, 10],
	];
	expect(() => geom2.validate(rotated[2] as Geom2)).never.toThrow();
	expect(comparePoints(obs2, exp2)).toBe(true);
});
