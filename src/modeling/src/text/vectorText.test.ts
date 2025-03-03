import { expect, test } from "@rbxts/jest-globals";

import { vectorText } from "./index";

test("vectorText (empty string)", () => {
	const obs = vectorText({}, "");
	expect(obs.size()).toBe(0);
});

test("vectorText (text)", () => {
	const obs = vectorText({}, "O I"); // one char with one closed path, one char with one open path
	expect(obs.size()).toBe(1);

	const vtext = obs[0];
	expect(vtext.width).toBe(46);
	expect(vtext.height).toBe(14);
	expect(vtext.chars.size()).toBe(2);

	// 'O'
	let vchar = vtext.chars[0];
	expect(vchar.width).toBe(22);
	expect(vchar.height).toBe(14);
	expect(vchar.paths.size()).toBe(1);
	expect(vchar.paths[0].isClosed).toBe(true);
	expect(vchar.paths[0].points.size()).toBe(20);

	expect(vchar.paths[0].points[0]).toEqual([9, 21]);

	// 'I'
	vchar = vtext.chars[1];
	expect(vchar.width).toBe(8);
	expect(vchar.height).toBe(14);
	expect(vchar.paths.size()).toBe(1);
	expect(vchar.paths[0].isClosed).toBe(false);

	// NOTE: ' ' in text is not in list of vchars, but produces an xOffset
	expect(vchar.paths[0].points[0]).toEqual([26 + 16, 21]);
});

test("vectorText (multi-line-text)", () => {
	// NOTE: control line spacing to verify '\n' characters are working
	const obs = vectorText({ lineSpacing: 1 }, "\nROCKS!\n\nOpen\nJSCAD\nROCKS!\n");
	// only those lines with characters will be returned
	expect(obs.size()).toBe(4);

	// ROCKS!
	let vtext = obs[0];
	expect(vtext.width).toBe(115);
	expect(vtext.height).toBe(14);
	expect(vtext.chars.size()).toBe(6);

	let vchar = vtext.chars[0];
	expect(vchar.paths[0].points[0]).toEqual([4, 7]);

	// Open
	vtext = obs[1];
	expect(vtext.width).toBe(78);
	expect(vtext.height).toBe(14);
	expect(vtext.chars.size()).toBe(4);

	vchar = vtext.chars[0];
	expect(vchar.paths[0].points[0]).toEqual([9, -21]);

	// JSCAD
	vtext = obs[2];
	expect(vtext.width).toBe(96);
	expect(vtext.height).toBe(14);
	expect(vtext.chars.size()).toBe(5);

	vchar = vtext.chars[0];
	expect(vchar.paths[0].points[0]).toEqual([12, -35]);

	// ROCKS!
	vtext = obs[3];
	expect(vtext.width).toBe(115);
	expect(vtext.height).toBe(14);
	expect(vtext.chars.size()).toBe(6);

	vchar = vtext.chars[0];
	expect(vchar.paths[0].points[0]).toEqual([4, -49]);
});

test("vectorText ({ yOffset }, text)", () => {
	const expectedTransform = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

	const obs = vectorText({ yOffset: 20 }, "y");
	expect(obs.size()).toBe(1);

	const vtext = obs[0];
	expect(vtext.width).toBe(16);
	expect(vtext.height).toBe(14);
	expect(vtext.chars.size()).toBe(1);

	// 'y'
	const vchar = vtext.chars[0];
	expect(vchar.width).toBe(16);
	expect(vchar.height).toBe(14);
	expect(vchar.paths.size()).toBe(2);
	expect(vchar.paths[0].points.size()).toBe(2);
	expect(vchar.paths[1].points.size()).toBe(6);

	expect(vchar.paths[0].points[0]).toEqual([2, 34]); // Y = 14 + 20 = 34
	expect(vchar.paths[0].transforms).toEqual(expectedTransform);
});

