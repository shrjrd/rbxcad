import { expect, test } from "@rbxts/jest-globals";

import comparePoints from "../../test/helpers/comparePoints";
import geom3 from "../geometries/geom3";
import { TAU } from "../maths/constants";
import measureBoundingBox from "../measurements/measureBoundingBox";
import { torus } from "./index";

test("torus (defaults)", () => {
	const obs = torus();
	const pts = geom3.toPoints(obs);

	expect(() => geom3.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(2048); // 32 * 32 * 2 (polys/segment) = 2048

	const bounds = measureBoundingBox(obs) as BoundingBox;
	const expectedBounds: BoundingBox = [
		[-5, -5, -1],
		[5, 5, 1],
	];
	expect(comparePoints(bounds, expectedBounds)).toBe(true);
});

test("torus (simple options)", () => {
	const obs = torus({ innerRadius: 0.5, innerSegments: 4, outerRadius: 5, outerSegments: 8 });
	const pts = geom3.toPoints(obs);
	expect(() => geom3.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(64); // 4 * 8 * 2 (polys/segment) = 64

	const bounds = measureBoundingBox(obs) as BoundingBox;
	const expectedBounds: BoundingBox = [
		[-5.5, -5.5, -0.5],
		[5.5, 5.5, 0.5],
	];
	expect(comparePoints(bounds, expectedBounds)).toBe(true);
});

test("torus (complex options)", () => {
	const obs = torus({
		innerRadius: 1,
		outerRadius: 5,
		innerSegments: 32,
		outerSegments: 72,
		startAngle: TAU / 4,
		outerRotation: TAU / 4,
	});
	const pts = geom3.toPoints(obs);
	expect(() => geom3.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(1212);

	const bounds = measureBoundingBox(obs) as BoundingBox;
	const expectedBounds: BoundingBox = [
		[-6, 0, -1],
		[0, 6, 1],
	];
	expect(comparePoints(bounds, expectedBounds)).toBe(true);
});

test("torus (startAngle)", () => {
	const obs = torus({ startAngle: 1, endAngle: 1 + TAU });
	const pts = geom3.toPoints(obs);
	expect(() => geom3.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(2048);
});

test("torus (square by square)", () => {
	const obs = torus({ innerSegments: 4, outerSegments: 4, innerRotation: TAU / 4 });

	const bounds = measureBoundingBox(obs) as BoundingBox;
	const expectedBounds: BoundingBox = [
		[-5, -5, -1],
		[5, 5, 1],
	];
	expect(() => geom3.validate(obs)).never.toThrow();
	expect(comparePoints(bounds, expectedBounds)).toBe(true);
});
