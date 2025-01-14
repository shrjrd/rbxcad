import { expect, test } from "@rbxts/jest-globals";

import { comparePoints, comparePolygonsAsPoints } from "../../../test/helpers";
import { geom2, geom3, path2 } from "../../geometries";
import { scale, scaleX, scaleY, scaleZ } from "./index";

test("scale: scaling of a path2 produces expected changes to points", () => {
	const geometry = path2.fromPoints({}, [
		[0, 4],
		[1, 0],
	]);

	// scale X
	let scaled = scale([3], geometry) as Path2;
	let obs = path2.toPoints(scaled);
	let exp: Vec2[] = [
		[0, 4],
		[3, 0],
	];
	expect(() => path2.validate(scaled)).never.toThrow();
	expect(comparePoints(obs, exp)).toBe(true);

	scaled = scaleX(3, geometry) as Path2;
	obs = path2.toPoints(scaled);
	expect(() => path2.validate(scaled)).never.toThrow();
	expect(comparePoints(obs, exp)).toBe(true);

	// scale Y
	scaled = scale([1, 0.5], geometry) as Path2;
	obs = path2.toPoints(scaled);
	exp = [
		[0, 2],
		[1, 0],
	];
	expect(() => path2.validate(scaled)).never.toThrow();
	expect(comparePoints(obs, exp)).toBe(true);

	scaled = scaleY(0.5, geometry) as Path2;
	obs = path2.toPoints(scaled);
	expect(() => path2.validate(scaled)).never.toThrow();
	expect(comparePoints(obs, exp)).toBe(true);
});

test("scale: scaling of a geom2 produces expected changes to points", () => {
	const geometry = geom2.fromPoints([
		[-1, 0],
		[1, 0],
		[0, 1],
	]);

	// scale X
	let scaled = scale([3], geometry) as Geom2;
	let obs = geom2.toPoints(scaled);
	let exp: Vec2[] = [
		[-3, 0],
		[3, 0],
		[0, 1],
	];
	expect(() => geom2.validate(scaled)).never.toThrow();
	expect(comparePoints(obs, exp)).toBe(true);

	scaled = scaleX(3, geometry) as Geom2;
	obs = geom2.toPoints(scaled);
	expect(() => geom2.validate(scaled)).never.toThrow();
	expect(comparePoints(obs, exp)).toBe(true);

	// scale Y
	scaled = scale([1, 3], geometry) as Geom2;
	obs = geom2.toPoints(scaled);
	exp = [
		[-1, 0],
		[1, 0],
		[0, 3],
	];
	expect(() => geom2.validate(scaled)).never.toThrow();
	expect(comparePoints(obs, exp)).toBe(true);

	scaled = scaleY(3, geometry) as Geom2;
	obs = geom2.toPoints(scaled);
	expect(() => geom2.validate(scaled)).never.toThrow();
	expect(comparePoints(obs, exp)).toBe(true);
});

