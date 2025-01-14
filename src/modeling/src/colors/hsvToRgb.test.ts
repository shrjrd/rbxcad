import { expect, test } from "@rbxts/jest-globals";

import { hsvToRgb } from "./index";

test("hsvToRgb (HSV values)", () => {
	let obs = hsvToRgb([0, 0.2, 0]);
	let exp = [0, 0, 0];

	expect(obs).toEqual(exp);

	obs = hsvToRgb(0.9166666666666666, 1, 1);
	exp = [1, 0, 0.5];

	expect(obs).toEqual(exp);
});

test("hsvToRgb (HSVA values)", () => {
	let obs = hsvToRgb([0, 0.2, 0, 1]);
	let exp = [0, 0, 0, 1];

	expect(obs).toEqual(exp);

	obs = hsvToRgb(0.9166666666666666, 1, 1, 0.5);
	exp = [1, 0, 0.5, 0.5];

	expect(obs).toEqual(exp);
});
