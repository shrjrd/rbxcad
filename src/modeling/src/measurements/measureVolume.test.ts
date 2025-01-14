import { expect, test } from "@rbxts/jest-globals";

import { geom2, geom3, path2 } from "../geometries";
import { cuboid, line, rectangle } from "../primitives";
import { measureVolume } from "./index";

test("measureVolume: single objects", () => {
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

	const lvolume = measureVolume(aline);
	const rvolume = measureVolume(arect);
	const cvolume = measureVolume(acube);

	const p2volume = measureVolume(apath2);
	const g2volume = measureVolume(ageom2);
	const g3volume = measureVolume(ageom3);

	const nvolume = measureVolume(n!);
	const ovolume = measureVolume(o);
	const xvolume = measureVolume(x as unknown as object);

	expect(lvolume).toBe(0);
	expect(rvolume).toBe(0);
	expect(cvolume).toBe(7.999999999999999);

	expect(p2volume).toBe(0);
	expect(g2volume).toBe(0);
	expect(g3volume).toBe(0);

	expect(nvolume).toBe(0);
	expect(ovolume).toBe(0);
	expect(xvolume).toBe(0);
});

test("measureVolume (multiple objects)", () => {
	const aline = line([
		[10, 10],
		[15, 15],
	]);
	const arect = rectangle({ size: [5, 10] });
	const acube = cuboid({ size: [10, 20, 40] });
	const o = {};

	let allvolume = measureVolume(aline, arect, acube, o);
	expect(allvolume).toEqual([0, 0, 7999.999999999999, 0]);

	allvolume = measureVolume(aline, arect, acube, o);
	expect(allvolume).toEqual([0, 0, 7999.999999999999, 0]);
});
