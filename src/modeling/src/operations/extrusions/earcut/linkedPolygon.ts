import { insertNode, Node, removeNode } from "./linkedList";
import { area } from "./triangle";

/**
 * create a circular doubly linked list from polygon points in the specified winding order
 */
const linkedPolygon = (data: number[], start: number, _end: number, dim: number, clockwise: boolean) => {
	let last: Node;

	if (clockwise === signedArea(data, start, _end, dim) > 0) {
		for (let i = start; i < _end; i += dim) {
			last = insertNode(i, data[i], data[i + 1], last!);
		}
	} else {
		for (let i = _end - dim; i >= start; i -= dim) {
			last = insertNode(i, data[i], data[i + 1], last!);
		}
	}

	if (last! && equals(last, last.next)) {
		removeNode(last);
		last = last.next;
	}

	return last!;
};

/**
 * eliminate colinear or duplicate points
 */
const filterPoints = (start: Node, _end?: Node) => {
	if (!start) return start;
	if (!_end) _end = start;

	let p = start;
	let again;
	do {
		again = false;

		if (!p.steiner && (equals(p, p.next) || area(p.prev, p, p.next) === 0)) {
			removeNode(p);
			p = _end = p.prev;
			if (p === p.next) break;
			again = true;
		} else {
			p = p.next;
		}
	} while (again || p !== _end);

	return _end;
};

/**
 * go through all polygon nodes and cure small local self-intersections
 */
const cureLocalIntersections = (start: Node, triangles: number[], dim: number) => {
	let p = start;
	do {
		const a = p.prev;
		const b = p.next.next;

		if (!equals(a, b) && intersects(a, p, p.next, b) && locallyInside(a, b) && locallyInside(b, a)) {
			triangles.push(a.i / dim);
			triangles.push(p.i / dim);
			triangles.push(b.i / dim);

			// remove two nodes involved
			removeNode(p);
			removeNode(p.next);

			p = start = b;
		}

		p = p.next;
	} while (p !== start);

	return filterPoints(p);
};

/**
 * check if a polygon diagonal intersects any polygon segments
 */
const intersectsPolygon = (a: Node, b: Node) => {
	let p = a;
	do {
		if (p.i !== a.i && p.next.i !== a.i && p.i !== b.i && p.next.i !== b.i && intersects(p, p.next, a, b))
			return true;
		p = p.next;
	} while (p !== a);

	return false;
};

/**
 * check if a polygon diagonal is locally inside the polygon
 */
const locallyInside = (a: Node, b: Node) =>
	area(a.prev, a, a.next) < 0
		? area(a, b, a.next) >= 0 && area(a, a.prev, b) >= 0
		: area(a, b, a.prev) < 0 || area(a, a.next, b) < 0;

/**
 * check if the middle point of a polygon diagonal is inside the polygon
 */
const middleInside = (a: Node, b: Node) => {
	let p = a;
	let inside = false;
	const px = (a.x + b.x) / 2;
	const py = (a.y + b.y) / 2;
	do {
		if (
			p.y > py !== p.next.y > py &&
			p.next.y !== p.y &&
			px < ((p.next.x - p.x) * (py - p.y)) / (p.next.y - p.y) + p.x
		) {
			inside = !inside;
		}
		p = p.next;
	} while (p !== a);

	return inside;
};

/**
 * link two polygon vertices with a bridge; if the vertices belong to the same ring, it splits polygon into two
 * if one belongs to the outer ring and another to a hole, it merges it into a single ring
 */
const splitPolygon = (a: Node, b: Node) => {
	const a2 = new Node(a.i, a.x, a.y);
	const b2 = new Node(b.i, b.x, b.y);
	const an = a.next;
	const bp = b.prev;

	a.next = b;
	b.prev = a;

	a2.next = an;
	an.prev = a2;

	b2.next = a2;
	a2.prev = b2;

	bp.next = b2;
	b2.prev = bp;

	return b2;
};

/**
 * check if a diagonal between two polygon nodes is valid (lies in polygon interior)
 */
const isValidDiagonal = (a: Node, b: Node) =>
	a.next.i !== b.i &&
	a.prev.i !== b.i &&
	!intersectsPolygon(a, b) && // doesn't intersect other edges
	((locallyInside(a, b) &&
		locallyInside(b, a) &&
		middleInside(a, b) && // locally visible
		(area(a.prev, a, b.prev) || area(a, b.prev, b))) || // does not create opposite-facing sectors
		(equals(a, b) && area(a.prev, a, a.next) > 0 && area(b.prev, b, b.next) > 0));

/**
 * check if two segments intersect
 */
const intersects = (p1: Node, q1: Node, p2: Node, q2: Node) => {
	const o1 = math.sign(area(p1, q1, p2));
	const o2 = math.sign(area(p1, q1, q2));
	const o3 = math.sign(area(p2, q2, p1));
	const o4 = math.sign(area(p2, q2, q1));

	if (o1 !== o2 && o3 !== o4) return true; // general case

	if (o1 === 0 && onSegment(p1, p2, q1)) return true; // p1, q1 and p2 are colinear and p2 lies on p1q1
	if (o2 === 0 && onSegment(p1, q2, q1)) return true; // p1, q1 and q2 are colinear and q2 lies on p1q1
	if (o3 === 0 && onSegment(p2, p1, q2)) return true; // p2, q2 and p1 are colinear and p1 lies on p2q2
	if (o4 === 0 && onSegment(p2, q1, q2)) return true; // p2, q2 and q1 are colinear and q1 lies on p2q2

	return false;
};

/**
 * for colinear points p, q, r, check if point q lies on segment pr
 */
const onSegment = (p: Node, q: Node, r: Node) =>
	q.x <= math.max(p.x, r.x) && q.x >= math.min(p.x, r.x) && q.y <= math.max(p.y, r.y) && q.y >= math.min(p.y, r.y);

const signedArea = (data: number[], start: number, _end: number, dim: number) => {
	let sum = 0;
	for (let i = start, j = _end - dim; i < _end; i += dim) {
		sum += (data[j] - data[i]) * (data[i + 1] + data[j + 1]);
		j = i;
	}

	return sum;
};

/**
 * check if two points are equal
 */
const equals = (p1: Node, p2: Node) => p1.x === p2.x && p1.y === p2.y;

export default { cureLocalIntersections, filterPoints, isValidDiagonal, linkedPolygon, locallyInside, splitPolygon };
export { cureLocalIntersections, filterPoints, isValidDiagonal, linkedPolygon, locallyInside, splitPolygon };
