import { Array as JsArray } from "@rbxts/luau-polyfill";
/**
 * Insert the given element into the given array using the compareFunction.
 * @alias module:modeling/utils.insertSorted
 */
export const insertSorted = <T>(array: Array<T>, element: T, compareFunc: (a: T, b: T) => number) => {
	let leftBound = 0;
	let rightBound = array.size();
	while (rightBound > leftBound) {
		const testIndex = math.floor((leftBound + rightBound) / 2);
		const testElement = array[testIndex];
		const compareResult = compareFunc(element, testElement);
		if (compareResult > 0) {
			// element > testElement
			leftBound = testIndex + 1;
		} else {
			rightBound = testIndex;
		}
	}
	JsArray.splice(array, leftBound + 1, 0, element); //array.splice(leftBound, 0, element);
};
