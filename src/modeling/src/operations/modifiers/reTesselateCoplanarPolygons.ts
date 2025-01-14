import { Array as JsArray, JsMap } from "@rbxts/luau-polyfill";

import poly3 from "../../geometries/poly3";
import { EPS } from "../../maths/constants";
import line2 from "../../maths/line2";
import OrthoNormalBasis from "../../maths/OrthoNormalBasis";
import interpolateBetween2DPointsForY from "../../maths/utils/interpolateBetween2DPointsForY";
import vec2 from "../../maths/vec2";
import { fnNumberSort, insertSorted } from "../../utils";

const floor = (x: number) => {
	// JavaScript's Math.floor() rounds down to the nearest integer
	// For positive numbers, Lua and JS floor behave the same
	// For negative numbers, we need to handle differently:
	// JS: Math.floor(-3.7) = -4
	// Lua: math.floor(-3.7) = -3
	if (x >= 0) return math.floor(x);
	const floorValue = math.floor(x);
	if (x === floorValue) return floorValue;
	return floorValue - 1;
};

/**
 * Retesselation for a set of COPLANAR polygons.
 * @param {poly3[]} sourcepolygons - list of polygons
 * @returns {poly3[]} new set of polygons
 */
const reTesselateCoplanarPolygons = (sourcepolygons: Poly3[]): Poly3[] => {
	if (sourcepolygons.size() < 2) return sourcepolygons;
	//print("reTesselateCoplanarPolygons");
	//print("sourcepolygons", sourcepolygons);

	const destpolygons: Poly3[] = [];
	const numpolygons = sourcepolygons.size();
	const plane = poly3.plane(sourcepolygons[0]);
	const orthobasis = new OrthoNormalBasis(plane);
	const polygonvertices2d: Vec2[][] = []; // array of array of Vector2D
	const polygontopvertexindexes: number[] = []; // array of indexes of topmost vertex per polygon
	const topy2polygonindexes = new JsMap<number, number[]>();
	const ycoordinatetopolygonindexes = new JsMap<number, { [key: number]: boolean }>();

	// convert all polygon vertices to 2D
	// Make a list of all encountered y coordinates
	// And build a map of all polygons that have a vertex at a certain y coordinate:
	const ycoordinatebins = new JsMap<number, number>();
	const ycoordinateBinningFactor = 10 / EPS;
	for (let polygonindex = 0; polygonindex < numpolygons; polygonindex++) {
		const poly3d = sourcepolygons[polygonindex];
		let vertices2d: Vec2[] = [];
		let numvertices = poly3d.vertices.size();
		let minindex = -1;
		if (numvertices > 0) {
			let miny: number;
			let maxy: number;
			for (let i = 0; i < numvertices; i++) {
				let pos2d = orthobasis.to2D(poly3d.vertices[i]);
				// perform binning of y coordinates: If we have multiple vertices very
				// close to each other, give them the same y coordinate:
				const ycoordinatebin = floor(pos2d[1] * ycoordinateBinningFactor);
				let newy: number;
				if (ycoordinatebins.has(ycoordinatebin)) {
					newy = ycoordinatebins.get(ycoordinatebin)!;
				} else if (ycoordinatebins.has(ycoordinatebin + 1)) {
					newy = ycoordinatebins.get(ycoordinatebin + 1)!;
				} else if (ycoordinatebins.has(ycoordinatebin - 1)) {
					newy = ycoordinatebins.get(ycoordinatebin - 1)!;
				} else {
					newy = pos2d[1];
					ycoordinatebins.set(ycoordinatebin, pos2d[1]);
				}
				pos2d = vec2.fromValues(pos2d[0], newy);
				vertices2d.push(pos2d);
				const y = pos2d[1];
				if (i === 0 || y < miny!) {
					miny = y;
					minindex = i;
				}
				if (i === 0 || y > maxy!) {
					maxy = y;
				}
				let polygonindexes = ycoordinatetopolygonindexes.get(y);
				if (!polygonindexes) {
					polygonindexes = {}; // PERF
					ycoordinatetopolygonindexes.set(y, polygonindexes);
				}
				polygonindexes[polygonindex] = true;
			}
			if (miny! >= maxy!) {
				// degenerate polygon, all vertices have same y coordinate. Just ignore it from now:
				vertices2d = [];
				numvertices = 0;
				minindex = -1;
			} else {
				let polygonindexes = topy2polygonindexes.get(miny!);
				if (!polygonindexes) {
					polygonindexes = [];
					topy2polygonindexes.set(miny!, polygonindexes);
				}
				polygonindexes.push(polygonindex);
			}
		} // if(numvertices > 0)
		// reverse the vertex order:
		JsArray.reverse(vertices2d); //vertices2d.reverse();
		minindex = numvertices - minindex - 1;
		polygonvertices2d.push(vertices2d);
		polygontopvertexindexes.push(minindex);
	}
	//print("polygonvertices2d", polygonvertices2d);
	//print("polygontopvertexindexes", polygontopvertexindexes);
	//print("topy2polygonindexes", topy2polygonindexes);
	//print("ycoordinatetopolygonindexes", ycoordinatetopolygonindexes);

	const ycoordinates: number[] = [];
	ycoordinatetopolygonindexes.forEach((polylist, y) => ycoordinates.push(y));
	JsArray.sort(ycoordinates, fnNumberSort); //ycoordinates.sort(fnNumberSort);
	//print("ycoordinates", ycoordinates);

	// Now we will iterate over all y coordinates, from lowest to highest y coordinate
	// activepolygons: source polygons that are 'active', i.e. intersect with our y coordinate
	//   Is sorted so the polygons are in left to right order
	// Each element in activepolygons has these properties:
	//        polygonindex: the index of the source polygon (i.e. an index into the sourcepolygons
	//                      and polygonvertices2d arrays)
	//        leftvertexindex: the index of the vertex at the left side of the polygon (lowest x)
	//                         that is at or just above the current y coordinate
	//        rightvertexindex: dito at right hand side of polygon
	//        topleft, bottomleft: coordinates of the left side of the polygon crossing the current y coordinate
	//        topright, bottomright: coordinates of the right hand side of the polygon crossing the current y coordinate
	let activepolygons: {
		polygonindex: number;
		leftvertexindex: number;
		rightvertexindex: number;
		topleft: Vec2;
		topright: Vec2;
		bottomleft: Vec2;
		bottomright: Vec2;
	}[] = [];
	let prevoutpolygonrow: {
		topleft: Vec2;
		topright: Vec2;
		bottomleft: Vec2;
		bottomright: Vec2;
		leftline: Line2;
		rightline: Line2;
		outpolygon?: { leftpoints: Vec2[]; rightpoints: Vec2[] };
		leftlinecontinues?: boolean;
		rightlinecontinues?: boolean;
	}[] = [];
	for (let yindex = 0; yindex < ycoordinates.size(); yindex++) {
		//print("yindex", yindex);
		const newoutpolygonrow: {
			topleft: Vec2;
			topright: Vec2;
			bottomleft: Vec2;
			bottomright: Vec2;
			leftline: Line2;
			rightline: Line2;
			outpolygon?: { leftpoints: Vec2[]; rightpoints: Vec2[] };
			leftlinecontinues?: boolean;
			rightlinecontinues?: boolean;
		}[] = [];
		const ycoordinate = ycoordinates[yindex];
		//print("ycoordinate", ycoordinate);

		// update activepolygons for this y coordinate:
		// - Remove any polygons that end at this y coordinate
		// - update leftvertexindex and rightvertexindex (which point to the current vertex index
		//   at the the left and right side of the polygon
		// Iterate over all polygons that have a corner at this y coordinate:
		const polygonindexeswithcorner = ycoordinatetopolygonindexes.get(ycoordinate)!;
		for (let activepolygonindex = 0; activepolygonindex < activepolygons.size(); ++activepolygonindex) {
			const activepolygon = activepolygons[activepolygonindex];
			const polygonindex = activepolygon.polygonindex;
			if (polygonindexeswithcorner[polygonindex]) {
				// this active polygon has a corner at this y coordinate:
				const vertices2d = polygonvertices2d[polygonindex];
				const numvertices = vertices2d.size();
				let newleftvertexindex = activepolygon.leftvertexindex;
				let newrightvertexindex = activepolygon.rightvertexindex;
				// See if we need to increase leftvertexindex or decrease rightvertexindex:
				while (true) {
					let nextleftvertexindex = newleftvertexindex + 1;
					if (nextleftvertexindex >= numvertices) nextleftvertexindex = 0;
					if (vertices2d[nextleftvertexindex][1] !== ycoordinate) break;
					newleftvertexindex = nextleftvertexindex;
				}
				let nextrightvertexindex = newrightvertexindex - 1;
				if (nextrightvertexindex < 0) nextrightvertexindex = numvertices - 1;
				if (vertices2d[nextrightvertexindex][1] === ycoordinate) {
					newrightvertexindex = nextrightvertexindex;
				}
				if (
					newleftvertexindex !== activepolygon.leftvertexindex &&
					newleftvertexindex === newrightvertexindex
				) {
					// We have increased leftvertexindex or decreased rightvertexindex, and now they point to the same vertex
					// This means that this is the bottom point of the polygon. We'll remove it:
					JsArray.splice(activepolygons, activepolygonindex + 1, 1); //activepolygons.splice(activepolygonindex, 1);
					--activepolygonindex;
				} else {
					activepolygon.leftvertexindex = newleftvertexindex;
					activepolygon.rightvertexindex = newrightvertexindex;
					activepolygon.topleft = vertices2d[newleftvertexindex];
					activepolygon.topright = vertices2d[newrightvertexindex];
					let nextleftvertexindex = newleftvertexindex + 1;
					if (nextleftvertexindex >= numvertices) nextleftvertexindex = 0;
					activepolygon.bottomleft = vertices2d[nextleftvertexindex];
					let nextrightvertexindex = newrightvertexindex - 1;
					if (nextrightvertexindex < 0) nextrightvertexindex = numvertices - 1;
					activepolygon.bottomright = vertices2d[nextrightvertexindex];
				}
			} // if polygon has corner here
		} // for activepolygonindex
		let nextycoordinate: number;
		if (yindex >= ycoordinates.size() - 1) {
			// last row, all polygons must be finished here:
			activepolygons = [];
			nextycoordinate = undefined!;
		} else {
			// yindex < ycoordinates.size()-1
			nextycoordinate = ycoordinates[yindex + 1]; //Number(ycoordinates[yindex + 1]);
			const middleycoordinate = 0.5 * (ycoordinate + nextycoordinate);
			// update activepolygons by adding any polygons that start here:
			const startingpolygonindexes = topy2polygonindexes.get(ycoordinate)!;
			//print("startingpolygonindexes", startingpolygonindexes);
			// DEVIATION: explicitly check if nil
			if (startingpolygonindexes) {
				for (let polygonindexKey = 0; polygonindexKey < startingpolygonindexes.size(); polygonindexKey++) {
					const polygonindex = startingpolygonindexes[polygonindexKey];
					const vertices2d = polygonvertices2d[polygonindex];
					const numvertices = vertices2d.size();
					const topvertexindex = polygontopvertexindexes[polygonindex];
					// the top of the polygon may be a horizontal line. In that case topvertexindex can point to any point on this line.
					// Find the left and right topmost vertices which have the current y coordinate:
					let topleftvertexindex = topvertexindex;
					while (true) {
						let i = topleftvertexindex + 1;
						if (i >= numvertices) i = 0;
						if (vertices2d[i][1] !== ycoordinate) break;
						if (i === topvertexindex) break; // should not happen, but just to prevent endless loops
						topleftvertexindex = i;
					}
					let toprightvertexindex = topvertexindex;
					while (true) {
						let i = toprightvertexindex - 1;
						if (i < 0) i = numvertices - 1;
						if (vertices2d[i][1] !== ycoordinate) break;
						if (i === topleftvertexindex) break; // should not happen, but just to prevent endless loops
						toprightvertexindex = i;
					}
					let nextleftvertexindex = topleftvertexindex + 1;
					if (nextleftvertexindex >= numvertices) nextleftvertexindex = 0;
					let nextrightvertexindex = toprightvertexindex - 1;
					if (nextrightvertexindex < 0) nextrightvertexindex = numvertices - 1;
					const newactivepolygon = {
						polygonindex: polygonindex,
						leftvertexindex: topleftvertexindex,
						rightvertexindex: toprightvertexindex,
						topleft: vertices2d[topleftvertexindex],
						topright: vertices2d[toprightvertexindex],
						bottomleft: vertices2d[nextleftvertexindex],
						bottomright: vertices2d[nextrightvertexindex],
					};
					insertSorted(activepolygons, newactivepolygon, (el1, el2) => {
						const x1 = interpolateBetween2DPointsForY(el1.topleft, el1.bottomleft, middleycoordinate);
						const x2 = interpolateBetween2DPointsForY(el2.topleft, el2.bottomleft, middleycoordinate);
						if (x1 > x2) return 1;
						if (x1 < x2) return -1;
						return 0;
					});
				} // for(let polygonindex in startingpolygonindexes)
			}
		} //  yindex < ycoordinates.size()-1

		// Now activepolygons is up to date
		// Build the output polygons for the next row in newoutpolygonrow:
		for (const activepolygon of activepolygons) {
			//for (const activepolygonKey of activepolygons) {
			//const activepolygon = activepolygons[activepolygonKey];

			let x = interpolateBetween2DPointsForY(activepolygon.topleft, activepolygon.bottomleft, ycoordinate);
			const topleft = vec2.fromValues(x, ycoordinate);
			x = interpolateBetween2DPointsForY(activepolygon.topright, activepolygon.bottomright, ycoordinate);
			const topright = vec2.fromValues(x, ycoordinate);
			x = interpolateBetween2DPointsForY(activepolygon.topleft, activepolygon.bottomleft, nextycoordinate);
			const bottomleft = vec2.fromValues(x, nextycoordinate);
			x = interpolateBetween2DPointsForY(activepolygon.topright, activepolygon.bottomright, nextycoordinate);
			const bottomright = vec2.fromValues(x, nextycoordinate);
			const outpolygon = {
				topleft: topleft,
				topright: topright,
				bottomleft: bottomleft,
				bottomright: bottomright,
				leftline: line2.fromPoints(line2.create(), topleft, bottomleft),
				rightline: line2.fromPoints(line2.create(), bottomright, topright),
			};
			if (newoutpolygonrow.size() > 0) {
				const prevoutpolygon = newoutpolygonrow[newoutpolygonrow.size() - 1];
				const d1 = vec2.distance(outpolygon.topleft, prevoutpolygon.topright);
				const d2 = vec2.distance(outpolygon.bottomleft, prevoutpolygon.bottomright);
				if (d1 < EPS && d2 < EPS) {
					// we can join this polygon with the one to the left:
					outpolygon.topleft = prevoutpolygon.topleft;
					outpolygon.leftline = prevoutpolygon.leftline;
					outpolygon.bottomleft = prevoutpolygon.bottomleft;
					JsArray.splice(newoutpolygonrow, newoutpolygonrow.size() - 1 + 1, 1); //newoutpolygonrow.splice(newoutpolygonrow.size() - 1, 1);
				}
			}
			newoutpolygonrow.push(outpolygon);
		} // for(activepolygon in activepolygons)
		if (yindex > 0) {
			// try to match the new polygons against the previous row:
			const prevcontinuedindexes = new Set<number>();
			const matchedindexes = new Set<number>();
			for (let i = 0; i < newoutpolygonrow.size(); i++) {
				const thispolygon = newoutpolygonrow[i];
				for (let ii = 0; ii < prevoutpolygonrow.size(); ii++) {
					if (!matchedindexes.has(ii)) {
						// not already processed?
						// We have a match if the sidelines are equal or if the top coordinates
						// are on the sidelines of the previous polygon
						const prevpolygon = prevoutpolygonrow[ii];
						if (vec2.distance(prevpolygon.bottomleft, thispolygon.topleft) < EPS) {
							if (vec2.distance(prevpolygon.bottomright, thispolygon.topright) < EPS) {
								// Yes, the top of this polygon matches the bottom of the previous:
								matchedindexes.add(ii);
								// Now check if the joined polygon would remain convex:
								const v1 = line2.direction(thispolygon.leftline);
								const v2 = line2.direction(prevpolygon.leftline);
								const d1 = v1[0] - v2[0];

								const v3 = line2.direction(thispolygon.rightline);
								const v4 = line2.direction(prevpolygon.rightline);
								const d2 = v3[0] - v4[0];

								const leftlinecontinues = math.abs(d1) < EPS;
								const rightlinecontinues = math.abs(d2) < EPS;
								const leftlineisconvex = leftlinecontinues || d1 >= 0;
								const rightlineisconvex = rightlinecontinues || d2 >= 0;
								if (leftlineisconvex && rightlineisconvex) {
									// yes, both sides have convex corners:
									// This polygon will continue the previous polygon
									thispolygon.outpolygon = prevpolygon.outpolygon;
									thispolygon.leftlinecontinues = leftlinecontinues;
									thispolygon.rightlinecontinues = rightlinecontinues;
									prevcontinuedindexes.add(ii);
								}
								break;
							}
						}
					} // if(!prevcontinuedindexes.has(ii))
				} // for ii
			} // for i
			for (let ii = 0; ii < prevoutpolygonrow.size(); ii++) {
				if (!prevcontinuedindexes.has(ii)) {
					// polygon ends here
					// Finish the polygon with the last point(s):
					const prevpolygon = prevoutpolygonrow[ii];
					prevpolygon.outpolygon!.rightpoints.push(prevpolygon.bottomright);
					if (vec2.distance(prevpolygon.bottomright, prevpolygon.bottomleft) > EPS) {
						// polygon ends with a horizontal line:
						prevpolygon.outpolygon!.leftpoints.push(prevpolygon.bottomleft);
					}
					// reverse the left half so we get a counterclockwise circle:
					JsArray.reverse(prevpolygon.outpolygon!.leftpoints); //prevpolygon.outpolygon!.leftpoints.reverse();
					//const points2d = prevpolygon.outpolygon!.rightpoints.concat(prevpolygon.outpolygon!.leftpoints);
					const points2d = JsArray.concat(
						prevpolygon.outpolygon!.rightpoints,
						prevpolygon.outpolygon!.leftpoints,
					);
					const vertices3d = points2d.map((point2d) => orthobasis.to3D(point2d));
					const polygon = poly3.fromPointsAndPlane(vertices3d, plane); // TODO support shared

					// if we let empty polygon out, next retesselate will crash
					if (polygon.vertices.size() > 0) destpolygons.push(polygon);
				}
			}
		} // if(yindex > 0)
		for (let i = 0; i < newoutpolygonrow.size(); i++) {
			const thispolygon = newoutpolygonrow[i];
			if (!thispolygon.outpolygon) {
				// polygon starts here:
				thispolygon.outpolygon = {
					leftpoints: [],
					rightpoints: [],
				};
				thispolygon.outpolygon.leftpoints.push(thispolygon.topleft);
				if (vec2.distance(thispolygon.topleft, thispolygon.topright) > EPS) {
					// we have a horizontal line at the top:
					thispolygon.outpolygon.rightpoints.push(thispolygon.topright);
				}
			} else {
				// continuation of a previous row
				if (!thispolygon.leftlinecontinues) {
					thispolygon.outpolygon.leftpoints.push(thispolygon.topleft);
				}
				if (!thispolygon.rightlinecontinues) {
					thispolygon.outpolygon.rightpoints.push(thispolygon.topright);
				}
			}
		}
		prevoutpolygonrow = newoutpolygonrow;
	} // for yindex
	//print("destpolygons", destpolygons);
	return destpolygons;
};

export default reTesselateCoplanarPolygons;
