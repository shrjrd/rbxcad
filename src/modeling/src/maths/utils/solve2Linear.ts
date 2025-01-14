const solve2Linear = (a: number, b: number, c: number, d: number, u: number, v: number): Vec2 => {
	const det = a * d - b * c;
	const invdet = 1.0 / det;
	let x = u * d - b * v;
	let y = -u * c + a * v;
	x *= invdet;
	y *= invdet;
	return [x, y];
};

export default solve2Linear;
