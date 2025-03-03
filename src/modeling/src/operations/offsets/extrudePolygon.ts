import type { Poly3 } from "../../geometries/types";
import type { Vec3 } from "../../maths/types";
import * as geom3 from "../../geometries/geom3/index";
import * as poly3 from "../../geometries/poly3/index";
import * as mat4 from "../../maths/mat4/index";
import * as vec3 from "../../maths/vec3/index";

// Extrude a polygon in the direction of the offset vector.
// Returns (geom3) a new geometry
export const extrudePolygon = (offsetVector: Vec3, polygon1: Poly3) => {
	const direction = vec3.dot(poly3.plane(polygon1), offsetVector);
	if (direction > 0) {
		polygon1 = poly3.invert(polygon1);
	}

	const newPolygons = [polygon1];

	const polygon2 = poly3.transform(mat4.fromTranslation(mat4.create(), offsetVector), polygon1);
	const numVertices = polygon1.vertices.size();
	for (let i = 0; i < numVertices; i++) {
		const nexti = i < numVertices - 1 ? i + 1 : 0;
		const sideFacePolygon = poly3.create([
			polygon1.vertices[i],
			polygon2.vertices[i],
			polygon2.vertices[nexti],
			polygon1.vertices[nexti],
		]);
		newPolygons.push(sideFacePolygon);
	}
	newPolygons.push(poly3.invert(polygon2));

	return geom3.create(newPolygons);
};
