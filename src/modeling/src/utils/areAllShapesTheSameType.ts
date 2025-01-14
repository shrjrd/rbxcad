// list of supported geometries
import geom2 from "../geometries/geom2";
import geom3 from "../geometries/geom3";
import path2 from "../geometries/path2";

/**
 * @param {Array} shapes - list of shapes to compare
 * @returns {Boolean} true if the given shapes are of the same type
 * @alias module:modeling/utils.areAllShapesTheSameType
 */
const areAllShapesTheSameType = (shapes: Geometry[]) => {
	let previousType;
	for (const shape of shapes) {
		let currentType = 0;
		if (geom2.isA(shape)) currentType = 1;
		if (geom3.isA(shape)) currentType = 2;
		if (path2.isA(shape)) currentType = 3;

		if (previousType && currentType !== previousType) return false;
		previousType = currentType;
	}
	return true;
};

export default areAllShapesTheSameType;
