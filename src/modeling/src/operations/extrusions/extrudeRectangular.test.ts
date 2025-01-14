import { expect, test } from "@rbxts/jest-globals";

import { geom2, geom3 } from "../../geometries";
import { TAU } from "../../maths/constants";
import { arc, rectangle } from "../../primitives";
import { extrudeRectangular } from "./index";

test("extrudeRectangular (defaults)", () => {
	const geometry1 = arc({ radius: 5, endAngle: TAU / 4, segments: 16 });
	const geometry2 = rectangle({ size: [5, 5] });

	let obs = extrudeRectangular({}, geometry1) as Geom3;
	let pts = geom3.toPoints(obs);
	expect(() => geom3.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(44);

	obs = extrudeRectangular({}, geometry2) as Geom3;
	pts = geom3.toPoints(obs);
	expect(() => geom3.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(32);
});

test("extrudeRectangular (chamfer)", () => {
	const geometry1 = arc({ radius: 5, endAngle: TAU / 4, segments: 16 });
	const geometry2 = rectangle({ size: [5, 5] });

	let obs = extrudeRectangular({ corners: "chamfer" }, geometry1) as Geom3;
	let pts = geom3.toPoints(obs);
	expect(() => geom3.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(60);

	obs = extrudeRectangular({ corners: "chamfer" }, geometry2) as Geom3;
	pts = geom3.toPoints(obs);
	expect(() => geom3.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(48);
});

test("extrudeRectangular (segments = 8, round)", () => {
	const geometry1 = arc({ radius: 5, endAngle: TAU / 4, segments: 16 });
	const geometry2 = rectangle({ size: [5, 5] });

	let obs = extrudeRectangular({ segments: 8, corners: "round" }, geometry1) as Geom3;
	let pts = geom3.toPoints(obs);
	expect(() => geom3.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(84);

	obs = extrudeRectangular({ segments: 8, corners: "round" }, geometry2) as Geom3;
	pts = geom3.toPoints(obs);
	expect(() => geom3.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(64);
});

test("extrudeRectangular (holes)", () => {
	const geometry2 = geom2.create([
		[
			[15, 15],
			[-15, 15],
		],
		[
			[-15, 15],
			[-15, -15],
		],
		[
			[-15, -15],
			[15, -15],
		],
		[
			[15, -15],
			[15, 15],
		],
		[
			[-5, 5],
			[5, 5],
		],
		[
			[5, 5],
			[5, -5],
		],
		[
			[5, -5],
			[-5, -5],
		],
		[
			[-5, -5],
			[-5, 5],
		],
	]);

	const obs = extrudeRectangular({ size: 2, height: 15, segments: 16, corners: "round" }, geometry2) as Geom3;
	const pts = geom3.toPoints(obs);
	expect(() => geom3.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(192);
});
