import { compareVectors } from "./compareVectors";

/**
 * Compare two list of points for equality
 * @param {Array} list1 - list of points
 * @param {Array} list2 - list of points
 * @returns {boolean} result of comparison
 */
export const comparePoints = (list1: number[][], list2: number[][]) => {
	if (list1.size() === list2.size()) {
		return list1.reduce((valid, point, index) => valid && compareVectors(list1[index], list2[index]), true);
	}
	return false;
};
