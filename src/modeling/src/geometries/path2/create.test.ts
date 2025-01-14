import { expect, test } from "@rbxts/jest-globals";

import { create, equals, fromPoints } from "./index";

test("create: Creates an empty path", () => {
	expect(equals(create(), fromPoints({ closed: false }, []))).toBe(true);
});
