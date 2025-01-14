import { expect, test } from "@rbxts/jest-globals";

import { rgbToHex } from "./index";

test("rgbToHex", () => {
	let obs = rgbToHex([1, 0, 0.5]);
	let exp = "#ff007f";

	expect(obs).toEqual(exp);

	obs = rgbToHex(1, 0, 0.5, 0.8);
	exp = "#ff007fcc";

	expect(obs).toEqual(exp);
});
