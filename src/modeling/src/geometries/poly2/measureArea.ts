/**
 * Measure the area under the given polygon.
 *
 * @param {poly2} polygon - the polygon to measure
 * @return {Number} the area of the polygon
 * @alias module:modeling/geometries/poly2.measureArea
 */
import area from "../../maths/utils/area";

const measureArea = (polygon: Poly2): number => area(polygon.vertices);

export default measureArea;
