import { Array } from "@rbxts/luau-polyfill";
/**
 * Insert the given element into the given array using the compareFunction.
 * @alias module:modeling/utils.insertSorted
 */
const insertSorted = <T>(array: Array<T>, element: T, comparefunc: (a: T, b: T) => number) => {
	let leftbound = 0;
	let rightbound = array.size();
	while (rightbound > leftbound) {
		const testindex = math.floor((leftbound + rightbound) / 2);
		const testelement = array[testindex];
		const compareresult = comparefunc(element, testelement);
		if (compareresult > 0) {
			// element > testelement
			leftbound = testindex + 1;
		} else {
			rightbound = testindex;
		}
	}
	Array.splice(array, leftbound + 1, 0, element); //array.splice(leftbound, 0, element);
};

export default insertSorted;
