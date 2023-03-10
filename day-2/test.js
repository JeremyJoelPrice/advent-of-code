const { getGameScore, scoreKey, getMoveFromIntendedOutcome } = require("./go");

describe("getGameScore()", () => {
	test("returns 6 if the game is won", () => {
		expect(getGameScore("rock", "paper")).toBe(scoreKey.win);
		expect(getGameScore("paper", "scissors")).toBe(scoreKey.win);
		expect(getGameScore("scissors", "rock")).toBe(scoreKey.win);
	});
	test("returns 3 if the game is drawn", () => {
		expect(getGameScore("rock", "rock")).toBe(scoreKey.draw);
		expect(getGameScore("paper", "paper")).toBe(scoreKey.draw);
		expect(getGameScore("scissors", "scissors")).toBe(scoreKey.draw);
	});
	test("returns 0 if the game is drawn", () => {
		expect(getGameScore("paper", "rock")).toBe(scoreKey.lose);
		expect(getGameScore("scissors", "paper")).toBe(scoreKey.lose);
		expect(getGameScore("rock", "scissors")).toBe(scoreKey.lose);
	});
});

describe("getMoveFromIntendedOutcome()", () => {
	const outcomes = {
		win: [
			["rock", "paper"],
			["paper", "scissors"],
			["scissors", "rock"]
		],
		draw: [
			["rock", "rock"],
			["paper", "paper"],
			["scissors", "scissors"]
		],
		lose: [
			["rock", "scissors"],
			["paper", "rock"],
			["scissors", "paper"]
		]
	};

	Object.keys(outcomes).forEach((outcome) => {
		outcomes[outcome].forEach((movePair) => {
			test(`returns moves which ${outcome}`, () => {
				expect(getMoveFromIntendedOutcome(movePair[0], outcome)).toBe(
					movePair[1]
				);
			});
		});
	});
});
