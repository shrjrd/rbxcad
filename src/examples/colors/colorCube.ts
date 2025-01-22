/**
 * Color Cube
 * @category Colors
 * @skillLevel 2
 * @description looking at the different ways to specify a color
 * @tags rgb, hsl, hsv, color
 * @authors Simon Clark
 * @licence MIT License
 */

import rbxcad from "../../modeling/src";
const { colorize, hslToRgb, hsvToRgb } = rbxcad.colors;
const { cuboid } = rbxcad.primitives;
const { translate } = rbxcad.transforms;

const getTranslation = (x: number, y: number, z: number, steps: number) => {
	const spacing = 4;
	return [(x - steps / 2) * spacing, (y - steps / 2) * spacing, (z - steps / 2) * spacing];
};

const getColor = (a: number, b: number, c: number, method: string) => {
	if (method === "hsl") return hslToRgb(a, b, c);
	else if (method === "hsv") return hsvToRgb(a, b, c);
	else return [a, b, c];
};

/**
 * Creates a 9x9x9 cube showing color variations on the the 3 main spectra (rgb, hsv, hsl)
 * @param {String} params.method - The spectrum function to use: 'rgb'|'hsv'|'hsl'
 * @returns {[geometry]}
 */
const main = (params: { method: string }) => {
	const o = [];
	const rows = 8;
	for (let ix = 0; ix <= rows; ix++) {
		for (let iy = 0; iy <= rows; iy++) {
			for (let iz = 0; iz <= rows; iz++) {
				const cube = translate(getTranslation(ix, iy, iz, rows), cuboid({ size: [1, 1, 1] }) as Geom3);
				const color = getColor(ix / rows, iy / rows, iz / rows, params.method) as RGBA;
				o.push(colorize(color, cube));
			}
		}
	}
	return o;
};

const getParameterDefinitions = () => [
	{
		name: "method",
		type: "choice",
		caption: "Colorize Method",
		values: ["rgb", "hsv", "hsl"],
		captions: ["(r,g,b) = (x,y,z)", "(h,s,v) = (x,y,z)", "(h,s,l) = (x,y,z)"],
		initial: "hsl",
	},
];

export default main;
