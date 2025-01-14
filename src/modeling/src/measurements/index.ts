/**
 * All shapes (primitives or the results of operations) can be measured, e.g. calculate volume, etc.
 * @module modeling/measurements
 * @example
 * const { measureArea, measureBoundingBox, measureVolume } = require('@jscad/modeling').measurements
 */

import measureAggregateArea from "./measureAggregateArea";
import measureAggregateBoundingBox from "./measureAggregateBoundingBox";
import measureAggregateEpsilon from "./measureAggregateEpsilon";
import measureAggregateVolume from "./measureAggregateVolume";
import measureArea from "./measureArea";
import measureBoundingBox from "./measureBoundingBox";
import measureBoundingSphere from "./measureBoundingSphere";
import measureCenter from "./measureCenter";
import measureCenterOfMass from "./measureCenterOfMass";
import measureDimensions from "./measureDimensions";
import measureEpsilon from "./measureEpsilon";
import measureVolume from "./measureVolume";

export default {
	measureAggregateArea,
	measureAggregateBoundingBox,
	measureAggregateEpsilon,
	measureAggregateVolume,
	measureArea,
	measureBoundingBox,
	measureBoundingSphere,
	measureCenter,
	measureCenterOfMass,
	measureDimensions,
	measureEpsilon,
	measureVolume,
};

export {
	measureAggregateArea,
	measureAggregateBoundingBox,
	measureAggregateEpsilon,
	measureAggregateVolume,
	measureArea,
	measureBoundingBox,
	measureBoundingSphere,
	measureCenter,
	measureCenterOfMass,
	measureDimensions,
	measureEpsilon,
	measureVolume,
};
