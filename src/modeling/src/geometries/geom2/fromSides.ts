import type { Vec2 } from "../../maths/types";
import { Array as JsArray, JsMap } from "@rbxts/luau-polyfill";

import * as vec2 from "../../maths/vec2/index";
import { create } from "./create";

/**
 * Create a list of edges which SHARE points.
 * This allows the edges to be traversed in order.
 */
const toSharedPoints = (sides: Vec2[][]) => {
	const unique = new JsMap<string, Vec2>(); // {key: point}
	const getUniquePoint = (point: Vec2) => {
		const key = `${point[0]},${point[1]}`; //point.toString();
		if (unique.has(key)) {
			return unique.get(key)!;
		} else {
			unique.set(key, point);
			return point;
		}
	};

	return sides.map((side) => side.map(getUniquePoint));
};

/**
 * Convert a list of sides into a map from point to edges.
 */
const toPointMap = (sides: Vec2[][]) => {
	const pointMap = new JsMap<Vec2, Vec2[][]>();
	// first map to edges with shared vertices
	const edges = toSharedPoints(sides);
	// construct adjacent edges map
	edges.forEach((edge) => {
		if (pointMap.has(edge[0])) {
			pointMap.get(edge[0])!.push(edge);
		} else {
			pointMap.set(edge[0], [edge]);
		}
	});
	return pointMap;
};

/**
 * Create a new 2D geometry from a list of sides.
 * @param {Array} sides - list of sides to create outlines from
 * @returns {Geom2} a new geometry
 *
 * @example
 * let geometry = fromSides([[[0, 0], [1, 0]], [[1, 0], [1, 1]], [[1, 1], [0, 0]]])
 */
export const fromSides = (sides: Vec2[][]) => {
	const pointMap = toPointMap(sides); // {point: [edges]}
	const outlines: Vec2[][] = [];
	while (true) {
		let startSide: Vec2[] = undefined!;
		for (const [point, edges] of pointMap.entries() as unknown as [Vec2, Vec2[][]][]) {
			startSide = edges.shift()!;
			if (!startSide) {
				pointMap.delete(point);
				continue;
			}
			break;
		}
		if (startSide === undefined) break; // all starting sides have been visited

		const connectedPoints: Vec2[] = [];
		const startPoint = startSide[0];
		while (true) {
			connectedPoints.push(startSide[0]);
			const nextPoint = startSide[1];
			if (nextPoint === startPoint) break; // the outline has been closed
			const nextPossibleSides = pointMap.get(nextPoint);
			if (!nextPossibleSides) {
				throw `geometry is not closed at point ${nextPoint}`;
			}
			const nextSide = popNextSide(startSide, nextPossibleSides);
			if (nextPossibleSides.size() === 0) {
				pointMap.delete(nextPoint);
			}
			startSide = nextSide;
		} // inner loop

		// due to the logic of fromPoints()
		// move the first point to the last
		if (connectedPoints.size() > 0) {
			connectedPoints.push(connectedPoints.shift()!);
		}
		outlines.push(connectedPoints);
	} // outer loop
	pointMap.clear();
	return create(outlines);
};

// find the first counter-clockwise edge from startSide and pop from nextSides
const popNextSide = (startSide: Vec2[], nextSides: Vec2[][]) => {
	if (nextSides.size() === 1) {
		return nextSides.pop()!;
	}
	const v0 = vec2.create();
	const startAngle = vec2.angleDegrees(vec2.subtract(v0, startSide[1], startSide[0]));
	let bestAngle: number;
	let bestIndex: number;
	nextSides.forEach((nextSide, index) => {
		const nextAngle = vec2.angleDegrees(vec2.subtract(v0, nextSide[1], nextSide[0]));
		let angle = nextAngle - startAngle;
		if (angle < -180) angle += 360;
		if (angle >= 180) angle -= 360;
		if (bestIndex === undefined || angle > bestAngle) {
			bestIndex = index;
			bestAngle = angle;
		}
	});
	const nextSide = nextSides[bestIndex!];
	JsArray.splice(nextSides, bestIndex! + 1, 1); //nextSides.splice(bestIndex, 1); // remove side from list
	return nextSide;
};
