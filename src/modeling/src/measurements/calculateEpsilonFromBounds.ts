import { EPS } from "../maths/constants";

const calculateEpsilonFromBounds = (bounds: BoundingBox, dimensions: number) => {
	let total = 0;
	for (let i = 0; i < dimensions; i++) {
		total += bounds[1][i] - bounds[0][i];
	}
	return (EPS * total) / dimensions;
};

export default calculateEpsilonFromBounds;
