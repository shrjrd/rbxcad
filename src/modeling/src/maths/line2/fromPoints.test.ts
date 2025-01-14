import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { create, fromPoints } from "./index";

test("line2: fromPoints() should return a new line2 with correct values", () => {
	const out = create();

	const obs1 = fromPoints(out, [0, 0], [0, 0]);
	expect(compareVectors(obs1, [0, 0, 0])).toBe(true);

	const obs2 = fromPoints(out, [1, 0], [0, 1]);
	expect(compareVectors(obs2, [-0.7071067811865476, -0.7071067811865475, -0.7071067811865476])).toBe(true);

	const obs3 = fromPoints(out, [0, 1], [1, 0]);
	expect(compareVectors(obs3, [0.7071067811865476, 0.7071067811865475, 0.7071067811865475])).toBe(true);

	const obs4 = fromPoints(out, [0, 6], [6, 0]);
	expect(compareVectors(obs4, [0.7071067811865476, 0.7071067811865476, 4.242640687119286])).toBe(true);

	// line2 created from the same points results in an invalid line2
	const obs9 = fromPoints(out, [0, 5], [0, 5]);
	expect(compareVectors(obs9, [0, 0, 0])).toBe(true);
});
