import { expect, test } from "@rbxts/jest-globals";

import { comparePoints, nearlyEqual } from "../../../test/helpers";
import { geom2, geom3, path2 } from "../../geometries";
import { TAU } from "../../maths/constants";
import area from "../../maths/utils/area";
import measureBoundingBox from "../../measurements/measureBoundingBox";
import sphere from "../../primitives/sphere";
import { expand } from "./index";

test("expand: edge-expanding a straight line produces rectangle", () => {
	const points: Vec2[] = [
		[0, 0],
		[0, 10],
	];
	const linePath2 = path2.fromPoints({ closed: false }, points);
	const expandedPathGeom2 = expand({ delta: 2, corners: "edge", segments: 8 }, linePath2) as Geom2;
	const expandedPoints = geom2.toPoints(expandedPathGeom2);

	expect(() => geom2.validate(expandedPathGeom2)).never.toThrow();
	expect(area(expandedPoints)).toBe(40);
	expect(
		comparePoints(measureBoundingBox(expandedPathGeom2) as BoundingBox, [
			[-2, 0, 0],
			[2, 10, 0],
		]),
	).toBe(true);
});

test("expand: edge-expanding a bent line produces expected geometry", () => {
	const points: Vec2[] = [
		[0, 0],
		[0, 10],
		[-5, 10],
	];
	const linePath2 = path2.fromPoints({ closed: false }, points);
	const expandedPathGeom2 = expand({ delta: 2, corners: "edge", segments: 8 }, linePath2) as Geom2;
	const expandedPoints = geom2.toPoints(expandedPathGeom2);

	expect(() => geom2.validate(expandedPathGeom2)).never.toThrow();
	expect(area(expandedPoints)).toBe(60);
	const boundingBox = measureBoundingBox(expandedPathGeom2) as BoundingBox;
	expect(
		comparePoints(boundingBox, [
			[-5, 0, 0],
			[2, 12, 0],
		]),
	).toBe(true);
});

test("expand: edge-expanding a bent line, reversed points, produces expected geometry", () => {
	const points: Vec2[] = [
		[-5, 10],
		[0, 10],
		[0, 0],
	];
	const linePath2 = path2.fromPoints({ closed: false }, points);
	const expandedPathGeom2 = expand({ delta: 2, corners: "edge", segments: 8 }, linePath2) as Geom2;
	const expandedPoints = geom2.toPoints(expandedPathGeom2);

	expect(() => geom2.validate(expandedPathGeom2)).never.toThrow();
	expect(area(expandedPoints)).toBe(60);
	const boundingBox = measureBoundingBox(expandedPathGeom2) as BoundingBox;
	expect(
		comparePoints(boundingBox, [
			[-5, 0, 0],
			[2, 12, 0],
		]),
	).toBe(true);
});

test("expand: round-expanding a bent line produces expected geometry", () => {
	const delta = 2;
	const points: Vec2[] = [
		[0, 0],
		[0, 10],
		[-5, 10],
	];
	const linePath2 = path2.fromPoints({ closed: false }, points);
	const expandedPathGeom2 = expand({ delta, corners: "round", segments: 128 }, linePath2) as Geom2;
	const expandedPoints = geom2.toPoints(expandedPathGeom2);

	expect(() => geom2.validate(expandedPathGeom2)).never.toThrow();
	const expectedArea = 56 + TAU * delta * 1.25; // shape will have 1 and 1/4 circles
	nearlyEqual(area(expandedPoints), expectedArea, 0.01, "Measured area should be pretty close");
	const boundingBox = measureBoundingBox(expandedPathGeom2) as BoundingBox;
	expect(
		comparePoints(boundingBox, [
			[-7, -2, 0],
			[2, 12, 0],
		]),
	).toBe(true);
});

