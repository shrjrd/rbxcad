import { expect, test } from "@rbxts/jest-globals";

import { comparePoints } from "../../test/helpers/index";
import { path2 } from "../geometries/index";
import { line } from "./index";

test("line (defaults)", () => {
	const exp = [
		[0, 0],
		[1, 1],
		[-3, 3],
	];
	const geometry = line([
		[0, 0],
		[1, 1],
		[-3, 3],
	]);
	const obs = path2.toPoints(geometry);

	expect(() => path2.validate(geometry)).never.toThrow();
	expect(obs.size()).toBe(3);
	expect(comparePoints(obs, exp)).toBe(true);
});
