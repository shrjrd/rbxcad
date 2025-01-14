import { expect, test } from "@rbxts/jest-globals";
import { Array } from "@rbxts/luau-polyfill";

import { comparePoints } from "../../../test/helpers";
import { geom2, path2 } from "../../geometries";
import measureBoundingBox from "../../measurements/measureBoundingBox";
import { offset } from "./index";

test("offset: offsetting a straight line produces expected geometry", () => {
	const points: Vec2[] = [
		[0, 0],
		[0, 10],
	];
	let linePath2 = path2.fromPoints({ closed: false }, points);

	// offset it by 2.
	let offsetLinePath2 = offset({ delta: 2, corners: "edge", segments: 8 }, linePath2) as Path2;
	let offsetPoints = path2.toPoints(offsetLinePath2);
	expect(() => path2.validate(offsetLinePath2)).never.toThrow();
	expect(offsetPoints.size()).toBe(2);
	let boundingBox = measureBoundingBox(offsetLinePath2) as BoundingBox;
	expect(
		comparePoints(boundingBox, [
			[2, 0, 0],
			[2, 10, 0],
		]),
	).toBe(true);

	// offset it by -2.
	offsetLinePath2 = offset({ delta: -2, corners: "edge", segments: 8 }, linePath2) as Path2;
	offsetPoints = path2.toPoints(offsetLinePath2);
	expect(() => path2.validate(offsetLinePath2)).never.toThrow();
	expect(offsetPoints.size()).toBe(2);
	boundingBox = measureBoundingBox(offsetLinePath2) as BoundingBox;
	expect(
		comparePoints(boundingBox, [
			[-2, 0, 0],
			[-2, 10, 0],
		]),
	).toBe(true);

	// reverse the points, offset it by 2.
	linePath2 = path2.fromPoints({ closed: false }, Array.reverse(points)); //points.reverse());
	offsetLinePath2 = offset({ delta: 2, corners: "edge", segments: 8 }, linePath2) as Path2;
	offsetPoints = path2.toPoints(offsetLinePath2);
	expect(() => path2.validate(offsetLinePath2)).never.toThrow();
	expect(offsetPoints.size()).toBe(2);
	boundingBox = measureBoundingBox(offsetLinePath2) as BoundingBox;
	expect(
		comparePoints(boundingBox, [
			[-2, 0, 0],
			[-2, 10, 0],
		]),
	).toBe(true);
});

test("offset: offsetting a bent line produces expected geometry", () => {
	const points: Vec2[] = [
		[0, 0],
		[0, 5],
		[0, 10],
		[5, 10],
		[10, 10],
	];
	const linePath2 = path2.fromPoints({ closed: false }, points);

	// offset it by 2.
	let offsetLinePath2 = offset({ delta: 2, corners: "edge", segments: 8 }, linePath2) as Path2;
	let offsetPoints = path2.toPoints(offsetLinePath2);
	expect(() => path2.validate(offsetLinePath2)).never.toThrow();
	expect(offsetPoints.size()).toBe(5);
	let boundingBox = measureBoundingBox(offsetLinePath2) as BoundingBox;
	expect(
		comparePoints(boundingBox, [
			[2, 0, 0],
			[10, 8, 0],
		]),
	).toBe(true);

	// offset it by -2.
	offsetLinePath2 = offset({ delta: -2, corners: "edge", segments: 8 }, linePath2) as Path2;
	offsetPoints = path2.toPoints(offsetLinePath2);
	expect(() => path2.validate(offsetLinePath2)).never.toThrow();
	expect(offsetPoints.size()).toBe(5);
	boundingBox = measureBoundingBox(offsetLinePath2) as BoundingBox;
	expect(
		comparePoints(boundingBox, [
			[-2, 0, 0],
			[10, 12, 0],
		]),
	).toBe(true);
});

test("offset: offsetting a 2 segment straight line produces expected geometry", () => {
	const points: Vec2[] = [
		[0, 0],
		[0, 5],
		[0, 10],
	];
	const linePath2 = path2.fromPoints({ closed: false }, points);
	const offsetLinePath2 = offset({ delta: 2, corners: "edge", segments: 8 }, linePath2) as Path2;
	const offsetPoints = path2.toPoints(offsetLinePath2);
	expect(() => path2.validate(offsetLinePath2)).never.toThrow();
	expect(offsetPoints.size()).toBe(3);
	const boundingBox = measureBoundingBox(offsetLinePath2) as BoundingBox;
	expect(
		comparePoints(boundingBox, [
			[2, 0, 0],
			[2, 10, 0],
		]),
	).toBe(true);
});

