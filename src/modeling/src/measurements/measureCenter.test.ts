import { expect, test } from "@rbxts/jest-globals";

import { geom2, geom3, path2 } from "../geometries";
import { cuboid, line, rectangle } from "../primitives";
import { measureCenter } from "./index";

test("measureCenter (single objects)", () => {
	const aline = line([
		[10, 10],
		[15, 15],
	]);
	const arect = rectangle({ center: [5, 5] });
	const acube = cuboid({ center: [-5, -5, -5] });

	const apath2 = path2.create();
	const ageom2 = geom2.create();
	const ageom3 = geom3.create();

	const n = undefined;
	const o = {};
	const x = "hi";

	const lcenter = measureCenter(aline);
	const rcenter = measureCenter(arect);
	const ccenter = measureCenter(acube);

	const p2center = measureCenter(apath2);
	const g2center = measureCenter(ageom2);
	const g3center = measureCenter(ageom3);

	const ncenter = measureCenter(n!);
	const ocenter = measureCenter(o);
	const xcenter = measureCenter(x as unknown as object);

	expect(lcenter).toEqual([12.5, 12.5, 0]);
	expect(rcenter).toEqual([5, 5, 0]);
	expect(ccenter).toEqual([-5, -5, -5]);

	expect(p2center).toEqual([0, 0, 0]);
	expect(g2center).toEqual([0, 0, 0]);
	expect(g3center).toEqual([0, 0, 0]);

	expect(ncenter).toEqual([0, 0, 0]);
	expect(ocenter).toEqual([0, 0, 0]);
	expect(xcenter).toEqual([0, 0, 0]);
});

test("measureCenter (multiple objects)", () => {
	const aline = line([
		[10, 10],
		[15, 15],
	]);
	const arect = rectangle({ size: [10, 20] });
	const acube = cuboid({ center: [-5, -5, -5] });
	const o = {};

	let allcenters = measureCenter(aline, arect, acube, o);
	expect(allcenters).toEqual([
		[12.5, 12.5, 0],
		[0, 0, 0],
		[-5, -5, -5],
		[0, 0, 0],
	]);

	allcenters = measureCenter(aline, arect, acube, o);
	expect(allcenters).toEqual([
		[12.5, 12.5, 0],
		[0, 0, 0],
		[-5, -5, -5],
		[0, 0, 0],
	]);
});
