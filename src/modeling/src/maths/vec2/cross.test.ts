import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { cross } from "./index";

test("vec2: cross() called with three parameters should update a vec2 with correct values", () => {
	const obs1: Vec3 = [0, 0, 0];
	const ret1 = cross(obs1, [0, 0], [0, 0]);
	expect(compareVectors(obs1, [0, 0, 0])).toBe(true);
	expect(compareVectors(ret1, [0, 0, 0])).toBe(true);

	const obs2: Vec3 = [0, 0, 0];
	const ret2 = cross(obs2, [5, 5], [10, 20]);
	expect(compareVectors(obs2, [0, 0, 50])).toBe(true);
	expect(compareVectors(ret2, [0, 0, 50])).toBe(true);

	const obs3: Vec3 = [0, 0, 0];
	const ret3 = cross(obs3, [5, 5], [10, -20]);
	expect(compareVectors(obs3, [0, 0, -150])).toBe(true);
	expect(compareVectors(ret3, [0, 0, -150])).toBe(true);

	const obs4: Vec3 = [0, 0, 0];
	const ret4 = cross(obs4, [5, 5], [-10, -20]);
	expect(compareVectors(obs4, [0, 0, -50])).toBe(true);
	expect(compareVectors(ret4, [0, 0, -50])).toBe(true);

	const obs5: Vec3 = [0, 0, 0];
	const ret5 = cross(obs5, [5, 5], [-10, 20]);
	expect(compareVectors(obs5, [0, 0, 150])).toBe(true);
	expect(compareVectors(ret5, [0, 0, 150])).toBe(true);

	const obs6: Vec3 = [0, 0, 0];
	const ret6 = cross(obs6, [5, 5], [10, 20]);
	expect(compareVectors(obs6, [0, 0, 50])).toBe(true);
	expect(compareVectors(ret6, [0, 0, 50])).toBe(true);

	const obs7: Vec3 = [0, 0, 0];
	const ret7 = cross(obs7, [5, 5], [10, -20]);
	expect(compareVectors(obs7, [0, 0, -150])).toBe(true);
	expect(compareVectors(ret7, [0, 0, -150])).toBe(true);

	const obs8: Vec3 = [0, 0, 0];
	const ret8 = cross(obs8, [5, 5], [-10, -20]);
	expect(compareVectors(obs8, [0, 0, -50])).toBe(true);
	expect(compareVectors(ret8, [0, 0, -50])).toBe(true);

	const obs9: Vec3 = [0, 0, 0];
	const ret9 = cross(obs9, [5, 5], [-10, 20]);
	expect(compareVectors(obs9, [0, 0, 150])).toBe(true);
	expect(compareVectors(ret9, [0, 0, 150])).toBe(true);
});
