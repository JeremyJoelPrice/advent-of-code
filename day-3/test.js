const {
	getCharValue,
	getDuplicateCharacter,
	chunkArray,
	getTokenOfBackpackGroup
} = require("./go");

describe("getCharValue", () => {
	test("returns lowercase char values", () => {
		expect(getCharValue("a")).toBe(1);
		expect(getCharValue("b")).toBe(2);
		expect(getCharValue("z")).toBe(26);
	});
	test("returns uppercase char values", () => {
		expect(getCharValue("A")).toBe(27);
		expect(getCharValue("B")).toBe(28);
		expect(getCharValue("Z")).toBe(52);
	});
});

describe("getDuplicateCharacter()", () => {
	const testCases = {
		vJrwpWtwJgWrhcsFMMfFFhFp: "p",
		jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL: "L",
		PmmdzqPrVvPwwTWBwg: "P"
	};

	Object.keys(testCases).forEach((backpackString) => {
		test("returns duplicate character", () => {
			const duplicate = getDuplicateCharacter(backpackString);
			expect(duplicate).toBe(testCases[backpackString]);
		});
	});
});

describe("chunkArray()", () => {
	const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	const testCases = {
		2: [
			[1, 2],
			[3, 4],
			[5, 6],
			[7, 8],
			[9, 10],
			[11, 12]
		],
		3: [
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
			[10, 11, 12]
		],
		4: [
			[1, 2, 3, 4],
			[5, 6, 7, 8],
			[9, 10, 11, 12]
		]
	};
	Object.keys(testCases).forEach((chunkSize) => {
		test(`chunks array into size ${chunkSize} arrays`, () => {
			expect(chunkArray(testArray, parseInt(chunkSize))).toMatchObject(
				testCases[chunkSize]
			);
		});
	});
});

describe("getTokenOfBackpackGroup()", () => {
	const testCases = [
		{
			backpackGroup: [
				"vJrwpWtwJgWrhcsFMMfFFhFp",
				"jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
				"PmmdzqPrVvPwwTWBwg"
			],
			token: "r"
		},
		{
			backpackGroup: [
				"wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
				"ttgJtRGJQctTZtZT",
				"CrZsJsPPZsGzwwsLwLmpwMDw"
			],
			token: "Z"
		}
	];
	testCases.forEach((testCase) => {
		test("returns common character within backpack group", () => {
			const backpackGroup = testCase.backpackGroup;
			const token = getTokenOfBackpackGroup(backpackGroup);
			expect(token).toBe(testCase.token);
		});
	});
});
