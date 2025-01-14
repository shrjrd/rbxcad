import { expect, test } from "@rbxts/jest-globals";

import { TAU } from "../constants";
import {
	create,
	fromScaling,
	fromTaitBryanRotation,
	fromTranslation,
	invert,
	isOnlyTransformScale,
	multiply,
} from "./index";

test("mat4: isOnlyTransformScale() should return true for right angles", () => {
	let someRotation = fromTaitBryanRotation(create(), TAU / 2, 0, 0);
	expect(isOnlyTransformScale(someRotation)).toBe(true);
	expect(isOnlyTransformScale(invert(create(), someRotation)!)).toBe(true);

	someRotation = fromTaitBryanRotation(create(), 0, 0, 0);
	expect(isOnlyTransformScale(someRotation)).toBe(true);
});

test("mat4: isOnlyTransformScale() should return correct values", () => {
	const identity = create(); // identity matrix
	expect(isOnlyTransformScale(identity)).toBe(true);

	const someTranslation = fromTranslation(create(), [5, 5, 5]);
	expect(isOnlyTransformScale(someTranslation)).toBe(true);

	const someScaling = fromScaling(create(), [5, 5, 5]);
	expect(isOnlyTransformScale(someScaling)).toBe(true);
	expect(isOnlyTransformScale(invert(create(), someScaling)!)).toBe(true);

	const combined = multiply(create(), someTranslation, someScaling);
	expect(isOnlyTransformScale(combined)).toBe(true);
});
