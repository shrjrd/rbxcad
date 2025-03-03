import type { BoundingBox } from "../measurements/types";
import { expect, test } from "@rbxts/jest-globals";

import { comparePoints } from "../../test/helpers/index";
import { geom3 } from "../geometries/index";
import { TAU } from "../maths/constants";
import { measureArea, measureBoundingBox, measureVolume } from "../measurements/index";
import { torus } from "./index";

test("torus (defaults)", () => {
	const obs = torus();
	const pts = geom3.toPoints(obs);

	expect(() => geom3.validate(obs)).never.toThrow();
	expect(measureArea(obs)).toBe(157.0282327749074);
	// DEVIATION: floating point differs?
	//expect(measureVolume(obs)).toBe(77.94735870844194);
	expect(measureVolume(obs)).toBe(77.94735870844191);
	expect(pts.size()).toBe(2048); // 32 * 32 * 2 (polys/segment) = 2048

	const bounds = measureBoundingBox(obs) as BoundingBox;
	const expectedBounds = [
		[-5, -5, -1],
		[5, 5, 1],
	];
	expect(comparePoints(bounds, expectedBounds)).toBe(true);
});

test("torus (simple options)", () => {
	const obs = torus({ innerRadius: 0.5, innerSegments: 4, outerRadius: 5, outerSegments: 8 });
	const pts = geom3.toPoints(obs);
	expect(() => geom3.validate(obs)).never.toThrow();
	// DEVIATION: floating point differs?
	//expect(measureArea(obs)).toBe(83.36086132479792);
	expect(measureArea(obs)).toBe(83.36086132479794);
	expect(measureVolume(obs)).toBe(14.14213562373095);
	expect(pts.size()).toBe(64); // 4 * 8 * 2 (polys/segment) = 64

	const bounds = measureBoundingBox(obs) as BoundingBox;
	const expectedBounds = [
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
	expect(measureArea(obs)).toBe(55.472610544494);
	expect(measureVolume(obs)).toBe(24.484668362201525);
	expect(pts.size()).toBe(1212);

	const bounds = measureBoundingBox(obs) as BoundingBox;
	const expectedBounds = [
		[-6, 0, -1],
		[0, 6, 1],
	];
	expect(comparePoints(bounds, expectedBounds)).toBe(true);
});

test("torus (startAngle)", () => {
	const obs = torus({ startAngle: 1 });
	const pts = geom3.toPoints(obs);
	expect(() => geom3.validate(obs)).never.toThrow();
	// DEVIATION: floating point differs?
	//expect(measureArea(obs)).toBe(157.0282327749074);
	expect(measureArea(obs)).toBe(157.02823277490742);
	expect(measureVolume(obs)).toBe(77.94735870844195);
	expect(pts.size()).toBe(2048);
});

test("torus (square by square)", () => {
	const obs = torus({ innerSegments: 4, outerSegments: 4, innerRotation: TAU / 4 });

	const bounds = measureBoundingBox(obs) as BoundingBox;
	const expectedBounds = [
		[-5, -5, -1],
		[5, 5, 1],
	];
	expect(() => geom3.validate(obs)).never.toThrow();
	expect(measureArea(obs)).toBe(110.85125168440814);
	expect(measureVolume(obs)).toBe(32);
	expect(comparePoints(bounds, expectedBounds)).toBe(true);
});
