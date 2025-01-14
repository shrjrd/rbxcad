import poly3 from "../poly3";
import create from "./create";
import toPolygons from "./toPolygons";

/**
 * Invert the given geometry, transposing solid and empty space.
 * @param {geom3} geometry - the geometry to invert
 * @return {geom3} a new geometry
 * @alias module:modeling/geometries/geom3.invert
 */
const invert = (geometry: Geom3) => {
	const polygons = toPolygons(geometry);
	const newpolygons = polygons.map((polygon) => poly3.invert(polygon));
	return create(newpolygons);
};

export default invert;
