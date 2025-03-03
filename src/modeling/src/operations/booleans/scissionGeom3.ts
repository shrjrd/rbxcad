import type { Geom3, Poly3 } from "../../geometries/types";
import type { Vec3 } from "../../maths/types";
import { Array as JsArray } from "@rbxts/luau-polyfill";
const Vec3ToString = (vec3: Vec3): string => `${vec3[0]},${vec3[1]},${vec3[2]}`;
import * as geom3 from "../../geometries/geom3/index";
import * as vec3 from "../../maths/vec3/index";
import { measureEpsilon } from "../../measurements/measureEpsilon";

// returns array numerically sorted and duplicates removed
const sortNb = (array: number[]): number[] =>
	//array.sort((a: any, b: any) => a - b).filter((item: any, pos: any, ary: any) => !pos || item !== ary[pos - 1]);
	// DEVIATION: 0, NaN, and "" are falsy in TS.
	JsArray.sort(array, (a, b) => a - b).filter((item, pos, ary) => pos === 0 || item !== ary[pos - 1]);

const insertMapping = (map: Map<string, number[]>, vertex: Vec3, index: number) => {
	const key = Vec3ToString(vertex); //`${vertex}`;
	const mapping = map.get(key);
	if (mapping === undefined) {
		map.set(key, [index]);
	} else {
		mapping.push(index);
	}
};

const findMapping = (map: Map<string, number[]>, vertex: Vec3) => {
	const key = Vec3ToString(vertex); //`${vertex}`;
	return map.get(key)!;
};

export const scissionGeom3 = (geometry: Geom3) => {
	// construit table de correspondance entre polygones
	// build polygons lookup table
	const eps = measureEpsilon(geometry) as number;
	const polygons = geom3.toPolygons(geometry);
	const pl = polygons.size();

	const indexesPerVertex = new Map<string, number[]>();
	const temp = vec3.create();
	polygons.forEach((polygon, index) => {
		polygon.vertices.forEach((vertex) => {
			insertMapping(indexesPerVertex, vec3.snap(temp, vertex, eps), index);
		});
	});

	const indexesPerPolygon: { e: number; d: number[]; indexes?: boolean[] }[] = polygons.map((polygon) => {
		let indexes: number[] = [];
		polygon.vertices.forEach((vertex) => {
			//indexes = indexes.concat(findMapping(indexesPerVertex, vec3.snap(temp, vertex, eps)));
			indexes = JsArray.concat(indexes, findMapping(indexesPerVertex, vec3.snap(temp, vertex, eps)));
		});
		return { e: 1, d: sortNb(indexes) }; // for each polygon, push the list of indexes
	});

	indexesPerVertex.clear();

	// regroupe les correspondances des polygones se touchant
	// boucle ne s'arrêtant que quand deux passages retournent le même nb de polygones
	// merge lookup data from linked polygons as long as possible
	let merges = 0;
	const ippl = indexesPerPolygon.size();
	for (let i = 0; i < ippl; i++) {
		const mapi = indexesPerPolygon[i];
		// merge mappings if necessary
		if (mapi.e > 0) {
			const indexes: boolean[] = new Array(pl);
			indexes[i] = true; // include ourself
			do {
				merges = 0;
				// loop through the known indexes
				indexes.forEach((e, j) => {
					const mapj = indexesPerPolygon[j];
					// merge this mapping if necessary
					if (mapj.e > 0) {
						mapj.e = -1; // merged
						for (let d = 0; d < mapj.d.size(); d++) {
							indexes[mapj.d[d]] = true;
						}
						merges++;
					}
				});
			} while (merges > 0);
			mapi.indexes = indexes;
		}
	}

	// construit le tableau des geometry à retourner
	// build array of geometry to return
	const newgeometries = [];
	for (let i = 0; i < ippl; i++) {
		if (indexesPerPolygon[i].indexes) {
			const newpolygons: Poly3[] = [];
			indexesPerPolygon[i].indexes!.forEach((e, p) => newpolygons.push(polygons[p]));
			newgeometries.push(geom3.create(newpolygons));
		}
	}

	return newgeometries;
};
