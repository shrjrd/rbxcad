import comparePolygons from "./comparePolygons";

const comparePolygonLists = (polygons1: Array<Poly3>, polygons2: Array<Poly3>) => {
	if (polygons1.size() === polygons2.size()) {
		return polygons1.reduce(
			(valid, polygon, index) => valid && comparePolygons(polygons1[index], polygons2[index]),
			true,
		);
	}
	return false;
};

export default comparePolygonLists;
