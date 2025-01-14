import Node from "./Node";
import PolygonTreeNode from "./PolygonTreeNode";

// # class Tree
// This is the root of a BSP tree.
// This separate class for the root of the tree in order to hold the PolygonTreeNode root.
// The actual tree is kept in this.rootnode
class Tree {
	polygonTree: PolygonTreeNode;
	rootnode: Node;
	constructor(polygons: Poly3[]) {
		this.polygonTree = new PolygonTreeNode();
		this.rootnode = new Node(undefined!);
		if (polygons) this.addPolygons(polygons);
	}

	invert() {
		this.polygonTree.invert();
		this.rootnode.invert();
	}

	// Remove all polygons in this BSP tree that are inside the other BSP tree
	// `tree`.
	clipTo(tree: Tree, alsoRemovecoplanarFront = false) {
		this.rootnode.clipTo(tree, alsoRemovecoplanarFront);
	}

	allPolygons() {
		const result: Poly3[] = [];
		this.polygonTree.getPolygons(result);
		return result;
	}

	addPolygons(polygons: Poly3[]) {
		const polygontreenodes = new Array(polygons.size()) as PolygonTreeNode[];
		for (let i = 0; i < polygons.size(); i++) {
			polygontreenodes[i] = this.polygonTree.addChild(polygons[i]);
		}
		this.rootnode.addPolygonTreeNodes(polygontreenodes);
	}

	clear() {
		this.polygonTree.clear();
	}

	toString() {
		const result = "Tree: " + this.polygonTree.toString();
		return result;
	}
}

export default Tree;
