import { Node } from "./linkedList";
// Simon Tatham's linked list merge sort algorithm
// https://www.chiark.greenend.org.uk/~sgtatham/algorithms/listsort.html
const sortLinked = (list: Node, fn: (p: Node) => number) => {
	let i, p, q, e, numMerges;
	let inSize = 1;

	do {
		p = list;
		list = undefined!;
		let tail: Node = undefined!;
		numMerges = 0;

		while (p) {
			numMerges++;
			q = p;
			let pSize = 0;
			for (i = 0; i < inSize; i++) {
				pSize++;
				q = q.nextZ;
				if (!q) break;
			}

			let qSize = inSize;

			while (pSize > 0 || (qSize > 0 && q)) {
				if (pSize !== 0 && (qSize === 0 || !q || fn(p) <= fn(q))) {
					e = p;
					p = p.nextZ;
					pSize--;
				} else {
					e = q;
					q = q.nextZ;
					qSize--;
				}

				if (tail) tail.nextZ = e;
				else list = e;

				e.prevZ = tail!;
				tail = e;
			}

			p = q;
		}

		tail.nextZ = undefined!;
		inSize *= 2;
	} while (numMerges > 1);

	return list;
};

export default sortLinked;
