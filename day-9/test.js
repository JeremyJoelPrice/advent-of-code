const { getData } = require("../util");
const {
	moveHead,
	parseInstructions,
	correctTail,
	TailLocations,
	solutionOne,
	solutionTwo,
	printRope
} = require("./go");

const head = { x: 0, y: 0 };
const tail = { x: 0, y: 0 };

beforeEach(() => {
	head.x = 0;
	head.y = 0;
	tail.x = 0;
	tail.y = 0;
});

describe("parseInstructions()", () => {
	describe("returns array of instructions", () => {
		test("", () => {
			const testParams = [
				{ instructions: "R 4", result: ["R", "R", "R", "R"] },
				{
					instructions: "U 4\nL 3",
					result: ["U", "U", "U", "U", "L", "L", "L"]
				},
				{
					instructions: "D 1\nR 4\nD 1\nL 5\nR 2",
					result: [
						"D",
						"R",
						"R",
						"R",
						"R",
						"D",
						"L",
						"L",
						"L",
						"L",
						"L",
						"R",
						"R"
					]
				}
			];

			testParams.forEach(({ instructions, result }) => {
				expect(parseInstructions(instructions)).toMatchObject(result);
			});
		});
	});
});

describe("movehead()", () => {
	test("moves head horizontally right", () => {
		moveHead("R", head);
		expect(head).toMatchObject({ x: 1, y: 0 });
		moveHead("R", head);
		expect(head).toMatchObject({ x: 2, y: 0 });
		moveHead("R", head);
		expect(head).toMatchObject({ x: 3, y: 0 });
	});
	test("moves head horizontally left", () => {
		moveHead("L", head);
		expect(head).toMatchObject({ x: -1, y: 0 });
		moveHead("L", head);
		expect(head).toMatchObject({ x: -2, y: 0 });
		moveHead("L", head);
		expect(head).toMatchObject({ x: -3, y: 0 });
	});
	test("moves head vertically up", () => {
		moveHead("U", head);
		expect(head).toMatchObject({ x: 0, y: 1 });
		moveHead("U", head);
		expect(head).toMatchObject({ x: 0, y: 2 });
		moveHead("U", head);
		expect(head).toMatchObject({ x: 0, y: 3 });
	});
	test("moves head vertically down", () => {
		moveHead("D", head);
		expect(head).toMatchObject({ x: 0, y: -1 });
		moveHead("D", head);
		expect(head).toMatchObject({ x: 0, y: -2 });
		moveHead("D", head);
		expect(head).toMatchObject({ x: 0, y: -3 });
	});
	test("throws exception for invalid input", () => {
		expect(() => {
			moveHead("invalid input", head);
		}).toThrow("Invalid head instruction exception");
	});
});

