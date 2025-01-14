import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { create, direction, fromPoints } from "./index";

test("line3: direction() should return proper direction", () => {
	const line1 = create();
	const dir1 = direction(line1);
	expect(compareVectors(dir1, [0, 0, 1])).toBe(true);

	const line2 = fromPoints(line1, [1, 0, 0], [0, 1, 0]);
	const dir2 = direction(line2);
	expect(compareVectors(dir2, [-0.7071067811865475, 0.7071067811865475, 0])).toBe(true);

	const line3 = fromPoints(line1, [0, 1, 0], [1, 0, 0]);
	const dir3 = direction(line3);
	expect(compareVectors(dir3, [0.7071067811865475, -0.7071067811865475, 0])).toBe(true);

	const line4 = fromPoints(line1, [0, 0, 1], [0, 0, -6]);
	const dir4 = direction(line4);
	expect(compareVectors(dir4, [0, 0, -1])).toBe(true);

	const line5 = fromPoints(line1, [-5, -5, -5], [5, 5, 5]);
	const dir5 = direction(line5);
	expect(compareVectors(dir5, [0.5773502691896258, 0.5773502691896258, 0.5773502691896258])).toBe(true);
});
