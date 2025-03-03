import type { Path2 } from "../geometries/types";
import type { Vec2 } from "../maths/types";

/**
 * Represents a character as an anonymous object containing a list of 2D paths.
 * @typedef {Object} VectorChar
 * @property {number} width - character width
 * @property {number} height - character height (uppercase)
 * @property {Array} paths - list of 2D paths
 */
export interface VectorChar {
	width: number;
	height: number;
	paths: Path2[]; //Array<Array<Vec2>>;
}

export interface VectorCharOptions {
	xOffset?: number;
	yOffset?: number;
	font?: {
		height: number;
		[key: number]: (number | undefined)[];
	};
	height?: number;
	extrudeOffset?: number;
}

import { Object } from "@rbxts/luau-polyfill";

import { fromPoints } from "../geometries/path2/index";
import * as vec2 from "../maths/vec2/index";
import { simplex } from "./fonts/single-line/hershey/simplex";

const defaultsVectorParams = {
	xOffset: 0,
	yOffset: 0,
	font: simplex,
	height: 14, // old vector_xxx simplex font height
	extrudeOffset: 0,
};

/**
 * Construct a {@link VectorChar} from an ASCII character whose code is between 31 and 127.
 * If the character is not supported it is replaced by a question mark.
 *
 * @param {object} options - options for text construction
 * @param {number} [options.xOffset=0] - x offset
 * @param {number} [options.yOffset=0] - y offset
 * @param {number} [options.height=21] - font size/character height (uppercase height)
 * @param {number} [options.extrudeOffset=0] - width of the extrusion that will be applied (manually) after the creation of the character
 * @param {string} text - ascii character
 * @returns {VectorChar} a new vertor char object
 * @alias module:modeling/text.vectorChar
 *
 * @example
 * let mycharacter = vectorChar({ xOffset: 57 }, 'C')
 */
export const vectorChar = (options?: VectorCharOptions, text?: string): VectorChar => {
	const { xOffset, yOffset, font, height, extrudeOffset } = Object.assign({}, defaultsVectorParams, options);

	if (typeOf(text) !== "string" || text!.size() !== 1) {
		throw "text must be a single character";
	}

	let code = string.byte(text!, 1)[0] as number; //text.charCodeAt(0);
	// DEVIATION: 0, NaN, and "" are falsy in TS.
	if (code === 0 || !font[code]) {
		code = 63; // invalid character so use ?
	}

	const glyph = [...(font[code as keyof typeof font] as number[])]; //[].concat(font[code]);
	const ratio = (height - extrudeOffset) / font.height;
	const extrudeYOffset = extrudeOffset / 2;
	const width = glyph.shift()! * ratio;

	const paths: Path2[] = [];
	let polyline: Vec2[] = [];
	for (let i = 0, il = glyph.size(); i < il; i += 2) {
		const gx = ratio * (glyph[i] ?? 0) + xOffset;
		const gy = ratio * (glyph[i + 1] ?? 0) + yOffset + extrudeYOffset;
		if (glyph[i] !== undefined) {
			polyline.push(vec2.fromValues(gx, gy));
			continue;
		}
		paths.push(fromPoints({}, polyline));
		polyline = [];
		i--;
	}
	if (polyline.size() > 0) {
		paths.push(fromPoints({}, polyline));
	}

	return { width, height, paths };
};
