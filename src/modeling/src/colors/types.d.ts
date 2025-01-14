/*export type RGB = [number, number, number];
export type RGBA = [number, number, number, number];
export type HSL = [number, number, number];
export type HSLA = [number, number, number, number];
export type HSV = [number, number, number];
export type HSVA = [number, number, number, number];*/

interface RGB extends Array<number> {
	[index: number]: number;
	0: number;
	1: number;
	2: number;
}

interface RGBA extends Array<number> {
	[index: number]: number;
	0: number;
	1: number;
	2: number;
	3: number;
}

interface HSL extends Array<number> {
	[index: number]: number;
	0: number;
	1: number;
	2: number;
}

interface HSLA extends Array<number> {
	[index: number]: number;
	0: number;
	1: number;
	2: number;
	3: number;
}

interface HSV extends Array<number> {
	[index: number]: number;
	0: number;
	1: number;
	2: number;
}

interface HSVA extends Array<number> {
	[index: number]: number;
	0: number;
	1: number;
	2: number;
	3: number;
}
