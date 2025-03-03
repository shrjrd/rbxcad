import { expect, test } from "@rbxts/jest-globals";

import { geom2, geom3, path2, slice } from "../geometries/index";
import { mirror, scale } from "../operations/transforms/index";
import { cuboid, line, rectangle } from "../primitives/index";
import { measureBoundingBox } from "./index";
import { Geometry } from "../geometries/types";

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
	const aslice = slice.create();

	const n = undefined;
	const o = {};
	const x = "hi";

	const lbounds = measureBoundingBox(aline);
	const rbounds = measureBoundingBox(arect);
	const cbounds = measureBoundingBox(acube);

	const p2bounds = measureBoundingBox(apath2);
	const g2bounds = measureBoundingBox(ageom2);
	const g3bounds = measureBoundingBox(ageom3);
	const slbounds = measureBoundingBox(aslice);

	const nbounds = measureBoundingBox(n!);
	const obounds = measureBoundingBox(o as Geometry);
	const xbounds = measureBoundingBox(x as unknown as Geometry);

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
	expect(slbounds).toEqual([
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
	const o = {} as Geometry;

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

test("measureBoundingBox empty", () => {
	const empty = [
		[0, 0, 0],
		[0, 0, 0],
	];
	expect(measureBoundingBox(geom2.create())).toEqual(empty);
	expect(measureBoundingBox(geom3.create())).toEqual(empty);
	expect(measureBoundingBox(path2.create())).toEqual(empty);
	expect(measureBoundingBox(slice.create())).toEqual(empty);
});

test("measureBoundingBox scaled", () => {
	const arect = scale([2, 2, 2], rectangle());
	const rbounds = measureBoundingBox(arect);
	expect(rbounds).toEqual([
		[-2, -2, 0],
		[2, 2, 0],
	]);

	const acube = scale([2, 2, 2], cuboid());
	const cbounds = measureBoundingBox(acube);
	expect(cbounds).toEqual([
		[-2, -2, -2],
		[2, 2, 2],
	]);
});
