import { expect, test } from "@rbxts/jest-globals";

import { hexToRgb } from "./index";

test("hexToRgb (RGB notations)", () => {
	let obs = hexToRgb("#ff007f");
	let exp = [1, 0, 0.4980392156862745];

	expect(obs).toEqual(exp);

	obs = hexToRgb("#FF007F");
	exp = [1, 0, 0.4980392156862745];

	expect(obs).toEqual(exp);

	obs = hexToRgb("FF007F");
	exp = [1, 0, 0.4980392156862745];

	expect(obs).toEqual(exp);
});

test("hexToRgb (RGBA notations)", () => {
	let obs = hexToRgb("#ff007f01");
	let exp = [1, 0, 0.4980392156862745, 0.00392156862745098];

	expect(obs).toEqual(exp);

	obs = hexToRgb("#FF007F01");
	exp = [1, 0, 0.4980392156862745, 0.00392156862745098];

	expect(obs).toEqual(exp);

	obs = hexToRgb("FF007F01");
	exp = [1, 0, 0.4980392156862745, 0.00392156862745098];

	expect(obs).toEqual(exp);
});
