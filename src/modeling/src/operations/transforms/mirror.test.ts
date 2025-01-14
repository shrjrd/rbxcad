import { expect, test } from "@rbxts/jest-globals";

import { comparePoints, comparePolygonsAsPoints } from "../../../test/helpers";
import { geom2, geom3, path2 } from "../../geometries";
import { measureArea } from "../../measurements";
import { mirror, mirrorX, mirrorY, mirrorZ } from "./index";

test("mirror: mirroring of path2 about X/Y produces expected changes to points", () => {
	const geometry = path2.fromPoints({}, [
		[-5, 5],
		[5, 5],
		[-5, -5],
		[10, -5],
	]);

	// mirror about X
	let mirrored = mirror({ normal: [1, 0, 0] }, geometry) as Path2;
	let obs = path2.toPoints(mirrored);
	let exp: Vec2[] = [
		[5, 5],
		[-5, 5],
		[5, -5],
		[-10, -5],
	];
	expect(() => path2.validate(mirrored)).never.toThrow();
	expect(comparePoints(obs, exp)).toBe(true);

	mirrored = mirrorX(geometry) as Path2;
	obs = path2.toPoints(mirrored);
	expect(() => path2.validate(mirrored)).never.toThrow();
	expect(comparePoints(obs, exp)).toBe(true);

	// mirror about Y
	mirrored = mirror({ normal: [0, 1, 0] }, geometry) as Path2;
	obs = path2.toPoints(mirrored);
	exp = [
		[-5, -5],
		[5, -5],
		[-5, 5],
		[10, 5],
	];
	expect(() => path2.validate(mirrored)).never.toThrow();
	expect(comparePoints(obs, exp)).toBe(true);

	mirrored = mirrorY(geometry) as Path2;
	obs = path2.toPoints(mirrored);
	expect(() => path2.validate(mirrored)).never.toThrow();
	expect(comparePoints(obs, exp)).toBe(true);
});

test("mirror: mirroring of geom2 about X/Y produces expected changes to points", () => {
	const geometry = geom2.fromPoints([
		[-5, -5],
		[0, 5],
		[10, -5],
	]);

	// mirror about X
	let mirrored = mirror({ normal: [1, 0, 0] }, geometry) as Geom2;
	let obs = geom2.toPoints(mirrored);
	let exp: Vec2[] = [
		[0, 5],
		[5, -5],
		[-10, -5],
	];
	expect(() => geom2.validate(mirrored)).never.toThrow();
	expect(measureArea(mirrored)).toBe(measureArea(geometry));
	expect(comparePoints(obs, exp)).toBe(true);

	mirrored = mirrorX(geometry) as Geom2;
	obs = geom2.toPoints(mirrored);
	expect(() => geom2.validate(mirrored)).never.toThrow();
	expect(measureArea(mirrored)).toBe(measureArea(geometry));
	expect(comparePoints(obs, exp)).toBe(true);

	// mirror about Y
	mirrored = mirror({ normal: [0, 1, 0] }, geometry) as Geom2;
	obs = geom2.toPoints(mirrored);
	exp = [
		[0, -5],
		[-5, 5],
		[10, 5],
	];
	expect(() => geom2.validate(mirrored)).never.toThrow();
	expect(measureArea(mirrored)).toBe(measureArea(geometry));
	expect(comparePoints(obs, exp)).toBe(true);

	mirrored = mirrorY(geometry) as Geom2;
	obs = geom2.toPoints(mirrored);
	expect(() => geom2.validate(mirrored)).never.toThrow();
	expect(measureArea(mirrored)).toBe(measureArea(geometry));
	expect(comparePoints(obs, exp)).toBe(true);
});