test("offset (corners: chamfer): offset of a path2 produces expected offset path2", () => {
	const openline = path2.fromPoints({}, [
		[0, 0],
		[5, 0],
		[0, 5],
	]);
	const closeline = path2.fromPoints({}, [
		[0, 0],
		[5, 0],
		[0, 5],
		[0, 0],
	]);

	// empty path2
	const empty = path2.create();
	let obs = offset({ delta: 1 }, empty) as Path2;
	let pts = path2.toPoints(obs);
	let exp: Vec2[] = [];
	expect(() => path2.validate(obs)).never.toThrow();
	expect(comparePoints(pts, exp)).toBe(true);

	// expand +
	obs = offset({ delta: 1, corners: "chamfer" }, openline) as Path2;
	pts = path2.toPoints(obs);
	exp = [
		[-6.123233995736766e-17, -1],
		[5, -1],
		[5.707106781186548, 0.7071067811865475],
		[0.7071067811865475, 5.707106781186548],
	];
	expect(() => path2.validate(obs)).never.toThrow();
	expect(comparePoints(pts, exp)).toBe(true);

	obs = offset({ delta: 1, corners: "chamfer" }, closeline) as Path2;
	pts = path2.toPoints(obs);
	exp = [
		[-6.123233995736766e-17, -1],
		[5, -1],
		[5.707106781186548, 0.7071067811865475],
		[0.7071067811865475, 5.707106781186548],
		[-1, 5],
		[-1, 6.123233995736766e-17],
	];
	expect(() => path2.validate(obs)).never.toThrow();
	expect(comparePoints(pts, exp)).toBe(true);

	// contract -
	obs = offset({ delta: -1, corners: "chamfer" }, openline) as Path2;
	pts = path2.toPoints(obs);
	exp = [
		[6.123233995736766e-17, 1],
		[2.5857864376269046, 1],
		[-0.7071067811865475, 4.292893218813452],
	];
	expect(() => path2.validate(obs)).never.toThrow();
	expect(comparePoints(pts, exp)).toBe(true);

	obs = offset({ delta: -1, corners: "chamfer" }, closeline) as Path2;
	pts = path2.toPoints(obs);
	exp = [
		[1, 1],
		[2.5857864376269046, 1],
		[0.9999999999999996, 2.585786437626905],
	];
	expect(() => path2.validate(obs)).never.toThrow();
	expect(comparePoints(pts, exp)).toBe(true);
});

test("offset (corners: edge): offset of a path2 produces expected offset path2", () => {
	const openline = path2.fromPoints({}, [
		[-5, -5],
		[5, -5],
		[5, 5],
		[3, 5],
		[3, 0],
		[-3, 0],
		[-3, 5],
		[-5, 5],
	]);
	const closeline = path2.fromPoints({}, [
		[-5, -5],
		[5, -5],
		[5, 5],
		[3, 5],
		[3, 0],
		[-3, 0],
		[-3, 5],
		[-5, 5],
		[-5, -5],
	]);

	let obs = offset({ delta: 1, corners: "edge" }, openline) as Path2;
	let pts = path2.toPoints(obs);
	let exp: Vec2[] = [
		[-5, -6],
		[6, -6],
		[6, 6],
		[2, 6],
		[2, 1],
		[-2, 1],
		[-1.9999999999999996, 6],
		[-5, 6],
	];
	expect(() => path2.validate(obs)).never.toThrow();
	expect(comparePoints(pts, exp)).toBe(true);

	obs = offset({ delta: 1, corners: "edge" }, closeline) as Path2;
	pts = path2.toPoints(obs);
	exp = [
		[6, -6],
		[6, 6],
		[2, 6],
		[2, 1],
		[-2, 1],
		[-1.9999999999999996, 6],
		[-6, 6],
		[-6, -6],
	];
	expect(() => path2.validate(obs)).never.toThrow();
	expect(comparePoints(pts, exp)).toBe(true);

	obs = offset({ delta: -0.5, corners: "edge" }, openline) as Path2;
	pts = path2.toPoints(obs);
	exp = [
		[-5, -4.5],
		[4.5, -4.5],
		[4.5, 4.5],
		[3.5, 4.5],
		[3.4999999999999996, -0.5],
		[-3.5, -0.4999999999999996],
		[-3.5, 4.5],
		[-5, 4.5],
	];
	expect(() => path2.validate(obs)).never.toThrow();
	expect(comparePoints(pts, exp)).toBe(true);

	obs = offset({ delta: -0.5, corners: "edge" }, closeline) as Path2;
	pts = path2.toPoints(obs);
	exp = [
		[-4.5, -4.5],
		[4.5, -4.5],
		[4.5, 4.5],
		[3.5, 4.5],
		[3.4999999999999996, -0.5],
		[-3.5, -0.4999999999999996],
		[-3.5, 4.5],
		[-4.5, 4.5],
	];
	expect(() => path2.validate(obs)).never.toThrow();
	expect(comparePoints(pts, exp)).toBe(true);
});

