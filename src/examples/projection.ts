import type { Geom3, Poly3 } from "../modeling/src/geometries/types";
import type { Vec3 } from "../modeling/src/maths/types";
import { clone as poly3clone, plane as poly3Plane } from "../modeling/src/geometries/poly3";
import { add as vec3add, dot as vec3dot, multiply as vec3mul, negate as vec3negate } from "../modeling/src/maths/vec3";
import { subtract, union, intersect } from "../modeling/src/operations/booleans";
import { extrudePolygon } from "../modeling/src/operations/offsets/extrudePolygon";

function getPolygonsFacingDirection(geometry: Geom3, direction: Vec3) {
	const facingPolygons: Poly3[] = [];
	for (const polygon of geometry.polygons) {
		const normal = poly3Plane(polygon);
		if (vec3dot(normal, direction) > 0.001) {
			facingPolygons.push(polygon);
		}
	}
	return { polygons: facingPolygons, transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] } as Geom3;
}

function extrudeDirection(geometry: Geom3, distance: number, direction: Vec3) {
	const ExtrudedGeometries: Geom3[] = [];
	for (const polygon of geometry.polygons) {
		// Validate function used to determine if the polygon should be extruded
		const offset = vec3mul([0, 0, 0], direction, [distance, distance, distance]);
		const ExtrudedGeometry = extrudePolygon(offset, polygon);
		ExtrudedGeometries.push(ExtrudedGeometry);
	}
	if (ExtrudedGeometries.size() > 0) {
		return union(...ExtrudedGeometries) as Geom3;
	}
}

function Vector3ToVec3(vector: Vector3) {
	return [vector.X, vector.Y, vector.Z] as Vec3;
}

import { Workspace } from "@rbxts/services";
const ws = Workspace;

const shiftEps = 0.0001;
function Projection(
	ProjectionDirection: Vector3, //Direction of the projection
	ProjectionDistance: number, //Distance of the projection
	ProjectedGeometry: Geom3, //Geometry to be projected
	SurfaceGeometry: Geom3, //Geometry to be projected onto
) {
	const Intersected = intersect(ProjectedGeometry, SurfaceGeometry) as Geom3;
	if (Intersected === ProjectedGeometry) {
		print("No intersection");
		return ProjectedGeometry;
	}
	const direction = Vector3ToVec3(ProjectionDirection);
	const nDirection = vec3negate([0, 0, 0], direction);
	const shiftVector = vec3mul([0, 0, 0], direction, [shiftEps, shiftEps, shiftEps]);
	const FacingPolygons = getPolygonsFacingDirection(Intersected, nDirection);
	//Shift the clipping polygons as workaround to avoid removing polygons that lie flat on the surface
	const ShiftedFacingPolygons: Poly3[] = [];
	for (const polygon of FacingPolygons.polygons) {
		const ShiftedPolygon = poly3clone(polygon);
		for (let i = 0; i < ShiftedPolygon.vertices.size(); i++) {
			ShiftedPolygon.vertices[i] = vec3add([0, 0, 0], ShiftedPolygon.vertices[i], shiftVector);
		}
		ShiftedFacingPolygons.push(ShiftedPolygon);
	}
	const ShiftedFacingGeometry = {
		polygons: ShiftedFacingPolygons,
		transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
	} as Geom3;
	const ExtrudedShiftedFacingPolygons = extrudeDirection(
		ShiftedFacingGeometry,
		ProjectionDistance,
		direction,
	) as Geom3;
	const ExtrudedFacingPolygons = extrudeDirection(FacingPolygons, ProjectionDistance, direction) as Geom3;
	const Clipped = subtract(ExtrudedFacingPolygons, ExtrudedShiftedFacingPolygons) as Geom3;
	return getPolygonsFacingDirection(Clipped, nDirection);
}
export default Projection;
