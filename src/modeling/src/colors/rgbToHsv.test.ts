import { expect, test } from "@rbxts/jest-globals";

import { rgbToHsv } from "./index";

test("rgbToHsv", () => {
	let obs = rgbToHsv([1, 0, 0.5]);
	let exp = [0.9166666666666666, 1, 1];

	expect(obs).toEqual(exp);

	obs = rgbToHsv(0.5, 0.5, 0.5);
	exp = [0, 0, 0.5];

	expect(obs).toEqual(exp);

	obs = rgbToHsv([0.8, 0.7, 0.6]);
	exp = [0.08333333333333329, 0.25000000000000006, 0.8];

	expect(obs).toEqual(exp);

	obs = rgbToHsv([0.7, 0.8, 0.6]);
	exp = [0.25000000000000006, 0.25000000000000006, 0.8];

	expect(obs).toEqual(exp);

	obs = rgbToHsv([0.6, 0.7, 0.8]);
	exp = [0.5833333333333334, 0.25000000000000006, 0.8];

	expect(obs).toEqual(exp);

	obs = rgbToHsv(0.6, 0.7, 0.8, 0.5);
	exp = [0.5833333333333334, 0.25000000000000006, 0.8, 0.5];

	expect(obs).toEqual(exp);

	obs = rgbToHsv([0, 0, 0, 0.5]);
	exp = [0, 0, 0, 0.5];

	expect(obs).toEqual(exp);
});
