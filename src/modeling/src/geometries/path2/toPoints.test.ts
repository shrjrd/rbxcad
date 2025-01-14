import { expect, test } from "@rbxts/jest-globals";

import vec2 from "../../maths/vec2";
import { fromPoints, toPoints } from "./index";

test("toPoints: An empty path produces an empty point array", () => {
	expect(toPoints(fromPoints({}, []))).toEqual([]);
});

test("toPoints: An non-empty open path produces a matching point array", () => {
	expect(toPoints(fromPoints({}, [[1, 1]]))).toEqual([vec2.fromValues(1, 1)]);
});
