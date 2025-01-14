import { Node } from "./linkedList";

/**
 * check if a point lies within a convex triangle
 */
const pointInTriangle = (
	ax: number,
	ay: number,
	bx: number,
	by: number,
	cx: number,
	cy: number,
	px: number,
	py: number,
) =>
	(cx - px) * (ay - py) - (ax - px) * (cy - py) >= 0 &&
	(ax - px) * (by - py) - (bx - px) * (ay - py) >= 0 &&
	(bx - px) * (cy - py) - (cx - px) * (by - py) >= 0;

/**
 * signed area of a triangle
 */
const area = (p: Node, q: Node, r: Node) => (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);

export default { area, pointInTriangle };
export { area, pointInTriangle };
