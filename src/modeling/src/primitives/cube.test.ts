import { expect, test } from "@rbxts/jest-globals";

import { comparePolygonsAsPoints } from "../../test/helpers/index";
import { geom3 } from "../geometries/index";
import { measureArea, measureVolume } from "../measurements/index";
import { cube } from "./index";

test("cube (defaults)", () => {
	const obs = cube();
	const pts = geom3.toPoints(obs);
	expect(() => geom3.validate(obs)).never.toThrow();
	expect(measureArea(obs)).toBe(24);
	expect(measureVolume(obs)).toBe(7.999999999999999);
	expect(pts.size()).toBe(6);
});

test("cube (options)", () => {
	// test center
	let obs = cube({ size: 7, center: [6.5, 6.5, 6.5] });
	let pts = geom3.toPoints(obs);
	let exp = [
		[
			[3, 3, 3],
			[3, 3, 10],
			[3, 10, 10],
			[3, 10, 3],
		],
		[
			[10, 3, 3],
			[10, 10, 3],
			[10, 10, 10],
			[10, 3, 10],
		],
		[
			[3, 3, 3],
			[10, 3, 3],
			[10, 3, 10],
			[3, 3, 10],
		],
		[
			[3, 10, 3],
			[3, 10, 10],
			[10, 10, 10],
			[10, 10, 3],
		],
		[
			[3, 3, 3],
			[3, 10, 3],
			[10, 10, 3],
			[10, 3, 3],
		],
		[
			[3, 3, 10],
			[10, 3, 10],
			[10, 10, 10],
			[3, 10, 10],
		],
	];

	expect(() => geom3.validate(obs)).never.toThrow();
	expect(measureArea(obs)).toBe(294);
	expect(measureVolume(obs)).toBe(343);
	expect(pts.size()).toBe(6);
	expect(comparePolygonsAsPoints(pts, exp)).toBe(true);

	// test size
	obs = cube({ size: 7 });
	pts = geom3.toPoints(obs);
	exp = [
		[
			[-3.5, -3.5, -3.5],
			[-3.5, -3.5, 3.5],
			[-3.5, 3.5, 3.5],
			[-3.5, 3.5, -3.5],
		],
		[
			[3.5, -3.5, -3.5],
			[3.5, 3.5, -3.5],
			[3.5, 3.5, 3.5],
			[3.5, -3.5, 3.5],
		],
		[
			[-3.5, -3.5, -3.5],
			[3.5, -3.5, -3.5],
			[3.5, -3.5, 3.5],
			[-3.5, -3.5, 3.5],
		],
		[
			[-3.5, 3.5, -3.5],
			[-3.5, 3.5, 3.5],
			[3.5, 3.5, 3.5],
			[3.5, 3.5, -3.5],
		],
		[
			[-3.5, -3.5, -3.5],
			[-3.5, 3.5, -3.5],
			[3.5, 3.5, -3.5],
			[3.5, -3.5, -3.5],
		],
		[
			[-3.5, -3.5, 3.5],
			[3.5, -3.5, 3.5],
			[3.5, 3.5, 3.5],
			[-3.5, 3.5, 3.5],
		],
	];

	expect(() => geom3.validate(obs)).never.toThrow();
	expect(measureArea(obs)).toBe(294);
	expect(measureVolume(obs)).toBe(343);
	expect(pts.size()).toBe(6);
	expect(comparePolygonsAsPoints(pts, exp)).toBe(true);
});

test("cube (zero size)", () => {
	const obs = cube({ size: 0 });
	const pts = geom3.toPoints(obs);
	expect(() => geom3.validate(obs)).never.toThrow();
	expect(measureArea(obs)).toBe(0);
	expect(measureVolume(obs)).toBe(0);
	expect(pts.size()).toBe(0);
});
