import { expect, test } from "@rbxts/jest-globals";

import { geom2, geom3, path2 } from "../geometries";
import { ellipsoid, line, rectangle } from "../primitives";
import { measureBoundingSphere } from "./index";

test("measureBoundingSphere (single objects)", () => {
	const aline = line([
		[10, 10],
		[15, 15],
	]);
	const arect = rectangle();
	const aellipsoid = ellipsoid({ radius: [5, 10, 15], center: [5, 5, 5] });

	const apath2 = path2.create();
	const ageom2 = geom2.create();
	const ageom3 = geom3.create();

	const n = undefined;
	const o = {};
	const x = "hi";

	const lbounds = measureBoundingSphere(aline);
	const rbounds = measureBoundingSphere(arect);
	const cbounds = measureBoundingSphere(aellipsoid);

	const p2bounds = measureBoundingSphere(apath2);
	const g2bounds = measureBoundingSphere(ageom2);
	const g3bounds = measureBoundingSphere(ageom3);

	const nbounds = measureBoundingSphere(n!);
	const obounds = measureBoundingSphere(o);
	const xbounds = measureBoundingSphere(x as unknown as object);

	expect(lbounds).toEqual([[12.5, 12.5, 0], 3.5355339059327378]);
	expect(rbounds).toEqual([[0, 0, 0], 1.4142135623730951]);
	expect(cbounds).toEqual([[5.000000000000018, 4.999999999999982, 5.000000000000001], 15]); //4.999999999999983

	expect(p2bounds).toEqual([[0, 0, 0], 0]);
	expect(g2bounds).toEqual([[0, 0, 0], 0]);
	expect(g3bounds).toEqual([[0, 0, 0], 0]);

	expect(nbounds).toEqual([[0, 0, 0], 0]);
	expect(obounds).toEqual([[0, 0, 0], 0]);
	expect(xbounds).toEqual([[0, 0, 0], 0]);
});

test("measureBoundingSphere (multiple objects)", () => {
	const aline = line([
		[10, 10],
		[15, 15],
	]);
	const arect = rectangle();
	const aellipsoid = ellipsoid({ radius: [5, 10, 15], center: [5, 5, 5] });
	const o = {};

	let allbounds = measureBoundingSphere(aline, arect, aellipsoid, o);
	expect(allbounds).toEqual([
		[[12.5, 12.5, 0], 3.5355339059327378],
		[[0, 0, 0], 1.4142135623730951],
		[[5.000000000000018, 4.999999999999982, 5.000000000000001], 15],
		[[0, 0, 0], 0],
	]);

	// test caching
	allbounds = measureBoundingSphere(aline, arect, aellipsoid, o);
	expect(allbounds).toEqual([
		[[12.5, 12.5, 0], 3.5355339059327378],
		[[0, 0, 0], 1.4142135623730951],
		[[5.000000000000018, 4.999999999999982, 5.000000000000001], 15],
		[[0, 0, 0], 0],
	]);
});
