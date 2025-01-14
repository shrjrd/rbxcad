import { expect, test } from "@rbxts/jest-globals";

import { create } from "./index";

test("poly3: create() should return a poly3 with initial values", () => {
	const obs = create();
	const exp = { vertices: [] };
	expect(obs).toEqual(exp);
});
