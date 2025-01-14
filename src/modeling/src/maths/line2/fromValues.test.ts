import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { fromValues } from "./index";

test("line2: fromValues() should return a new line2 with correct values", () => {
	const obs1 = fromValues(0, 0, 0);
	expect(compareVectors(obs1, [0, 0, 0])).toBe(true);

	const obs2 = fromValues(0, 1, -5);
	expect(compareVectors(obs2, [0, 1, -5])).toBe(true);
});
