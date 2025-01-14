import { expect, test } from "@rbxts/jest-globals";

import { create } from "./index";

test("slice: create() should return a slice with initial values", () => {
	const obs = create();
	const exp = { edges: [] };
	expect(obs).toEqual(exp);
});