test("offset (corners: round): offset of a path2 produces expected offset path2", () => {
	const openline = path2.fromPoints({}, [
		[-5, -5],
		[5, -5],
		[5, 5],
		[3, 5],
		[3, 0],
		[-3, 0],
		[-3, 5],
		[-5, 5],
	]);
	const closeline = path2.fromPoints({}, [
		[-5, -5],
		[5, -5],
		[5, 5],
		[3, 5],
		[3, 0],
		[-3, 0],
		[-3, 5],
		[-5, 5],
		[-5, -5],
	]);

	let obs = offset({ delta: 1, corners: "round", segments: 16 }, openline) as Path2;
	let pts = path2.toPoints(obs);
	let exp: Vec2[] = [
		[-5, -6],
		[5, -6],
		[5.38268343236509, -5.923879532511287],
		[5.707106781186548, -5.707106781186548],
		[5.923879532511287, -5.38268343236509],
		[6, -5],
		[6, 5],
		[5.923879532511287, 5.38268343236509],
		[5.707106781186548, 5.707106781186548],
		[5.38268343236509, 5.923879532511287],
		[5, 6],
		[3, 6],
		[2.6173165676349104, 5.923879532511287],
		[2.2928932188134525, 5.707106781186548],
		[2.076120467488713, 5.38268343236509],
		[2, 5],
		[2, 1],
		[-2, 1],
		[-2, 5],
		[-2.076120467488713, 5.38268343236509],
		[-2.2928932188134525, 5.707106781186548],
		[-2.6173165676349104, 5.923879532511287],
		[-3, 6],
		[-5, 6],
	];
	expect(() => path2.validate(obs)).never.toThrow();
	expect(comparePoints(pts, exp)).toBe(true);

	obs = offset({ delta: 1, corners: "round", segments: 16 }, closeline) as Path2;
	pts = path2.toPoints(obs);
	exp = [
		[-5.923879532511287, -5.38268343236509],
		[-5.707106781186548, -5.707106781186548],
		[-5.3826834323650905, -5.923879532511286],
		[-5, -6],
		[5, -6],
		[5.38268343236509, -5.923879532511287],
		[5.707106781186548, -5.707106781186548],
		[5.923879532511287, -5.38268343236509],
		[6, -5],
		[6, 5],
		[5.923879532511287, 5.38268343236509],
		[5.707106781186548, 5.707106781186548],
		[5.38268343236509, 5.923879532511287],
		[5, 6],
		[3, 6],
		[2.6173165676349104, 5.923879532511287],
		[2.2928932188134525, 5.707106781186548],
		[2.076120467488713, 5.38268343236509],
		[2, 5],
		[2, 1],
		[-2, 1],
		[-2, 5],
		[-2.076120467488713, 5.38268343236509],
		[-2.2928932188134525, 5.707106781186548],
		[-2.6173165676349104, 5.923879532511287],
		[-3, 6],
		[-5, 6],
		[-5.38268343236509, 5.923879532511287],
		[-5.707106781186548, 5.707106781186548],
		[-5.923879532511287, 5.38268343236509],
		[-6, 5],
		[-6, -5],
	];
	expect(() => path2.validate(obs)).never.toThrow();
	expect(comparePoints(pts, exp)).toBe(true);
});

