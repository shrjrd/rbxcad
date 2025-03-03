import type { Vec2 } from "../../../maths/types";

export class Contour {
	holeOf: number;
	depth: number;
	points: Vec2[];
	holeIds: number[];
	constructor() {
		this.points = [];
		this.holeIds = [];
		this.holeOf = undefined!;
		this.depth = 0;
	}

	isExterior() {
		return this.holeOf === undefined;
	}
}