test("vectorText ({ xOffset }, text)", () => {
	const expectedTransform = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

	const obs = vectorText({ xOffset: 20 }, "y");
	expect(obs.size()).toBe(1);

	const vtext = obs[0];
	expect(vtext.width).toBe(16);
	expect(vtext.height).toBe(14);
	expect(vtext.chars.size()).toBe(1);

	// 'y'
	const vchar = vtext.chars[0];
	expect(vchar.width).toBe(16);
	expect(vchar.height).toBe(14);
	expect(vchar.paths.size()).toBe(2);
	expect(vchar.paths[0].points.size()).toBe(2);
	expect(vchar.paths[1].points.size()).toBe(6);

	expect(vchar.paths[0].points[0]).toEqual([22, 14]); // X = 2 + 20 = 22
	expect(vchar.paths[0].transforms).toEqual(expectedTransform);
});

test("vectorText ({ letterSpacing }, text)", () => {
	const obs = vectorText({ letterSpacing: 0.5 }, "JSCAD");
	expect(obs.size()).toBe(1);

	const vtext = obs[0];
	expect(vtext.height).toBe(14);
	expect(vtext.chars.size()).toBe(5);

	// 'J'
	let vchar = vtext.chars[0];
	expect(vchar.paths[0].points[0]).toEqual([12, 21]);

	// 'S'
	vchar = vtext.chars[1];
	expect(vchar.paths[0].points[0]).toEqual([40, 18]); // X = 33 + (1 * 14 * 0.5)

	// 'C'
	vchar = vtext.chars[2];
	expect(vchar.paths[0].points[0]).toEqual([68, 16]); // X = 54 + (2 * 14 * 0.5)

	// 'A'
	vchar = vtext.chars[3];
	expect(vchar.paths[0].points[0]).toEqual([87, 21]); // X = 66 + (3 * 14 * 0.5)

	// 'D'
	vchar = vtext.chars[4];
	expect(vchar.paths[0].points[0]).toEqual([107, 21]); // X = 79 + (4 * 14 * 0.5)
});

test("vectorText ({ align: center }, text)", () => {
	const expectedTransformA = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 18.5, 0, 0, 1];
	const expectedTransformAB = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 9, 0, 0, 1];
	const expectedTransformABC = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

	const obs = vectorText({ align: "center" }, "a\nab\nabc");
	expect(obs.size()).toBe(3);

	// 'a'
	let vtext = obs[0];
	expect(vtext.chars.size()).toBe(1);

	let vchar = vtext.chars[0];
	expect(vchar.paths[0].points[0]).toEqual([15, 14]);
	expect(vchar.paths[0].transforms).toEqual(expectedTransformA);

	// 'a b'
	vtext = obs[1];
	expect(vtext.chars.size()).toBe(2);

	vchar = vtext.chars[0];
	expect(vchar.paths[0].points[0]).toEqual([15, -16]);
	expect(vchar.paths[0].transforms).toEqual(expectedTransformAB);

	// 'a b c'
	vtext = obs[2];
	expect(vtext.chars.size()).toBe(3);

	vchar = vtext.chars[0];
	expect(vchar.paths[0].points[0]).toEqual([15, -46]);
	expect(vchar.paths[0].transforms).toEqual(expectedTransformABC);
});

test("vectorText ({ align: right }, text)", () => {
	const expectedTransformA = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 37, 0, 0, 1];
	const expectedTransformAB = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 18, 0, 0, 1];
	const expectedTransformABC = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

	const obs = vectorText({ align: "right" }, "a\nab\nabc");
	expect(obs.size()).toBe(3);

	// 'a'
	let vtext = obs[0];
	expect(vtext.chars.size()).toBe(1);

	let vchar = vtext.chars[0];
	expect(vchar.paths[0].points[0]).toEqual([15, 14]);
	expect(vchar.paths[0].transforms).toEqual(expectedTransformA);

	// 'a b'
	vtext = obs[1];
	expect(vtext.chars.size()).toBe(2);

	vchar = vtext.chars[0];
	expect(vchar.paths[0].points[0]).toEqual([15, -16]);
	expect(vchar.paths[0].transforms).toEqual(expectedTransformAB);

	// 'a b c'
	vtext = obs[2];
	expect(vtext.chars.size()).toBe(3);

	vchar = vtext.chars[0];
	expect(vchar.paths[0].points[0]).toEqual([15, -46]);
	expect(vchar.paths[0].transforms).toEqual(expectedTransformABC);
});

test("vectorText required options", () => {
	expect(() => vectorText()).toThrowError({ message: "text must be a string" });
	expect(() => vectorText({})).toThrowError({ message: "text must be a string" });
});
