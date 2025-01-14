import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers";
import plane from "../plane";
import { create, mirrorByPlane } from "./index";

test("mat4: mirrorByPlane() called with out parameter should return a new mat4 with correct values", () => {
	const planeX = plane.fromPoints(plane.create(), [0, 0, 0], [0, 1, 1], [0, 1, 0]);
	const planeY = plane.fromPoints(plane.create(), [0, 0, 0], [1, 0, 0], [1, 0, 1]);
	const planeZ = plane.fromPoints(plane.create(), [0, 0, 0], [1, 0, 0], [1, 1, 0]);

	const out1 = create();
	const ret1 = mirrorByPlane(out1, planeX);
	expect(compareVectors(out1, [-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])).toBe(true);
	expect(compareVectors(ret1, [-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])).toBe(true);

	const out2 = create();
	const ret2 = mirrorByPlane(out2, planeY);
	expect(compareVectors(out2, [1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])).toBe(true);
	expect(compareVectors(ret2, [1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])).toBe(true);

	const out3 = create();
	const ret3 = mirrorByPlane(out3, planeZ);
	expect(compareVectors(out3, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1])).toBe(true);
	expect(compareVectors(ret3, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1])).toBe(true);
});
