import vec3 from "../../../maths/vec3";
import create from "./create";

const Vec3ToString = (vec: Vec3) => `${vec[0]},${vec[1]},${vec[2]}`;

/**
 * Mend gaps in a 2D slice to make it a closed polygon
 */
const repair = (slice: Slice) => {
	if (!slice.edges) return slice;
	let edges = slice.edges;
	const vertexMap = new Map<string, Vec3>(); // string key to vertex map
	const edgeCount = new Map<string, number>(); // count of (in - out) edges

	// Remove self-edges
	edges = edges.filter((e: [Vec3, Vec3]) => !vec3.equals(e[0], e[1]));

	// build vertex and edge count maps
	edges.forEach((edge: [Vec3, Vec3]) => {
		const inKey = Vec3ToString(edge[0]); //edge[0].toString();
		const outKey = Vec3ToString(edge[1]); //edge[1].toString();
		vertexMap.set(inKey, edge[0]);
		vertexMap.set(outKey, edge[1]);
		edgeCount.set(inKey, (edgeCount.get(inKey) || 0) + 1); // in
		edgeCount.set(outKey, (edgeCount.get(outKey) || 0) - 1); // out
	});

	// find vertices which are missing in or out edges
	const missingIn: string[] = [];
	const missingOut: string[] = [];
	edgeCount.forEach((count, vertex) => {
		if (count < 0) missingIn.push(vertex);
		if (count > 0) missingOut.push(vertex);
	});

	// pairwise distance of bad vertices
	missingIn.forEach((key1) => {
		const v1 = vertexMap.get(key1)!;

		// find the closest vertex that is missing an out edge
		let bestDistance = math.huge;
		let bestReplacement: Vec3;
		missingOut.forEach((key2) => {
			const v2 = vertexMap.get(key2)!;
			const distance = vec3.distance(v1, v2);
			if (distance < bestDistance) {
				bestDistance = distance;
				bestReplacement = v2;
			}
		});
		warn(`slice.repair: repairing vertex gap ${v1} to ${bestReplacement!} distance ${bestDistance}`);

		// merge broken vertices
		edges = edges.map((edge: [Vec3, Vec3]) => {
			if (Vec3ToString(edge[0]) === key1) return [bestReplacement, edge[1]];
			if (Vec3ToString(edge[1]) === key1) return [edge[0], bestReplacement];
			return edge;
		});
	});

	return create(edges);
};

export default repair;
