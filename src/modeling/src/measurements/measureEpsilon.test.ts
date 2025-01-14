import { expect, test } from "@rbxts/jest-globals";

import { geom2, geom3, path2 } from "../geometries";
import { cuboid, line, rectangle } from "../primitives";
import { measureEpsilon } from "./index";

test("measureEpsilon (single objects)", () => {
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

	const lepsilon = measureEpsilon(aline);
	const repsilon = measureEpsilon(arect);
	const cepsilon = measureEpsilon(acube);

	const p2epsilon = measureEpsilon(apath2);
	const g2epsilon = measureEpsilon(ageom2);
	const g3epsilon = measureEpsilon(ageom3);

	const nepsilon = measureEpsilon(n!);
	const oepsilon = measureEpsilon(o);
	const xepsilon = measureEpsilon(x as unknown as object);

	expect(lepsilon).toBe(0.00005);
	expect(repsilon).toBe(0.00002);
	expect(cepsilon).toBe(0.00002);

	expect(p2epsilon).toBe(0);
	expect(g2epsilon).toBe(0);
	expect(g3epsilon).toBe(0);

	expect(nepsilon).toBe(0);
	expect(oepsilon).toBe(0);
	expect(xepsilon).toBe(0);
});

test("measureEpsilon (multiple objects)", () => {
	const aline = line([
		[10, 10],
		[15, 15],
	]);
	const arect = rectangle({ size: [10, 20] });
	const acube = cuboid();
	const o = {};

	let allepsilon = measureEpsilon(aline, arect, acube, o);
	expect(allepsilon).toEqual([0.00005, 0.00015000000000000001, 0.00002, 0.0]);

	allepsilon = measureEpsilon(aline, arect, acube, o);
	expect(allepsilon).toEqual([0.00005, 0.00015000000000000001, 0.00002, 0.0]);
});