test("expand: chamfer-expanding a bent line produces expected geometry", () => {
	const delta = 2;
	const points: Vec2[] = [
		[0, 0],
		[0, 10],
		[-5, 10],
	];
	const linePath2 = path2.fromPoints({ closed: false }, points);
	const expandedPathGeom2 = expand({ delta, corners: "chamfer", segments: 8 }, linePath2) as Geom2;
	const expandedPoints = geom2.toPoints(expandedPathGeom2);

	expect(() => geom2.validate(expandedPathGeom2)).never.toThrow();
	expect(area(expandedPoints)).toBe(58);
	const boundingBox = measureBoundingBox(expandedPathGeom2) as BoundingBox;
	expect(
		comparePoints(boundingBox, [
			[-5, 0, 0],
			[2, 12, 0],
		]),
	).toBe(true);
});

test("expand: expanding of a geom2 produces expected changes to points", () => {
	const geometry = geom2.fromPoints([
		[-8, -8],
		[8, -8],
		[8, 8],
		[-8, 8],
	]);

	const obs = expand({ delta: 2, corners: "round", segments: 8 }, geometry) as Geom2;
	const pts = geom2.toPoints(obs);
	const exp: Vec2[] = [
		[-9.414213562373096, -9.414213562373096],
		[-8, -10],
		[8, -10],
		[9.414213562373096, -9.414213562373096],
		[10, -8],
		[10, 8],
		[9.414213562373096, 9.414213562373096],
		[8, 10],
		[-8, 10],
		[-9.414213562373096, 9.414213562373096],
		[-10, 8],
		[-10, -8],
	];
	expect(() => geom2.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(12);
	expect(comparePoints(pts, exp)).toBe(true);
});

test("expand: expanding of a geom3 produces expected changes to polygons", () => {
	const polygonsAsPoints: Vec3[][] = [
		[
			[-5, -5, -5],
			[-5, -5, 15],
			[-5, 15, 15],
			[-5, 15, -5],
		],
		[
			[15, -5, -5],
			[15, 15, -5],
			[15, 15, 15],
			[15, -5, 15],
		],
		[
			[-5, -5, -5],
			[15, -5, -5],
			[15, -5, 15],
			[-5, -5, 15],
		],
		[
			[-5, 15, -5],
			[-5, 15, 15],
			[15, 15, 15],
			[15, 15, -5],
		],
		[
			[-5, -5, -5],
			[-5, 15, -5],
			[15, 15, -5],
			[15, -5, -5],
		],
		[
			[-5, -5, 15],
			[15, -5, 15],
			[15, 15, 15],
			[-5, 15, 15],
		],
	];
	const geometry = geom3.fromPoints(polygonsAsPoints);

	const obs = expand({ delta: 2, corners: "round", segments: 8 }, geometry) as Geom3;
	const pts = geom3.toPoints(obs);
	const exp0: Vec3[] = [
		[-7, -5, -5],
		[-7, -5, 15],
		[-7, 15, 15],
		[-7, 15, -5],
	];
	const exp61: Vec3[] = [
		[15, -7, 15],
		[16.414213562373096, -6.414213562373095, 15],
		[16, -6.414213562373095, 16],
	];

	//t.notThrows.skip(() => geom3.validate(obs));
	expect(() => geom3.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(62);
	expect(comparePoints(pts[0], exp0)).toBe(true);
	expect(comparePoints(pts[61], exp61)).toBe(true);

	const geometry2 = sphere({ radius: 5, segments: 8 });
	const obs2 = expand({ delta: 5 }, geometry2) as Geom3;
	const pts2 = geom3.toPoints(obs2);
	//t.notThrows.skip(() => geom3.validate(obs2));
	//expect(() => geom3.validate(obs2)).never.toThrow();
	expect(pts2.size()).toBe(864);
});

test("expand (options): offsetting of a complex geom2 produces expected offset geom2", () => {
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
	const obs = expand({ delta: 2, corners: "edge" }, geometry) as Geom2;
	const pts = geom2.toPoints(obs);
	const exp: Vec2[] = [
		[77, -77],
		[77, 77],
		[38, 77],
		[38, 2],
		[-38, 2],
		[-37.99999999999999, 77],
		[-77, 77],
		[16.999999999999996, -42],
		[6, -42],
		[6, -27],
		[-6, -27],
		[-6.000000000000001, -42],
		[-17, -42],
		[-16.999999999999996, -8],
		[17, -8.000000000000004],
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