test("offset (corners: round): offset of a CW path2 produces expected offset path2", () => {
	const closeline = path2.fromPoints(
		{},
		/*
		[
			[-5, -5],
			[5, -5],
			[5, 5],
			[3, 5],
			[3, 0],
			[-3, 0],
			[-3, 5],
			[-5, 5],
			[-5, -5],
		].reverse(),
		*/
		Array.reverse([
			[-5, -5],
			[5, -5],
			[5, 5],
			[3, 5],
			[3, 0],
			[-3, 0],
			[-3, 5],
			[-5, 5],
			[-5, -5],
		]),
	);

	const obs = offset({ delta: 1, corners: "round", segments: 16 }, closeline) as Path2;
	const pts = path2.toPoints(obs);
	const exp: Vec2[] = [
		[-5.38268343236509, -5.923879532511287],
		[-5.707106781186548, -5.707106781186548],
		[-5.923879532511287, -5.38268343236509],
		[-6, -5],
		[-6, 5],
		[-5.923879532511287, 5.38268343236509],
		[-5.707106781186548, 5.707106781186548],
		[-5.38268343236509, 5.923879532511287],
		[-5, 6],
		[-3, 6],
		[-2.6173165676349104, 5.923879532511287],
		[-2.2928932188134525, 5.707106781186548],
		[-2.076120467488713, 5.38268343236509],
		[-2, 5],
		[-2, 1],
		[2, 1],
		[2, 5],
		[2.076120467488713, 5.38268343236509],
		[2.2928932188134525, 5.707106781186548],
		[2.6173165676349104, 5.923879532511287],
		[3, 6],
		[5, 6],
		[5.38268343236509, 5.923879532511287],
		[5.707106781186548, 5.707106781186548],
		[5.923879532511287, 5.38268343236509],
		[6, 5],
		[6, -5],
		[5.923879532511287, -5.38268343236509],
		[5.707106781186548, -5.707106781186548],
		[5.38268343236509, -5.923879532511287],
		[5, -6],
		[-5, -6],
	];
	expect(() => path2.validate(obs)).never.toThrow();
	expect(comparePoints(pts, exp)).toBe(true);
});

test("offset (options): offsetting of a simple geom2 produces expected offset geom2", () => {
	const geometry = geom2.fromPoints([
		[-5, -5],
		[5, -5],
		[5, 5],
		[3, 5],
		[3, 0],
		[-3, 0],
		[-3, 5],
		[-5, 5],
	]);

	// empty
	const empty = geom2.create();
	let obs = offset({ delta: 1 }, empty) as Geom2;
	let pts = geom2.toPoints(obs);
	let exp: Vec2[] = [];
	expect(() => geom2.validate(obs)).never.toThrow();
	expect(comparePoints(pts, exp)).toBe(true);

	// expand +
	obs = offset({ delta: 1, corners: "round" }, geometry) as Geom2;
	pts = geom2.toPoints(obs);
	exp = [
		[-5, -6],
		[5, -6],
		[6, -5],
		[6, 5],
		[5, 6],
		[3, 6],
		[2, 5],
		[2, 1],
		[-2, 1],
		[-2, 5],
		[-3, 6],
		[-5, 6],
		[-6, 5],
		[-6, -5],
	];
	expect(() => geom2.validate(obs)).never.toThrow();
	expect(comparePoints(pts, exp)).toBe(true);

	// contract -
	obs = offset({ delta: -0.5, corners: "round" }, geometry) as Geom2;
	pts = geom2.toPoints(obs);
	exp = [
		[-4.5, -4.5],
		[4.5, -4.5],
		[4.5, 4.5],
		[3.5, 4.5],
		[3.5, -3.0616171314629196e-17],
		[3, -0.5],
		[-3, -0.5],
		[-3.5, 3.0616171314629196e-17],
		[-3.5, 4.5],
		[-4.5, 4.5],
	];
	expect(() => geom2.validate(obs)).never.toThrow();
	expect(comparePoints(pts, exp)).toBe(true);

	// segments 1 - sharp points at corner
	obs = offset({ delta: 1, corners: "edge" }, geometry) as Geom2;
	pts = geom2.toPoints(obs);
	exp = [
		[6, -6],
		[6, 6],
		[2, 6],
		[2, 1],
		[-2, 1],
		[-1.9999999999999996, 6],
		[-6, 6],
		[-6, -6],
	];
	expect(() => geom2.validate(obs)).never.toThrow();
	expect(comparePoints(pts, exp)).toBe(true);

	// segments 16 - rounded corners
	obs = offset({ delta: -0.5, corners: "round", segments: 16 }, geometry) as Geom2;
	pts = geom2.toPoints(obs);
	exp = [
		[-4.5, -4.5],
		[4.5, -4.5],
		[4.5, 4.5],
		[3.5, 4.5],
		[3.5, -3.061616997868383e-17],
		[3.4619397662556435, -0.19134171618254492],
		[3.353553390593274, -0.3535533905932738],
		[3.191341716182545, -0.46193976625564337],
		[3, -0.5],
		[-3, -0.5],
		[-3.191341716182545, -0.46193976625564337],
		[-3.353553390593274, -0.3535533905932738],
		[-3.4619397662556435, -0.19134171618254495],
		[-3.5, 3.061616997868383e-17],
		[-3.5, 4.5],
		[-4.5, 4.5],
	];
	expect(() => geom2.validate(obs)).never.toThrow();
	expect(comparePoints(pts, exp)).toBe(true);
});

