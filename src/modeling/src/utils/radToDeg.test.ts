import { expect, test } from "@rbxts/jest-globals";

import { TAU } from "../maths/constants";
import { radToDeg } from "./radToDeg";

test("utils: radToDeg() should return correct values", () => {
	const obs1 = radToDeg(0);
	expect(obs1 === 0).toBe(true);

	const obs2 = radToDeg(TAU / 4);
	expect(obs2 === 90).toBe(true);

	const obs3 = radToDeg(TAU / 2);
	expect(obs3 === 180).toBe(true);

	const obs4 = radToDeg(TAU * 0.75);
	expect(obs4 === 270).toBe(true);
});
