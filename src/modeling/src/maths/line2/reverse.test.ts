import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { create, fromPoints, reverse } from "./index";

test("line2: reverse() called with two parameters should update a line2 with proper values", () => {
	const line1 = create();
	const obs1 = create();
	const ret1 = reverse(obs1, line1);
	expect(compareVectors(ret1, [0, -1, 0])).toBe(true);
	expect(compareVectors(obs1, [0, -1, 0])).toBe(true);

	const line2 = fromPoints(create(), [1, 0], [0, 1]);
	const obs2 = create();
	const ret2 = reverse(obs2, line2);
	expect(compareVectors(ret2, [0.7071067811865476, 0.7071067811865475, 0.7071067811865476])).toBe(true);
	expect(compareVectors(obs2, [0.7071067811865476, 0.7071067811865475, 0.7071067811865476])).toBe(true);

	const line3 = fromPoints(create(), [0, 1], [1, 0]);
	const obs3 = create();
	const ret3 = reverse(obs3, line3);
	expect(compareVectors(ret3, [-0.7071067811865476, -0.7071067811865475, -0.7071067811865475])).toBe(true);
	expect(compareVectors(obs3, [-0.7071067811865476, -0.7071067811865475, -0.7071067811865475])).toBe(true);

	const line4 = fromPoints(create(), [0, 6], [6, 0]);
	const obs4 = create();
	const ret4 = reverse(obs4, line4);
	expect(compareVectors(ret4, [-0.7071067811865476, -0.7071067811865476, -4.242640687119286])).toBe(true);
	expect(compareVectors(obs4, [-0.7071067811865476, -0.7071067811865476, -4.242640687119286])).toBe(true);

	const line5 = fromPoints(create(), [-5, 5], [5, -5]);
	const obs5 = create();
	const ret5 = reverse(obs5, line5);
	expect(compareVectors(ret5, [-0.7071067811865475, -0.7071067811865475, -0])).toBe(true);
	expect(compareVectors(obs5, [-0.7071067811865475, -0.7071067811865475, -0])).toBe(true);
});