describe("correctTail()", () => {
	describe("corrects tail when head moves horizontally", () => {
		test("moving right", () => {
			const testParams = [
				{ instruction: "R", expectedTailPostion: { x: 0, y: 0 } },
				{ instruction: "R", expectedTailPostion: { x: 1, y: 0 } },
				{ instruction: "R", expectedTailPostion: { x: 2, y: 0 } }
			];
			testParams.forEach(({ instruction, expectedTailPostion }) => {
				moveHead(instruction, head);
				correctTail(head, tail);
				expect(tail).toMatchObject(expectedTailPostion);
			});
		});
		test("moving left", () => {
			const testParams = [
				{ instruction: "L", expectedTailPostion: { x: 0, y: 0 } },
				{ instruction: "L", expectedTailPostion: { x: -1, y: 0 } },
				{ instruction: "L", expectedTailPostion: { x: -2, y: 0 } }
			];
			testParams.forEach(({ instruction, expectedTailPostion }) => {
				moveHead(instruction, head);
				correctTail(head, tail);
				expect(tail).toMatchObject(expectedTailPostion);
			});
		});
		test("moving right and left", () => {
			const testParams = [
				{ instruction: "R", expectedTailPostion: { x: 0, y: 0 } },
				{ instruction: "R", expectedTailPostion: { x: 1, y: 0 } },
				{ instruction: "R", expectedTailPostion: { x: 2, y: 0 } },
				{ instruction: "L", expectedTailPostion: { x: 2, y: 0 } },
				{ instruction: "L", expectedTailPostion: { x: 2, y: 0 } },
				{ instruction: "L", expectedTailPostion: { x: 1, y: 0 } }
			];
			testParams.forEach(({ instruction, expectedTailPostion }) => {
				moveHead(instruction, head);
				correctTail(head, tail);
				expect(tail).toMatchObject(expectedTailPostion);
			});
		});
		test("moving up", () => {
			const testParams = [
				{ instruction: "U", expectedTailPostion: { x: 0, y: 0 } },
				{ instruction: "U", expectedTailPostion: { x: 0, y: 1 } },
				{ instruction: "U", expectedTailPostion: { x: 0, y: 2 } }
			];
			testParams.forEach(({ instruction, expectedTailPostion }) => {
				moveHead(instruction, head);
				correctTail(head, tail);
				expect(tail).toMatchObject(expectedTailPostion);
			});
		});
		test("moving down", () => {
			const testParams = [
				{ instruction: "D", expectedTailPostion: { x: 0, y: 0 } },
				{ instruction: "D", expectedTailPostion: { x: 0, y: -1 } },
				{ instruction: "D", expectedTailPostion: { x: 0, y: -2 } }
			];
			testParams.forEach(({ instruction, expectedTailPostion }) => {
				moveHead(instruction, head);
				correctTail(head, tail);
				expect(tail).toMatchObject(expectedTailPostion);
			});
		});
		test("moving up and down", () => {
			const testParams = [
				{ instruction: "U", expectedTailPostion: { x: 0, y: 0 } },
				{ instruction: "U", expectedTailPostion: { x: 0, y: 1 } },
				{ instruction: "U", expectedTailPostion: { x: 0, y: 2 } },
				{ instruction: "D", expectedTailPostion: { x: 0, y: 2 } },
				{ instruction: "D", expectedTailPostion: { x: 0, y: 2 } },
				{ instruction: "D", expectedTailPostion: { x: 0, y: 1 } }
			];
			testParams.forEach(({ instruction, expectedTailPostion }) => {
				moveHead(instruction, head);
				correctTail(head, tail);
				expect(tail).toMatchObject(expectedTailPostion);
			});
		});
		test("moving right then up", () => {
			const testParams = [
				{ instruction: "R", expectedTailPostion: { x: 0, y: 0 } },
				{ instruction: "U", expectedTailPostion: { x: 0, y: 0 } },
				{ instruction: "U", expectedTailPostion: { x: 1, y: 1 } }
			];
			testParams.forEach(({ instruction, expectedTailPostion }) => {
				moveHead(instruction, head);
				correctTail(head, tail);
				expect(tail).toMatchObject(expectedTailPostion);
			});
		});
		test("moving right then down", () => {
			const testParams = [
				{ instruction: "R", expectedTailPostion: { x: 0, y: 0 } },
				{ instruction: "D", expectedTailPostion: { x: 0, y: 0 } },
				{ instruction: "D", expectedTailPostion: { x: 1, y: -1 } }
			];
			testParams.forEach(({ instruction, expectedTailPostion }) => {
				moveHead(instruction, head);
				correctTail(head, tail);
				expect(tail).toMatchObject(expectedTailPostion);
			});
		});
		test("moving left then up", () => {
			const testParams = [
				{ instruction: "L", expectedTailPostion: { x: 0, y: 0 } },
				{ instruction: "U", expectedTailPostion: { x: 0, y: 0 } },
				{ instruction: "U", expectedTailPostion: { x: -1, y: 1 } }
			];
			testParams.forEach(({ instruction, expectedTailPostion }) => {
				moveHead(instruction, head);
				correctTail(head, tail);
				expect(tail).toMatchObject(expectedTailPostion);
			});
		});
		test("moving left then down", () => {
			const testParams = [
				{ instruction: "L", expectedTailPostion: { x: 0, y: 0 } },
				{ instruction: "D", expectedTailPostion: { x: 0, y: 0 } },
				{ instruction: "D", expectedTailPostion: { x: -1, y: -1 } }
			];
			testParams.forEach(({ instruction, expectedTailPostion }) => {
				moveHead(instruction, head);
				correctTail(head, tail);
				expect(tail).toMatchObject(expectedTailPostion);
			});
		});
		test("moving up then right", () => {
			const testParams = [
				{ instruction: "U", expectedTailPostion: { x: 0, y: 0 } },
				{ instruction: "R", expectedTailPostion: { x: 0, y: 0 } },
				{ instruction: "R", expectedTailPostion: { x: 1, y: 1 } }
			];
			testParams.forEach(({ instruction, expectedTailPostion }) => {
				moveHead(instruction, head);
				correctTail(head, tail);
				expect(tail).toMatchObject(expectedTailPostion);
			});
		});
		test("moving up then left", () => {
			const testParams = [
				{ instruction: "U", expectedTailPostion: { x: 0, y: 0 } },
				{ instruction: "L", expectedTailPostion: { x: 0, y: 0 } },
				{ instruction: "L", expectedTailPostion: { x: -1, y: 1 } }
			];
			testParams.forEach(({ instruction, expectedTailPostion }) => {
				moveHead(instruction, head);
				correctTail(head, tail);
				expect(tail).toMatchObject(expectedTailPostion);
			});
		});
		test("moving down then right", () => {
			const testParams = [
				{ instruction: "D", expectedTailPostion: { x: 0, y: 0 } },
				{ instruction: "R", expectedTailPostion: { x: 0, y: 0 } },
				{ instruction: "R", expectedTailPostion: { x: 1, y: -1 } }
			];
			testParams.forEach(({ instruction, expectedTailPostion }) => {
				moveHead(instruction, head);
				correctTail(head, tail);
				expect(tail).toMatchObject(expectedTailPostion);
			});
		});
		test("moving down then left", () => {
			const testParams = [
				{ instruction: "D", expectedTailPostion: { x: 0, y: 0 } },
				{ instruction: "L", expectedTailPostion: { x: 0, y: 0 } },
				{ instruction: "L", expectedTailPostion: { x: -1, y: -1 } }
			];
			testParams.forEach(({ instruction, expectedTailPostion }) => {
				moveHead(instruction, head);
				correctTail(head, tail);
				expect(tail).toMatchObject(expectedTailPostion);
			});
		});
	});
});

