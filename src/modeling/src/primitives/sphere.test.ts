import { expect, test } from "@rbxts/jest-globals";

import comparePolygonsAsPoints from "../../test/helpers/comparePolygonsAsPoints";
import geom3 from "../geometries/geom3";
import { sphere } from "./index";

test("sphere (defaults)", () => {
	const obs = sphere();
	const pts = geom3.toPoints(obs);

	expect(() => geom3.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(512);
});

test("sphere (options)", () => {
	// test radius
	let obs = sphere({ radius: 5, segments: 12 });
	let pts = geom3.toPoints(obs);
	let exp = [];
	expect(() => geom3.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(72);
	// t.true(comparePolygonsAsPoints(pts, exp))

	// test segments
	obs = sphere({ segments: 8 });
	pts = geom3.toPoints(obs);
	exp = [
		[
			[1, 0, 0],
			[0.7071067811865476, -0.7071067811865475, 0],
			[0.5000000000000001, -0.5, -0.7071067811865475],
			[0.7071067811865476, 0, -0.7071067811865475],
		],
		[
			[0.7071067811865476, 0, 0.7071067811865475],
			[0.5000000000000001, -0.5, 0.7071067811865475],
			[0.7071067811865476, -0.7071067811865475, 0],
			[1, 0, 0],
		],
		[
			[0.7071067811865476, 0, -0.7071067811865475],
			[0.5000000000000001, -0.5, -0.7071067811865475],
			[0, 0, -1],
		],
		[
			[0, 0, 1],
			[0.5000000000000001, -0.5, 0.7071067811865475],
			[0.7071067811865476, 0, 0.7071067811865475],
		],
		[
			[0.7071067811865476, -0.7071067811865475, 0],
			[0, -1, 0],
			[0, -0.7071067811865476, -0.7071067811865475],
			[0.5000000000000001, -0.5, -0.7071067811865475],
		],
		[
			[0.5000000000000001, -0.5, 0.7071067811865475],
			[0, -0.7071067811865476, 0.7071067811865475],
			[0, -1, 0],
			[0.7071067811865476, -0.7071067811865475, 0],
		],
		[
			[0.5000000000000001, -0.5, -0.7071067811865475],
			[0, -0.7071067811865476, -0.7071067811865475],
			[0, 0, -1],
		],
		[
			[0, 0, 1],
			[0, -0.7071067811865476, 0.7071067811865475],
			[0.5000000000000001, -0.5, 0.7071067811865475],
		],
		[
			[0, -1, 0],
			[-0.7071067811865475, -0.7071067811865476, 0],
			[-0.5, -0.5000000000000001, -0.7071067811865475],
			[0, -0.7071067811865476, -0.7071067811865475],
		],
		[
			[0, -0.7071067811865476, 0.7071067811865475],
			[-0.5, -0.5000000000000001, 0.7071067811865475],
			[-0.7071067811865475, -0.7071067811865476, 0],
			[0, -1, 0],
		],
		[
			[0, -0.7071067811865476, -0.7071067811865475],
			[-0.5, -0.5000000000000001, -0.7071067811865475],
			[0, 0, -1],
		],
		[
			[0, 0, 1],
			[-0.5, -0.5000000000000001, 0.7071067811865475],
			[0, -0.7071067811865476, 0.7071067811865475],
		],
		[
			[-0.7071067811865475, -0.7071067811865476, 0],
			[-1, 0, 0],
			[-0.7071067811865476, 0, -0.7071067811865475],
			[-0.5, -0.5000000000000001, -0.7071067811865475],
		],
		[
			[-0.5, -0.5000000000000001, 0.7071067811865475],
			[-0.7071067811865476, 0, 0.7071067811865475],
			[-1, 0, 0],
			[-0.7071067811865475, -0.7071067811865476, 0],
		],
		[
			[-0.5, -0.5000000000000001, -0.7071067811865475],
			[-0.7071067811865476, 0, -0.7071067811865475],
			[0, 0, -1],
		],
		[
			[0, 0, 1],
			[-0.7071067811865476, 0, 0.7071067811865475],
			[-0.5, -0.5000000000000001, 0.7071067811865475],
		],
		[
			[-1, 0, 0],
			[-0.7071067811865477, 0.7071067811865475, 0],
			[-0.5000000000000001, 0.5, -0.7071067811865475],
			[-0.7071067811865476, 0, -0.7071067811865475],
		],
		[
			[-0.7071067811865476, 0, 0.7071067811865475],
			[-0.5000000000000001, 0.5, 0.7071067811865475],
			[-0.7071067811865477, 0.7071067811865475, 0],
			[-1, 0, 0],
		],
		[
			[-0.7071067811865476, 0, -0.7071067811865475],
			[-0.5000000000000001, 0.5, -0.7071067811865475],
			[0, 0, -1],
		],
		[
			[0, 0, 1],
			[-0.5000000000000001, 0.5, 0.7071067811865475],
			[-0.7071067811865476, 0, 0.7071067811865475],
		],
		[
			[-0.7071067811865477, 0.7071067811865475, 0],
			[0, 1, 0],
			[0, 0.7071067811865476, -0.7071067811865475],
			[-0.5000000000000001, 0.5, -0.7071067811865475],
		],
		[
			[-0.5000000000000001, 0.5, 0.7071067811865475],
			[0, 0.7071067811865476, 0.7071067811865475],
			[0, 1, 0],
			[-0.7071067811865477, 0.7071067811865475, 0],
		],
		[
			[-0.5000000000000001, 0.5, -0.7071067811865475],
			[0, 0.7071067811865476, -0.7071067811865475],
			[0, 0, -1],
		],
		[
			[0, 0, 1],
			[0, 0.7071067811865476, 0.7071067811865475],
			[-0.5000000000000001, 0.5, 0.7071067811865475],
		],
		[
			[0, 1, 0],
			[0.7071067811865474, 0.7071067811865477, 0],
			[0.4999999999999999, 0.5000000000000001, -0.7071067811865475],
			[0, 0.7071067811865476, -0.7071067811865475],
		],
		[
			[0, 0.7071067811865476, 0.7071067811865475],
			[0.4999999999999999, 0.5000000000000001, 0.7071067811865475],
			[0.7071067811865474, 0.7071067811865477, 0],
			[0, 1, 0],
		],
		[
			[0, 0.7071067811865476, -0.7071067811865475],
			[0.4999999999999999, 0.5000000000000001, -0.7071067811865475],
			[0, 0, -1],
		],
		[
			[0, 0, 1],
			[0.4999999999999999, 0.5000000000000001, 0.7071067811865475],
			[0, 0.7071067811865476, 0.7071067811865475],
		],
		[
			[0.7071067811865474, 0.7071067811865477, 0],
			[1, 0, 0],
			[0.7071067811865476, 0, -0.7071067811865475],
			[0.4999999999999999, 0.5000000000000001, -0.7071067811865475],
		],
		[
			[0.4999999999999999, 0.5000000000000001, 0.7071067811865475],
			[0.7071067811865476, 0, 0.7071067811865475],
			[1, 0, 0],
			[0.7071067811865474, 0.7071067811865477, 0],
		],
		[
			[0.4999999999999999, 0.5000000000000001, -0.7071067811865475],
			[0.7071067811865476, 0, -0.7071067811865475],
			[0, 0, -1],
		],
		[
			[0, 0, 1],
			[0.7071067811865476, 0, 0.7071067811865475],
			[0.4999999999999999, 0.5000000000000001, 0.7071067811865475],
		],
	];
	expect(() => geom3.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(32);
	expect(comparePolygonsAsPoints(pts, exp as Vec3[][])).toBe(true);

	// test center
	obs = sphere({ center: [-3, 5, 7], segments: 8 });
	pts = geom3.toPoints(obs);
	exp = [
		[
			[-2, 5, 7],
			[-2.2928932188134525, 4.292893218813452, 7],
			[-2.5, 4.5, 6.292893218813452],
			[-2.2928932188134525, 5, 6.292893218813452],
		],
		[
			[-2.2928932188134525, 5, 7.707106781186548],
			[-2.5, 4.5, 7.707106781186548],
			[-2.2928932188134525, 4.292893218813452, 7],
			[-2, 5, 7],
		],
		[
			[-2.2928932188134525, 5, 6.292893218813452],
			[-2.5, 4.5, 6.292893218813452],
			[-3, 5, 6],
		],
		[
			[-3, 5, 8],
			[-2.5, 4.5, 7.707106781186548],
			[-2.2928932188134525, 5, 7.707106781186548],
		],
		[
			[-2.2928932188134525, 4.292893218813452, 7],
			[-3, 4, 7],
			[-3, 4.292893218813452, 6.292893218813452],
			[-2.5, 4.5, 6.292893218813452],
		],
		[
			[-2.5, 4.5, 7.707106781186548],
			[-3, 4.292893218813452, 7.707106781186548],
			[-3, 4, 7],
			[-2.2928932188134525, 4.292893218813452, 7],
		],
		[
			[-2.5, 4.5, 6.292893218813452],
			[-3, 4.292893218813452, 6.292893218813452],
			[-3, 5, 6],
		],
		[
			[-3, 5, 8],
			[-3, 4.292893218813452, 7.707106781186548],
			[-2.5, 4.5, 7.707106781186548],
		],
		[
			[-3, 4, 7],
			[-3.7071067811865475, 4.292893218813452, 7],
			[-3.5, 4.5, 6.292893218813452],
			[-3, 4.292893218813452, 6.292893218813452],
		],
		[
			[-3, 4.292893218813452, 7.707106781186548],
			[-3.5, 4.5, 7.707106781186548],
			[-3.7071067811865475, 4.292893218813452, 7],
			[-3, 4, 7],
		],
		[
			[-3, 4.292893218813452, 6.292893218813452],
			[-3.5, 4.5, 6.292893218813452],
			[-3, 5, 6],
		],
		[
			[-3, 5, 8],
			[-3.5, 4.5, 7.707106781186548],
			[-3, 4.292893218813452, 7.707106781186548],
		],
		[
			[-3.7071067811865475, 4.292893218813452, 7],
			[-4, 5, 7],
			[-3.7071067811865475, 5, 6.292893218813452],
			[-3.5, 4.5, 6.292893218813452],
		],
		[
			[-3.5, 4.5, 7.707106781186548],
			[-3.7071067811865475, 5, 7.707106781186548],
			[-4, 5, 7],
			[-3.7071067811865475, 4.292893218813452, 7],
		],
		[
			[-3.5, 4.5, 6.292893218813452],
			[-3.7071067811865475, 5, 6.292893218813452],
			[-3, 5, 6],
		],
		[
			[-3, 5, 8],
			[-3.7071067811865475, 5, 7.707106781186548],
			[-3.5, 4.5, 7.707106781186548],
		],
		[
			[-4, 5, 7],
			[-3.707106781186548, 5.707106781186548, 7],
			[-3.5, 5.5, 6.292893218813452],
			[-3.7071067811865475, 5, 6.292893218813452],
		],
		[
			[-3.7071067811865475, 5, 7.707106781186548],
			[-3.5, 5.5, 7.707106781186548],
			[-3.707106781186548, 5.707106781186548, 7],
			[-4, 5, 7],
		],
		[
			[-3.7071067811865475, 5, 6.292893218813452],
			[-3.5, 5.5, 6.292893218813452],
			[-3, 5, 6],
		],
		[
			[-3, 5, 8],
			[-3.5, 5.5, 7.707106781186548],
			[-3.7071067811865475, 5, 7.707106781186548],
		],
		[
			[-3.707106781186548, 5.707106781186548, 7],
			[-3, 6, 7],
			[-3, 5.707106781186548, 6.292893218813452],
			[-3.5, 5.5, 6.292893218813452],
		],
		[
			[-3.5, 5.5, 7.707106781186548],
			[-3, 5.707106781186548, 7.707106781186548],
			[-3, 6, 7],
			[-3.707106781186548, 5.707106781186548, 7],
		],
		[
			[-3.5, 5.5, 6.292893218813452],
			[-3, 5.707106781186548, 6.292893218813452],
			[-3, 5, 6],
		],
		[
			[-3, 5, 8],
			[-3, 5.707106781186548, 7.707106781186548],
			[-3.5, 5.5, 7.707106781186548],
		],
		[
			[-3, 6, 7],
			[-2.2928932188134525, 5.707106781186548, 7],
			[-2.5, 5.5, 6.292893218813452],
			[-3, 5.707106781186548, 6.292893218813452],
		],
		[
			[-3, 5.707106781186548, 7.707106781186548],
			[-2.5, 5.5, 7.707106781186548],
			[-2.2928932188134525, 5.707106781186548, 7],
			[-3, 6, 7],
		],
		[
			[-3, 5.707106781186548, 6.292893218813452],
			[-2.5, 5.5, 6.292893218813452],
			[-3, 5, 6],
		],
		[
			[-3, 5, 8],
			[-2.5, 5.5, 7.707106781186548],
			[-3, 5.707106781186548, 7.707106781186548],
		],
		[
			[-2.2928932188134525, 5.707106781186548, 7],
			[-2, 5, 7],
			[-2.2928932188134525, 5, 6.292893218813452],
			[-2.5, 5.5, 6.292893218813452],
		],
		[
			[-2.5, 5.5, 7.707106781186548],
			[-2.2928932188134525, 5, 7.707106781186548],
			[-2, 5, 7],
			[-2.2928932188134525, 5.707106781186548, 7],
		],
		[
			[-2.5, 5.5, 6.292893218813452],
			[-2.2928932188134525, 5, 6.292893218813452],
			[-3, 5, 6],
		],
		[
			[-3, 5, 8],
			[-2.2928932188134525, 5, 7.707106781186548],
			[-2.5, 5.5, 7.707106781186548],
		],
	];
	expect(() => geom3.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(32);
	expect(comparePolygonsAsPoints(pts, exp as Vec3[][])).toBe(true);
});

test("sphere (zero radius)", () => {
	const obs = sphere({ radius: 0 });
	const pts = geom3.toPoints(obs);
	expect(() => geom3.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(0);
});