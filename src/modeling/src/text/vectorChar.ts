import vectorParams from "./vectorParams";

/**
 * Represents a character as a list of segments
 * @typedef {Object} VectorCharObject
 * @property {Float} width - character width
 * @property {Float} height - character height (uppercase)
 * @property {Array} segments - character segments [[[x, y], ...], ...]
 */

/** Construct a {@link VectorCharObject} from a ascii character whose code is between 31 and 127,
 * if the character is not supported it is replaced by a question mark.
 * @param {Object|String} [options] - options for construction or ascii character
 * @param {Float} [options.xOffset=0] - x offset
 * @param {Float} [options.yOffset=0] - y offset
 * @param {Float} [options.height=21] - font size (uppercase height)
 * @param {Float} [options.extrudeOffset=0] - width of the extrusion that will be applied (manually) after the creation of the character
 * @param {String} [options.input='?'] - ascii character (ignored/overwrited if provided as seconds parameter)
 * @param {String} [char='?'] - ascii character
 * @returns {VectorCharObject}
 * @alias module:modeling/text.vectorChar
 *
 * @example
 * let vectorCharObject = vectorChar()
 * let vectorCharObject = vectorChar('A')
 * let vectorCharObject = vectorChar({ xOffset: 57 }, 'C')
 * let vectorCharObject = vectorChar({ xOffset: 78, input: '!' })
 */
const vectorChar = (options?: VectorCharOptions | string, char?: string): VectorChar => {
	const { xOffset, yOffset, input, font, height, extrudeOffset } = vectorParams(options, char);
	let code: number = string.byte(input, 1)[0]; //input.charCodeAt(0);
	if (!code || !font[code as keyof typeof font]) {
		code = 63; // 63 => ?
	}
	const glyph = [...(font[code as keyof typeof font] as number[])]; //[].concat(font[code]);
	const ratio = (height - extrudeOffset) / font.height;
	const extrudeYOffset = extrudeOffset / 2;
	const width = glyph.shift()! * ratio;
	const segments = [];
	let polyline = [];
	for (let i = 0, il = glyph.size(); i < il; i += 2) {
		const gx = ratio * (glyph[i] ?? 0) + xOffset;
		const gy = ratio * (glyph[i + 1] ?? 0) + yOffset + extrudeYOffset;
		if (glyph[i] !== undefined) {
			polyline.push([gx, gy]);
			continue;
		}
		segments.push(polyline);
		polyline = [];
		i--;
	}
	if (polyline.size()) {
		segments.push(polyline);
	}
	return { width, height, segments };
};

export default vectorChar;