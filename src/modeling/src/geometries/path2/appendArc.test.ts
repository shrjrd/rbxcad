import { expect, test } from "@rbxts/jest-globals";

import { comparePoints } from "../../../test/helpers/";
import { TAU } from "../../maths/constants";
import { appendArc, fromPoints, toPoints } from "./index";

test("appendArc: appending to an empty path produces an error", () => {
	const p1 = fromPoints({}, []);
	expect(() => appendArc({ endpoint: [12, 12] }, p1)).toThrowError({
		message: "the given path must contain one or more points (as the starting point for the arc)",
	});
});

test("appendArc: appending to a path produces a new path", () => {
	const p1 = fromPoints({}, [
		[1, 1],
		[2, 2],
	]);
	let obs = appendArc({ endpoint: [-2, 2] }, p1);
	let pts = toPoints(obs);
	expect(pts.size()).toBe(3);

	// test radius
	const p2 = fromPoints({}, [
		[27, -22],
		[27, -3],
	]);
	obs = appendArc({ endpoint: [12, -22], radius: [15, -20] }, p2);
	pts = toPoints(obs);
	expect(pts.size()).toBe(7);

	// test segments
	obs = appendArc({ endpoint: [12, -22], radius: [15, -20], segments: 64 }, p2);
	pts = toPoints(obs);
	expect(pts.size()).toBe(19);

	// test clockwise
	obs = appendArc({ endpoint: [12, -22], radius: [15, -20], clockwise: true }, p2);
	pts = toPoints(obs);
	let exp: Vec2[] = [
		[27, -22],
		[27, -3],
		[26.086451657912605, -8.941047736250177],
		[23.87938869625451, -14.243872270248309],
		[20.58174906029909, -18.420882475791835],
		[16.49674848226545, -21.0880050920699],
		[11.999999999999998, -22],
	];
	expect(pts.size()).toBe(7);
	expect(comparePoints(pts, exp)).toBe(true);

	// test large
	obs = appendArc({ endpoint: [12, -22], radius: [15, -20], large: true }, p2);
	pts = toPoints(obs);
	expect(pts.size()).toBe(16);

	// test xaxisrotation
	obs = appendArc({ endpoint: [12, -22], radius: [15, -20], xaxisrotation: TAU / 4 }, p2);
	pts = toPoints(obs);
	exp = [
		[27, -22],
		[27, -3],
		[21.830323320631795, -4.401628923214028],
		[17.364704977487236, -6.805886946199115],
		[13.940501387124588, -10.031143708098092],
		[11.816394990371812, -13.833746263211978],
		[11.15285201325494, -17.926425912558045],
		[12, -22.000000000000004],
	];
	expect(pts.size()).toBe(8);
	expect(comparePoints(pts, exp)).toBe(true);

	// test small arc between far points
	obs = appendArc({ endpoint: [120, -220], radius: [5, -5] }, p2);
	pts = toPoints(obs);
	expect(pts.size()).toBe(2);
});

test("appendArc: appending to a path produces exact endpoint", () => {
	let p1 = fromPoints({}, [
		[18, 1.8],
		[1, 3],
	]);
	const endpoint: Vec2 = [1, -3];

	p1 = appendArc(
		{
			endpoint,
			radius: [4, 4],
			segments: 36,
			large: true,
		},
		p1,
	);

	const pts = toPoints(p1);

	expect(pts[pts.size() - 1]).toEqual(endpoint);
});
