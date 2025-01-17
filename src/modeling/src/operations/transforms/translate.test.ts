import { expect, test } from "@rbxts/jest-globals";

import { comparePoints, comparePolygonsAsPoints } from "../../../test/helpers";
import { geom2, geom3, path2 } from "../../geometries";
import { translate, translateX, translateY, translateZ } from "./index";

test("translate: translating of a path2 produces expected changes to points", () => {
	const line = path2.fromPoints({}, [
		[0, 0],
		[1, 0],
	]);

	// translate X
	let translated = translate([1], line) as Path2;
	let obs = path2.toPoints(translated);
	let exp: Vec2[] = [
		[1, 0],
		[2, 0],
	];
	expect(() => path2.validate(translated)).never.toThrow();
	expect(comparePoints(obs, exp)).toBe(true);

	translated = translateX(1, line) as Path2;
	obs = path2.toPoints(translated);
	expect(() => path2.validate(translated)).never.toThrow();
	expect(comparePoints(obs, exp)).toBe(true);

	// translate Y
	translated = translate([0, 1], line) as Path2;
	obs = path2.toPoints(translated);
	exp = [
		[0, 1],
		[1, 1],
	];
	expect(() => path2.validate(translated)).never.toThrow();
	expect(comparePoints(obs, exp)).toBe(true);

	translated = translateY(1, line) as Path2;
	obs = path2.toPoints(translated);
	expect(() => path2.validate(translated)).never.toThrow();
	expect(comparePoints(obs, exp)).toBe(true);
});

test("translate: translating of a geom2 produces expected changes to points", () => {
	const geometry = geom2.fromPoints([
		[0, 0],
		[1, 0],
		[0, 1],
	]);

	// translate X
	let translated = translate([1], geometry) as Geom2;
	let obs = geom2.toPoints(translated);
	let exp: Vec2[] = [
		[1, 0],
		[2, 0],
		[1, 1],
	];
	expect(() => geom2.validate(translated)).never.toThrow();
	expect(comparePoints(obs, exp)).toBe(true);

	translated = translateX(1, geometry) as Geom2;
	obs = geom2.toPoints(translated);
	expect(() => geom2.validate(translated)).never.toThrow();
	expect(comparePoints(obs, exp)).toBe(true);

	// translate Y
	translated = translate([0, 1], geometry) as Geom2;
	obs = geom2.toPoints(translated);
	exp = [
		[0, 1],
		[1, 1],
		[0, 2],
	];
	expect(() => geom2.validate(translated)).never.toThrow();
	expect(comparePoints(obs, exp)).toBe(true);

	translated = translateY(1, geometry) as Geom2;
	obs = geom2.toPoints(translated);
	expect(() => geom2.validate(translated)).never.toThrow();
	expect(comparePoints(obs, exp)).toBe(true);
});

test("translate: translating of a geom3 produces expected changes to polygons", () => {
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

	// translate X
	let translated = translate([3], geometry) as Geom3;
	let obs = geom3.toPoints(translated);
	let exp: Vec3[][] = [
		[
			[1, -7, -12],
			[1, -7, 18],
			[1, 13, 18],
			[1, 13, -12],
		],
		[
			[11, -7, -12],
			[11, 13, -12],
			[11, 13, 18],
			[11, -7, 18],
		],
		[
			[1, -7, -12],
			[11, -7, -12],
			[11, -7, 18],
			[1, -7, 18],
		],
		[
			[1, 13, -12],
			[1, 13, 18],
			[11, 13, 18],
			[11, 13, -12],
		],
		[
			[1, -7, -12],
			[1, 13, -12],
			[11, 13, -12],
			[11, -7, -12],
		],
		[
			[1, -7, 18],
			[11, -7, 18],
			[11, 13, 18],
			[1, 13, 18],
		],
	];
	expect(() => geom3.validate(translated)).never.toThrow();
	expect(comparePolygonsAsPoints(obs, exp)).toBe(true);

	translated = translateX(3, geometry) as Geom3;
	obs = geom3.toPoints(translated);
	expect(() => geom3.validate(translated)).never.toThrow();
	expect(comparePolygonsAsPoints(obs, exp)).toBe(true);

	// translated Y
	translated = translate([0, 3], geometry) as Geom3;
	obs = geom3.toPoints(translated);
	exp = [
		[
			[-2, -4, -12],
			[-2, -4, 18],
			[-2, 16, 18],
			[-2, 16, -12],
		],
		[
			[8, -4, -12],
			[8, 16, -12],
			[8, 16, 18],
			[8, -4, 18],
		],
		[
			[-2, -4, -12],
			[8, -4, -12],
			[8, -4, 18],
			[-2, -4, 18],
		],
		[
			[-2, 16, -12],
			[-2, 16, 18],
			[8, 16, 18],
			[8, 16, -12],
		],
		[
			[-2, -4, -12],
			[-2, 16, -12],
			[8, 16, -12],
			[8, -4, -12],
		],
		[
			[-2, -4, 18],
			[8, -4, 18],
			[8, 16, 18],
			[-2, 16, 18],
		],
	];
	expect(() => geom3.validate(translated)).never.toThrow();
	expect(comparePolygonsAsPoints(obs, exp)).toBe(true);

	translated = translateY(3, geometry) as Geom3;
	obs = geom3.toPoints(translated);
	expect(() => geom3.validate(translated)).never.toThrow();
	expect(comparePolygonsAsPoints(obs, exp)).toBe(true);

	// translate Z
	translated = translate([0, 0, 3], geometry) as Geom3;
	obs = geom3.toPoints(translated);
	exp = [
		[
			[-2, -7, -9],
			[-2, -7, 21],
			[-2, 13, 21],
			[-2, 13, -9],
		],
		[
			[8, -7, -9],
			[8, 13, -9],
			[8, 13, 21],
			[8, -7, 21],
		],
		[
			[-2, -7, -9],
			[8, -7, -9],
			[8, -7, 21],
			[-2, -7, 21],
		],
		[
			[-2, 13, -9],
			[-2, 13, 21],
			[8, 13, 21],
			[8, 13, -9],
		],
		[
			[-2, -7, -9],
			[-2, 13, -9],
			[8, 13, -9],
			[8, -7, -9],
		],
		[
			[-2, -7, 21],
			[8, -7, 21],
			[8, 13, 21],
			[-2, 13, 21],
		],
	];
	expect(() => geom3.validate(translated)).never.toThrow();
	expect(comparePolygonsAsPoints(obs, exp)).toBe(true);

	translated = translateZ(3, geometry) as Geom3;
	obs = geom3.toPoints(translated);
	expect(() => geom3.validate(translated)).never.toThrow();
	expect(comparePolygonsAsPoints(obs, exp)).toBe(true);
});

test("translate: translating of multiple objects produces expected changes", () => {
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

	const translated = translate([3, 3, 3], junk as unknown as object, geometry1, geometry2) as object[];
	expect(translated[0]).toBe(junk);

	let obs = path2.toPoints(translated[1] as Path2);
	let exp: Vec2[] = [
		[-2, 8],
		[8, 8],
		[-2, -2],
		[13, -2],
	];
	expect(() => path2.validate(translated[1] as Path2)).never.toThrow();
	expect(comparePoints(obs, exp)).toBe(true);

	obs = geom2.toPoints(translated[2] as Geom2);
	exp = [
		[-2, -2],
		[3, 8],
		[13, -2],
	];
	expect(() => geom2.validate(translated[2] as Geom2)).never.toThrow();
	expect(comparePoints(obs, exp)).toBe(true);
});
