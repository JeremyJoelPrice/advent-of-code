const { getData } = require("../util");
const {
	countVisibleTreesInForest,
	directions,
	forEachTree,
	getArrayOfForest,
	getScenicScore,
	getHighestScenicScoreInForest,
	getViewingDistanceInDirection,
	isVisibleInDirection
} = require("./go");
let forest;

beforeAll(async () => {
	forest = await getData("./day-8/test-data.txt").then((data) =>
		getArrayOfForest(data)
	);
});

describe("utility functions", () => {
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
	describe("forEachTree()", () => {
		describe("iterates over every tree", () => {
			const testParams = [
				{
					forest: [
						[1, 1],
						[1, 1]
					],
					treeCount: 4
				},
				{
					forest: [
						[1, 1, 1],
						[1, 1, 1]
					],
					treeCount: 6
				},
				{
					forest: [
						[1, 1],
						[1, 1],
						[1, 1],
						[1, 1]
					],
					treeCount: 8
				},
				{
					forest: [
						[1, 1, 1, 1],
						[1, 1, 1, 1],
						[1, 1, 1, 1]
					],
					treeCount: 12
				}
			];

			testParams.forEach(({ forest, treeCount }) => {
				test("", () => {
					let count = 0;
					forEachTree(forest, () => {
						count++;
					});
					expect(count).toEqual(treeCount);
				});
			});
		});
	});
});

describe("problem 1", () => {
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
					expect(
						isVisibleInDirection(directions.up, tree, forest)
					).toBe(result);
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
});

describe("problem 2", () => {
	describe("getViewingDistanceInDirection()", () => {
		describe("up", () => {
			const testParams = [
				{ tree: { tx: 0, ty: 0 }, result: 0 },
				{ tree: { tx: 0, ty: 4 }, result: 1 },
				{ tree: { tx: 4, ty: 0 }, result: 0 },
				{ tree: { tx: 4, ty: 4 }, result: 1 },
				{ tree: { tx: 2, ty: 1 }, result: 1 },
				{ tree: { tx: 3, ty: 2 }, result: 2 }
			];

			testParams.forEach(({ tree, result }) => {
				test("", () => {
					expect(
						getViewingDistanceInDirection(
							directions.up,
							tree,
							forest
						)
					).toBe(result);
				});
			});
		});
		describe("down", () => {
			const testParams = [
				{ tree: { tx: 0, ty: 0 }, result: 2 },
				{ tree: { tx: 0, ty: 4 }, result: 0 },
				{ tree: { tx: 4, ty: 0 }, result: 3 },
				{ tree: { tx: 4, ty: 4 }, result: 0 },
				{ tree: { tx: 2, ty: 1 }, result: 2 },
				{ tree: { tx: 3, ty: 2 }, result: 1 }
			];

			testParams.forEach(({ tree, result }) => {
				test("", () => {
					expect(
						getViewingDistanceInDirection(
							directions.down,
							tree,
							forest
						)
					).toBe(result);
				});
			});
		});
		describe("left", () => {
			const testParams = [
				{ tree: { tx: 0, ty: 0 }, result: 0 },
				{ tree: { tx: 0, ty: 4 }, result: 0 },
				{ tree: { tx: 4, ty: 0 }, result: 1 },
				{ tree: { tx: 4, ty: 4 }, result: 1 },
				{ tree: { tx: 2, ty: 1 }, result: 1 },
				{ tree: { tx: 3, ty: 4 }, result: 3 }
			];

			testParams.forEach(({ tree, result }) => {
				test("", () => {
					expect(
						getViewingDistanceInDirection(
							directions.left,
							tree,
							forest
						)
					).toBe(result);
				});
			});
		});
		describe("right", () => {
			const testParams = [
				{ tree: { tx: 0, ty: 0 }, result: 2 },
				{ tree: { tx: 0, ty: 4 }, result: 1 },
				{ tree: { tx: 4, ty: 0 }, result: 0 },
				{ tree: { tx: 4, ty: 4 }, result: 0 },
				{ tree: { tx: 2, ty: 1 }, result: 2 },
				{ tree: { tx: 3, ty: 4 }, result: 1 }
			];

			testParams.forEach(({ tree, result }) => {
				test("", () => {
					expect(
						getViewingDistanceInDirection(
							directions.right,
							tree,
							forest
						)
					).toBe(result);
				});
			});
		});
	});
	describe("getScenicScore()", () => {
		const testParams = [
			{ tree: { tx: 2, ty: 1 }, result: 4 },
			{ tree: { tx: 2, ty: 3 }, result: 8 },
			{ tree: { tx: 1, ty: 2 }, result: 6 },
			{ tree: { tx: 0, ty: 0 }, result: 0 },
			{ tree: { tx: 0, ty: 4 }, result: 0 },
			{ tree: { tx: 4, ty: 0 }, result: 0 },
			{ tree: { tx: 4, ty: 4 }, result: 0 }
		];

		testParams.forEach(({ tree, result }) => {
			test("", () => {
				expect(getScenicScore(tree, forest)).toBe(result);
			});
		});
	});
	describe("getHighestScenicScoreInForest()", () => {
		test("test-data forest", () => {
			expect(getHighestScenicScoreInForest(forest)).toBe(8);
		});
		test("production data forest", async () => {
			const prodForest = await getData("./day-8/data.txt").then((data) =>
				getArrayOfForest(data)
			);
			expect(getHighestScenicScoreInForest(prodForest)).toBe(504000);
		});
		test("large data forest", async () => {
			const prodForest = await getData(
				"./day-8/large-test-data.txt"
			).then((data) => getArrayOfForest(data));
			expect(getHighestScenicScoreInForest(prodForest)).toBe(2400);
		});
		describe("custom forests", () => {
			const testParams = [
				{
					forest: [
						[1, 2],
						[3, 4]
					],
					result: 0
				},
				{
					forest: [
						[3, 0, 3, 7],
						[2, 4, 5, 1],
						[6, 5, 3, 3]
					],
					result: 2
				},
				{
					forest: [
						[1, 1, 1, 1],
						[1, 4, 5, 1],
						[1, 1, 1, 1],
						[1, 1, 1, 1]
					],
					result: 4
				},
				{
					forest: [
						[1, 1, 1],
						[1, 2, 1],
						[1, 1, 1]
					],
					result: 1
				},
				{
					forest: [
						[1, 1, 1],
						[1, 1, 1],
						[1, 2, 1],
						[1, 1, 1]
					],
					result: 2
				},
				{
					forest: [
						[1, 1, 1, 1],
						[1, 1, 1, 1],
						[1, 2, 1, 1],
						[1, 1, 1, 1]
					],
					result: 4
				},
				{
					forest: [
						[1, 1, 1, 1],
						[1, 1, 1, 1],
						[1, 2, 1, 1],
						[1, 1, 1, 1],
						[1, 1, 1, 1]
					],
					result: 8
				},
				{
					forest: [
						[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
					],
					result: 625
				}
			];

			testParams.forEach(({ forest, result }) => {
				test("", () => {
					expect(getHighestScenicScoreInForest(forest)).toBe(result);
				});
			});
		});
	});
});
