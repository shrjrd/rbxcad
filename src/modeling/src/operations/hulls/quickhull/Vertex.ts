/*
 * Original source from quickhull3d (https://github.com/mauriciopoppe/quickhull3d)
 * Copyright (c) 2015 Mauricio Poppe
 *
 * Adapted to JSCAD by Jeff Gay
 */

import { Face } from "./Face";

class Vertex {
	face: Face;
	index: number;
	next: Vertex;
	point: Vec3;
	prev: Vertex;
	constructor(point: Vec3, index: number) {
		this.point = point;
		// index in the input array
		this.index = index;
		// vertex is a double linked list node
		this.next = undefined!;
		this.prev = undefined!;
		// the face that is able to see this point
		this.face = undefined!;
	}
}

export default Vertex;
