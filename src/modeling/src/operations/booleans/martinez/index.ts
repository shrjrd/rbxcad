import type { Vec2 } from "../../../maths/types";
import type { Geom2 } from "../../../geometries/types";
import { Array as JsArray } from "@rbxts/luau-polyfill";

/*
 * Implementation of the Martinez 2D polygon clipping algorithm.
 * Copyright (c) 2018 Alexander Milevski
 * https://github.com/w8r/martinez
 *
 * Adapted for JSCAD by @platypii
 */
import * as geom2 from "../../../geometries/geom2/index";
import * as vec2 from "../../../maths/vec2/index";
import { connectEdges } from "./connectEdges";
import { fillQueue } from "./fillQueue";
import { DIFFERENCE, INTERSECTION, UNION, XOR } from "./operation";
import { subdivideSegments } from "./subdivideSegments";

const EMPTY: never[] = [];

/**
 * Fast path for trivial operations like intersection with empty geometry
 * Returns null if operation is non-trivial
 */
const trivialOperation = (subject: Vec2[][][], clipping: Vec2[][][], operation: 0 | 1 | 2 | 3): Geom2 | undefined => {
	let result = undefined;
	if (subject.size() * clipping.size() === 0) {
		if (operation === INTERSECTION) {
			return EMPTY as unknown as undefined;
		} else if (operation === DIFFERENCE) {
			result = subject;
		} else if (operation === UNION || operation === XOR) {
			result = subject.size() === 0 ? clipping : subject;
		}
	}
	if (result === EMPTY) {
		return geom2.create();
	} else if (result) {
		return fromOutlines(JsArray.flat(result, 0)); //return fromOutlines(result.flat());
	} else {
		return undefined;
	}
};

/**
 * Fast path for non-intersecting subjects
 * Returns null if operation is non-trivial
 */
const compareBBoxes = (
	subject: Vec2[][][],
	clipping: Vec2[][][],
	sbbox: number[],
	cbbox: number[],
	operation: 0 | 1 | 2 | 3,
) => {
	let result = undefined;
	if (sbbox[0] > cbbox[2] || cbbox[0] > sbbox[2] || sbbox[1] > cbbox[3] || cbbox[1] > sbbox[3]) {
		if (operation === INTERSECTION) {
			result = EMPTY;
		} else if (operation === DIFFERENCE) {
			result = subject;
		} else if (operation === UNION || operation === XOR) {
			result = JsArray.concat(subject, clipping); //subject.concat(clipping);
		}
	}
	if (result === EMPTY) {
		return geom2.create();
	} else if (result) {
		return fromOutlines(JsArray.flat(result, 0)); //fromOutlines(result.flat());
	} else {
		return undefined;
	}
};

/**
 * Convert from geom2 to martinez data structure
 */
const toMartinez = (geometry: Geom2) => {
	const outlines: Vec2[][] = [];
	geom2.toOutlines(geometry).forEach((outline) => {
		// Martinez expects first point == last point
		if (vec2.equals(outline[0], outline[outline.size() - 1])) {
			outlines.push(outline);
		} else {
			outlines.push([...outline, outline[0]]);
		}
	});
	return [outlines];
};

/**
 * Convert martinez data structure to geom2
 */
const fromOutlines = (outlines: Vec2[][]) => {
	outlines.forEach((outline) => {
		if (vec2.equals(outline[0], outline[outline.size() - 1])) {
			outline.pop(); // first == last point
		}
	});
	// Martinez sometime returns empty outlines, filter them out
	outlines = outlines.filter((o) => o.size() >= 3);
	return geom2.create(outlines);
};

export const boolean = (subjectGeom: Geom2, clippingGeom: Geom2, operation: 0 | 1 | 2 | 3) => {
	// Convert from geom2 to outlines
	const subject = toMartinez(subjectGeom);
	const clipping = toMartinez(clippingGeom);

	let trivial = trivialOperation(subject, clipping, operation);
	if (trivial) {
		return trivial;
	}
	const sbbox = [math.huge, math.huge, -math.huge, -math.huge];
	const cbbox = [math.huge, math.huge, -math.huge, -math.huge];

	const eventQueue = fillQueue(subject, clipping, sbbox, cbbox, operation);

	trivial = compareBBoxes(subject, clipping, sbbox, cbbox, operation);
	if (trivial) {
		return trivial;
	}
	const sortedEvents = subdivideSegments(eventQueue, subject, clipping, sbbox, cbbox, operation);

	const contours = connectEdges(sortedEvents); //connectEdges(sortedEvents, operation);
	// Convert contours to geom2
	const polygons = [];
	for (let i = 0; i < contours.size(); i++) {
		const contour = contours[i];
		if (contour.isExterior()) {
			// The exterior ring goes first
			const rings = [contour.points];
			// Followed by holes if any
			for (let j = 0; j < contour.holeIds.size(); j++) {
				const holeId = contour.holeIds[j];
				// Reverse the order of points for holes
				const holePoints = contours[holeId].points;
				const hole = [];
				for (let k = holePoints.size() - 2; k >= 0; k--) {
					hole.push(holePoints[k]);
				}
				rings.push(hole);
			}
			polygons.push(rings);
		}
	}

	if (polygons.size() > 0) {
		return fromOutlines(JsArray.flat(polygons, 0)); //fromOutlines(polygons.flat());
	} else {
		return geom2.create();
	}
};
