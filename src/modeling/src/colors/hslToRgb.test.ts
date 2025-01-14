import { expect, test } from "@rbxts/jest-globals";

import { hslToRgb } from "./index";

test("hslToRgb (HSL values)", () => {
	let obs = hslToRgb([0, 1, 0]);
	let exp = [0, 0, 0];

	expect(obs).toEqual(exp);

	obs = hslToRgb([0.9166666666666666, 1, 0.5]);
	exp = [1, 0, 0.5000000000000002];

	expect(obs).toEqual(exp);

	obs = hslToRgb(0.9166666666666666, 0, 0.5);
	exp = [0.5, 0.5, 0.5];

	expect(obs).toEqual(exp);
});

test("hslToRgb (HSLA values)", () => {
	let obs = hslToRgb([0, 1, 0, 1]);
	let exp = [0, 0, 0, 1];

	expect(obs).toEqual(exp);

	obs = hslToRgb([0.9166666666666666, 1, 0.5, 1]);
	exp = [1, 0, 0.5000000000000002, 1];

	expect(obs).toEqual(exp);

	obs = hslToRgb(0.9166666666666666, 0, 0.5, 0.5);
	exp = [0.5, 0.5, 0.5, 0.5];

	expect(obs).toEqual(exp);
});
