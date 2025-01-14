import { expect, test } from "@rbxts/jest-globals";

import { create, fromTranslation, isIdentity } from "./index";

test("mat4: isIdentity() should return correct values", () => {
	const identity = create(); // identity matrix
	expect(isIdentity(identity)).toBe(true);

	const notidentity = fromTranslation(create(), [5, 5, 5]);
	expect(isIdentity(notidentity)).toBe(false);
});
