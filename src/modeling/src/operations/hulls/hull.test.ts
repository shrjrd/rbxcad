import { expect, test } from "@rbxts/jest-globals";

import comparePolygonsAsPoints from "../../../test/helpers/comparePolygonsAsPoints";
import { geom2, geom3, path2 } from "../../geometries";
import { measureVolume } from "../../measurements";
import { cuboid, ellipsoid, sphere, torus } from "../../primitives";
import { center } from "../transforms/center";
import { hull } from "./index";

test("hull (single, geom2)", () => {
	let geometry = geom2.create();

	let obs = hull(geometry) as Geom2;
	let pts = geom2.toPoints(obs);

	expect(() => geom2.validate(geometry)).never.toThrow();
	expect(pts.size()).toBe(0);

	geometry = geom2.fromPoints([
		[5, 5],
		[-5, 5],
		[-5, -5],
		[5, -5],
	]);
	obs = hull(geometry) as Geom2;
	pts = geom2.toPoints(obs);

	expect(() => geom2.validate(geometry)).never.toThrow();
	expect(pts.size()).toBe(4);

	// convex C shape
	geometry = geom2.fromPoints([
		[5.0, 8.66025],
		[-5.0, 8.66025],
		[-10.0, 0.0],
		[-5.0, -8.66025],
		[5.0, -8.66025],
		[6.0, -6.9282],
		[-2.0, -6.9282],
		[-6.0, 0.0],
		[-2.0, 6.9282],
		[6.0, 6.9282],
	]);
	obs = hull(geometry) as Geom2;
	pts = geom2.toPoints(obs);

	expect(() => geom2.validate(geometry)).never.toThrow();
	expect(pts.size()).toBe(7);
});