test("mirror: mirroring of geom3 about X/Y/Z produces expected changes to polygons", () => {
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

	// mirror about X
	let mirrored = mirror({ normal: [1, 0, 0] }, geometry) as Geom3;
	let obs = geom3.toPoints(mirrored);
	let exp: Vec3[][] = [
		[
			[2, 13, -12],
			[2, 13, 18],
			[2, -7, 18],
			[2, -7, -12],
		],
		[
			[-8, -7, 18],
			[-8, 13, 18],
			[-8, 13, -12],
			[-8, -7, -12],
		],
		[
			[2, -7, 18],
			[-8, -7, 18],
			[-8, -7, -12],
			[2, -7, -12],
		],
		[
			[-8, 13, -12],
			[-8, 13, 18],
			[2, 13, 18],
			[2, 13, -12],
		],
		[
			[-8, -7, -12],
			[-8, 13, -12],
			[2, 13, -12],
			[2, -7, -12],
		],
		[
			[2, 13, 18],
			[-8, 13, 18],
			[-8, -7, 18],
			[2, -7, 18],
		],
	];
	expect(() => geom3.validate(mirrored)).never.toThrow();
	expect(comparePolygonsAsPoints(obs, exp)).toBe(true);
	expect(obs).toEqual(exp);

	mirrored = mirrorX(geometry) as Geom3;
	obs = geom3.toPoints(mirrored);
	expect(() => geom3.validate(mirrored)).never.toThrow();
	expect(comparePolygonsAsPoints(obs, exp)).toBe(true);

	// mirror about Y
	mirrored = mirror({ normal: [0, 1, 0] }, geometry) as Geom3;
	obs = geom3.toPoints(mirrored);
	exp = [
		[
			[-2, -13, -12],
			[-2, -13, 18],
			[-2, 7, 18],
			[-2, 7, -12],
		],
		[
			[8, 7, 18],
			[8, -13, 18],
			[8, -13, -12],
			[8, 7, -12],
		],
		[
			[-2, 7, 18],
			[8, 7, 18],
			[8, 7, -12],
			[-2, 7, -12],
		],
		[
			[8, -13, -12],
			[8, -13, 18],
			[-2, -13, 18],
			[-2, -13, -12],
		],
		[
			[8, 7, -12],
			[8, -13, -12],
			[-2, -13, -12],
			[-2, 7, -12],
		],
		[
			[-2, -13, 18],
			[8, -13, 18],
			[8, 7, 18],
			[-2, 7, 18],
		],
	];
	expect(() => geom3.validate(mirrored)).never.toThrow();
	expect(comparePolygonsAsPoints(obs, exp)).toBe(true);

	mirrored = mirrorY(geometry) as Geom3;
	obs = geom3.toPoints(mirrored);
	expect(() => geom3.validate(mirrored)).never.toThrow();
	expect(comparePolygonsAsPoints(obs, exp)).toBe(true);

	// mirror about Z
	mirrored = mirror({ normal: [0, 0, 1] }, geometry) as Geom3;
	obs = geom3.toPoints(mirrored);
	exp = [
		[
			[-2, 13, 12],
			[-2, 13, -18],
			[-2, -7, -18],
			[-2, -7, 12],
		],
		[
			[8, -7, -18],
			[8, 13, -18],
			[8, 13, 12],
			[8, -7, 12],
		],
		[
			[-2, -7, -18],
			[8, -7, -18],
			[8, -7, 12],
			[-2, -7, 12],
		],
		[
			[8, 13, 12],
			[8, 13, -18],
			[-2, 13, -18],
			[-2, 13, 12],
		],
		[
			[8, -7, 12],
			[8, 13, 12],
			[-2, 13, 12],
			[-2, -7, 12],
		],
		[
			[-2, 13, -18],
			[8, 13, -18],
			[8, -7, -18],
			[-2, -7, -18],
		],
	];
	expect(() => geom3.validate(mirrored)).never.toThrow();
	expect(comparePolygonsAsPoints(obs, exp)).toBe(true);

	mirrored = mirrorZ(geometry) as Geom3;
	obs = geom3.toPoints(mirrored);
	expect(() => geom3.validate(mirrored)).never.toThrow();
	expect(comparePolygonsAsPoints(obs, exp)).toBe(true);
});

test("mirror: mirroring of multiple objects produces an array of mirrored objects", () => {
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

	const mirrored = mirror({ normal: [0, 1, 0] }, junk as unknown as object, geometry1, geometry2) as object[];
	expect(mirrored[0]).toBe(junk);

	let obs = path2.toPoints(mirrored[1] as Path2);
	let exp: Vec2[] = [
		[-5, -5],
		[5, -5],
		[-5, 5],
		[10, 5],
	];
	expect(() => path2.validate(mirrored[1] as Path2)).never.toThrow();
	expect(comparePoints(obs, exp)).toBe(true);

	obs = geom2.toPoints(mirrored[2] as Geom2);
	exp = [
		[0, -5],
		[-5, 5],
		[10, 5],
	];
	expect(() => geom2.validate(mirrored[2] as Geom2)).never.toThrow();
	expect(comparePoints(obs, exp)).toBe(true);
});
