import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { create, fromPoints, reverse } from "./index";

test("line3: reverse() called with two parameters should update a line3 with proper values", () => {
	const line1 = create();
	const out = create();
	let rev = reverse(out, line1);
	let pnt = rev[0];
	let dir = rev[1];
	expect(compareVectors(pnt, [0, 0, 0])).toBe(true);
	expect(compareVectors(dir, [0, 0, -1])).toBe(true);
	pnt = out[0];
	dir = out[1];
	expect(compareVectors(pnt, [0, 0, 0])).toBe(true);
	expect(compareVectors(dir, [0, 0, -1])).toBe(true);
	expect(line1).never.toBe(out);
	expect(rev).toBe(out);

	// reverse in place
	const line2 = fromPoints(create(), [1, 0, 0], [0, 1, 0]);
	rev = reverse(line2, line2);
	pnt = rev[0];
	dir = rev[1];
	expect(compareVectors(pnt, [1, 0, 0])).toBe(true);
	expect(compareVectors(dir, [0.7071067811865475, -0.7071067811865475, 0])).toBe(true);
	pnt = line2[0];
	dir = line2[1];
	expect(compareVectors(pnt, [1, 0, 0])).toBe(true);
	expect(compareVectors(dir, [0.7071067811865475, -0.7071067811865475, 0])).toBe(true);
	expect(rev).toBe(line2);
});
