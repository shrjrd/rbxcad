import type { Vec3 } from "../../maths/types";
import type { Poly3 } from "../../geometries/types";
import { Array as JsArray, JsMap } from "@rbxts/luau-polyfill";

type SideObj = {
	vertex0: Vec3;
	vertex1: Vec3;
	polygonIndex: number;
};

import * as poly3 from "../../geometries/poly3/index";
import { EPS } from "../../maths/constants";
import * as vec3 from "../../maths/vec3/index";

const _assert = false;

//const getTag = (vertex: Vec3) => `${vertex}`;
const getTag = (vertex: Vec3) => `${vertex[0]},${vertex[1]},${vertex[2]}`;

const addSide = (
	sideMap: InstanceType<typeof JsMap<string, SideObj[]>>,
	vertextag2sidestart: InstanceType<typeof JsMap<string, string[]>>,
	vertextag2sideend: InstanceType<typeof JsMap<string, string[]>>,
	vertex0: Vec3,
	vertex1: Vec3,
	polygonIndex: number,
) => {
	const startTag = getTag(vertex0);
	const endTag = getTag(vertex1);
	if (_assert && startTag === endTag) throw "assert failed";
	const newSideTag = `${startTag}/${endTag}`;
	const reverseSideTag = `${endTag}/${startTag}`;
	if (sideMap.has(reverseSideTag)) {
		// remove the opposing side from mappings
		deleteSide(sideMap, vertextag2sidestart, vertextag2sideend, vertex1, vertex0, undefined);
		return undefined;
	}
	// add the side to the mappings
	const newSideObj = {
		vertex0: vertex0,
		vertex1: vertex1,
		polygonIndex,
	};
	if (!sideMap.has(newSideTag)) {
		sideMap.set(newSideTag, [newSideObj]);
	} else {
		sideMap.get(newSideTag)!.push(newSideObj);
	}
	if (vertextag2sidestart.has(startTag)) {
		vertextag2sidestart.get(startTag)!.push(newSideTag);
	} else {
		vertextag2sidestart.set(startTag, [newSideTag]);
	}
	if (vertextag2sideend.has(endTag)) {
		vertextag2sideend.get(endTag)!.push(newSideTag);
	} else {
		vertextag2sideend.set(endTag, [newSideTag]);
	}
	return newSideTag;
};

const deleteSide = (
	sidemap: InstanceType<typeof JsMap<string, SideObj[]>>,
	vertextag2sidestart: InstanceType<typeof JsMap<string, string[]>>,
	vertextag2sideend: InstanceType<typeof JsMap<string, string[]>>,
	vertex0: Vec3,
	vertex1: Vec3,
	polygonIndex?: number,
) => {
	const startTag = getTag(vertex0);
	const endTag = getTag(vertex1);
	const sideTag = `${startTag}/${endTag}`;
	if (_assert && !sidemap.has(sideTag)) throw "assert failed";
	let idx = -1;
	const sideObjs = sidemap.get(sideTag)!;
	for (let i = 0; i < sideObjs.size(); i++) {
		const sideObj = sideObjs[i];
		let sideTag = getTag(sideObj.vertex0);
		if (sideTag !== startTag) continue;
		sideTag = getTag(sideObj.vertex1);
		if (sideTag !== endTag) continue;
		if (polygonIndex !== undefined) {
			if (sideObj.polygonIndex !== polygonIndex) continue;
		}
		idx = i;
		break;
	}
	if (_assert && idx < 0) throw "assert failed";
	JsArray.splice(sideObjs, idx + 1, 1); //sideObjs.splice(idx, 1);
	if (sideObjs.size() === 0) {
		sidemap.delete(sideTag);
	}

	// adjust start and end lists
	idx = vertextag2sidestart.get(startTag)!.indexOf(sideTag);
	if (_assert && idx < 0) throw "assert failed";
	JsArray.splice(vertextag2sidestart.get(startTag)!, idx + 1, 1); //vertextag2sidestart.get(startTag)!.splice(idx, 1);
	if (vertextag2sidestart.get(startTag)!.size() === 0) {
		vertextag2sidestart.delete(startTag);
	}

	idx = vertextag2sideend.get(endTag)!.indexOf(sideTag);
	if (_assert && idx < 0) throw "assert failed";
	JsArray.splice(vertextag2sideend.get(endTag)!, idx + 1, 1); //vertextag2sideend.get(endTag)!.splice(idx, 1);
	if (vertextag2sideend.get(endTag)!.size() === 0) {
		vertextag2sideend.delete(endTag);
	}
};

