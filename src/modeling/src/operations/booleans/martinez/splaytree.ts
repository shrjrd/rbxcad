/*
 * Follows "An implementation of top-down splaying"
 * by D. Sleator <sleator@cs.cmu.edu> March 1992
 *
 * Copyright (c) 2018 Alexander Milevski
 * https://github.com/w8r/splay-tree
 */

import { SweepEvent } from "./sweepEvent";

const DEFAULT_COMPARE = (a: number, b: number) => (a > b ? 1 : a < b ? -1 : 0);

class Node {
	key: SweepEvent;
	data: SweepEvent[];
	left: Node | undefined;
	right: Node | undefined;
	next: Node | undefined;

	constructor(key?: SweepEvent, data?: SweepEvent[]) {
		this.key = key!;
		this.data = data!;
		this.left = undefined;
		this.right = undefined;
		this.next = undefined;
	}
}

/**
 * Simple top down splay, not requiring i to be in the tree t.
 */
const splay = (key: SweepEvent, t: Node, comparator: (a: SweepEvent, b: SweepEvent) => number) => {
	const N = new Node(undefined, undefined);
	let left = N;
	let right = N;

	while (true) {
		const cmp = comparator(key, t.key);
		if (cmp < 0) {
			if (t.left === undefined) break;
			if (comparator(key, t.left.key) < 0) {
				const y = t.left; /* rotate right */
				t.left = y.right;
				y.right = t;
				t = y;
				if (t.left === undefined) break;
			}
			right.left = t; /* link right */
			right = t;
			t = t.left;
		} else if (cmp > 0) {
			if (t.right === undefined) break;
			if (comparator(key, t.right.key) > 0) {
				const y = t.right; /* rotate left */
				t.right = y.left;
				y.left = t;
				t = y;
				if (t.right === undefined) break;
			}
			left.right = t; /* link left */
			left = t;
			t = t.right;
		} else break;
	}
	/* assemble */
	left.right = t.left;
	right.left = t.right;

	t.left = N.right;
	t.right = N.left;
	return t;
};

const insert = (
	key: SweepEvent,
	data: SweepEvent[],
	root: Node,
	comparator: (a: SweepEvent, b: SweepEvent) => number,
) => {
	const node = new Node(key, data);

	if (root === undefined) {
		return node;
	}

	root = splay(key, root, comparator);
	const cmp = comparator(key, root.key);
	if (cmp < 0) {
		node.left = root.left;
		node.right = root;
		root.left = undefined;
	} else if (cmp >= 0) {
		node.right = root.right;
		node.left = root;
		root.right = undefined;
	}
	return node;
};

export class Tree {
	comparator: (a: SweepEvent, b: SweepEvent) => number;
	_root: Node | undefined;
	_size: number;

	constructor(comparator = DEFAULT_COMPARE as unknown as (a: SweepEvent, b: SweepEvent) => number) {
		this.comparator = comparator;
		this._root = undefined;
		this._size = 0;
	}

	/**
	 * Inserts a key, allows duplicates
	 */
	insert(key: SweepEvent, data?: SweepEvent[]) {
		this._root = insert(key, data!, this._root!, this.comparator);
		return this._root;
	}

	/**
	 * @param {Key} key
	 * @return {Node|null}
	 */
	remove(key: SweepEvent) {
		this._root = this._remove(key);
	}

	/**
	 * Deletes i from the tree if it's there
	 */
	_remove(key: SweepEvent) {
		if (this._root === undefined) return undefined;

		let x;
		const t = splay(key, this._root, this.comparator);
		const cmp = this.comparator(key, t.key);
		if (cmp === 0) {
			/* found it */
			if (t.left === undefined) {
				x = t.right;
			} else {
				x = splay(key, t.left, this.comparator);
				x.right = t.right;
			}
			return x;
		}
		return t; /* It wasn't there */
	}

	find(key: SweepEvent) {
		if (this._root) {
			this._root = splay(key, this._root, this.comparator);
			if (this.comparator(key, this._root.key) !== 0) return undefined;
		}
		return this._root;
	}

	minNode(t = this._root) {
		if (t) while (t.left) t = t.left;
		return t;
	}

	maxNode(t = this._root) {
		if (t) while (t.right) t = t.right;
		return t;
	}

	/**
	 * Return next node from the given.
	 */
	next(node: Node) {
		let successor = undefined;

		if (node.right) {
			successor = node.right;
			while (successor.left) successor = successor.left;
			return successor;
		}

		let root = this._root;
		while (root) {
			const cmp = this.comparator(node.key, root.key);
			if (cmp === 0) break;

			if (cmp < 0) {
				successor = root;
				root = root.left;
			} else {
				root = root.right;
			}
		}
		return successor;
	}

	/*
	 * Return previous node from the given.
	 */
	prev(node: Node) {
		let predecessor = undefined;

		if (node.left) {
			predecessor = node.left;
			while (predecessor.right) predecessor = predecessor.right;
			return predecessor;
		}

		let root = this._root;
		while (root) {
			const cmp = this.comparator(node.key, root.key);
			if (cmp === 0) break;

			if (cmp < 0) {
				root = root.left;
			} else {
				predecessor = root;
				root = root.right;
			}
		}
		return predecessor;
	}
}
