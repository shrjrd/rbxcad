import type { Color } from "../types";
import type { Mat4, Vec2 } from "../../maths/types";

export interface Path2 {
	points: Array<Vec2>;
	isClosed: boolean;
	transforms: Mat4;
	color?: Color;

	// used internally
	lastBezierControlPoint?: Vec2;
}