/*
  Suppose we have two polygons ACDB and EDGF:

   A-----B
   |     |
   |     E--F
   |     |  |
   C-----D--G

  Note that vertex E forms a T-junction on the side BD. In this case some STL slicers will complain
  that the solid is not watertight. This is because the watertightness check is done by checking if
  each side DE is matched by another side ED.

  This function will return a new solid with ACDB replaced by ACDEB

  Note that this can create polygons that are slightly non-convex (due to rounding errors).
  Therefore, the result should not be used for further CSG operations!

  Note this function is meant to be used to preprocess geometries when triangulation is required, i.e. AMF, STL, etc.
  Do not use the results in other operations.
*/

/**
 * Insert missing vertices for T-junctions, which creates polygons that can be triangulated.
 * @param {Array} polygons - the original polygons which may or may not have T-junctions
 * @return original polygons (if no T-junctions found) or new polygons with updated vertices
 */
export const insertTjunctions = (polygons: Poly3[]) => {
	// STEP 1 : build a map of 'unmatched' sides from the polygons
	// i.e. side AB in one polygon does not have a matching side BA in another polygon
	const sideMap = new JsMap<string, SideObj[]>();
	for (let polygonIndex = 0; polygonIndex < polygons.size(); polygonIndex++) {
		const polygon = polygons[polygonIndex];
		const numVertices = polygon.vertices.size();
		if (numVertices >= 3) {
			let vertex = polygon.vertices[0];
			let vertexTag = getTag(vertex);
			for (let vertexIndex = 0; vertexIndex < numVertices; vertexIndex++) {
				let nextVertexIndex = vertexIndex + 1;
				if (nextVertexIndex === numVertices) nextVertexIndex = 0;

				const nextVertex = polygon.vertices[nextVertexIndex];
				const nextVertexTag = getTag(nextVertex);

				const sideTag = `${vertexTag}/${nextVertexTag}`;
				const reverseSideTag = `${nextVertexTag}/${vertexTag}`;
				if (sideMap.has(reverseSideTag)) {
					// this side matches the same side in another polygon. Remove from sidemap
					// FIXME is this check necessary? there should only be ONE(1) opposing side
					// FIXME assert ?
					const ar = sideMap.get(reverseSideTag)!;
					JsArray.splice(ar, -1 + 1, 1); //ar.splice(-1, 1);
					if (ar.size() === 0) {
						sideMap.delete(reverseSideTag);
					}
				} else {
					const sideobj = {
						vertex0: vertex,
						vertex1: nextVertex,
						polygonIndex,
					};
					if (!sideMap.has(sideTag)) {
						sideMap.set(sideTag, [sideobj]);
					} else {
						sideMap.get(sideTag)!.push(sideobj);
					}
				}
				vertex = nextVertex;
				vertexTag = nextVertexTag;
			}
		} else {
			warn("invalid polygon found during insertTjunctions");
		}
	}

	if (sideMap.size > 0) {
		// STEP 2 : create a list of starting sides and ending sides
		const vertextag2sidestart = new JsMap<string, string[]>();
		const vertextag2sideend = new JsMap<string, string[]>();
		const sidesToCheck = new JsMap<string, boolean>();
		for (const [sidetag, sideObjs] of sideMap.entries() as unknown as [string, SideObj[]][]) {
			sidesToCheck.set(sidetag, true);
			sideObjs.forEach((sideObj) => {
				const starttag = getTag(sideObj.vertex0);
				const endtag = getTag(sideObj.vertex1);
				if (vertextag2sidestart.has(starttag)) {
					vertextag2sidestart.get(starttag)!.push(sidetag);
				} else {
					vertextag2sidestart.set(starttag, [sidetag]);
				}
				if (vertextag2sideend.has(endtag)) {
					vertextag2sideend.get(endtag)!.push(sidetag);
				} else {
					vertextag2sideend.set(endtag, [sidetag]);
				}
			});
		}

		// STEP 3 : if sideMap is not empty
		const newPolygons = JsArray.slice(polygons, 0 + 1); //polygons.slice(0); // make a copy in order to replace polygons inline
		while (true) {
			if (sideMap.size === 0) break;

			for (const sideTag of sideMap.keys() as unknown as string[]) {
				sidesToCheck.set(sideTag, true);
			}

			let doneSomething = false;
			while (true) {
				const sideTags = [...(sidesToCheck.keys() as unknown as string[])]; //Array.from(sidesToCheck.keys());
				if (sideTags.size() === 0) break; // sidesToCheck is empty, we're done!
				const sideTagToCheck = sideTags[0];
				let doneWithSide = true;
				if (sideMap.has(sideTagToCheck)) {
					const sideObjs = sideMap.get(sideTagToCheck)!;
					if (_assert && sideObjs.size() === 0) throw "assert failed";
					const sideObj = sideObjs[0];
					for (let directionIndex = 0; directionIndex < 2; directionIndex++) {
						const startVertex = directionIndex === 0 ? sideObj.vertex0 : sideObj.vertex1;
						const endVertex = directionIndex === 0 ? sideObj.vertex1 : sideObj.vertex0;
						const startVertexTag = getTag(startVertex);
						const endVertexTag = getTag(endVertex);
						let matchingSides: string[] = [];
						if (directionIndex === 0) {
							if (vertextag2sideend.has(startVertexTag)) {
								matchingSides = vertextag2sideend.get(startVertexTag)!;
							}
						} else {
							if (vertextag2sidestart.has(startVertexTag)) {
								matchingSides = vertextag2sidestart.get(startVertexTag)!;
							}
						}
						for (let matchingSideIndex = 0; matchingSideIndex < matchingSides.size(); matchingSideIndex++) {
							const matchingSideTag = matchingSides[matchingSideIndex];
							const matchingSide = sideMap.get(matchingSideTag)![0];
							const matchingSideStartVertex =
								directionIndex === 0 ? matchingSide.vertex0 : matchingSide.vertex1;
							const matchingSideEndVertex =
								directionIndex === 0 ? matchingSide.vertex1 : matchingSide.vertex0;
							const matchingSideStartVertexTag = getTag(matchingSideStartVertex);
							const matchingSideEndVertexTag = getTag(matchingSideEndVertex);
							if (_assert && matchingSideEndVertexTag !== startVertexTag) throw "assert failed";
							if (matchingSideStartVertexTag === endVertexTag) {
								// matchingSide cancels sideTagToCheck
								deleteSide(
									sideMap,
									vertextag2sidestart,
									vertextag2sideend,
									startVertex,
									endVertex,
									undefined,
								);
								deleteSide(
									sideMap,
									vertextag2sidestart,
									vertextag2sideend,
									endVertex,
									startVertex,
									undefined,
								);
								doneWithSide = false;
								directionIndex = 2; // skip reverse direction check
								doneSomething = true;
								break;
							} else {
								const startPos = startVertex;
								const endPos = endVertex;
								const checkPos = matchingSideStartVertex;
								const direction = vec3.subtract(vec3.create(), checkPos, startPos);
								// Now we need to check if endPos is on the line startPos-checkPos:
								const t =
									vec3.dot(vec3.subtract(vec3.create(), endPos, startPos), direction) /
									vec3.dot(direction, direction);
								if (t > 0 && t < 1) {
									const closestVertex = vec3.scale(vec3.create(), direction, t);
									vec3.add(closestVertex, closestVertex, startPos);
									const distanceSquared = vec3.squaredDistance(closestVertex, endPos);
									if (distanceSquared < EPS * EPS) {
										// Yes it's a t-junction! We need to split matchingSide in two:
										const polygonIndex = matchingSide.polygonIndex;
										const polygon = newPolygons[polygonIndex];
										// find the index of startVertexTag in polygon:
										const insertionVertexTag = getTag(matchingSide.vertex1);
										let insertionVertexTagIndex = -1;
										for (let i = 0; i < polygon.vertices.size(); i++) {
											if (getTag(polygon.vertices[i]) === insertionVertexTag) {
												insertionVertexTagIndex = i;
												break;
											}
										}
										if (_assert && insertionVertexTagIndex < 0) throw "assert failed";
										// split the side by inserting the vertex:
										const newVertices = JsArray.slice(polygon.vertices, 0 + 1); //polygon.vertices.slice(0);
										JsArray.splice(newVertices, insertionVertexTagIndex + 1, 0, endVertex); //newVertices.splice(insertionVertexTagIndex, 0, endVertex);
										const newPolygon = poly3.create(newVertices);

										newPolygons[polygonIndex] = newPolygon;

										// remove the original sides from our maps
										deleteSide(
											sideMap,
											vertextag2sidestart,
											vertextag2sideend,
											matchingSide.vertex0,
											matchingSide.vertex1,
											polygonIndex,
										);
										const newSideTag1 = addSide(
											sideMap,
											vertextag2sidestart,
											vertextag2sideend,
											matchingSide.vertex0,
											endVertex,
											polygonIndex,
										);
										const newSideTag2 = addSide(
											sideMap,
											vertextag2sidestart,
											vertextag2sideend,
											endVertex,
											matchingSide.vertex1,
											polygonIndex,
										);
										if (newSideTag1 !== undefined) sidesToCheck.set(newSideTag1, true);
										if (newSideTag2 !== undefined) sidesToCheck.set(newSideTag2, true);
										doneWithSide = false;
										directionIndex = 2; // skip reverse direction check
										doneSomething = true;
										break;
									} // if(distanceSquared < 1e-10)
								} // if( (t > 0) && (t < 1) )
							} // if(endingSideStartVertexTag === endVertexTag)
						} // for matchingSideIndex
					} // for directionIndex
				} // if(sideTagToCheck in sideMap)
				if (doneWithSide) {
					sidesToCheck.delete(sideTagToCheck);
				}
			}
			if (!doneSomething) break;
		}
		polygons = newPolygons;
	}
	sideMap.clear();

	return polygons;
};
