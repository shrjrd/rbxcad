import { expect, test } from "@rbxts/jest-globals";

import { TAU } from "../maths/constants";
import { degToRad } from "./index";

test("utils: degToRad() should return correct values", () => {
	const obs1 = degToRad(0);
	expect(obs1 === 0).toBe(true);

	const obs2 = degToRad(90);
	expect(obs2 === TAU / 4).toBe(true);

	const obs3 = degToRad(180);
	expect(obs3 === TAU / 2).toBe(true);

	const obs4 = degToRad(270);
	expect(obs4 === TAU * 0.75).toBe(true);
});
