const { getData } = require("../util");
const {
	liftCrates,
	putCrates,
	executeInstructions,
	parseSingleInstruction,
	parseData,
	parseStackData
} = require("./go");

describe("moving crates", () => {
	describe("liftCrates()", () => {
		describe("modifies stack", () => {
			const removesCrateTestCases = [
				{
					before: [1, 2, 3],
					numOfCrates: 1,
					after: [2, 3]
				},
				{
					before: [1],
					numOfCrates: 1,
					after: []
				},
				{
					before: [1, 2, 3],
					numOfCrates: 2,
					after: [3]
				}
			];

			removesCrateTestCases.forEach(({ before, numOfCrates, after }) => {
				test(`removes ${numOfCrates} elements from a stack of size ${before.length}, leaving a stack of size ${after.length}`, () => {
					liftCrates(numOfCrates, before);
					expect(before).toMatchObject(after);
				});
			});
		});

		describe("returns removed crates", () => {
			const returnsTopCrateTestCases = [
				{
					stack: [1, 2, 3],
					numOfCrates: 1,
					removedCrates: [1]
				},
				{
					stack: [1],
					numOfCrates: 1,
					removedCrates: [1]
				}
			];

			returnsTopCrateTestCases.forEach(
				({ stack, numOfCrates, removedCrates }) => {
					test(`returns ${removedCrates} when given stack ${stack}`, () => {
						expect(liftCrates(numOfCrates, stack)).toMatchObject(
							removedCrates
						);
					});
				}
			);
		});

		describe("exception handling", () => {
			test("throws exception if stack is empty", () => {
				expect(() => {
					liftCrates(1, []).toThrow("stack size error");
				});
			});
			test("throws exception if numOfCrates exceeds stack size", () => {
				expect(() => {
					liftCrates(2, []).toThrow("stack size error");
				});
			});
		});
	});

	describe("putCrates()", () => {
		const testCases = [
			{
				before: [1, 2, 3],
				crates: [0],
				after: [0, 1, 2, 3]
			},
			{
				before: [],
				crates: [0],
				after: [0]
			},
			{
				before: [0],
				crates: [0],
				after: [0, 0]
			}
		];

		testCases.forEach(({ before, crates, after }) => {
			test("adds crates to the top of the given stack", () => {
				putCrates(crates, before);
				expect(before).toMatchObject(after);
			});
		});
	});
});

describe("instructions", () => {
	describe("parseSingleInstruction()", () => {
		const testCases = [
			{
				input: "move 1 from 2 to 1",
				output: {
					destinationStack: 0,
					numOfCrates: 1,
					sourceStack: 1
				}
			},
			{
				input: "move 4 from 5 to 6",
				output: {
					destinationStack: 5,
					numOfCrates: 4,
					sourceStack: 4
				}
			},
			{
				input: "move 11 from 10 to 9",
				output: {
					destinationStack: 8,
					numOfCrates: 11,
					sourceStack: 9
				}
			}
		];

		testCases.forEach(({ input, output }) => {
			test("extracts key data from instruction string, subtracting 1 from all indexes so they work with 0-indexed arrays", () => {
				expect(parseSingleInstruction(input)).toMatchObject(output);
			});
		});
	});

	describe("executeInstructions()", () => {
		const testCases = [
			{
				stacks: [
					[1, 2, 3],
					[4, 5, 6]
				],
				instructions: ["move 1 from 2 to 1"],
				resultingStacks: [
					[4, 1, 2, 3],
					[5, 6]
				]
			}
		];

		testCases.forEach(({ stacks, instructions, resultingStacks }) => {
			test("executes the given instructions", () => {
				executeInstructions(stacks, instructions);
				expect(stacks).toMatchObject(resultingStacks);
			});
		});
	});
});

describe("data", () => {
	describe("parseData()", () => {
		const testCases = [
			{
				dataUrl: "./day-5/test-data-1.txt",
				output: {
					stacks: [["[N]", "[Z]"], ["[D]", "[C]", "[M]"], ["[P]"]],
					instructions: [
						"move 1 from 2 to 1",
						"move 3 from 1 to 3",
						"move 2 from 2 to 1",
						"move 1 from 1 to 2"
					]
				}
			}
		];
		testCases.forEach(({ dataUrl, output }) => {
			test("parses data", async () => {
				const data = await getData(dataUrl).then((data) => data);
				expect(parseData(data)).toMatchObject(output);
			});
		});
	});
	describe("parseStackData()", () => {
		const testCases = [
			{
				input: `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 `,
				output: [["[N]", "[Z]"], ["[D]", "[C]", "[M]"], ["[P]"]]
			},
			{
				input: `        [Z]
        [N]
    [C] [D]
    [M] [P]
 1   2   3 `,
				output: [[], ["[C]", "[M]"], ["[Z]", "[N]", "[D]", "[P]"]]
			}
		];

		testCases.forEach(({ input, output }) => {
			test("given stack data, returns stacks as arrays", () => {
				expect(parseStackData(input)).toMatchObject(output);
			});
		});
	});
});
