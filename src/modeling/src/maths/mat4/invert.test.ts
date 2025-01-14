import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { TAU } from "../constants";
import vec3 from "../vec3/index";
import { create, fromTranslation, fromXRotation, invert } from "./index";

test("mat4: invert() translate ", () => {
	const matrix = fromTranslation(create(), [10, 10, 0]);
	const matrixInv = invert(create(), matrix);

	const vec1: Vec3 = [0, 0, 0];
	const vec2 = vec3.transform([0, 0, 0], vec1, matrix);
	expect(compareVectors(vec2, [10, 10, 0])).toBe(true);

	const vec2back = vec3.transform([0, 0, 0], vec2, matrixInv!);
	expect(compareVectors(vec2back, vec1)).toBe(true);
});

test("mat4: invert() rotate ", () => {
	const matrix = fromXRotation(create(), TAU / 4);
	const matrixInv = invert(create(), matrix);

	const vec1: Vec3 = [10, 10, 10];
	const vec2 = vec3.transform([0, 0, 0], vec1, matrix);
	expect(compareVectors(vec2, [10, -10, 10])).toBe(true);

	const vec2back = vec3.transform([0, 0, 0], vec2, matrixInv!);
	expect(compareVectors(vec2back, vec1)).toBe(true);
});
