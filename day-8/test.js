const { getData } = require("../util");
const {
	countVisibleTreesInForest,
	directions,
	getArrayOfForest,
	isVisibleInDirection
} = require("./go");
let forest;

beforeAll(async () => {
	forest = await getData("./day-8/test-data.txt").then((data) =>
		getArrayOfForest(data)
	);
});

describe("getArrayOfForest", () => {
	test("returns 2-D array", () => {
		const sampleForest = "123\n456";
		const expectedArray = [
			[1, 2, 3],
			[4, 5, 6]
		];
		expect(getArrayOfForest(sampleForest)).toEqual(expectedArray);
	});
});

describe("isVisibleInDirection()", () => {
	describe("up", () => {
		const testParams = [
			{ tree: { tx: 1, ty: 1 }, result: true },
			{ tree: { tx: 2, ty: 1 }, result: true },
			{ tree: { tx: 3, ty: 4 }, result: true },
			{ tree: { tx: 4, ty: 0 }, result: true },
			{ tree: { tx: 0, ty: 1 }, result: false },
			{ tree: { tx: 3, ty: 1 }, result: false },
			{ tree: { tx: 3, ty: 1 }, result: false },
			{ tree: { tx: 2, ty: 2 }, result: false }
		];

		testParams.forEach(({ tree, result }) => {
			test("", () => {
				expect(isVisibleInDirection(directions.up, tree, forest)).toBe(
					result
				);
			});
		});
	});
	describe("down", () => {
		const testParams = [
			{ tree: { tx: 1, ty: 1 }, result: false },
			{ tree: { tx: 4, ty: 0 }, result: false },
			{ tree: { tx: 0, ty: 1 }, result: false },
			{ tree: { tx: 0, ty: 2 }, result: true },
			{ tree: { tx: 2, ty: 3 }, result: true },
			{ tree: { tx: 3, ty: 4 }, result: true }
		];

		testParams.forEach(({ tree, result }) => {
			test("", () => {
				expect(
					isVisibleInDirection(directions.down, tree, forest)
				).toBe(result);
			});
		});
	});
	describe("left", () => {
		const testParams = [
			{ tree: { tx: 1, ty: 0 }, result: false },
			{ tree: { tx: 2, ty: 2 }, result: false },
			{ tree: { tx: 4, ty: 4 }, result: false },
			{ tree: { tx: 1, ty: 4 }, result: true },
			{ tree: { tx: 2, ty: 3 }, result: true },
			{ tree: { tx: 0, ty: 2 }, result: true }
		];

		testParams.forEach(({ tree, result }) => {
			test("", () => {
				expect(
					isVisibleInDirection(directions.left, tree, forest)
				).toBe(result);
			});
		});
	});
	describe("right", () => {
		const testParams = [
			{ tree: { tx: 1, ty: 0 }, result: false },
			{ tree: { tx: 0, ty: 0 }, result: false },
			{ tree: { tx: 0, ty: 4 }, result: false },
			{ tree: { tx: 4, ty: 4 }, result: true },
			{ tree: { tx: 1, ty: 2 }, result: true },
			{ tree: { tx: 0, ty: 2 }, result: true }
		];

		testParams.forEach(({ tree, result }) => {
			test("", () => {
				expect(
					isVisibleInDirection(directions.right, tree, forest)
				).toBe(result);
			});
		});
	});
});

describe("countVisibleTreesInForest()", () => {
	describe("edges are always visible", () => {
		const testParams = [
			{
				forest: [
					[1, 1],
					[1, 1]
				],
				result: 4
			}
		];

		testParams.forEach(({ forest, result }) => {
			test("", () => {
				expect(countVisibleTreesInForest(forest)).toBe(result);
			});
		});
	});

	test("", () => {
		expect(countVisibleTreesInForest(forest)).toBe(21);
	});
});

// get viewing distance of a given tree

// get scenic score of a given tree
