import { expect, test } from "@rbxts/jest-globals";

import { geom2, geom3, path2 } from "../geometries";
import { mirror } from "../operations/transforms";
import { cuboid, line, rectangle } from "../primitives";
import { measureBoundingBox } from "./index";

test("measureBoundingBox (single objects)", () => {
	const aline = line([
		[10, 10],
		[15, 15],
	]);
	const arect = rectangle();
	const acube = cuboid();

	const apath2 = path2.create();
	const ageom2 = geom2.create();
	const ageom3 = geom3.create();

	const n = undefined;
	const o = {};
	const x = "hi";

	const lbounds = measureBoundingBox(aline);
	const rbounds = measureBoundingBox(arect);
	const cbounds = measureBoundingBox(acube);

	const p2bounds = measureBoundingBox(apath2);
	const g2bounds = measureBoundingBox(ageom2);
	const g3bounds = measureBoundingBox(ageom3);

	const nbounds = measureBoundingBox(n!);
	const obounds = measureBoundingBox(o);
	const xbounds = measureBoundingBox(x as unknown as object);

	expect(lbounds).toEqual([
		[10, 10, 0],
		[15, 15, 0],
	]);
	expect(rbounds).toEqual([
		[-1, -1, 0],
		[1, 1, 0],
	]);
	expect(cbounds).toEqual([
		[-1, -1, -1],
		[1, 1, 1],
	]);

	expect(p2bounds).toEqual([
		[0, 0, 0],
		[0, 0, 0],
	]);
	expect(g2bounds).toEqual([
		[0, 0, 0],
		[0, 0, 0],
	]);
	expect(g3bounds).toEqual([
		[0, 0, 0],
		[0, 0, 0],
	]);

	expect(nbounds).toEqual([
		[0, 0, 0],
		[0, 0, 0],
	]);
	expect(obounds).toEqual([
		[0, 0, 0],
		[0, 0, 0],
	]);
	expect(xbounds).toEqual([
		[0, 0, 0],
		[0, 0, 0],
	]);
});

test("measureBoundingBox (multiple objects)", () => {
	const aline = line([
		[10, 10],
		[15, 15],
	]);
	const arect = rectangle({ size: [10, 20] });
	const acube = cuboid();
	const o = {};

	let allbounds = measureBoundingBox(aline, arect, acube, o);
	expect(allbounds).toEqual([
		[
			[10, 10, 0],
			[15, 15, 0],
		],
		[
			[-5, -10, 0],
			[5, 10, 0],
		],
		[
			[-1, -1, -1],
			[1, 1, 1],
		],
		[
			[0, 0, 0],
			[0, 0, 0],
		],
	]);

	allbounds = measureBoundingBox(aline, arect, acube, o);
	expect(allbounds).toEqual([
		[
			[10, 10, 0],
			[15, 15, 0],
		],
		[
			[-5, -10, 0],
			[5, 10, 0],
		],
		[
			[-1, -1, -1],
			[1, 1, 1],
		],
		[
			[0, 0, 0],
			[0, 0, 0],
		],
	]);
});

test("measureBoundingBox invert", () => {
	const acube = mirror({}, cuboid());
	const cbounds = measureBoundingBox(acube);
	expect(cbounds).toEqual([
		[-1, -1, -1],
		[1, 1, 1],
	]);
});
