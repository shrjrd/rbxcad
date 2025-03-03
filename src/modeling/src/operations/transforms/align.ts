import type { RecursiveArray } from "../../utils/recursiveArray";
import type { Geometry } from "../../geometries/types";
import type { BoundingBox } from "../../measurements/types";
type NullableNumber = "" | number;
export interface AlignOptions {
	modes?: Array<"center" | "max" | "min" | "none">;
	relativeTo?:
		| [NullableNumber]
		| [NullableNumber, NullableNumber]
		| [NullableNumber, NullableNumber, NullableNumber]
		| NullableNumber[];
	grouped?: boolean;
}
import { Array as JsArray, Number, Object } from "@rbxts/luau-polyfill";

import * as vec3 from "../../maths/vec3/index";
import { measureAggregateBoundingBox } from "../../measurements/measureAggregateBoundingBox";
import { coalesce } from "../../utils/coalesce";
import { padArrayToLength } from "../../utils/padArrayToLength";
import { translate } from "./translate";

const validateOptions = (options: AlignOptions) => {
	if (!JsArray.isArray(options.modes) || options.modes.size() > 3)
		throw "align(): modes must be an array of length <= 3";
	options.modes = padArrayToLength(options.modes, "none", 3);
	if (options.modes.filter((mode) => ["center", "max", "min", "none"].includes(mode)).size() !== 3)
		throw 'align(): all modes must be one of "center", "max" or "min"';

	if (!JsArray.isArray(options.relativeTo) || options.relativeTo.size() > 3)
		throw "align(): relativeTo must be an array of length <= 3";
	options.relativeTo = padArrayToLength(options.relativeTo, 0, 3);
	if (options.relativeTo.filter((alignVal) => Number.isFinite(alignVal) || alignVal === "").size() !== 3)
		throw "align(): all relativeTo values must be a number, or null.";

	if (typeOf(options.grouped) !== "boolean") throw "align(): grouped must be a boolean value.";

	return options;
};

const populateRelativeToFromBounds = (
	relativeTo: Array<NullableNumber>,
	modes: Array<"center" | "max" | "min" | "none">,
	bounds: Array<Array<number>>,
) => {
	for (let i = 0; i < 3; i++) {
		// DEVIATION: use "" instead of undefined
		//if (relativeTo[i] == undefined) {
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
	return relativeTo;
};

const alignGeometries = (
	geometries: RecursiveArray<Geometry>,
	modes: Array<"center" | "max" | "min" | "none">,
	relativeTo: Array<number>,
) => {
	const bounds = measureAggregateBoundingBox(geometries) as BoundingBox;
	const translation = vec3.create();
	for (let i = 0; i < 3; i++) {
		if (modes[i] === "center") {
			translation[i] = relativeTo[i] - (bounds[0][i] + bounds[1][i]) / 2;
		} else if (modes[i] === "max") {
			translation[i] = relativeTo[i] - bounds[1][i];
		} else if (modes[i] === "min") {
			translation[i] = relativeTo[i] - bounds[0][i];
		}
	}

	return translate(translation, geometries);
};

/**
 * Align the boundaries of the given geometries using the given options.
 * @param {object} options - options for aligning
 * @param {Array} [options.modes = ['center', 'center', 'min']] - the point on the geometries to align to for each axis. Valid options are "center", "max", "min", and "none".
 * @param {Array} [options.relativeTo = [0,0,0]] - The point one each axis on which to align the geometries upon.  If the value is null, then the corresponding value from the group's bounding box is used.
 * @param {boolean} [options.grouped = false] - if true, transform all geometries by the same amount, maintaining the relative positions to each other.
 * @param {...Object} geometries - the geometries to align
 * @return {Object|Array} the aligned geometry, or a list of aligned geometries
 * @alias module:modeling/transforms.align
 *
 * @example
 * let alignedGeometries = align({modes: ['min', 'center', 'none'], relativeTo: [10, null, 10], grouped: true }, geometries)
 */
export const align = (options: AlignOptions, ...geometries: RecursiveArray<Geometry>) => {
	const defaults = {
		modes: ["center", "center", "min"],
		relativeTo: [0, 0, 0],
		grouped: false,
	};
	options = Object.assign({}, defaults, options);

	options = validateOptions(options);
	// eslint-disable-next-line prefer-const
	let { modes, relativeTo, grouped } = options;

	// DEVIATION: use "" instead of undefined
	if (relativeTo!.filter((val) => val === "").size() > 0) {
		const bounds = measureAggregateBoundingBox(geometries) as BoundingBox;
		relativeTo = populateRelativeToFromBounds(relativeTo!, modes!, bounds);
	}
	if (grouped) {
		geometries = coalesce(geometries);
		geometries = alignGeometries(geometries, modes!, relativeTo as number[]) as Geometry[];
	} else {
		geometries = geometries.map((geometry) =>
			alignGeometries(geometry as RecursiveArray<Geometry>, modes!, relativeTo as number[]),
		);
	}
	return geometries.size() === 1 ? geometries[0] : geometries;
};
