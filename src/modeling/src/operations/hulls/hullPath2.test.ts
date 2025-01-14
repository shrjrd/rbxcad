import { expect, test } from "@rbxts/jest-globals";

import { path2 } from "../../geometries";
import hullPath2 from "./hullPath2";

test("hullPath2", () => {
	const closed = true;
	const geometry1 = path2.fromPoints({ closed }, [
		[0, 0],
		[-4, 4],
		[-4, -4],
	]);
	const geometry2 = path2.fromPoints({ closed }, [
		[0, 0],
		[4, -4],
		[4, 4],
	]);

	const obs = hullPath2(geometry1, geometry2);
	expect(() => path2.validate(obs)).never.toThrow();
	const pts = path2.toPoints(obs);
	expect(pts.size()).toBe(4);
});
