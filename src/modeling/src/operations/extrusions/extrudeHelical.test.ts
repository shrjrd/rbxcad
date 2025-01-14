import { expect, test } from "@rbxts/jest-globals";

import { geom2, geom3 } from "../../geometries";
import { TAU } from "../../maths/constants";
import { circle } from "../../primitives";
import { extrudeHelical } from "./index";

test("extrudeHelical: (defaults) extruding of a geom2 produces an expected geom3", () => {
	const geometry2 = geom2.fromPoints([
		[10, 8],
		[10, -8],
		[26, -8],
		[26, 8],
	]);

	const geometry3 = extrudeHelical({}, geometry2);
	expect(() => geom3.validate(geometry3)).never.toThrow();
});

test("extrudeHelical: (defaults) extruding of a circle produces an expected geom3", () => {
	const geometry2 = circle({ size: 3, center: [10, 0] });

	const geometry3 = extrudeHelical({}, geometry2);
	expect(() => geom3.validate(geometry3)).never.toThrow();
});

test("extrudeHelical: (angle) extruding of a circle produces an expected geom3", () => {
	const maxRevolutions = 10;
	const geometry2 = circle({ size: 3, center: [10, 0] });
	//for (const index of [...new Array(maxRevolutions).keys()]) {
	for (const index of [...new Array(maxRevolutions)]) {
		// also test negative angles
		const geometry3 = extrudeHelical({ angle: TAU * ((index as number) - maxRevolutions / 2) }, geometry2);
		expect(() => geom3.validate(geometry3)).never.toThrow();
	}
});

test("extrudeHelical: (pitch) extruding of a circle produces an expected geom3", () => {
	const startPitch = -10;
	const geometry2 = circle({ size: 3, center: [10, 0] });
	for (const index of [...new Array(20)]) {
		// also test negative pitches
		const geometry3 = extrudeHelical({ pitch: startPitch + (index as number) }, geometry2);
		expect(() => geom3.validate(geometry3)).never.toThrow();
	}
});

test("extrudeHelical: (endRadiusOffset) extruding of a circle produces an expected geom3", () => {
	const startOffset = -5;
	const geometry2 = circle({ size: 3, center: [10, 0] });
	for (const index of [...new Array(10)]) {
		// also test negative pitches
		const geometry3 = extrudeHelical({ endRadiusOffset: startOffset + (index as number) }, geometry2);
		expect(() => geom3.validate(geometry3)).never.toThrow();
	}
});

test("extrudeHelical: (segments) extruding of a circle produces an expected geom3", () => {
	const startSegments = 3;
	const geometry2 = circle({ size: 3, center: [10, 0] });
	for (const index of [...new Array(30)]) {
		// also test negative pitches
		const geometry3 = extrudeHelical({ segments: startSegments + (index as number) }, geometry2);
		expect(() => geom3.validate(geometry3)).never.toThrow();
	}
});