test("scale: scaling of a geom3 produces expected changes to polygons", () => {
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

	// scale X
	let scaled = scale([3], geometry) as Geom3;
	let obs = geom3.toPoints(scaled);
	let exp: Vec3[][] = [
		[
			[-6, -7, -12],
			[-6, -7, 18],
			[-6, 13, 18],
			[-6, 13, -12],
		],
		[
			[24, -7, -12],
			[24, 13, -12],
			[24, 13, 18],
			[24, -7, 18],
		],
		[
			[-6, -7, -12],
			[24, -7, -12],
			[24, -7, 18],
			[-6, -7, 18],
		],
		[
			[-6, 13, -12],
			[-6, 13, 18],
			[24, 13, 18],
			[24, 13, -12],
		],
		[
			[-6, -7, -12],
			[-6, 13, -12],
			[24, 13, -12],
			[24, -7, -12],
		],
		[
			[-6, -7, 18],
			[24, -7, 18],
			[24, 13, 18],
			[-6, 13, 18],
		],
	];
	expect(() => geom3.validate(scaled)).never.toThrow();
	expect(comparePolygonsAsPoints(obs, exp)).toBe(true);

	scaled = scaleX(3, geometry) as Geom3;
	obs = geom3.toPoints(scaled);
	expect(() => geom3.validate(scaled)).never.toThrow();
	expect(comparePolygonsAsPoints(obs, exp)).toBe(true);

	// scale Y
	scaled = scale([1, 0.5], geometry) as Geom3;
	obs = geom3.toPoints(scaled);
	exp = [
		[
			[-2, -3.5, -12],
			[-2, -3.5, 18],
			[-2, 6.5, 18],
			[-2, 6.5, -12],
		],
		[
			[8, -3.5, -12],
			[8, 6.5, -12],
			[8, 6.5, 18],
			[8, -3.5, 18],
		],
		[
			[-2, -3.5, -12],
			[8, -3.5, -12],
			[8, -3.5, 18],
			[-2, -3.5, 18],
		],
		[
			[-2, 6.5, -12],
			[-2, 6.5, 18],
			[8, 6.5, 18],
			[8, 6.5, -12],
		],
		[
			[-2, -3.5, -12],
			[-2, 6.5, -12],
			[8, 6.5, -12],
			[8, -3.5, -12],
		],
		[
			[-2, -3.5, 18],
			[8, -3.5, 18],
			[8, 6.5, 18],
			[-2, 6.5, 18],
		],
	];
	expect(comparePolygonsAsPoints(obs, exp)).toBe(true);

	scaled = scaleY(0.5, geometry) as Geom3;
	obs = geom3.toPoints(scaled);
	expect(() => geom3.validate(scaled)).never.toThrow();
	expect(comparePolygonsAsPoints(obs, exp)).toBe(true);

	// scale Z
	scaled = scale([1, 1, 5], geometry) as Geom3;
	obs = geom3.toPoints(scaled);
	exp = [
		[
			[-2, -7, -60],
			[-2, -7, 90],
			[-2, 13, 90],
			[-2, 13, -60],
		],
		[
			[8, -7, -60],
			[8, 13, -60],
			[8, 13, 90],
			[8, -7, 90],
		],
		[
			[-2, -7, -60],
			[8, -7, -60],
			[8, -7, 90],
			[-2, -7, 90],
		],
		[
			[-2, 13, -60],
			[-2, 13, 90],
			[8, 13, 90],
			[8, 13, -60],
		],
		[
			[-2, -7, -60],
			[-2, 13, -60],
			[8, 13, -60],
			[8, -7, -60],
		],
		[
			[-2, -7, 90],
			[8, -7, 90],
			[8, 13, 90],
			[-2, 13, 90],
		],
	];
	expect(() => geom3.validate(scaled)).never.toThrow();
	expect(comparePolygonsAsPoints(obs, exp)).toBe(true);

	scaled = scaleZ(5, geometry) as Geom3;
	obs = geom3.toPoints(scaled);
	expect(() => geom3.validate(scaled)).never.toThrow();
	expect(comparePolygonsAsPoints(obs, exp)).toBe(true);
});

test("scale: scaling of multiple objects produces expected changes", () => {
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

	const scaled = scale([3, 1, 1], junk as unknown as object, geometry1, geometry2) as object[];

	expect(scaled[0]).toBe(junk);

	const obs1 = path2.toPoints(scaled[1] as Path2);
	const exp1: Vec2[] = [
		[-15, 5],
		[15, 5],
		[-15, -5],
		[30, -5],
	];
	expect(() => path2.validate(scaled[1] as Path2)).never.toThrow();
	expect(comparePoints(obs1, exp1)).toBe(true);

	const obs2 = geom2.toPoints(scaled[2] as Geom2);
	const exp2: Vec2[] = [
		[-15, -5],
		[0, 5],
		[30, -5],
	];
	expect(() => geom2.validate(scaled[2] as Geom2)).never.toThrow();
	expect(comparePoints(obs2, exp2)).toBe(true);
});
