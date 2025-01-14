import { expect, test } from "@rbxts/jest-globals";

import { geom2, geom3, path2, poly3 } from "../geometries";
import { colorize } from "./index";

test("color (rgb on objects)", () => {
	const obj1 = {};
	const obj2 = [{ id: "a" }, { id: "b" }];

	const obs = colorize([1, 0, 0], obj1, obj2) as object[];
	const exp1 = { color: [1, 0, 0, 1] };
	const exp2 = { id: "a", color: [1, 0, 0, 1] };

	expect(obs.size()).toBe(3);
	expect(obs[0]).toEqual(exp1);
	expect(obs[1]).toEqual(exp2);

	const obs3 = colorize([1, 0, 0], obj1);
	const exp3 = { color: [1, 0, 0, 1] };
	expect(obs3).toEqual(exp3);
});

test("color (rgba on objects)", () => {
	const obj1 = {};
	const obj2 = [{ id: "a" }, { id: "b" }];

	const obs = colorize([1, 1, 0.5, 0.8], obj1, obj2) as object[];
	const exp1 = { color: [1, 1, 0.5, 0.8] };
	const exp2 = { id: "a", color: [1, 1, 0.5, 0.8] };

	expect(obs.size()).toBe(3);
	expect(obs[0]).toEqual(exp1);
	expect(obs[1]).toEqual(exp2);
});

test("color (rgba on geometry)", () => {
	const obj0 = geom2.fromPoints([
		[0, 0],
		[1, 0],
		[0, 1],
	]);
	const obj1 = geom3.fromPoints([
		[
			[0, 0, 0],
			[1, 0, 0],
			[1, 0, 1],
		],
	]);
	const obj2 = path2.fromPoints({ closed: true }, [
		[0, 0],
		[1, 0],
		[1, 1],
	]);
	const obj3 = poly3.create([
		[0, 0, 0],
		[1, 0, 0],
		[1, 1, 0],
	]);

	const obs = colorize([1, 1, 0.5, 0.8], obj0, obj1, obj2, obj3) as Geometry[];
	expect(obs.size()).toBe(4);

	expect(obj0).never.toBe(obs[0]);
	expect(obs[0].color).toEqual([1, 1, 0.5, 0.8]);

	expect(obj1).never.toBe(obs[1]);
	expect(obs[1].color).toEqual([1, 1, 0.5, 0.8]);

	expect(obj2).never.toBe(obs[2]);
	expect(obs[2].color).toEqual([1, 1, 0.5, 0.8]);

	expect(obj3).never.toBe(obs[3]);
	expect(obs[3].color).toEqual([1, 1, 0.5, 0.8]);
});

test("color (returns new object)", () => {
	const obj0 = geom2.fromPoints([
		[0, 0],
		[1, 0],
		[0, 1],
	]);
	// const obj1 = geom2.fromPoints([[0, 0], [1, 0], [0, 1]])
	// const obj2 = geom2.fromPoints([[0, 0], [1, 0], [0, 1]])
	const obj3 = geom2.fromPoints([
		[0, 0],
		[1, 0],
		[0, 1],
	]);

	const obs = colorize([1, 1, 1, 0.8], obj0, obj3) as Geometry[];
	expect(obj0).never.toBe(obs[0]);
	expect(obs[0].color).toEqual([1, 1, 1, 0.8]);
	expect(obj0.color).toBe(undefined);
	expect(obj3).never.toBe(obs[1]);
	expect(obs[1].color).toEqual([1, 1, 1, 0.8]);
	expect(obj3.color).toBe(undefined);
});
