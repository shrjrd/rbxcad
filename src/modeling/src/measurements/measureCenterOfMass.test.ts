import { expect, test } from "@rbxts/jest-globals";

import { geom2, geom3, path2 } from "../geometries";
import { cuboid, ellipsoid, line, rectangle } from "../primitives";
import { measureCenterOfMass } from "./index";

test("measureCenterOfMass (single objects)", () => {
	const aline = line([
		[10, 10],
		[15, 15],
	]);
	const arect = rectangle({ center: [5, 5] });
	const acube = cuboid({ size: [3, 3, 3], center: [-15, -5, -10] });

	const apath2 = path2.create();
	const ageom2 = geom2.create();
	const ageom3 = geom3.create();

	const n = undefined;
	const o = {};
	const x = "hi";

	const lcenter = measureCenterOfMass(aline);
	const rcenter = measureCenterOfMass(arect);
	const ccenter = measureCenterOfMass(acube);

	const p2center = measureCenterOfMass(apath2);
	const g2center = measureCenterOfMass(ageom2);
	const g3center = measureCenterOfMass(ageom3);

	const ncenter = measureCenterOfMass(n!);
	const ocenter = measureCenterOfMass(o);
	const xcenter = measureCenterOfMass(x as unknown as object);

	expect(lcenter).toEqual([0, 0, 0]);
	expect(rcenter).toEqual([5, 5, 0]);
	expect(ccenter).toEqual([-15, -5, -10]);

	expect(p2center).toEqual([0, 0, 0]);
	expect(g2center).toEqual([0, 0, 0]);
	expect(g3center).toEqual([0, 0, 0]);

	expect(ncenter).toEqual([0, 0, 0]);
	expect(ocenter).toEqual([0, 0, 0]);
	expect(xcenter).toEqual([0, 0, 0]);
});

test("measureCenterOfMass (multiple objects)", () => {
	const aline = line([
		[10, 10],
		[15, 15],
	]);
	const arect = rectangle({ size: [10, 20], center: [10, -10] });
	const asphere = ellipsoid({ radius: [5, 10, 15], center: [5, -5, 50] });
	const o = {};

	let allcenters = measureCenterOfMass(aline, arect, asphere, o);
	// DEVIATION: different floating point precision
	expect(allcenters).toEqual([
		[0, 0, 0],
		[10, -10, 0],
		[4.999999999999989, -5.000000000000004, 49.9999999999999], //[4.999999999999991, -5.000000000000006, 49.999999999999915],
		[0, 0, 0],
	]);

	allcenters = measureCenterOfMass(aline, arect, asphere, o);
	expect(allcenters).toEqual([
		[0, 0, 0],
		[10, -10, 0],
		[4.999999999999989, -5.000000000000004, 49.9999999999999], //[4.999999999999991, -5.000000000000006, 49.999999999999915],
		[0, 0, 0],
	]);
});
