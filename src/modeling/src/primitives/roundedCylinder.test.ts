import { expect, test } from "@rbxts/jest-globals";

import comparePolygonsAsPoints from "../../test/helpers/comparePolygonsAsPoints";
import geom3 from "../geometries/geom3";
import { roundedCylinder } from "./index";

test("roundedCylinder (defaults)", () => {
	const obs = roundedCylinder();
	const pts = geom3.toPoints(obs);

	expect(() => geom3.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(544);
});

test("roundedCylinder (zero height)", () => {
	const obs = roundedCylinder({ height: 0 });
	const pts = geom3.toPoints(obs);
	expect(() => geom3.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(0);
});

test("roundedCylinder (zero radius)", () => {
	const obs = roundedCylinder({ radius: 0, roundRadius: 0 });
	const pts = geom3.toPoints(obs);
	expect(() => geom3.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(0);
});

test("roundedCylinder (zero roundRadius)", () => {
	const obs = roundedCylinder({ roundRadius: 0 });
	const pts = geom3.toPoints(obs);
	expect(() => geom3.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(96);
});

test("roundedCylinder (options)", () => {
	// test segments
	let obs = roundedCylinder({ segments: 5 });
	let pts = geom3.toPoints(obs);
	let exp: Vec3[][] = [];

	expect(() => geom3.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(15);

	// test center
	obs = roundedCylinder({ segments: 5, center: [-5, -5, -5] });
	pts = geom3.toPoints(obs);
	exp = [
		[
			[-4.048943483704846, -4.6909830056250525, -5.8],
			[-5, -4, -5.8],
			[-5, -4, -4.2],
			[-4.048943483704846, -4.6909830056250525, -4.2],
		],
		[
			[-5, -4, -5.8],
			[-4.048943483704846, -4.6909830056250525, -5.8],
			[-5, -5, -6],
		],
		[
			[-5, -5, -4],
			[-4.048943483704846, -4.6909830056250525, -4.2],
			[-5, -4, -4.2],
		],
		[
			[-4.412214747707527, -5.8090169943749475, -5.8],
			[-4.048943483704846, -4.6909830056250525, -5.8],
			[-4.048943483704846, -4.6909830056250525, -4.2],
			[-4.412214747707527, -5.8090169943749475, -4.2],
		],
		[
			[-4.048943483704846, -4.6909830056250525, -5.8],
			[-4.412214747707527, -5.8090169943749475, -5.8],
			[-5, -5, -6],
		],
		[
			[-5, -5, -4],
			[-4.412214747707527, -5.8090169943749475, -4.2],
			[-4.048943483704846, -4.6909830056250525, -4.2],
		],
		[
			[-5.587785252292473, -5.8090169943749475, -5.8],
			[-4.412214747707527, -5.8090169943749475, -5.8],
			[-4.412214747707527, -5.8090169943749475, -4.2],
			[-5.587785252292473, -5.8090169943749475, -4.2],
		],
		[
			[-4.412214747707527, -5.8090169943749475, -5.8],
			[-5.587785252292473, -5.8090169943749475, -5.8],
			[-5, -5, -6],
		],
		[
			[-5, -5, -4],
			[-5.587785252292473, -5.8090169943749475, -4.2],
			[-4.412214747707527, -5.8090169943749475, -4.2],
		],
		[
			[-5.951056516295154, -4.6909830056250525, -5.8],
			[-5.587785252292473, -5.8090169943749475, -5.8],
			[-5.587785252292473, -5.8090169943749475, -4.2],
			[-5.951056516295154, -4.6909830056250525, -4.2],
		],
		[
			[-5.587785252292473, -5.8090169943749475, -5.8],
			[-5.951056516295154, -4.6909830056250525, -5.8],
			[-5, -5, -6],
		],
		[
			[-5, -5, -4],
			[-5.951056516295154, -4.6909830056250525, -4.2],
			[-5.587785252292473, -5.8090169943749475, -4.2],
		],
		[
			[-5, -4, -5.8],
			[-5.951056516295154, -4.6909830056250525, -5.8],
			[-5.951056516295154, -4.6909830056250525, -4.2],
			[-5, -4, -4.2],
		],
		[
			[-5.951056516295154, -4.6909830056250525, -5.8],
			[-5, -4, -5.8],
			[-5, -5, -6],
		],
		[
			[-5, -5, -4],
			[-5, -4, -4.2],
			[-5.951056516295154, -4.6909830056250525, -4.2],
		],
	];

	expect(() => geom3.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(15);
	expect(comparePolygonsAsPoints(pts, exp)).toBe(true);

	// test height
	obs = roundedCylinder({ segments: 5, height: 20 });
	pts = geom3.toPoints(obs);
	exp = [
		[
			[0.9510565162951535, 0.30901699437494745, -9.8],
			[0, 1, -9.8],
			[0, 1, 9.8],
			[0.9510565162951535, 0.30901699437494745, 9.8],
		],
		[
			[0, 1, -9.8],
			[0.9510565162951535, 0.30901699437494745, -9.8],
			[0, 0, -10],
		],
		[
			[0, 0, 10],
			[0.9510565162951535, 0.30901699437494745, 9.8],
			[0, 1, 9.8],
		],
		[
			[0.5877852522924732, -0.8090169943749473, -9.8],
			[0.9510565162951535, 0.30901699437494745, -9.8],
			[0.9510565162951535, 0.30901699437494745, 9.8],
			[0.5877852522924732, -0.8090169943749473, 9.8],
		],
		[
			[0.9510565162951535, 0.30901699437494745, -9.8],
			[0.5877852522924732, -0.8090169943749473, -9.8],
			[0, 0, -10],
		],
		[
			[0, 0, 10],
			[0.5877852522924732, -0.8090169943749473, 9.8],
			[0.9510565162951535, 0.30901699437494745, 9.8],
		],
		[
			[-0.587785252292473, -0.8090169943749475, -9.8],
			[0.5877852522924732, -0.8090169943749473, -9.8],
			[0.5877852522924732, -0.8090169943749473, 9.8],
			[-0.587785252292473, -0.8090169943749475, 9.8],
		],
		[
			[0.5877852522924732, -0.8090169943749473, -9.8],
			[-0.587785252292473, -0.8090169943749475, -9.8],
			[0, 0, -10],
		],
		[
			[0, 0, 10],
			[-0.587785252292473, -0.8090169943749475, 9.8],
			[0.5877852522924732, -0.8090169943749473, 9.8],
		],
		[
			[-0.9510565162951536, 0.30901699437494723, -9.8],
			[-0.587785252292473, -0.8090169943749475, -9.8],
			[-0.587785252292473, -0.8090169943749475, 9.8],
			[-0.9510565162951536, 0.30901699437494723, 9.8],
		],
		[
			[-0.587785252292473, -0.8090169943749475, -9.8],
			[-0.9510565162951536, 0.30901699437494723, -9.8],
			[0, 0, -10],
		],
		[
			[0, 0, 10],
			[-0.9510565162951536, 0.30901699437494723, 9.8],
			[-0.587785252292473, -0.8090169943749475, 9.8],
		],
		[
			[0, 1, -9.8],
			[-0.9510565162951536, 0.30901699437494723, -9.8],
			[-0.9510565162951536, 0.30901699437494723, 9.8],
			[0, 1, 9.8],
		],
		[
			[-0.9510565162951536, 0.30901699437494723, -9.8],
			[0, 1, -9.8],
			[0, 0, -10],
		],
		[
			[0, 0, 10],
			[0, 1, 9.8],
			[-0.9510565162951536, 0.30901699437494723, 9.8],
		],
	];

	expect(() => geom3.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(15);
	expect(comparePolygonsAsPoints(pts, exp)).toBe(true);

	// test radius
	obs = roundedCylinder({ segments: 5, radius: 10 });
	pts = geom3.toPoints(obs);
	exp = [
		[
			[9.510565162951535, 3.0901699437494745, -0.8],
			[0, 10, -0.8],
			[0, 10, 0.8],
			[9.510565162951535, 3.0901699437494745, 0.8],
		],
		[
			[0, 10, -0.8],
			[9.510565162951535, 3.0901699437494745, -0.8],
			[0, 0, -1],
		],
		[
			[0, 0, 1],
			[9.510565162951535, 3.0901699437494745, 0.8],
			[0, 10, 0.8],
		],
		[
			[5.877852522924733, -8.090169943749473, -0.8],
			[9.510565162951535, 3.0901699437494745, -0.8],
			[9.510565162951535, 3.0901699437494745, 0.8],
			[5.877852522924733, -8.090169943749473, 0.8],
		],
		[
			[9.510565162951535, 3.0901699437494745, -0.8],
			[5.877852522924733, -8.090169943749473, -0.8],
			[0, 0, -1],
		],
		[
			[0, 0, 1],
			[5.877852522924733, -8.090169943749473, 0.8],
			[9.510565162951535, 3.0901699437494745, 0.8],
		],
		[
			[-5.87785252292473, -8.090169943749475, -0.8],
			[5.877852522924733, -8.090169943749473, -0.8],
			[5.877852522924733, -8.090169943749473, 0.8],
			[-5.87785252292473, -8.090169943749475, 0.8],
		],
		[
			[5.877852522924733, -8.090169943749473, -0.8],
			[-5.87785252292473, -8.090169943749475, -0.8],
			[0, 0, -1],
		],
		[
			[0, 0, 1],
			[-5.87785252292473, -8.090169943749475, 0.8],
			[5.877852522924733, -8.090169943749473, 0.8],
		],
		[
			[-9.510565162951536, 3.0901699437494723, -0.8],
			[-5.87785252292473, -8.090169943749475, -0.8],
			[-5.87785252292473, -8.090169943749475, 0.8],
			[-9.510565162951536, 3.0901699437494723, 0.8],
		],
		[
			[-5.87785252292473, -8.090169943749475, -0.8],
			[-9.510565162951536, 3.0901699437494723, -0.8],
			[0, 0, -1],
		],
		[
			[0, 0, 1],
			[-9.510565162951536, 3.0901699437494723, 0.8],
			[-5.87785252292473, -8.090169943749475, 0.8],
		],
		[
			[0, 10, -0.8],
			[-9.510565162951536, 3.0901699437494723, -0.8],
			[-9.510565162951536, 3.0901699437494723, 0.8],
			[0, 10, 0.8],
		],
		[
			[-9.510565162951536, 3.0901699437494723, -0.8],
			[0, 10, -0.8],
			[0, 0, -1],
		],
		[
			[0, 0, 1],
			[0, 10, 0.8],
			[-9.510565162951536, 3.0901699437494723, 0.8],
		],
	];

	expect(() => geom3.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(15);
	expect(comparePolygonsAsPoints(pts, exp)).toBe(true);

	// test round radius
	obs = roundedCylinder({ segments: 5, height: 20, radius: 5, roundRadius: 2 });
	pts = geom3.toPoints(obs);
	exp = [
		[
			[4.755282581475767, 1.5450849718747373, -8],
			[0, 5, -8],
			[0, 5, 8],
			[4.755282581475767, 1.5450849718747373, 8],
		],
		[
			[0, 5, -8],
			[4.755282581475767, 1.5450849718747373, -8],
			[0, 0, -10],
		],
		[
			[0, 0, 10],
			[4.755282581475767, 1.5450849718747373, 8],
			[0, 5, 8],
		],
		[
			[2.9389262614623664, -4.045084971874736, -8],
			[4.755282581475767, 1.5450849718747373, -8],
			[4.755282581475767, 1.5450849718747373, 8],
			[2.9389262614623664, -4.045084971874736, 8],
		],
		[
			[4.755282581475767, 1.5450849718747373, -8],
			[2.9389262614623664, -4.045084971874736, -8],
			[0, 0, -10],
		],
		[
			[0, 0, 10],
			[2.9389262614623664, -4.045084971874736, 8],
			[4.755282581475767, 1.5450849718747373, 8],
		],
		[
			[-2.938926261462365, -4.045084971874737, -8],
			[2.9389262614623664, -4.045084971874736, -8],
			[2.9389262614623664, -4.045084971874736, 8],
			[-2.938926261462365, -4.045084971874737, 8],
		],
		[
			[2.9389262614623664, -4.045084971874736, -8],
			[-2.938926261462365, -4.045084971874737, -8],
			[0, 0, -10],
		],
		[
			[0, 0, 10],
			[-2.938926261462365, -4.045084971874737, 8],
			[2.9389262614623664, -4.045084971874736, 8],
		],
		[
			[-4.755282581475768, 1.5450849718747361, -8],
			[-2.938926261462365, -4.045084971874737, -8],
			[-2.938926261462365, -4.045084971874737, 8],
			[-4.755282581475768, 1.5450849718747361, 8],
		],
		[
			[-2.938926261462365, -4.045084971874737, -8],
			[-4.755282581475768, 1.5450849718747361, -8],
			[0, 0, -10],
		],
		[
			[0, 0, 10],
			[-4.755282581475768, 1.5450849718747361, 8],
			[-2.938926261462365, -4.045084971874737, 8],
		],
		[
			[0, 5, -8],
			[-4.755282581475768, 1.5450849718747361, -8],
			[-4.755282581475768, 1.5450849718747361, 8],
			[0, 5, 8],
		],
		[
			[-4.755282581475768, 1.5450849718747361, -8],
			[0, 5, -8],
			[0, 0, -10],
		],
		[
			[0, 0, 10],
			[0, 5, 8],
			[-4.755282581475768, 1.5450849718747361, 8],
		],
	];

	expect(() => geom3.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(15);
	expect(comparePolygonsAsPoints(pts, exp)).toBe(true);
});
