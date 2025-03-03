const Number_MAX_VALUE = 1.7976931348623157e308;
const Number_EPSILON = 2.220446049250313e-16;
import { Number } from "@rbxts/luau-polyfill";
// Compare two numeric values for near equality.
// the given test is fails if the numeric values are outside the given epsilon
// DEVIATION: jest doesn't have a test object
//export const nearlyEqual = (t, a, b, epsilon, failMessage) => {
export const nearlyEqual = (a: number, b: number, epsilon: number, failMessage?: string) => {
	//if (typeof t !== "object") {
	//	throw "first argument must be a test object";
	//}
	if (a === b) {
		// shortcut, also handles infinities
		return true;
	}

	const absA = math.abs(a);
	const absB = math.abs(b);
	const diff = math.abs(a - b) as number;
	if (Number.isNaN(diff)) {
		failMessage = failMessage === undefined ? "difference is not a number" : failMessage;
		//t.fail(failMessage + "(" + a + "," + b + ")");
		throw failMessage + "(" + a + "," + b + ")";
	}
	if (a === 0 || b === 0 || (diff as number) < Number_EPSILON) {
		// a or b is zero or both are extremely close to it
		// relative error is less meaningful here
		if ((diff as number) > epsilon * Number_EPSILON) {
			failMessage = failMessage === undefined ? "near zero Numbers outside of epsilon" : failMessage;
			//t.fail(failMessage + "(" + a + "," + b + ")");
			throw failMessage + "(" + a + "," + b + ")";
		}
	}
	// use relative error
	const relative = diff / math.min(absA + absB, Number_MAX_VALUE);
	if (relative > epsilon) {
		failMessage = failMessage === undefined ? "Numbers outside of epsilon" : failMessage;
		//t.fail(failMessage + "(" + a + "," + b + ")");
		throw failMessage + "(" + a + "," + b + ")";
	}
};