test("hull (multiple, overlapping, geom2)", () => {
	const geometry1 = geom2.fromPoints([
		[5, 5],
		[-5, 5],
		[-5, -5],
		[5, -5],
	]);
	const geometry2 = geom2.fromPoints([
		[3, 3],
		[-3, 3],
		[-3, -3],
		[3, -3],
	]);
	const geometry3 = geom2.fromPoints([
		[6, 3],
		[-6, 3],
		[-6, -3],
		[6, -3],
	]);

	// convex C shape
	const geometry4 = geom2.fromPoints([
		[5.0, 8.66025],
		[-5.0, 8.66025],
		[-10.0, 0.0],
		[-5.0, -8.66025],
		[5.0, -8.66025],
		[6.0, -6.9282],
		[-2.0, -6.9282],
		[-6.0, 0.0],
		[-2.0, 6.9282],
		[6.0, 6.9282],
	]);

	// same
	let obs = hull(geometry1, geometry1) as Geom2;
	let pts = geom2.toPoints(obs);

	expect(() => geom2.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(4);

	// one inside another
	obs = hull(geometry1, geometry2) as Geom2;
	pts = geom2.toPoints(obs);

	expect(() => geom2.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(4);

	// one overlapping another
	obs = hull(geometry1, geometry3) as Geom2;
	pts = geom2.toPoints(obs);

	expect(() => geom2.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(8);

	obs = hull(geometry2, geometry4) as Geom2;
	pts = geom2.toPoints(obs);

	expect(() => geom2.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(7);
});

test("hull (multiple, various, geom2)", () => {
	const geometry1 = geom2.fromPoints([
		[6, 6],
		[0, 6],
		[0, 0],
		[6, 0],
	]);
	const geometry2 = geom2.fromPoints([
		[6, 3],
		[-6, 3],
		[-6, -3],
		[6, -3],
	]);
	const geometry3 = geom2.fromPoints([
		[-10, -10],
		[0, -20],
		[10, -10],
	]);

	// convex C shape
	const geometry4 = geom2.fromPoints([
		[5.0, 8.66025],
		[-5.0, 8.66025],
		[-10.0, 0.0],
		[-5.0, -8.66025],
		[5.0, -8.66025],
		[6.0, -6.9282],
		[-2.0, -6.9282],
		[-6.0, 0.0],
		[-2.0, 6.9282],
		[6.0, 6.9282],
	]);
	const geometry5 = geom2.fromPoints([
		[-17, -17],
		[-23, -17],
		[-23, -23],
		[-17, -23],
	]);

	let obs = hull(geometry1, geometry2) as Geom2;
	let pts = geom2.toPoints(obs);
	expect(() => geom2.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(5);

	obs = hull(geometry1, geometry3) as Geom2;
	pts = geom2.toPoints(obs);
	expect(() => geom2.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(5);

	obs = hull(geometry2, geometry3) as Geom2;
	pts = geom2.toPoints(obs);
	expect(() => geom2.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(5);

	obs = hull(geometry1, geometry2, geometry3) as Geom2;
	pts = geom2.toPoints(obs);
	expect(() => geom2.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(6);

	obs = hull(geometry5, geometry4) as Geom2;
	pts = geom2.toPoints(obs);
	expect(() => geom2.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(8);
});

test("hull (single, path2)", () => {
	let geometry = path2.create();

	let obs = hull(geometry) as Path2;
	let pts = path2.toPoints(obs);

	expect(() => path2.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(0);

	geometry = path2.fromPoints({}, [
		[0, 0],
		[5, 0],
		[5, 10],
		[4, 1],
	]);

	obs = hull(geometry) as Path2;
	pts = path2.toPoints(obs);

	expect(() => path2.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(3);
});

test("hull (multiple, various, path2)", () => {
	const geometry1 = path2.fromPoints({ closed: true }, [
		[6, 6],
		[0, 6],
		[0, 0],
		[6, 0],
	]);
	const geometry2 = path2.fromPoints({}, [
		[6, 3],
		[-6, 3],
		[-6, -3],
		[6, -3],
	]);
	const geometry3 = path2.fromPoints({ closed: true }, [
		[-10, -10],
		[0, -20],
		[10, -10],
	]);

	// convex C shape
	const geometry4 = path2.fromPoints({}, [
		[5.0, 8.66025],
		[-5.0, 8.66025],
		[-10.0, 0.0],
		[-5.0, -8.66025],
		[5.0, -8.66025],
		[6.0, -6.9282],
		[-2.0, -6.9282],
		[-6.0, 0.0],
		[-2.0, 6.9282],
		[6.0, 6.9282],
	]);
	const geometry5 = path2.fromPoints({ closed: true }, [
		[-17, -17],
		[-23, -17],
		[-23, -23],
		[-17, -23],
	]);

	let obs = hull(geometry1, geometry2) as Path2;
	let pts = path2.toPoints(obs);
	expect(() => path2.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(5);

	obs = hull(geometry1, geometry3) as Path2;
	pts = path2.toPoints(obs);
	expect(() => path2.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(5);

	obs = hull(geometry2, geometry3) as Path2;
	pts = path2.toPoints(obs);
	expect(() => path2.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(5);

	obs = hull(geometry1, geometry2, geometry3) as Path2;
	pts = path2.toPoints(obs);
	expect(() => path2.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(6);

	obs = hull(geometry5, geometry4) as Path2;
	pts = path2.toPoints(obs);
	expect(() => path2.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(8);
});

test("hull (single, geom3)", () => {
	let geometry = geom3.create();

	let obs = hull(geometry) as Geom3;
	let pts = geom3.toPoints(obs);

	expect(() => geom3.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(0);

	geometry = sphere({ radius: 2, segments: 8 });

	obs = hull(geometry) as Geom3;
	pts = geom3.toPoints(obs);

	//t.notThrows.skip(() => geom3.validate(obs));
	expect(() => geom3.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(32);
});

test("hull (multiple, geom3)", () => {
	const geometry1 = cuboid({ size: [2, 2, 2] });

	let obs = hull(geometry1, geometry1) as Geom3; // same
	let pts = geom3.toPoints(obs);
	let exp: Vec3[][] = [
		[
			[-1, 1, -1],
			[-1, 1, 1],
			[1, 1, 1],
			[1, 1, -1],
		],
		[
			[-1, 1, -1],
			[1, 1, -1],
			[1, -1, -1],
			[-1, -1, -1],
		],
		[
			[-1, 1, -1],
			[-1, -1, -1],
			[-1, -1, 1],
			[-1, 1, 1],
		],
		[
			[1, -1, 1],
			[1, -1, -1],
			[1, 1, -1],
			[1, 1, 1],
		],
		[
			[1, -1, 1],
			[1, 1, 1],
			[-1, 1, 1],
			[-1, -1, 1],
		],
		[
			[1, -1, 1],
			[-1, -1, 1],
			[-1, -1, -1],
			[1, -1, -1],
		],
	];

	expect(() => geom3.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(6);
	expect(comparePolygonsAsPoints(pts, exp)).toBe(true);

	const geometry2 = center({ relativeTo: [5, 5, 5] }, cuboid({ size: [3, 3, 3] }));

	obs = hull(geometry1, geometry2) as Geom3;
	pts = geom3.toPoints(obs);
	exp = [
		[
			[1, -1, -1],
			[6.5, 3.5, 3.5],
			[6.5, 3.5, 6.5],
			[1, -1, 1],
		],
		[
			[-1, -1, 1],
			[-1, -1, -1],
			[1, -1, -1],
			[1, -1, 1],
		],
		[
			[-1, -1, 1],
			[1, -1, 1],
			[6.5, 3.5, 6.5],
			[3.5, 3.5, 6.5],
		],
		[
			[-1, -1, 1],
			[3.5, 3.5, 6.5],
			[3.5, 6.5, 6.5],
			[-1, 1, 1],
		],
		[
			[-1, 1, -1],
			[-1, 1, 1],
			[3.5, 6.5, 6.5],
			[3.5, 6.5, 3.5],
		],
		[
			[-1, 1, -1],
			[-1, -1, -1],
			[-1, -1, 1],
			[-1, 1, 1],
		],
		[
			[6.5, 6.5, 6.5],
			[6.5, 3.5, 6.5],
			[6.5, 3.5, 3.5],
			[6.5, 6.5, 3.5],
		],
		[
			[6.5, 6.5, 6.5],
			[6.5, 6.5, 3.5],
			[3.5, 6.5, 3.5],
			[3.5, 6.5, 6.5],
		],
		[
			[6.5, 6.5, 6.5],
			[3.5, 6.5, 6.5],
			[3.5, 3.5, 6.5],
			[6.5, 3.5, 6.5],
		],
		[
			[1, 1, -1],
			[1, -1, -1],
			[-1, -1, -1],
			[-1, 1, -1],
		],
		[
			[1, 1, -1],
			[-1, 1, -1],
			[3.5, 6.5, 3.5],
			[6.5, 6.5, 3.5],
		],
		[
			[1, 1, -1],
			[6.5, 6.5, 3.5],
			[6.5, 3.5, 3.5],
			[1, -1, -1],
		],
	];

	expect(() => geom3.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(12);
	expect(comparePolygonsAsPoints(pts, exp)).toBe(true);
});

test("hull (multiple, overlapping, geom3)", () => {
	const geometry1 = ellipsoid({ radius: [2, 2, 2], segments: 12 });
	const geometry2 = center({ relativeTo: [3, -3, 3] }, ellipsoid({ radius: [3, 3, 3], segments: 12 }));
	const geometry3 = center({ relativeTo: [-3, -3, -3] }, ellipsoid({ radius: [3, 3, 3], segments: 12 }));

	const obs = hull(geometry1, geometry2, geometry3) as Geom3;
	const pts = geom3.toPoints(obs);

	expect(() => geom3.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(92);
});

test("hull (single, unconvex, geom3)", () => {
	const geometry = torus();
	const obs = hull(geometry);
	//t.assert(measureVolume(obs) > measureVolume(geometry));
	expect(measureVolume(obs)).toBeGreaterThan(measureVolume(geometry) as number);
});