test("offset (options): offsetting of a complex geom2 produces expected offset geom2", () => {
	const geometry = geom2.create([
		[
			[-75, 75],
			[-75, -75],
		],
		[
			[-75, -75],
			[75, -75],
		],
		[
			[75, -75],
			[75, 75],
		],
		[
			[-40, 75],
			[-75, 75],
		],
		[
			[75, 75],
			[40, 75],
		],
		[
			[40, 75],
			[40, 0],
		],
		[
			[40, 0],
			[-40, 0],
		],
		[
			[-40, 0],
			[-40, 75],
		],
		[
			[15, -10],
			[15, -40],
		],
		[
			[-15, -10],
			[15, -10],
		],
		[
			[-15, -40],
			[-15, -10],
		],
		[
			[-8, -40],
			[-15, -40],
		],
		[
			[15, -40],
			[8, -40],
		],
		[
			[-8, -25],
			[-8, -40],
		],
		[
			[8, -25],
			[-8, -25],
		],
		[
			[8, -40],
			[8, -25],
		],
		[
			[-2, -15],
			[-2, -19],
		],
		[
			[-2, -19],
			[2, -19],
		],
		[
			[2, -19],
			[2, -15],
		],
		[
			[2, -15],
			[-2, -15],
		],
	]);

	// expand +
	const obs = offset({ delta: 2, corners: "edge" }, geometry) as Geom2;
	const pts = geom2.toPoints(obs);
	const exp: Vec2[] = [
		[77, -77],
		[77, 77],
		[38, 77],
		[38, 2],
		[-38, 2],
		[-37.99999999999999, 77],
		[-77, 77],
		[13, -12],
		[13, -38],
		[10, -38],
		[10, -23],
		[-10, -23],
		[-10, -38],
		[-13, -38],
		[-13, -12],
		[-4, -21],
		[3.9999999999999996, -21],
		[4, -13],
		[-4, -13],
		[-77, -77],
	];
	expect(() => geom2.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(20);
	expect(comparePoints(pts, exp)).toBe(true);
});

test("offset (options): offsetting of round geom2 produces expected offset geom2", () => {
	const geometry = geom2.fromPoints([
		[10.0, 0.0],
		[9.2388, 3.82683],
		[7.07107, 7.07107],
		[3.82683, 9.2388],
		[0.0, 10.0],
		[-3.82683, 9.2388],
		[-7.07107, 7.07107],
		[-9.2388, 3.82683],
		[-10.0, 0.0],
		[-9.2388, -3.82683],
		[-7.07107, -7.07107],
		[-3.82683, -9.2388],
		[-0.0, -10.0],
		[3.82683, -9.2388],
		[7.07107, -7.07107],
		[9.2388, -3.82683],
	]);

	const obs = offset({ delta: -0.5, corners: "round" }, geometry) as Geom2;
	const pts = geom2.toPoints(obs);
	const exp: Vec2[] = [
		[9.490204518135641, 0],
		[8.767810140100096, 3.6317399864658007],
		[6.710590060510285, 6.7105900605102855],
		[3.6317399864658024, 8.767810140100096],
		[-4.440892098500626e-16, 9.490204518135641],
		[-3.6317399864658007, 8.767810140100096],
		[-6.7105900605102855, 6.710590060510285],
		[-8.767810140100096, 3.6317399864658024],
		[-9.490204518135641, -4.440892098500626e-16],
		[-8.767810140100096, -3.6317399864658007],
		[-6.710590060510285, -6.7105900605102855],
		[-3.6317399864658024, -8.767810140100096],
		[4.440892098500626e-16, -9.490204518135641],
		[3.6317399864658007, -8.767810140100096],
		[6.7105900605102855, -6.710590060510285],
		[8.767810140100096, -3.6317399864658024],
	];
	expect(() => geom2.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(16);
	expect(comparePoints(pts, exp)).toBe(true);
});
