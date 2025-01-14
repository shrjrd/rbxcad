import { expect, test } from "@rbxts/jest-globals";

import { comparePoints, comparePolygonsAsPoints } from "../../../test/helpers";
import { geom2, geom3, path2 } from "../../geometries";
import mat4 from "../../maths/mat4";
import { transform } from "./index";

test("transform: transforming of a path2 produces expected changes to points", () => {
	const matrix = mat4.fromTranslation(mat4.create(), [2, 2, 0]);
	let geometry = path2.fromPoints({}, [
		[0, 0],
		[1, 0],
	]);

	geometry = transform(matrix, geometry) as Path2;
	const obs = path2.toPoints(geometry);
	const exp: Vec2[] = [
		[2, 2],
		[3, 2],
	];
	expect(() => path2.validate(geometry)).never.toThrow();
	expect(comparePoints(obs, exp)).toBe(true);
});

test("transform: transforming of a geom2 produces expected changes to sides", () => {
	const matrix = mat4.fromScaling(mat4.create(), [5, 5, 5]);
	let geometry = geom2.fromPoints([
		[0, 0],
		[1, 0],
		[0, 1],
	]);

	geometry = transform(matrix, geometry) as Geom2;
	const obs = geom2.toPoints(geometry);
	const exp: Vec2[] = [
		[0, 0],
		[5, 0],
		[0, 5],
	];
	expect(() => geom2.validate(geometry)).never.toThrow();
	expect(comparePoints(obs, exp)).toBe(true);
});

test("transform: transforming of a geom3 produces expected changes to polygons", () => {
	const matrix = mat4.fromTranslation(mat4.create(), [-3, -3, -3]);
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
	let geometry = geom3.fromPoints(points);
	geometry = transform(matrix, geometry) as Geom3;
	const obs = geom3.toPoints(geometry);
	const exp: Vec3[][] = [
		[
			[-5, -10, -15],
			[-5, -10, 15],
			[-5, 10, 15],
			[-5, 10, -15],
		],
		[
			[5, -10, -15],
			[5, 10, -15],
			[5, 10, 15],
			[5, -10, 15],
		],
		[
			[-5, -10, -15],
			[5, -10, -15],
			[5, -10, 15],
			[-5, -10, 15],
		],
		[
			[-5, 10, -15],
			[-5, 10, 15],
			[5, 10, 15],
			[5, 10, -15],
		],
		[
			[-5, -10, -15],
			[-5, 10, -15],
			[5, 10, -15],
			[5, -10, -15],
		],
		[
			[-5, -10, 15],
			[5, -10, 15],
			[5, 10, 15],
			[-5, 10, 15],
		],
	];
	expect(() => geom3.validate(geometry)).never.toThrow();
	expect(comparePolygonsAsPoints(obs, exp)).toBe(true);
});

test("transform: transforming of multiple objects produces expected changes", () => {
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

	const matrix = mat4.fromTranslation(mat4.create(), [2, 2, 0]);
	const transformed = transform(matrix, junk as unknown as object, geometry1, geometry2) as object[];
	expect(transformed[0]).toBe(junk);

	let obs = path2.toPoints(transformed[1] as Path2);
	let exp: Vec2[] = [
		[-3, 7],
		[7, 7],
		[-3, -3],
		[12, -3],
	];
	expect(() => path2.validate(transformed[1] as Path2)).never.toThrow();
	expect(comparePoints(obs, exp)).toBe(true);

	obs = geom2.toPoints(transformed[2] as Geom2);
	exp = [
		[-3, -3],
		[2, 7],
		[12, -3],
	];
	expect(() => geom2.validate(transformed[2] as Geom2)).never.toThrow();
	expect(comparePoints(obs, exp)).toBe(true);
});
