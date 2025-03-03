import type { Vec2 } from "../../../maths/types";
import { compareEvents } from "./compareEvents";
import { SweepEvent } from "./sweepEvent";
import { Queue } from "./tinyqueue";

/**
 * Divide the given segment at the given point, push the parts on the given queue.
 * @param {SweepEvent} segment
 * @param {Array.<Number>} point
 * @param {Queue} queue
 * @return {Queue} given queue
 */
export const divideSegment = (segment: SweepEvent, point: Vec2, queue: Queue) => {
	const r = new SweepEvent(point, false, segment, segment.isSubject);
	const l = new SweepEvent(point, true, segment.otherEvent, segment.isSubject);

	r.contourId = l.contourId = segment.contourId;

	// avoid a rounding error. The left event would be processed after the right event
	if (compareEvents(l, segment.otherEvent) > 0) {
		segment.otherEvent.left = true;
		l.left = false;
	}

	// avoid a rounding error. The left event would be processed after the right event
	// if (compareEvents(se, r) > 0) {}

	segment.otherEvent.otherEvent = l;
	segment.otherEvent = r;

	queue.push(l);
	queue.push(r);

	return queue;
};
