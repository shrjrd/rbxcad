import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { create, translate } from "./index";

test("mat4: translate() called with three parameters should update a mat4 with correct values", () => {
	const identityMatrix: Mat4 = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

	const obs1 = create();
	const ret1 = translate(obs1, identityMatrix, [0, 0, 0]);
	expect(compareVectors(obs1, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])).toBe(true);
	expect(compareVectors(ret1, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])).toBe(true);
	expect(obs1).toBe(ret1);

	const obs2 = create();
	const ret2 = translate(obs2, identityMatrix, [2, 3, 6]);
	expect(compareVectors(obs2, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 2, 3, 6, 1])).toBe(true);
	expect(compareVectors(ret2, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 2, 3, 6, 1])).toBe(true);

	const x = 1;
	const y = 5;
	const z = 7;
	const translationMatrix: Mat4 = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1];

	const obs3 = create();
	const ret3 = translate(obs3, translationMatrix, [-2, -3, -6]);
	expect(compareVectors(obs3, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -1, 2, 1, 1])).toBe(true);
	expect(compareVectors(ret3, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -1, 2, 1, 1])).toBe(true);

	const w = 1;
	const h = 3;
	const d = 5;
	const scaleMatrix: Mat4 = [w, 0, 0, 0, 0, h, 0, 0, 0, 0, d, 0, 0, 0, 0, 1];

	const obs4 = create();
	const ret4 = translate(obs4, scaleMatrix, [2, 3, 6]);
	expect(compareVectors(obs4, [1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 5, 0, 2, 9, 30, 1])).toBe(true);
	expect(compareVectors(ret4, [1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 5, 0, 2, 9, 30, 1])).toBe(true);

	const rotateZMatrix: Mat4 = [0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

	const obs5 = create();
	const ret5 = translate(obs5, rotateZMatrix, [6, 4, 2]);
	expect(compareVectors(obs5, [0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 4, -6, 2, 1])).toBe(true); // close to zero
	expect(compareVectors(ret5, [0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 4, -6, 2, 1])).toBe(true); // close to zero

	// special case where in and out are the same
	// const obs6 = clone(rotateZMatrix)
	// const ret6 = translate(obs6, [6, 4, 2], obs6)
	// t.true(compareVectors(obs6, [0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 4, -6, 2, 1])) // close to zero
	// t.true(compareVectors(ret6, [0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 4, -6, 2, 1])) // close to zero
});
