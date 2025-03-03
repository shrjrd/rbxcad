import type { Vec2 } from "../../../maths/types";
/*
 * Implementation of the Martinez 2D polygon clipping algorithm
 * Copyright (c) 2018 Alexander Milevski
 * https://github.com/w8r/martinez
 */

import { compareSegments } from "./compareSegments";
import { computeFields } from "./computeFields";
import { DIFFERENCE, INTERSECTION } from "./operation";
import { possibleIntersection } from "./possibleIntersection";
import { Tree } from "./splaytree";
import { Queue } from "./tinyqueue";

export const subdivideSegments = (
	eventQueue: Queue,
	subject: Vec2[][][],
	clipping: Vec2[][][],
	sbbox: number[],
	cbbox: number[],
	operation: 0 | 1 | 2 | 3,
) => {
	const sweepLine = new Tree(compareSegments);
	const sortedEvents = [];

	const rightBound = math.min(sbbox[2], cbbox[2]);

	let prev, _next, begin;

	while (eventQueue.length !== 0) {
		const event = eventQueue.pop()!;
		sortedEvents.push(event);

		// optimization by bboxes for intersection and difference goes here
		if (
			(operation === INTERSECTION && event.point[0] > rightBound) ||
			(operation === DIFFERENCE && event.point[0] > sbbox[2])
		) {
			break;
		}

		if (event.left) {
			_next = prev = sweepLine.insert(event);
			begin = sweepLine.minNode();

			if (prev !== begin) prev = sweepLine.prev(prev);
			else prev = undefined;

			_next = sweepLine.next(_next);

			const prevEvent = prev ? prev.key : undefined;
			let prevprevEvent;
			computeFields(event, prevEvent!, operation);
			if (_next) {
				if (possibleIntersection(event, _next.key, eventQueue) === 2) {
					computeFields(event, prevEvent!, operation);
					computeFields(_next.key, event, operation);
				}
			}

			if (prev) {
				if (possibleIntersection(prev.key, event, eventQueue) === 2) {
					let prevprev = prev;
					if (prevprev !== begin) prevprev = sweepLine.prev(prevprev)!;
					else prevprev = undefined!;

					prevprevEvent = prevprev ? prevprev.key : undefined;
					computeFields(prevEvent!, prevprevEvent!, operation);
					computeFields(event, prevEvent!, operation);
				}
			}
		} else {
			_next = prev = sweepLine.find(event.otherEvent);

			if (prev && _next) {
				// FIXME is this correct? begin is assigned if event.left, not every iterration
				if (prev !== begin) prev = sweepLine.prev(prev);
				else prev = undefined;

				_next = sweepLine.next(_next);
				sweepLine.remove(event.otherEvent);

				if (_next && prev) {
					possibleIntersection(prev.key, _next.key, eventQueue);
				}
			}
		}
	}
	return sortedEvents;
};
