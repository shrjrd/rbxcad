import distance from "../../../maths/vec3/distance";
import squaredDistance from "../../../maths/vec3/squaredDistance";
import { Face } from "./Face";
import Vertex from "./Vertex";

/*
 * Original source from quickhull3d (https://github.com/mauriciopoppe/quickhull3d)
 * Copyright (c) 2015 Mauricio Poppe
 *
 * Adapted to JSCAD by Jeff Gay
 */

class HalfEdge {
	face: Face;
	next: HalfEdge;
	opposite: HalfEdge;
	prev: HalfEdge;
	vertex: Vertex;
	constructor(vertex: Vertex, face: Face) {
		this.vertex = vertex;
		this.face = face;
		this.next = undefined!;
		this.prev = undefined!;
		this.opposite = undefined!;
	}

	head() {
		return this.vertex;
	}

	tail() {
		return this.prev ? this.prev.vertex : undefined;
	}

	length() {
		if (this.tail()) {
			return distance(this.tail()!.point, this.head().point);
		}
		return -1;
	}

	lengthSquared() {
		if (this.tail()) {
			return squaredDistance(this.tail()!.point, this.head().point);
		}
		return -1;
	}

	setOpposite(edge: HalfEdge) {
		this.opposite = edge;
		edge.opposite = this;
	}
}

export default HalfEdge;
