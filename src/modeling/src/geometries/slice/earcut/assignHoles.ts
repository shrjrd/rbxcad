import type { Geom2 } from "../../types";
import { area } from "../../../maths/utils/area";
import { toOutlines } from "../../geom2/index";
import * as poly2 from "../../poly2/index";

/**
 * Constructs a polygon hierarchy of solids and holes.
 * The hierarchy is represented as a forest of trees. All trees shall be depth at most 2.
 * If a solid exists inside the hole of another solid, it will be split out as its own root.
 *
 * @param {Geom2} geometry
 * @returns {Array} an array of polygons with associated holes
 * @alias module:modeling/geometries/geom2.toTree
 *
 * @example
 * const geometry = subtract(rectangle({size: [5, 5]}), rectangle({size: [3, 3]}))
 * console.log(assignHoles(geometry))
 * [{
 *   "solid": [[-2.5,-2.5],[2.5,-2.5],[2.5,2.5],[-2.5,2.5]],
 *   "holes": [[[-1.5,1.5],[1.5,1.5],[1.5,-1.5],[-1.5,-1.5]]]
 * }]
 */
export const assignHoles = (geometry: Geom2) => {
	const outlines = toOutlines(geometry);
	const solids: number[] = []; // solid indices
	const holes: number[] = []; // hole indices
	outlines.forEach((outline, i) => {
		const a = area(outline);
		if (a < 0) {
			holes.push(i);
		} else if (a > 0) {
			solids.push(i);
		}
	});

	// for each hole, determine what solids it is inside of
	const children: number[][] = []; // child holes of solid[i]
	const parents: number[][] = []; // parent solids of hole[i]
	solids.forEach((s, i) => {
		const solid = outlines[s];
		children[i] = [];
		holes.forEach((h, j) => {
			const hole = outlines[h];
			// check if a point of hole j is inside solid i
			// DEVIATION: 0, NaN, and "" are falsy in TS.
			if (poly2.arePointsInside([hole[0]], poly2.create(solid)) === 1) {
				children[i].push(h);
				if (!parents[j]) parents[j] = [];
				parents[j].push(i);
			}
		});
	});

	// check if holes have multiple parents and choose one with fewest children
	holes.forEach((h, j) => {
		// ensure at least one parent exists
		if (parents[j] && parents[j].size() > 1) {
			// the solid directly containing this hole
			const directParent = minIndex(parents[j], (p) => children[p].size());
			parents[j].forEach((p, i) => {
				if (i !== directParent) {
					// Remove hole from skip level parents
					children[p] = children[p].filter((c) => c !== h);
				}
			});
		}
	});

	// map indices back to points
	return children.map((holes, i) => ({
		solid: outlines[solids[i]],
		holes: holes.map((h) => outlines[h]),
	}));
};

/**
 * Find the item in the list with smallest score(item).
 * If the list is empty, return undefined.
 */
const minIndex = (list: number[], score: (p: number) => number) => {
	let bestIndex;
	let best: number | undefined;
	list.forEach((item, index) => {
		const value = score(item);
		if (best === undefined || value < best) {
			bestIndex = index;
			best = value;
		}
	});
	return bestIndex;
};
