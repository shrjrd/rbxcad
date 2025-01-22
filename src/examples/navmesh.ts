import { Array as JsArray, JsMap } from "@rbxts/luau-polyfill";

import rbxcad from "../modeling/src";
import extrudePolygon from "../modeling/src/operations/expansions/extrudePolygon";
import { drawGeometry3D, getGeometryFromPart } from "../rbxUtil";

const generalize = rbxcad.modifiers.generalize;
const booleans = rbxcad.booleans;
const subtract = booleans.subtract;
const union = booleans.union;
const poly3Plane = rbxcad.geometries.poly3.plane;
const vec4equals = rbxcad.maths.vec4.equals;
const vec3 = rbxcad.maths.vec3;
const vec3mul = vec3.multiply;
const vec3dot = vec3.dot;
const vec3negate = vec3.negate;

const AgentUp = [0, 1, 0] as Vec3; // The unit normal vector of the agent's up direction
const AgentHeight = 5; // The height of the agent
const AgentRadius = 1; // The radius of the agent
const AgentStepHeight = 2; // The height of the agent's max step height
const AgentMaxSlope = 0; // The maximum slope of the agent's walkable surface (from AgentUp)

const AgentDown = vec3negate([0, 0, 0], AgentUp);

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
		if (vec3dot(normal, direction) > AgentMaxSlope) {
			facingPolygons.push(polygon);
		}
	}
	return { polygons: facingPolygons, transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] } as Geom3;
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
	direction?: Vec3,
) {
	const ExtrudedGeometries: Geom3[] = [];
	for (const polygon of geometry.polygons) {
		// Validate function used to determine if the polygon should be extruded
		direction = direction ? direction : (poly3Plane(polygon) as Vec3);
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
function subtractClosedGeom3FromOpenGeom3(closedGeom3: Geom3, openGeom3: Geom3) {
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

/*
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
	const nonManifold: string[] = [];
	edgeCount.forEach((count, edge) => {
		const complementEdge = JsArray.reverse(edge.split("/")).join("/"); //edge.split("/").reverse().join("/");
		const complementCount = edgeCount.get(complementEdge);
		if (count !== complementCount) {
			//nonManifold.push(edge.gsub("/", " -> ")[0]); //(edge.replace("/", " -> "));
			nonManifold.push(edge);
		}
	});
	return nonManifold;
};

function Vec3ToVector3(v: Vec3) {
	return new Vector3(v[0], v[1], v[2]);
}

import { Workspace } from "@rbxts/services";

import { hull } from "../modeling/src/operations/hulls";
import sphere from "../modeling/src/primitives/sphere";

function generateNavmesh(parent: Instance) {
	const startTick = tick();
	print("Generating Navmesh");
	const PartGeometries: Geom3[] = [];

	for (const part of getParts(parent)) {
		const PartGeometry = getGeometryFromPart(part)!;
		PartGeometries.push(PartGeometry);
	}

	const UnionedGeometry = union(...PartGeometries) as Geom3;
	//drawGeometry3D(UnionedGeometry, Workspace);

	const GeometryExtrudedDown = extrudeDirection(UnionedGeometry, ValidateDownwards, AgentHeight, AgentDown)!;
	//drawGeometry3D(GeometryExtrudedDown, Workspace);

	const UpwardFacingPolygons = getPolygonsFacingDirection(UnionedGeometry, AgentUp);
	//drawGeometry3D(UpwardFacingPolygons, Workspace);

	const GeneralizedUpwardFacingPolygons = generalize(
		{ snap: true, simplify: true, triangulate: true },
		UpwardFacingPolygons,
	) as Geom3;
	//drawGeometry3D(GeneralizedUpwardFacingPolygons, Workspace);

	const HeightClippedGeometry = subtractClosedGeom3FromOpenGeom3(GeometryExtrudedDown, UpwardFacingPolygons);
	//drawGeometry3D(HeightClippedGeometry, Workspace);

	const GeneralizedHeightClippedGeometry = generalize(
		{ snap: true, simplify: true, triangulate: true },
		HeightClippedGeometry,
	) as Geom3;
	//drawGeometry3D(GeneralizedHeightClippedGeometry, Workspace);

	// Needs to be more selective with what borders to extrude
	const extrudedBorders: Geom3[] = [];
	for (const edge of validateManifold(GeneralizedHeightClippedGeometry)) {
		const [v1, v2] = StringToEdge(edge);
		//drawLine3D(Vec3ToVector3(v1), Vec3ToVector3(v2), [1, 0, 0], Workspace);
		const sphere1 = sphere({ radius: AgentRadius, center: v1, segments: 8 }) as Geom3;
		const sphere2 = sphere({ radius: AgentRadius, center: v2, segments: 8 }) as Geom3;
		const hulled = hull(sphere1, sphere2) as Geom3;
		//drawGeometry3D(hulled, Workspace);
		extrudedBorders.push(hulled);
	}

	const RadiusAndHeightClippedGeometry = subtractClosedGeom3FromOpenGeom3(
		union(...extrudedBorders) as Geom3,
		HeightClippedGeometry,
	);
	//drawGeometry3D(RadiusAndHeightClippedGeometry, Workspace);

	const GeneralizedRadiusAndHeightClippedGeometry = generalize(
		{ snap: true, simplify: true, triangulate: true },
		RadiusAndHeightClippedGeometry,
	) as Geom3;
	drawGeometry3D(GeneralizedRadiusAndHeightClippedGeometry, Workspace);

	// Build connectivity graph from WalkableSurfaceGeometry polygons
	const ConnectivityGraph = undefined;

	const endTick = tick();
	print(`Navmesh generated in ${endTick - startTick} seconds`);
	return ConnectivityGraph;
}

//import { Workspace } from "@rbxts/services";
//generateNavmesh(Workspace);

export default generateNavmesh;
