import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../test/helpers";
import { create } from "./index";

test("connector: create() should return a connector with initial values", () => {
	const obs = create();

	const point = [0, 0, 0];
	const axis = [0, 0, 1];
	const normal = [1, 0, 0];

	expect(compareVectors(obs.point, point)).toBe(true);
	expect(compareVectors(obs.axis, axis)).toBe(true);
	expect(compareVectors(obs.normal, normal)).toBe(true);
});
