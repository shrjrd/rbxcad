import mplane from "../../maths/plane/";

const plane = (polygon: Poly3) => {
	if (!polygon.plane) {
		polygon.plane = mplane.fromPoints(mplane.create(), ...polygon.vertices);
	}
	return polygon.plane;
};

export default plane;
