/**
 * Utility functions of various sorts, including conversions from different angular measures.
 * @module modeling/utils
 * @example
 * const { areAllShapesTheSameType, degToRad, radiusToSegments, radToDeg } = require('@jscad/modeling').utils
 */
import areAllShapesTheSameType from "./areAllShapesTheSameType";
import degToRad from "./degToRad";
import flatten from "./flatten";
import fnNumberSort from "./fnNumberSort";
import insertSorted from "./insertSorted";
import radiusToSegments from "./radiusToSegments";
import radToDeg from "./radToDeg";

export { areAllShapesTheSameType, degToRad, flatten, fnNumberSort, insertSorted, radiusToSegments, radToDeg };

export default {
	areAllShapesTheSameType,
	degToRad,
	flatten,
	fnNumberSort,
	insertSorted,
	radiusToSegments,
	radToDeg,
};
