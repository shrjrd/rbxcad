import type { Vec2 } from "../../../maths/types";
const orient2d = (ax: number, ay: number, bx: number, by: number, cx: number, cy: number) =>
	(ay - cy) * (bx - cx) - (ax - cx) * (by - cy);

/**
 * Signed area of the triangle (p0, p1, p2)
 * @param {Array.<Number>} p0
 * @param {Array.<Number>} p1
 * @param {Array.<Number>} p2
 * @return {number}
 */
export const signedArea = (p0: Vec2, p1: Vec2, p2: Vec2) => {
	const res = orient2d(p0[0], p0[1], p1[0], p1[1], p2[0], p2[1]);
	if (res > 0) return -1;
	if (res < 0) return 1;
	return 0;
};
