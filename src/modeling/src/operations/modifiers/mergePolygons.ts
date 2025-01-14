import { Array, JsMap } from "@rbxts/luau-polyfill";

import poly3 from "../../geometries/poly3";
import aboutEqualNormals from "../../maths/utils/aboutEqualNormals";
import vec3 from "../../maths/vec3";

type Edge = {
	v1: Vec3;
	v2: Vec3;
	next: Edge;
	prev: Edge;
};

// create a set of edges from the given polygon, and link the edges as well
const createEdges = (polygon: Poly3) => {
	const points = poly3.toPoints(polygon);
	const edges = [];
	for (let i = 0; i < points.size(); i++) {
		const j = (i + 1) % points.size();
		const edge = {
			v1: points[i],
			v2: points[j],
		} as Edge;
		edges.push(edge);
	}
	// link the edges together
	for (let i = 0; i < edges.size(); i++) {
		const j = (i + 1) % points.size();
		edges[i].next = edges[j];
		edges[j].prev = edges[i];
	}
	return edges;
};

const insertEdge = (edges: InstanceType<typeof JsMap<string, Edge>>, edge: Edge) => {
	const key = `${edge.v1}:${edge.v2}`;
	edges.set(key, edge);
};

const deleteEdge = (edges: InstanceType<typeof JsMap<string, Edge>>, edge: Edge) => {
	const key = `${edge.v1}:${edge.v2}`;
	edges.delete(key);
};

const findOppositeEdge = (edges: InstanceType<typeof JsMap<string, Edge>>, edge: Edge) => {
	const key = `${edge.v2}:${edge.v1}`; // NOTE: OPPOSITE OF INSERT KEY
	return edges.get(key);
};

// calculate the two adjoining angles between the opposing edges
const calculateAnglesBetween = (current: Edge, opposite: Edge, normal: Vec3) => {
	let v0 = current.prev?.v1;
	let v1 = current.prev?.v2;
	let v2 = opposite.next?.v2;
	const angle1 = calculateAngle(v0, v1, v2, normal);

	v0 = opposite.prev?.v1;
	v1 = opposite.prev?.v2;
	v2 = current.next?.v2;
	const angle2 = calculateAngle(v0, v1, v2, normal);

	return [angle1, angle2];
};

const v1 = vec3.create();
const v2 = vec3.create();

const calculateAngle = (prevpoint: Vec3, point: Vec3, nextpoint: Vec3, normal: Vec3) => {
	const d0 = vec3.subtract(v1, point, prevpoint);
	const d1 = vec3.subtract(v2, nextpoint, point);
	vec3.cross(d0, d0, d1);
	return vec3.dot(d0, normal);
};

// create a polygon starting from the given edge (if possible)
const createPolygonAnd = (edge: Edge) => {
	let polygon: Poly3 | undefined;
	const points: Vec3[] = [];
	while (edge.next) {
		const _next = edge.next;

		points.push(edge.v1);

		edge.v1 = undefined!;
		edge.v2 = undefined!;
		edge.next = undefined!;
		edge.prev = undefined!;

		edge = _next;
	}
	if (points.size() > 0) polygon = poly3.create(points);
	return polygon;
};

/*
 * Merge COPLANAR polygons that share common edges.
 * @param {poly3[]} sourcepolygons - list of polygons
 * @returns {poly3[]} new set of polygons
 */
const mergeCoplanarPolygons = (sourcepolygons: Poly3[]) => {
	if (sourcepolygons.size() < 2) return sourcepolygons;

	const normal = sourcepolygons[0].plane;
	const polygons = Array.slice(sourcepolygons); //sourcepolygons.slice();
	const edgeList = new JsMap<string, Edge>();

	while (polygons.size() > 0) {
		// NOTE: the length of polygons WILL change
		const polygon = polygons.shift()!;
		const edges = createEdges(polygon);
		for (let i = 0; i < edges.size(); i++) {
			const current = edges[i];
			const opposite = findOppositeEdge(edgeList, current);
			if (opposite) {
				const angles = calculateAnglesBetween(current, opposite, normal!);
				if (angles[0] >= 0 && angles[1] >= 0) {
					const edge1 = opposite.next;
					const edge2 = current.next;
					// adjust the edges, linking together opposing polygons
					current.prev.next = opposite.next;
					current.next.prev = opposite.prev;

					opposite.prev.next = current.next;
					opposite.next.prev = current.prev;

					// remove the opposing edges
					current.v1 = undefined!;
					current.v2 = undefined!;
					current.next = undefined!;
					current.prev = undefined!;

					deleteEdge(edgeList, opposite);

					opposite.v1 = undefined!;
					opposite.v2 = undefined!;
					opposite.next = undefined!;
					opposite.prev = undefined!;

					const mergeEdges = (list: InstanceType<typeof JsMap<string, Edge>>, e1: Edge, e2: Edge) => {
						const newedge = {
							v1: e2.v1,
							v2: e1.v2,
							next: e1.next,
							prev: e2.prev,
						};
						// link in newedge
						e2.prev.next = newedge;
						e1.next.prev = newedge;
						// remove old edges
						deleteEdge(list, e1);
						e1.v1 = undefined!;
						e1.v2 = undefined!;
						e1.next = undefined!;
						e1.prev = undefined!;

						deleteEdge(list, e2);
						e2.v1 = undefined!;
						e2.v2 = undefined!;
						e2.next = undefined!;
						e2.prev = undefined!;
					};

					if (angles[0] === 0.0) {
						mergeEdges(edgeList, edge1, edge1.prev);
					}
					if (angles[1] === 0.0) {
						mergeEdges(edgeList, edge2, edge2.prev);
					}
				}
			} else {
				if (current.next) insertEdge(edgeList, current);
			}
		}
	}

	// build a set of polygons from the remaining edges
	const destpolygons: Poly3[] = [];
	edgeList.forEach((edge) => {
		const polygon = createPolygonAnd(edge);
		if (polygon) destpolygons.push(polygon);
	});

	edgeList.clear();

	return destpolygons;
};

const coplanar = (plane1: _Plane, plane2: _Plane) => {
	// expect the same distance from the origin, within tolerance
	if (math.abs(plane1[3] - plane2[3]) < 0.00000015) {
		return aboutEqualNormals(plane1, plane2);
	}
	return false;
};

const mergePolygons = (epsilon: number, polygons: Poly3[]) => {
	const polygonsPerPlane: [Vec4, Poly3[]][] = []; // elements: [plane, [poly3...]]
	polygons.forEach((polygon: Poly3) => {
		const mapping = polygonsPerPlane.find((element) => coplanar(element[0], poly3.plane(polygon)));
		if (mapping) {
			const polygons = mapping[1];
			polygons.push(polygon);
		} else {
			polygonsPerPlane.push([poly3.plane(polygon), [polygon]]);
		}
	});

	let destpolygons: Poly3[] = [];
	polygonsPerPlane.forEach((mapping) => {
		const sourcepolygons = mapping[1];
		const retesselayedpolygons = mergeCoplanarPolygons(sourcepolygons);
		destpolygons = Array.concat(destpolygons, retesselayedpolygons); //destpolygons.concat(retesselayedpolygons);
	});
	return destpolygons;
};

export default mergePolygons;
