import { expect, test } from "@rbxts/jest-globals";

import { geom2, geom3, path2 } from "../geometries";
import { cuboid, line, rectangle } from "../primitives";
import { measureDimensions } from "./index";

test("measureDimensions (single objects)", () => {
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

	const lbounds = measureDimensions(aline);
	const rbounds = measureDimensions(arect);
	const cbounds = measureDimensions(acube);

	const p2bounds = measureDimensions(apath2);
	const g2bounds = measureDimensions(ageom2);
	const g3bounds = measureDimensions(ageom3);

	const nbounds = measureDimensions(n!);
	const obounds = measureDimensions(o);
	const xbounds = measureDimensions(x as unknown as object);

	expect(lbounds).toEqual([5, 5, 0]);
	expect(rbounds).toEqual([2, 2, 0]);
	expect(cbounds).toEqual([2, 2, 2]);

	expect(p2bounds).toEqual([0, 0, 0]);
	expect(g2bounds).toEqual([0, 0, 0]);
	expect(g3bounds).toEqual([0, 0, 0]);

	expect(nbounds).toEqual([0, 0, 0]);
	expect(obounds).toEqual([0, 0, 0]);
	expect(xbounds).toEqual([0, 0, 0]);
});

test("measureDimensions (multiple objects)", () => {
	const aline = line([
		[10, 10],
		[15, 15],
	]);
	const arect = rectangle({ size: [10, 20] });
	const acube = cuboid();
	const o = {};

	let allbounds = measureDimensions(aline, arect, acube, o);
	expect(allbounds).toEqual([
		[5, 5, 0],
		[10, 20, 0],
		[2, 2, 2],
		[0, 0, 0],
	]);

	allbounds = measureDimensions(aline, arect, acube, o);
	expect(allbounds).toEqual([
		[5, 5, 0],
		[10, 20, 0],
		[2, 2, 2],
		[0, 0, 0],
	]);
});
