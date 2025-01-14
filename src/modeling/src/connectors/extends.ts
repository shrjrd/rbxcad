import vec3 from "../maths/vec3";
import fromPointAxisNormal from "./fromPointAxisNormal";

/*
 * Creates a new connector, with the connection point moved in the direction of the axis
 * @param {Number} distance the distance to extend the connector to
 * @param {connector} connector the connector to extend
 * @returns {connector} a normalized connector
 */
const extend = (distance: number, connector: Connector): Connector => {
	//const newpoint = vec3.add(connector.point, vec3.scale(distance, vec3.normalize(connector.axis)))
	const newpoint = vec3.add(
		[0, 0, 0],
		connector.point,
		vec3.scale([0, 0, 0], vec3.normalize([0, 0, 0], connector.axis), distance),
	);
	return fromPointAxisNormal(newpoint, connector.axis, connector.normal);
};

export default extend;
