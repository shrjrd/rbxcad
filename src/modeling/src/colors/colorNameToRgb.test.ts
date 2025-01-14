import { expect, test } from "@rbxts/jest-globals";

import { colorNameToRgb } from "./index";

test("colorNameToRgb", () => {
	let obs = colorNameToRgb("bad");

	expect(obs).toBe(undefined);

	obs = colorNameToRgb("lightblue");
	const exp = [0.6784313725490196, 0.8470588235294118, 0.9019607843137255];

	expect(obs).toEqual(exp);
});
