const {
	parseData,
	sumArray,
	findLargestSum,
	findNthLargestSum,
	findLargest3Sums
} = require("./go");

describe("parseData()", () => {
	test("converts line-separated list of numbers into nested arrays of numbers", () => {
		const data = `100
200

300
400`;

		const expectedOutput = [
			[100, 200],
			[300, 400]
		];

		expect(parseData(data)).toMatchObject(expectedOutput);
	});
});

describe("sumArray()", () => {
	test("sums given array", () => {
		const array = [1, 2, 3];
		expect(sumArray(array)).toBe(6);
	});
	test("sums given array", () => {
		const array = [1, 2, 3, 4];
		expect(sumArray(array)).toBe(10);
	});
});

describe("findLargestSum()", () => {
	test("find the largest sum of given nested arrays", () => {
		const array = [
			[1, 2, 3],
			[4, 5, 6]
		];

		expect(findLargestSum(array, 1)).toBe(15);
	});
});

describe("findLargest3Sums()", () => {
	test("returns largest 3 sums of given nested arrays", () => {
		const array = [
			[1, 2, 3],
			[4, 5, 6],
			[1, 3, 5],
			[2, 4, 6],
			[7, 8, 9]
		];

		const results = findLargest3Sums(array);
		expect(results.includes(15)).toBe(true);
	});
});