import { Object } from "@rbxts/luau-polyfill";

import vectorChar from "./vectorChar";
import vectorParams from "./vectorParams";

// translate text line
const translateLine = (options: { x: number }, line: { width: number; segments: number[][][] }) => {
	const { x, y } = Object.assign({ x: 0, y: 0 }, options || {});
	const segments = line.segments;
	let segment = undefined;
	let point = undefined;
	for (let i = 0, il = segments.size(); i < il; i++) {
		segment = segments[i];
		for (let j = 0, jl = segment.size(); j < jl; j++) {
			point = segment[j];
			segment[j] = [point[0] + x, point[1] + y];
		}
	}
	return line;
};

/**
 * Construct an array of character segments from a ascii string whose characters code is between 31 and 127,
 * if one character is not supported it is replaced by a question mark.
 * @param {Object|String} [options] - options for construction or ascii string
 * @param {Float} [options.xOffset=0] - x offset
 * @param {Float} [options.yOffset=0] - y offset
 * @param {Float} [options.height=21] - font size (uppercase height)
 * @param {Float} [options.lineSpacing=1.4] - line spacing expressed as a percentage of font size
 * @param {Float} [options.letterSpacing=1] - extra letter spacing expressed as a percentage of font size
 * @param {String} [options.align='left'] - multi-line text alignment: left, center, right
 * @param {Float} [options.extrudeOffset=0] - width of the extrusion that will be applied (manually) after the creation of the character
 * @param {String} [options.input='?'] - ascii string (ignored/overwrited if provided as seconds parameter)
 * @param {String} [text='?'] - ascii string
 * @returns {Array} characters segments [[[x, y], ...], ...]
 * @alias module:modeling/text.vectorText
 *
 * @example
 * let textSegments = vectorText()
 * let textSegments = vectorText('OpenJSCAD')
 * let textSegments = vectorText({ yOffset: -50 }, 'OpenJSCAD')
 * let textSegments = vectorText({ yOffset: -80, input: 'OpenJSCAD' })
 */
const vectorText = (options?: VectorTextOptions | string, text?: string): number[][][] => {
	const { xOffset, yOffset, input, font, height, align, extrudeOffset, lineSpacing, letterSpacing } = vectorParams(
		options,
		text,
	);
	let [x, y] = [xOffset, yOffset];
	let i, il, char, vect, width, diff;
	let line = { width: 0, segments: [] as number[][][] };
	const lines: { width: number; segments: number[][][] }[] = [];
	const output: number[][][] = [];
	let maxWidth = 0;
	const lineStart = x;
	const pushLine = () => {
		lines.push(line);
		maxWidth = math.max(maxWidth, line.width);
		line = { width: 0, segments: [] };
	};
	for (i = 0, il = input.size(); i < il; i++) {
		char = string.sub(input, i + 1, i + 1); //input[i];
		vect = vectorChar({ xOffset: x, yOffset: y, font, height, extrudeOffset }, char);
		if (char === "\n") {
			x = lineStart;
			y -= vect.height * lineSpacing;
			pushLine();
			continue;
		}
		width = vect.width * letterSpacing;
		line.width += width;
		x += width;
		if (char !== " ") {
			//line.segments = [...line.segments, ...vect.segments]; //line.segments.concat(vect.segments);
			for (const segment of vect.segments) {
				line.segments.push(segment);
			}
		}
	}
	if (line.segments.size()) {
		pushLine();
	}
	for (i = 0, il = lines.size(); i < il; i++) {
		line = lines[i];
		if (maxWidth > line.width) {
			diff = maxWidth - line.width;
			if (align === "right") {
				line = translateLine({ x: diff }, line);
			} else if (align === "center") {
				line = translateLine({ x: diff / 2 }, line);
			}
		}
		//output = [...output, ...line.segments]; //output.concat(line.segments);
		for (const segment of line.segments) {
			output.push(segment);
		}
	}
	return output;
};

export default vectorText;
