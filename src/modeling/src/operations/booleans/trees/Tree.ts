import type { Poly3 } from "../../../geometries/types";
import { Node } from "./Node";
import { PolygonTreeNode } from "./PolygonTreeNode";

// # class Tree
// This is the root of a BSP tree.
// This separate class for the root of the tree in order to hold the PolygonTreeNode root.
// The actual tree is kept in this.rootnode
export class Tree {
	polygonTree: PolygonTreeNode;
	rootnode: Node;
	constructor(polygons: Poly3[]) {
		this.polygonTree = new PolygonTreeNode(undefined, undefined);
		this.rootnode = new Node(undefined!);
		if (polygons) this.addPolygons(polygons);
	}

	invert() {
		this.polygonTree.invert();
		this.rootnode.invert();
	}

	// Remove all polygons in this BSP tree that are inside the other BSP tree
	// `tree`.
	clipTo(tree: Tree, alsoRemoveCoplanarFront = false) {
		this.rootnode.clipTo(tree, alsoRemoveCoplanarFront);
	}

	allPolygons() {
		const result: Poly3[] = [];
		this.polygonTree.getPolygons(result);
		return result;
	}

	addPolygons(polygons: Poly3[]) {
		const polygonTreeNodes = new Array<PolygonTreeNode>(polygons.size());
		for (let i = 0; i < polygons.size(); i++) {
			polygonTreeNodes[i] = this.polygonTree.addChild(polygons[i]);
		}
		this.rootnode.addPolygonTreeNodes(polygonTreeNodes);
	}

	clear() {
		this.polygonTree.clear();
	}

	toString() {
		return "Tree: " + this.polygonTree.toString();
	}
}
