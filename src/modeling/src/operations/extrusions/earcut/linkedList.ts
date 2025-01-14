import sortLinked from "./linkedListSort";

class Node {
	i: number;
	next: Node;
	nextZ: Node;
	prev: Node;
	prevZ: Node;
	steiner: boolean;
	x: number;
	y: number;
	z: number;
	constructor(i: number, x: number, y: number) {
		// vertex index in coordinates array
		this.i = i;

		// vertex coordinates
		this.x = x;
		this.y = y;

		// previous and next vertex nodes in a polygon ring
		this.prev = undefined!;
		this.next = undefined!;

		// z-order curve value
		this.z = undefined!;

		// previous and next nodes in z-order
		this.prevZ = undefined!;
		this.nextZ = undefined!;

		// indicates whether this is a steiner point
		this.steiner = false;
	}
}

/**
 * create a node and optionally link it with previous one (in a circular doubly linked list)
 */
const insertNode = (i: number, x: number, y: number, last: Node) => {
	const p = new Node(i, x, y);

	if (!last) {
		p.prev = p;
		p.next = p;
	} else {
		p.next = last.next;
		p.prev = last;
		last.next.prev = p;
		last.next = p;
	}

	return p;
};

/**
 * remove a node and join prev with next nodes
 */
const removeNode = (p: Node) => {
	p.next.prev = p.prev;
	p.prev.next = p.next;

	if (p.prevZ) p.prevZ.nextZ = p.nextZ;
	if (p.nextZ) p.nextZ.prevZ = p.prevZ;
};

export default { Node, insertNode, removeNode, sortLinked };
export { insertNode, Node, removeNode, sortLinked };
