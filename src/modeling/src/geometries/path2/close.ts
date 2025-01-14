import { EPS } from "../../maths/constants";
import vec2 from "../../maths/vec2";
import clone from "./clone";

/**
 * Close the given geometry.
 * @param {path2} geometry - the path to close
 * @returns {path2} a new path
 * @alias module:modeling/geometries/path2.close
 */
const close = (geometry: Path2) => {
	if (geometry.isClosed) return geometry;

	const cloned = clone(geometry);
	cloned.isClosed = true;

	if (cloned.points.size() > 1) {
		// make sure the paths are formed properly
		const points = cloned.points;
		const p0 = points[0];
		let pn = points[points.size() - 1];
		while (vec2.distance(p0, pn) < EPS * EPS) {
			points.pop();
			if (points.size() === 1) break;
			pn = points[points.size() - 1];
		}
	}
	return cloned;
};

export default close;
