// list of supported geometries
import * as geom2 from "../geometries/geom2/index";
import * as geom3 from "../geometries/geom3/index";
import * as path2 from "../geometries/path2/index";
import { Geometry } from "../geometries/types";

/**
 * @param {Array} shapes - list of shapes to compare
 * @returns {Boolean} true if the given shapes are of the same type
 * @alias module:modeling/utils.areAllShapesTheSameType
 */
export const areAllShapesTheSameType = (shapes: Geometry[]) => {
	let previousType;
	for (const shape of shapes) {
		let currentType = 0;
		if (geom2.isA(shape)) currentType = 1;
		if (geom3.isA(shape)) currentType = 2;
		if (path2.isA(shape)) currentType = 3;

		if (previousType !== undefined && currentType !== previousType) return false;
		previousType = currentType;
	}
	return true;
};
