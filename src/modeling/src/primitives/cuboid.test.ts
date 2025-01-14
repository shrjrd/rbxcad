import { expect, test } from "@rbxts/jest-globals";

import comparePolygonsAsPoints from "../../test/helpers/comparePolygonsAsPoints";
import geom3 from "../geometries/geom3";
import { cuboid } from "./cuboid";

test("cuboid (defaults)", () => {
	const obs = cuboid();
	const pts = geom3.toPoints(obs);
	const exp: Vec3[][] = [
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
	expect(pts.size()).toBe(6);
	expect(comparePolygonsAsPoints(pts, exp)).toBe(true);
});

test("cuboid (options)", () => {
	// test center
	let obs = cuboid({ size: [6, 6, 6], center: [3, 5, 7] });
	let pts = geom3.toPoints(obs);
	let exp: Vec3[][] = [
		[
			[0, 2, 4],
			[0, 2, 10],
			[0, 8, 10],
			[0, 8, 4],
		],
		[
			[6, 2, 4],
			[6, 8, 4],
			[6, 8, 10],
			[6, 2, 10],
		],
		[
			[0, 2, 4],
			[6, 2, 4],
			[6, 2, 10],
			[0, 2, 10],
		],
		[
			[0, 8, 4],
			[0, 8, 10],
			[6, 8, 10],
			[6, 8, 4],
		],
		[
			[0, 2, 4],
			[0, 8, 4],
			[6, 8, 4],
			[6, 2, 4],
		],
		[
			[0, 2, 10],
			[6, 2, 10],
			[6, 8, 10],
			[0, 8, 10],
		],
	];

	expect(() => geom3.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(6);
	expect(comparePolygonsAsPoints(pts, exp)).toBe(true);

	// test size
	obs = cuboid({ size: [4.5, 1.5, 7] });
	pts = geom3.toPoints(obs);
	exp = [
		[
			[-2.25, -0.75, -3.5],
			[-2.25, -0.75, 3.5],
			[-2.25, 0.75, 3.5],
			[-2.25, 0.75, -3.5],
		],
		[
			[2.25, -0.75, -3.5],
			[2.25, 0.75, -3.5],
			[2.25, 0.75, 3.5],
			[2.25, -0.75, 3.5],
		],
		[
			[-2.25, -0.75, -3.5],
			[2.25, -0.75, -3.5],
			[2.25, -0.75, 3.5],
			[-2.25, -0.75, 3.5],
		],
		[
			[-2.25, 0.75, -3.5],
			[-2.25, 0.75, 3.5],
			[2.25, 0.75, 3.5],
			[2.25, 0.75, -3.5],
		],
		[
			[-2.25, -0.75, -3.5],
			[-2.25, 0.75, -3.5],
			[2.25, 0.75, -3.5],
			[2.25, -0.75, -3.5],
		],
		[
			[-2.25, -0.75, 3.5],
			[2.25, -0.75, 3.5],
			[2.25, 0.75, 3.5],
			[-2.25, 0.75, 3.5],
		],
	];

	expect(() => geom3.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(6);
	expect(comparePolygonsAsPoints(pts, exp)).toBe(true);
});

test("cuboid (zero size)", () => {
	const obs = cuboid({ size: [1, 1, 0] });
	const pts = geom3.toPoints(obs);
	expect(() => geom3.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(0);
});
