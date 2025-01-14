import { expect, test } from "@rbxts/jest-globals";

import { close, create, fromPoints } from "./index";

test("close: closes an empty path", () => {
	const p1 = create();
	expect(p1.isClosed).toBe(false);

	const p2 = close(p1);
	expect(p2.isClosed).toBe(true);
	expect(p1).never.toBe(p2);

	const p3 = close(p2);
	expect(p3.isClosed).toBe(true);
	expect(p2).toBe(p3);
});

test("close: closes various paths", () => {
	let p1 = create();
	p1 = close(p1);
	expect(p1.isClosed).toBe(true);
	expect(0).toBe(p1.points.size());

	let p2 = fromPoints({ closed: false }, []);
	p2 = close(p2);
	expect(p2.isClosed).toBe(true);
	expect(0).toBe(p2.points.size());

	let p3 = fromPoints({ closed: true }, [[0, 0]]);
	p3 = close(p3);
	expect(p3.isClosed).toBe(true);
	expect(1).toBe(p3.points.size());

	let p4 = fromPoints({ closed: true }, [
		[0, 0],
		[0, 0],
	]);
	p4 = close(p4);
	expect(p4.isClosed).toBe(true);
	expect(1).toBe(p4.points.size()); // the last point is removed

	let p5 = fromPoints({ closed: true }, [
		[0, 0],
		[1, 1],
		[0, 0],
	]);
	p5 = close(p5);
	expect(p5.isClosed).toBe(true);
	expect(2).toBe(p5.points.size()); // the last point is removed
});
