import { expect, test } from "@rbxts/jest-globals";

import comparePoints from "../../test/helpers/comparePoints";
import geom2 from "../geometries/geom2";
import { TAU } from "../maths/constants";
import { circle } from "./index";

test("circle (defaults)", () => {
	const geometry = circle();
	const pts = geom2.toPoints(geometry);

	expect(() => geom2.validate(geometry)).never.toThrow();
	expect(pts.size()).toEqual(32);
});

test("circle (options)", () => {
	// test center
	let geometry = circle({ radius: 3.5, center: [6.5, 6.5] });
	let pts = geom2.toPoints(geometry);
	let exp: Vec2[] = [
		[10, 6.5],
		[9.932748481411306, 7.182816127056449],
		[9.733578363789503, 7.8393920132778145],
		[9.410143643058909, 8.444495815568608],
		[8.974873734152917, 8.974873734152915],
		[8.444495815568608, 9.410143643058909],
		[7.8393920132778145, 9.733578363789503],
		[7.182816127056449, 9.932748481411306],
		[6.5, 10],
		[5.817183872943551, 9.932748481411306],
		[5.1606079867221855, 9.733578363789503],
		[4.555504184431394, 9.410143643058909],
		[4.025126265847084, 8.974873734152917],
		[3.589856356941091, 8.444495815568608],
		[3.2664216362104965, 7.8393920132778145],
		[3.0672515185886935, 7.18281612705645],
		[3, 6.5],
		[3.0672515185886935, 5.81718387294355],
		[3.266421636210496, 5.160607986722186],
		[3.589856356941091, 4.555504184431394],
		[4.025126265847083, 4.025126265847084],
		[4.555504184431392, 3.5898563569410915],
		[5.160607986722184, 3.266421636210497],
		[5.817183872943549, 3.067251518588694],
		[6.5, 3],
		[7.182816127056449, 3.0672515185886935],
		[7.8393920132778145, 3.266421636210497],
		[8.444495815568606, 3.589856356941091],
		[8.974873734152915, 4.025126265847083],
		[9.410143643058909, 4.555504184431392],
		[9.733578363789503, 5.160607986722184],
		[9.932748481411306, 5.817183872943549],
	];

	expect(() => geom2.validate(geometry)).never.toThrow();
	expect(pts.size()).toEqual(32);
	expect(comparePoints(pts, exp)).toBe(true);

	// test radius
	geometry = circle({ radius: 3.5, segments: 16 });
	pts = geom2.toPoints(geometry);
	exp = [
		[3.5, 0],
		[3.2335783637895035, 1.3393920132778143],
		[2.4748737341529163, 2.474873734152916],
		[1.3393920132778145, 3.2335783637895035],
		[0, 3.5],
		[-1.339392013277814, 3.2335783637895035],
		[-2.474873734152916, 2.4748737341529163],
		[-3.2335783637895035, 1.3393920132778145],
		[-3.5, 0],
		[-3.233578363789504, -1.3393920132778139],
		[-2.474873734152917, -2.474873734152916],
		[-1.339392013277816, -3.233578363789503],
		[0, -3.5],
		[1.339392013277815, -3.233578363789503],
		[2.474873734152916, -2.474873734152917],
		[3.233578363789503, -1.3393920132778163],
	];

	expect(() => geom2.validate(geometry)).never.toThrow();
	expect(pts.size()).toEqual(16);
	expect(comparePoints(pts, exp)).toBe(true);

	// test startAngle
	geometry = circle({ radius: 3.5, startAngle: TAU / 4, segments: 16 });
	pts = geom2.toPoints(geometry);
	exp = [
		[0, 3.5],
		[-1.339392013277814, 3.2335783637895035],
		[-2.474873734152916, 2.4748737341529163],
		[-3.2335783637895035, 1.3393920132778145],
		[-3.5, 0],
		[-3.233578363789504, -1.3393920132778139],
		[-2.474873734152917, -2.474873734152916],
		[-1.339392013277816, -3.233578363789503],
		[0, -3.5],
		[1.339392013277815, -3.233578363789503],
		[2.474873734152916, -2.474873734152917],
		[3.233578363789503, -1.3393920132778163],
		[3.5, 0],
		[0, 0],
	];

	expect(() => geom2.validate(geometry)).never.toThrow();
	expect(pts.size()).toEqual(14);
	expect(comparePoints(pts, exp)).toBe(true);

	// test endAngle
	geometry = circle({ radius: 3.5, endAngle: TAU / 4, segments: 16 });
	pts = geom2.toPoints(geometry);
	exp = [
		[3.5, 0],
		[3.2335783637895035, 1.3393920132778143],
		[2.4748737341529163, 2.474873734152916],
		[1.3393920132778145, 3.2335783637895035],
		[0, 3.5],
		[0, 0],
	];

	expect(() => geom2.validate(geometry)).never.toThrow();
	expect(pts.size()).toEqual(6);
	expect(comparePoints(pts, exp)).toBe(true);

	// test full rotation with non-zero startAngle
	geometry = circle({ startAngle: 1, endAngle: 1 + TAU });
	pts = geom2.toPoints(geometry);

	expect(() => geom2.validate(geometry)).never.toThrow();
	expect(pts.size()).toEqual(32);

	// test segments
	geometry = circle({ radius: 3.5, segments: 5 });
	pts = geom2.toPoints(geometry);
	exp = [
		[3.5, 0],
		[1.081559480312316, 3.3286978070330373],
		[-2.8315594803123156, 2.0572483830236563],
		[-2.831559480312316, -2.0572483830236554],
		[1.0815594803123152, -3.3286978070330377],
	];

	expect(() => geom2.validate(geometry)).never.toThrow();
	expect(pts.size()).toEqual(5);
	expect(comparePoints(pts, exp)).toBe(true);
});

test("circle (radius zero)", () => {
	const geometry = circle({ radius: 0 });
	const pts = geom2.toPoints(geometry);
	expect(() => geom2.validate(geometry)).never.toThrow();
	expect(pts.size()).toBe(0);
});
