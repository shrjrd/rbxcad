import poly3 from "../../../geometries/poly3";
import plane from "../../../maths/plane";
import PolygonTreeNode from "./PolygonTreeNode";
import Tree from "./Tree";

// # class Node
// Holds a node in a BSP tree.
// A BSP tree is built from a collection of polygons by picking a polygon to split along.
// Polygons are not stored directly in the tree, but in PolygonTreeNodes, stored in this.polygontreenodes.
// Those PolygonTreeNodes are children of the owning Tree.polygonTree.
// This is not a leafy BSP tree since there is no distinction between internal and leaf nodes.
class Node {
	back: Node;
	front: Node;
	parent: Node;
	plane: Vec4;
	polygontreenodes: PolygonTreeNode[];
	constructor(parent: Node) {
		this.plane = undefined!;
		this.front = undefined!;
		this.back = undefined!;
		this.polygontreenodes = [];
		this.parent = parent;
	}

	// Convert solid space to empty space and empty space to solid space.
	invert() {
		const queue: Node[] = [this];
		let node: Node;
		/*
		for (let i = 0; i < queue.size(); i++) {
			node = queue[i];
			if (node.plane) node.plane = plane.flip(plane.create(), node.plane);
			if (node.front) queue.push(node.front);
			if (node.back) queue.push(node.back);
			const temp = node.front;
			node.front = node.back;
			node.back = temp;
		}
*/
		//DEVIATION: queue.size() doesn't update in the for loop
		let i = 0;
		while (i < queue.size()) {
			node = queue[i];
			if (node.plane) node.plane = plane.flip(plane.create(), node.plane);
			if (node.front) queue.push(node.front);
			if (node.back) queue.push(node.back);
			const temp = node.front;
			node.front = node.back;
			node.back = temp;
			i++;
		}
	}

	// clip polygontreenodes to our plane
	// calls remove() for all clipped PolygonTreeNodes
	clipPolygons(polygontreenodes: PolygonTreeNode[], alsoRemovecoplanarFront: boolean) {
		let current: { node: Node; polygontreenodes: PolygonTreeNode[] } = {
			node: this,
			polygontreenodes: polygontreenodes,
		};
		let node: Node;
		const stack: { node: Node; polygontreenodes: PolygonTreeNode[] }[] = [];

		do {
			node = current.node;
			polygontreenodes = current.polygontreenodes;
			if (node.plane) {
				const plane = node.plane;
				//print("plane", plane);
				const backnodes: PolygonTreeNode[] = [];
				const frontnodes: PolygonTreeNode[] = [];
				const coplanarfrontnodes = alsoRemovecoplanarFront ? backnodes : frontnodes;
				const numpolygontreenodes = polygontreenodes.size();
				for (let i = 0; i < numpolygontreenodes; i++) {
					const treenode = polygontreenodes[i];
					if (!treenode.isRemoved()) {
						// split this polygon tree node using the plane
						// NOTE: children are added to the tree if there are spanning polygons
						treenode.splitByPlane(plane, coplanarfrontnodes, backnodes, frontnodes, backnodes);
					}
				}

				if (node.front && frontnodes.size() > 0) {
					// add front node for further splitting
					stack.push({ node: node.front, polygontreenodes: frontnodes });
				}
				const numbacknodes = backnodes.size();
				if (node.back && numbacknodes > 0) {
					// add back node for further splitting
					stack.push({ node: node.back, polygontreenodes: backnodes });
				} else {
					// remove all back nodes from processing
					for (let i = 0; i < numbacknodes; i++) {
						backnodes[i].remove();
					}
				}
			}
			current = stack.pop()!;
		} while (current !== undefined);
	}

	// Remove all polygons in this BSP tree that are inside the other BSP tree
	// `tree`.
	clipTo(tree: Tree, alsoRemovecoplanarFront: boolean) {
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		let node: Node = this;
		const stack: Node[] = [];
		do {
			if (node.polygontreenodes.size() > 0) {
				tree.rootnode.clipPolygons(node.polygontreenodes, alsoRemovecoplanarFront);
			}
			if (node.front) stack.push(node.front);
			if (node.back) stack.push(node.back);
			node = stack.pop()!;
		} while (node !== undefined);
	}

	addPolygonTreeNodes(newpolygontreenodes: PolygonTreeNode[]) {
		let current: { node: Node; polygontreenodes: PolygonTreeNode[] } = {
			node: this,
			polygontreenodes: newpolygontreenodes,
		};
		const stack: { node: Node; polygontreenodes: PolygonTreeNode[] }[] = [];
		do {
			const node = current.node;
			const polygontreenodes = current.polygontreenodes;

			if (polygontreenodes.size() === 0) {
				current = stack.pop()!;
				continue;
			}
			if (!node.plane) {
				let index = 0; // default
				index = math.floor(polygontreenodes.size() / 2);
				// index = polygontreenodes.length >> 1
				// index = Math.floor(Math.random()*polygontreenodes.length)
				const bestpoly = polygontreenodes[index].getPolygon();
				node.plane = poly3.plane(bestpoly);
			}
			const frontnodes: PolygonTreeNode[] = [];
			const backnodes: PolygonTreeNode[] = [];
			const n = polygontreenodes.size();
			for (let i = 0; i < n; ++i) {
				polygontreenodes[i].splitByPlane(node.plane, node.polygontreenodes, backnodes, frontnodes, backnodes);
			}

			if (frontnodes.size() > 0) {
				if (!node.front) node.front = new Node(node);

				// unable to split by any of the current nodes
				const stopCondition = n === frontnodes.size() && backnodes.size() === 0;
				if (stopCondition) node.front.polygontreenodes = frontnodes;
				else stack.push({ node: node.front, polygontreenodes: frontnodes });
			}
			if (backnodes.size() > 0) {
				if (!node.back) node.back = new Node(node);

				// unable to split by any of the current nodes
				const stopCondition = n === backnodes.size() && frontnodes.size() === 0;

				if (stopCondition) node.back.polygontreenodes = backnodes;
				else stack.push({ node: node.back, polygontreenodes: backnodes });
			}

			current = stack.pop()!;
		} while (current !== undefined);
	}
}

export default Node;
