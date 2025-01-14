import { expect, test } from "@rbxts/jest-globals";

import { TAU } from "../maths/constants";
import { radiusToSegments } from "./radiusToSegments";

test("utils: radiusToSegments() should return correct values", () => {
	// test defaults
	let segments = radiusToSegments(100.0);
	expect(segments).toBe(4.0);

	segments = radiusToSegments(100.0, 0, 0);
	expect(segments).toBe(4.0);

	// test specifying only length or angle
	segments = radiusToSegments(100.0, 2.0, 0);
	expect(segments).toBe(315);

	segments = radiusToSegments(100.0, 0, TAU / 20.0);
	expect(segments).toBe(20.0);

	// test minimum length versus minimum angle
	segments = radiusToSegments(100.0, 31, TAU / 20.0);
	expect(segments).toBe(21.0);

	segments = radiusToSegments(100.0, 32, TAU / 20.0);
	expect(segments).toBe(20.0);
});
