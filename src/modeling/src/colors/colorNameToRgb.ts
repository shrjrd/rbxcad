import cssColors from "./cssColors";

/**
 * Converts a CSS color name to RGB color.
 *
 * @param {String} s - the CSS color name
 * @return {Array} the RGB color, or undefined if not found
 * @alias module:modeling/colors.colorNameToRgb
 * @example
 * let mysphere = colorize(colorNameToRgb('lightblue'), sphere())
 */

const colorNameToRgb = (s: string) => cssColors[s as keyof typeof cssColors];

export default colorNameToRgb;
