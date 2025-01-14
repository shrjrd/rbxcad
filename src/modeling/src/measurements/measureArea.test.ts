import { expect, test } from "@rbxts/jest-globals";

import { geom2, geom3, path2 } from "../geometries";
import { cuboid, line, rectangle } from "../primitives";
import { measureArea } from "./index";

test("measureArea: single objects", () => {
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

	const larea = measureArea(aline);
	const rarea = measureArea(arect);
	const carea = measureArea(acube);

	const p2area = measureArea(apath2);
	const g2area = measureArea(ageom2);
	const g3area = measureArea(ageom3);

	const narea = measureArea(n!);
	const oarea = measureArea(o);
	const xarea = measureArea(x as unknown as object);

	expect(larea).toBe(0);
	expect(rarea).toBe(4); // 2x2
	expect(carea).toBe(24); // 2x2x6

	expect(p2area).toBe(0);
	expect(g2area).toBe(0);
	expect(g3area).toBe(0);

	expect(narea).toBe(0);
	expect(oarea).toBe(0);
	expect(xarea).toBe(0);
});

test("measureArea (multiple objects)", () => {
	const aline = line([
		[10, 10],
		[15, 15],
	]);
	const arect = rectangle({ size: [10, 20] });
	const acube = cuboid({ size: [10, 20, 40] });
	const o = {};

	let allarea = measureArea(aline, arect, acube, o);
	expect(allarea).toEqual([0, 200, 2800, 0]);

	allarea = measureArea(aline, arect, acube, o);
	expect(allarea).toEqual([0, 200, 2800, 0]);
});
