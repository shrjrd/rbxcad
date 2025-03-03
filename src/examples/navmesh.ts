import type { Geom3, Poly3 } from "../modeling/src/geometries/types";
import type { Vec3 } from "../modeling/src/maths/types";
/* eslint-disable */
import { Array as JsArray, JsMap } from "@rbxts/luau-polyfill";
import { Workspace } from "@rbxts/services";
import { drawGeometry3D, drawGeometries3D, drawLine3D, getGeometryFromPart } from "../rbxUtil";

import * as poly3 from "../modeling/src/geometries/poly3";
import * as vec3 from "../modeling/src/maths/vec3";
import { subtract, union } from "../modeling/src/operations/booleans";
import { generalize } from "../modeling/src/operations/modifiers/generalize";
import { extrudePolygon } from "../modeling/src/operations/offsets/extrudePolygon";
import { geom3 } from "../modeling/src/geometries";
/* eslint-enable */
const poly3Plane = poly3.plane;
const vec4equals = vec3.equals;
const vec3mul = vec3.multiply;
const vec3dot = vec3.dot;
const vec3negate = vec3.negate;
const AgentUp = [0, 1, 0] as Vec3; // The unit normal vector of the agent's up direction
const AgentHeight = 5; // The height of the agent in studs
const AgentRadius = 1; // The radius of the agent in studs
const AgentStepHeight = 2; // The height of the agent's max step height in studs
const AgentMaxAngle = 80; // The maximum angle the agent can walk on (in degrees)

const AgentDown = vec3negate([0, 0, 0], AgentUp);
const AgentMaxSlope = math.cos(math.rad(AgentMaxAngle));

function getParts(instance: Instance) {
	const found: Part[] = [];
	const parts = instance.GetDescendants();
	for (const part of parts) {
		if (part.IsA("Part")) {
			found.push(part);
		}
	}
	return found;
}

function getPolygonsFacingDirection(geometry: Geom3, direction: Vec3) {
	const facingPolygons: Poly3[] = [];
	for (const polygon of geometry.polygons) {
		const normal = poly3Plane(polygon);
		if (vec3dot(normal, direction) >= AgentMaxSlope) {
			facingPolygons.push(polygon);
		}
	}
	return { polygons: facingPolygons, transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] } as Geom3;
}

function NoValidate(polygon: Poly3, direction: Vec3) {
	return true;
}

function ValidateDownwards(polygon: Poly3, direction: Vec3) {
	const normal = poly3Plane(polygon);
	const slope = vec3dot(normal, direction);
	return slope > 0;
}

//Extrudes a 3D geometry by a direction and distance
function extrudeDirection(
	geometry: Geom3,
	validate: (polygon: Poly3, direction: Vec3) => boolean,
	distance: number,
	direction: Vec3,
) {
	const ExtrudedGeometries: Geom3[] = [];
	for (const polygon of geometry.polygons) {
		// Validate function used to determine if the polygon should be extruded
		const offset = vec3mul([0, 0, 0], direction, [distance, distance, distance]);
		if (validate(polygon, direction) === true) {
			const ExtrudedGeometry = extrudePolygon(offset, polygon);
			ExtrudedGeometries.push(ExtrudedGeometry);
		}
	}
	if (ExtrudedGeometries.size() > 0) {
		return union(...ExtrudedGeometries) as Geom3;
	}
}

// Workaround to properly subtract a closed watertight geom3 from a open geom3
function subtractClosedGeom3FromOpenGeom3(openGeom3: Geom3, closedGeom3: Geom3) {
	const resultPolygons: Poly3[] = [];
	for (const originalPolygon of openGeom3.polygons) {
		const originalPlane = poly3Plane(originalPolygon);
		const extrudedPolygon = extrudePolygon(vec3mul([0, 0, 0], originalPlane, [-1, -1, -1]), originalPolygon);
		const subtractedPolygon = subtract(extrudedPolygon, closedGeom3) as Geom3;
		for (const polygon of subtractedPolygon.polygons) {
			if (vec4equals(poly3Plane(polygon), originalPlane)) resultPolygons.push(polygon);
		}
	}
	return { polygons: resultPolygons, transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] } as Geom3;
}

const vec3ToString = (v: Vec3) => {
	return `${v[0]},${v[1]},${v[2]}`;
};

const StringToVec3 = (s: string) => {
	const [x, y, z] = s.split(",");
	return [tonumber(x), tonumber(y), tonumber(z)] as Vec3;
};

const StringToEdge = (s: string) => {
	const [v1, v2] = s.split("/");
	return [StringToVec3(v1), StringToVec3(v2)];
};

/**
 * Check manifold edge condition: Every edge is in exactly 2 faces
 */
const validateManifold = (object: Geom3) => {
	// count of each edge
	const edgeCount = new JsMap<string, number>();
	object.polygons.forEach(({ vertices }: Poly3) => {
		vertices.forEach((v: Vec3, i: number) => {
			const v1 = string.format("%s", vec3ToString(v)); //`${v}`;
			const v2 = string.format("%s", vec3ToString(vertices[(i + 1) % vertices.size()]));
			// sort for undirected edge
			const edge = string.format("%s/%s", v1, v2); //`${v1}/${v2}`;
			const count = edgeCount.has(edge) ? (edgeCount.get(edge) as number) : 0;
			edgeCount.set(edge, count + 1);
		});
	});

	// check that edges are always matched
	const nonManifold = new Map<string, true>();
	edgeCount.forEach((count, edge) => {
		const complementEdge = JsArray.reverse(edge.split("/")).join("/"); //edge.split("/").reverse().join("/");
		const complementCount = edgeCount.get(complementEdge);
		if (count !== complementCount) {
			//nonManifold.push(edge.gsub("/", " -> ")[0]); //(edge.replace("/", " -> "));
			//nonManifold.push(edge);
			nonManifold.set(edge, true);
		}
	});
	return nonManifold;
};

function Vec3ToVector3(v: Vec3) {
	return new Vector3(v[0], v[1], v[2]);
}

/**
Inspired by https://dspace.cuni.cz/bitstream/handle/20.500.11956/148644/120397077.pdf
*/
function generateNavmesh(parent: Instance) {
	print("Generating navmesh");
	const StartTick = tick();

	let UnionedPartGeometry = geom3.create();
	const parts = parent.GetDescendants();
	for (const part of parts) {
		if (part.IsA("Part")) {
			UnionedPartGeometry = union(UnionedPartGeometry, getGeometryFromPart(part)!) as Geom3;
		}
	}

	UnionedPartGeometry = generalize({ snap: false, simplify: false, triangulate: true }, UnionedPartGeometry) as Geom3;
	UnionedPartGeometry = generalize({ snap: true, simplify: true, triangulate: true }, UnionedPartGeometry) as Geom3;

	/*
		Current problem:
		non manifold edges in interior areas
		the only non manifold edges should be the borders of the mesh
	*/

	const nonManifold = validateManifold(UnionedPartGeometry);
	print(nonManifold);
	for (const [edge] of nonManifold) {
		print("edge", edge);
		const [v1, v2] = StringToEdge(edge);
		drawLine3D(Vec3ToVector3(v1), Vec3ToVector3(v2), [1, 0, 0], Workspace);
	}

	const EndTick = tick();
	print(`Navmesh generation took ${EndTick - StartTick} seconds`);
	drawGeometry3D(UnionedPartGeometry, Workspace);
	return;
}

//import { Workspace } from "@rbxts/services";
//generateNavmesh(Workspace);

export default generateNavmesh;
