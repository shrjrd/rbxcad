import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { create, direction, fromPoints } from "./index";

test("line2: direction() should return proper direction", () => {
	const line1 = create();
	const dir1 = direction(line1);
	expect(compareVectors(dir1, [1, 0])).toBe(true);

	const line2 = fromPoints(create(), [1, 0], [0, 1]);
	const dir2 = direction(line2);
	expect(compareVectors(dir2, [-0.7071067811865475, 0.7071067811865476])).toBe(true);

	const line3 = fromPoints(create(), [0, 1], [1, 0]);
	const dir3 = direction(line3);
	expect(compareVectors(dir3, [0.7071067811865475, -0.7071067811865476])).toBe(true);

	const line4 = fromPoints(create(), [0, 0], [6, 0]);
	const dir4 = direction(line4);
	expect(compareVectors(dir4, [1, 0], 1e-15)).toBe(true);

	const line5 = fromPoints(create(), [-5, 5], [5, -5]);
	const dir5 = direction(line5);
	expect(compareVectors(dir5, [0.7071067811865475, -0.7071067811865475])).toBe(true);

	const line6 = fromPoints(create(), [10, 0], [0, 10]);
	const dir6 = direction(line6);
	expect(compareVectors(dir6, [-0.7071067811865475, 0.7071067811865475])).toBe(true);
});
