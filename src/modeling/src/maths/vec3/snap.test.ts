import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { create, snap } from "./index";

test("vec3: snap() should return vec3 with correct values", () => {
	const output = create();

	const obs1 = snap(output, [0, 0, 0], 0.1);
	expect(compareVectors(obs1, [0, 0, 0])).toBe(true);
	expect(compareVectors(output, [0, 0, 0])).toBe(true);

	const obs2 = snap(output, [1, 2, 3], 0.1);
	expect(compareVectors(obs2, [1, 2, 3])).toBe(true);
	expect(compareVectors(output, [1, 2, 3])).toBe(true);

	const obs3 = snap(output, [-1, -2, -3], 0.01);
	expect(compareVectors(obs3, [-1, -2, -3])).toBe(true);
	expect(compareVectors(output, [-1, -2, -3])).toBe(true);

	const obs4 = snap(output, [-1.123456789, -2.123456789, -3.123456789], 0.01);
	expect(compareVectors(obs4, [-1.12, -2.12, -3.12])).toBe(true);
	expect(compareVectors(output, [-1.12, -2.12, -3.12])).toBe(true);

	const obs5 = snap(output, [-1.123456789, -2.123456789, -3.123456789], 0.0001);
	expect(compareVectors(obs5, [-1.1235, -2.1235, -3.1235])).toBe(true);
	expect(compareVectors(output, [-1.1235, -2.1235, -3.1235])).toBe(true);

	const obs6 = snap(output, [-1.123456789, -2.123456789, -3.123456789], 0.000001);
	expect(compareVectors(obs6, [-1.123457, -2.1234569999999997, -3.1234569999999997])).toBe(true);
	expect(compareVectors(output, [-1.123457, -2.1234569999999997, -3.1234569999999997])).toBe(true);
});
