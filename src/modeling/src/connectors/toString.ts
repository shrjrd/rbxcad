/**
 * Return a string representing the given connector.
 *
 * @param {connector} connector - the connector of reference
 * @returns {string} string representation
 * @alias module:modeling/connectors.toString
 */
const toString = (connector: Connector): string => {
	const point = connector.point;
	const axis = connector.axis;
	const normal = connector.normal;
	return string.format(
		"connector: point: [%.7f, %.7f, %.7f], axis: [%.7f, %.7f, %.7f], normal: [%.7f, %.7f, %.7f]",
		point[0],
		point[1],
		point[2],
		axis[0],
		axis[1],
		axis[2],
		normal[0],
		normal[1],
		normal[2],
	);
};

export default toString;
