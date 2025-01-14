import { Array as JsArray } from "@rbxts/luau-polyfill";

import geom3 from "../../geometries/geom3";
import vec3 from "../../maths/vec3";
import measureEpsilon from "../../measurements/measureEpsilon";

const Vec3ToString = (vec3: Vec3): string => `${vec3[0]},${vec3[1]},${vec3[2]}`;

// returns array numerically sorted and duplicates removed
const sortNb = (array: number[]): number[] =>
	//array.sort((a: any, b: any) => a - b).filter((item: any, pos: any, ary: any) => !pos || item !== ary[pos - 1]);
	JsArray.sort(array, (a, b) => a - b).filter((item, pos, ary) => !pos || item !== ary[pos - 1]);

const insertMapping = (map: Map<string, number[]>, point: Vec3, index: number) => {
	const key = Vec3ToString(point); //`${point}`;
	const mapping = map.get(key);
	if (mapping === undefined) {
		map.set(key, [index]);
	} else {
		mapping.push(index);
	}
};

const findMapping = (map: Map<string, number[]>, point: Vec3): number[] => {
	const key = Vec3ToString(point); //`${point}`;
	return map.get(key)!;
};

const scissionGeom3 = (geometry: Geom3): Geom3[] => {
	// construit table de correspondance entre polygones
	// build polygons lookup table
	const eps = measureEpsilon(geometry) as number;
	const polygons = geom3.toPolygons(geometry);
	const pl = polygons.size();

	const indexesPerPoint = new Map<string, number[]>();
	const temp = vec3.create();
	polygons.forEach((polygon, index) => {
		polygon.vertices.forEach((point) => {
			insertMapping(indexesPerPoint, vec3.snap(temp, point, eps), index);
		});
	});

	const indexesPerPolygon: { e: number; d: number[]; indexes?: boolean[] }[] = polygons.map((polygon) => {
		let indexes: number[] = [];
		polygon.vertices.forEach((point) => {
			//indexes = indexes.concat(findMapping(indexesPerPoint, vec3.snap(temp, point, eps)));
			indexes = JsArray.concat(indexes, findMapping(indexesPerPoint, vec3.snap(temp, point, eps)));
		});
		return { e: 1, d: sortNb(indexes) }; // for each polygon, push the list of indexes
	});

	indexesPerPoint.clear();

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

export default scissionGeom3;