describe("tail follows head correctly", () => {
	test("vertical motion", () => {});
});

describe("TailLocations", () => {
	describe("returns the number of unique positions it has logged", () => {
		let tailLocations;
		beforeEach(() => {
			tailLocations = new TailLocations();
		});
		test("returns 0 when no locations have been logged", () => {
			expect(tailLocations.getLocationCount()).toBe(0);
		});
		test("returns 1 when 1 location has been logged", () => {
			tailLocations.logLocation({ x: 0, y: 0 });
			expect(tailLocations.getLocationCount()).toBe(1);
		});
		test("returns 2 when 2 locations have been logged", () => {
			tailLocations.logLocation({ x: 0, y: 0 });
			tailLocations.logLocation({ x: 1, y: 0 });
			expect(tailLocations.getLocationCount()).toBe(2);
		});
		test("returns 3 when 3 locations have been logged", () => {
			tailLocations.logLocation({ x: 0, y: 0 });
			tailLocations.logLocation({ x: 1, y: 0 });
			tailLocations.logLocation({ x: 1, y: 1 });
			expect(tailLocations.getLocationCount()).toBe(3);
		});
		test("ignores duplicate locations", () => {
			tailLocations.logLocation({ x: 0, y: 0 });
			tailLocations.logLocation({ x: 1, y: 0 });
			tailLocations.logLocation({ x: 0, y: 0 });
			tailLocations.logLocation({ x: 1, y: 0 });
			tailLocations.logLocation({ x: 1, y: 1 });
			expect(tailLocations.getLocationCount()).toBe(3);
		});
	});
});

describe("solutionOne", () => {
	test("takes a set of instructions and returns the number of unique tail positions", () => {
		const testParams = [
			{
				instructions: "R 4\nU 4\nL 3",
				result: 8
			},
			{
				instructions: "R 3",
				result: 3
			}
		];

		const instructions = "R 3";
		expect(solutionOne(instructions)).toBe(3);
	});
	test("test data", async () => {
		const instructions = await getData(
			"./day-9/test-data.txt",
			(data) => data
		);
		expect(solutionOne(instructions)).toBe(13);
	});
	test("production data", async () => {
		const instructions = await getData("./day-9/data.txt", (data) => data);
		expect(solutionOne(instructions)).toBe(6057);
	});
});

describe("printRope()", () => {
	test("prints diagram of rope's current position", () => {
		testParams = [
			{
				boardSize: 7,
				rope: [
					{ x: 0, y: 0 },
					{ x: 0, y: 0 },
					{ x: 0, y: 0 },
					{ x: 0, y: 0 },
					{ x: 0, y: 0 },
					{ x: 0, y: 0 },
					{ x: 0, y: 0 },
					{ x: 0, y: 0 },
					{ x: 0, y: 0 },
					{ x: 0, y: 0 }
				],
				result:
					".......\n" +
					".......\n" +
					".......\n" +
					"...0...\n" +
					".......\n" +
					".......\n" +
					".......\n"
			},
			{
				boardSize: 9,
				rope: [
					{ x: 1, y: -1 },
					{ x: 1, y: 0 },
					{ x: 2, y: 0 },
					{ x: 1, y: 1 },
					{ x: 0, y: 2 },
					{ x: -1, y: 3 },
					{ x: -1, y: 2 },
					{ x: -1, y: 1 },
					{ x: -1, y: 0 },
					{ x: 0, y: 0 }
				],
				result:
					".........\n" +
					"...5.....\n" +
					"...64....\n" +
					"...7.3...\n" +
					"...8912..\n" +
					".....0...\n" +
					".........\n" +
					".........\n" +
					".........\n"
			}
		];

		testParams.forEach(({ boardSize, rope, result }) => {
			expect(printRope(rope, boardSize)).toBe(result);
		});
	});
});

describe("solutionTwo", () => {
	test.only("test data", async () => {
		const instructions = await getData(
			"./day-9/test-data.txt",
			(data) => data
		);
		expect(solutionTwo(instructions)).toBe(1);
	});
	test("test data 2", async () => {
		const instructions = await getData(
			"./day-9/test-data-2.txt",
			(data) => data
		);
		expect(solutionTwo(instructions)).toBe(36);
	});
});
