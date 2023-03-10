const { parseData, isChildRange, isOverlapping } = require("./go");

describe("parseData()", () => {
	const testCases = [
		{
			input: `12-80,12-81
13-94,14-93`,
			output: [
				{
					elfA: {
						low: 12,
						high: 80
					},
					elfB: {
						low: 12,
						high: 81
					}
				},
				{
					elfA: {
						low: 13,
						high: 94
					},
					elfB: {
						low: 14,
						high: 93
					}
				}
			]
		}
	];

	testCases.forEach(({ input, output }) => {
		test("parses data", () => {
			expect(parseData(input)).toMatchObject(output);
		});
	});
});

describe("isChildRange()", () => {
	const testCases = [
		{
			input: {
				// no overlap
				a: {
					low: 1,
					high: 2
				},
				b: {
					low: 3,
					high: 4
				}
			},
			output: false
		},
		{
			input: {
				// partial overlap
				a: {
					low: 3,
					high: 5
				},
				b: {
					low: 1,
					high: 4
				}
			},
			output: false
		},
		{
			input: {
				// fully contained
				a: {
					low: 2,
					high: 3
				},
				b: {
					low: 1,
					high: 4
				}
			},
			output: true
		},
		{
			input: {
				// contained, same low
				a: {
					low: 2,
					high: 3
				},
				b: {
					low: 2,
					high: 4
				}
			},
			output: true
		},
		{
			input: {
				// contained, same high
				a: {
					low: 2,
					high: 3
				},
				b: {
					low: 1,
					high: 3
				}
			},
			output: true
		},
		{
			input: {
				// contained, same range
				a: {
					low: 2,
					high: 3
				},
				b: {
					low: 2,
					high: 3
				}
			},
			output: true
		}
	];

	testCases.forEach(({ input, output }) => {
		test("returns whether a range is contained within another range", () => {
			expect(isChildRange(input.a, input.b)).toBe(output);
		});
	});
});

describe("isOverlapping", () => {
	const testCases = [
		{
			input: {
				// no overlap
				a: {
					low: 1,
					high: 2
				},
				b: {
					low: 3,
					high: 4
				}
			},
			output: false
		},
		{
			input: {
				// partial overlap low
				a: {
					low: 4,
					high: 5
				},
				b: {
					low: 1,
					high: 4
				}
			},
			output: true
		},
		{
			input: {
				// partial overlap high
				a: {
					low: 1,
					high: 3
				},
				b: {
					low: 3,
					high: 4
				}
			},
			output: true
		},
		{
			input: {
				// total overlap
				a: {
					low: 2,
					high: 3
				},
				b: {
					low: 1,
					high: 4
				}
			},
			output: true
		}
	];

	testCases.forEach(({ input, output }) => {
		test("returns whether a range overlaps with another range", () => {
			expect(isOverlapping(input.a, input.b)).toBe(output);
		});
	});
});
