import type { Geom2, Geom3 } from "../../modeling/src/geometries/types";
import type { Vec2 } from "../../modeling/src/maths/types";

import { union } from "../../modeling/src/operations/booleans";
import { extrudeLinear } from "../../modeling/src/operations/extrusions";
import { hullChain } from "../../modeling/src/operations/hulls";
import { translate } from "../../modeling/src/operations/transforms";
import { circle, sphere } from "../../modeling/src/primitives";
import { vectorText } from "../../modeling/src/text";

/**
 * Basic Text Creation
 * @category Creating Shapes
 * @skillLevel 10
 * @description Demonstrating methods of building 3D text
 * @tags text, font, characters
 * @authors Simon Clark
 * @licence MIT License
 */
const main = (params: { outline_string: string; flat_string: string; round_string: string }) => {
	const outlineText = buildOutlineText(params.outline_string, 2);
	const flatText = buildFlatText(params.flat_string, 2, 2);
	const roundText = buildRoundText(params.round_string, 2);

	return [outlineText, flatText, roundText];
};

// Build text by creating the font strokes (2D).
const buildOutlineText = (message: string, characterLineWidth: number) => {
	if (message === undefined || message.size() === 0) return [];

	const lineRadius = characterLineWidth / 2;
	const lineCorner = circle({ radius: lineRadius });

	const lineSegmentPointArrays = vectorText({ xOffset: 0, yOffset: 0 }, message); // line segments for each character

	const lineSegments: Geom2[] = [];
	/*
	lineSegmentPointArrays.forEach((segmentPoints) => {
		// process the line segment
		const corners = segmentPoints.map((point) => translate(point, lineCorner));
		lineSegments.push(hullChain(corners) as Geom2);
	});
	*/
	for (const line of lineSegmentPointArrays) {
		for (const char of line.chars) {
			for (const path of char.paths) {
				const corners = path.points.map((point: Vec2) => translate(point, lineCorner));
				lineSegments.push(hullChain(corners) as Geom2);
				if (path.isClosed) {
					lineSegments.push(hullChain(corners[corners.size() - 1], corners[0]) as Geom2);
				}
			}
		}
	}

	const message2D = union(...lineSegments) as Geom2;
	return translate([0, 35, 0], message2D);
};

// Build text by creating the font strokes (2D), then extruding up (3D).
const buildFlatText = (message: string, extrusionHeight: number, characterLineWidth: number) => {
	if (message === undefined || message.size() === 0) return [];

	const lineRadius = characterLineWidth / 2;
	const lineCorner = circle({ radius: lineRadius });

	const lineSegmentPointArrays = vectorText({ xOffset: 0, yOffset: 0 }, message); // line segments for each character
	const lineSegments: Geom2[] = [];
	/*
	lineSegmentPointArrays.forEach((segmentPoints) => {
		// process the line segment
		const corners = segmentPoints.map((point) => translate(point, lineCorner));
		lineSegments.push(hullChain(corners) as Geom2);
	});
	*/
	for (const line of lineSegmentPointArrays) {
		for (const char of line.chars) {
			for (const path of char.paths) {
				const corners = path.points.map((point: Vec2) => translate(point, lineCorner));
				lineSegments.push(hullChain(corners) as Geom2);
				if (path.isClosed) {
					lineSegments.push(hullChain(corners[corners.size() - 1], corners[0]) as Geom2);
				}
			}
		}
	}
	const message2D = union(...lineSegments) as Geom2;
	const message3D = extrudeLinear({ height: extrusionHeight }, message2D);
	return translate([0, 0, 0], message3D);
};

// Build text by creating the font strokes (3D).
const buildRoundText = (message: string, p: number) => {
	if (message === undefined || message.size() === 0) return [];

	const lineRadius = p / 2;
	const lineCorner = sphere({ radius: lineRadius, center: [0, 0, lineRadius], segments: 16 });

	const lineSegmentPointArrays = vectorText({ xOffset: 0, yOffset: 0 }, message); // line segments for each character
	const lineSegments: Geom2[] = [];
	/*
	lineSegmentPointArrays.forEach((segmentPoints) => {
		// process the line segment
		const corners = segmentPoints.map((point) => translate(point, lineCorner));
		lineSegments.push(hullChain(corners) as Geom2);
	});
	*/
	for (const line of lineSegmentPointArrays) {
		for (const char of line.chars) {
			for (const path of char.paths) {
				const corners = path.points.map((point: Vec2) => translate(point, lineCorner));
				lineSegments.push(hullChain(corners) as Geom2);
				if (path.isClosed) {
					lineSegments.push(hullChain(corners[corners.size() - 1], corners[0]) as Geom2);
				}
			}
		}
	}
	const message3D = union(...lineSegments) as Geom3;
	return translate([0, -35, 0], message3D);
};

export default main;
