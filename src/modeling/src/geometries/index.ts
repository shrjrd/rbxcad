/**
 * Geometries are objects that represent the contents of primitives or the results of operations.
 * Note: Geometries are considered immutable, so never change the contents directly.
 *
 * @see {@link geom2} - 2D geometry consisting of sides
 * @see {@link geom3} - 3D geometry consisting of polygons
 * @see {@link path2} - 2D geometry consisting of ordered points
 * @see {@link poly2} - 2D polygon consisting of ordered vertices
 * @see {@link poly3} - 3D polygon consisting of ordered vertices
 *
 * @module modeling/geometries
 * @example
 * import { geom2, geom3, path2, poly2, poly3 } from '@jscad/modeling/geometries'
 */
import geom2 from "./geom2";
import geom3 from "./geom3";
import path2 from "./path2";
import poly2 from "./poly2";
import poly3 from "./poly3";

export { geom2, geom3, path2, poly2, poly3 };

export default {
	geom2,
	geom3,
	path2,
	poly2,
	poly3,
};
