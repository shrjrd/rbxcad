import { Array, Error, Object } from "@rbxts/luau-polyfill";

import measureAggregateBoundingBox from "../../measurements/measureAggregateBoundingBox";
import flatten from "../../utils/flatten";
import padArrayToLength from "../../utils/padArrayToLength";
import { translate } from "./translate";

const validateOptions = (options: AlignOptions) => {
	if (!Array.isArray(options.modes) || options.modes.size() > 3)
		throw new Error("align(): modes must be an array of length <= 3");

	options.modes = padArrayToLength(options.modes, "none", 3);

	if (options.modes.filter((mode) => ["center", "max", "min", "none"].includes(mode)).size() !== 3)
		throw new Error('align(): all modes must be one of "center", "max" or "min"');

	if (!Array.isArray(options.relativeTo) || options.relativeTo.size() > 3)
		throw new Error("align(): relativeTo must be an array of length <= 3");

	options.relativeTo = padArrayToLength(options.relativeTo, 0, 3) as Vec3;

	//if (options.relativeTo.filter((alignVal) => Number.isFinite(alignVal) || alignVal === undefined).size() !== 3)
	//throw new Error("align(): all relativeTo values must be a number, or null.");
	if (options.relativeTo.filter((alignVal) => typeOf(alignVal) === "number" || alignVal === "").size() !== 3)
		throw new Error("align(): all relativeTo values must be a number, or null.");

	if (typeOf(options.grouped) !== "boolean") throw new Error("align(): grouped must be a boolean value.");

	return options;
};

const populateRelativeToFromBounds = (relativeTo: (number | string)[], modes: string[], bounds: BoundingBox) => {
	for (let i = 0; i < 3; i++) {
		//if (relativeTo[i] === undefined) {
		if (relativeTo[i] === "") {
			if (modes[i] === "center") {
				relativeTo[i] = (bounds[0][i] + bounds[1][i]) / 2;
			} else if (modes[i] === "max") {
				relativeTo[i] = bounds[1][i];
			} else if (modes[i] === "min") {
				relativeTo[i] = bounds[0][i];
			}
		}
	}
	return relativeTo as number[];
};

const alignGeometries = (geometry: object, modes: string[], relativeTo: number[]) => {
	const bounds = measureAggregateBoundingBox(geometry) as BoundingBox;
	const translation = [0, 0, 0];
	for (let i = 0; i < 3; i++) {
		if (modes[i] === "center") {
			translation[i] = relativeTo[i] - (bounds[0][i] + bounds[1][i]) / 2;
		} else if (modes[i] === "max") {
			translation[i] = relativeTo[i] - bounds[1][i];
		} else if (modes[i] === "min") {
			translation[i] = relativeTo[i] - bounds[0][i];
		}
	}

	return translate(translation, geometry);
};

type AlignOptions = {
	modes?: string[];
	relativeTo?: (number | string)[];
	grouped?: boolean;
};
/**
 * Align the boundaries of the given geometries using the given options.
 * @param {Object} options - options for aligning
 * @param {Array} [options.modes = ['center', 'center', 'min']] - the point on the geometries to align to for each axis. Valid options are "center", "max", "min", and "none".
 * @param {Array} [options.relativeTo = [0,0,0]] - The point one each axis on which to align the geometries upon.  If the value is null, then the corresponding value from the group's bounding box is used.
 * @param {Boolean} [options.grouped = false] - if true, transform all geometries by the same amount, maintaining the relative positions to each other.
 * @param {...Object} geometries - the geometries to align
 * @return {Object|Array} the aligned geometry, or a list of aligned geometries
 * @alias module:modeling/transforms.align
 *
 * @example
 * let alignedGeometries = align({modes: ['min', 'center', 'none'], relativeTo: [10, null, 10], grouped: true }, geometries)
 */
const align = (options: AlignOptions, ...geometries: object[]): object | object[] => {
	const defaults = {
		modes: ["center", "center", "min"],
		relativeTo: [0, 0, 0],
		grouped: false,
	};
	options = Object.assign({}, defaults, options);
	options = validateOptions(options);
	// eslint-disable-next-line prefer-const
	let { modes, relativeTo, grouped } = options;
	geometries = flatten(geometries);
	if (geometries.size() === 0) throw new Error("align(): No geometries were provided to act upon");
	//DEVIATION: use an empty string instead of undefined
	//if (relativeTo!.filter((val) => val === undefined).size()) {
	if (relativeTo!.filter((val) => val === "").size()) {
		const bounds = measureAggregateBoundingBox(geometries) as BoundingBox;
		relativeTo = populateRelativeToFromBounds(relativeTo!, modes!, bounds);
	}
	if (grouped) {
		geometries = alignGeometries(geometries, modes!, relativeTo as number[]) as object[];
	} else {
		geometries = geometries.map((geometry) => alignGeometries(geometry, modes!, relativeTo as number[]));
	}
	return geometries.size() === 1 ? geometries[0] : geometries;
};

export default align;
