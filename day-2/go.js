const { getData } = require("../util");

const scoreKey = {
	rock: 1,
	paper: 2,
	scissors: 3,
	lose: 0,
	draw: 3,
	win: 6
};

const moveKey = {
	A: "rock",
	B: "paper",
	C: "scissors",
	X: "rock",
	Y: "paper",
	Z: "scissors"
};

const outcomeKey = {
	X: "lose",
	Y: "draw",
	Z: "win"
};

const moveHierarchy = ["rock", "paper", "scissors"];

// solution 1
// getData("./day-2/data.txt").then((data) => {
// 	data = data.split("\n");

// 	let score = 0;
// 	data.forEach((match) => {
// 		let [opponent, myself] = match.split(" ");
// 		opponent = moveKey[opponent];
// 		myself = moveKey[myself];

// 		score += scoreKey[myself];
// 		score += getGameScore(opponent, myself);
// 	});

// 	console.log(score);
// });

// solution 2
getData("./day-2/data.txt").then((data) => {
	data = data.split("\n");

	let score = 0;
	data.forEach((match) => {
		let [opponent, outcome] = match.split(" ");
		opponent = moveKey[opponent];
		outcome = outcomeKey[outcome];
		// score for outcome
		score += scoreKey[outcome];
		// determine my move
		const move = getMoveFromIntendedOutcome(opponent, outcome);
		// score for move
		score += scoreKey[move];
	});

	console.log(score);
});

function getGameScore(opponent, myself) {
	// i win if my choice is 1 higher than my opponents
	// or if my choice is 2 lower than my opponents
	if (
		scoreKey[myself] === scoreKey[opponent] + 1 ||
		scoreKey[myself] === scoreKey[opponent] - 2
	) {
		return scoreKey.win;
	}

	// i draw if they are equal
	if (opponent === myself) return scoreKey.draw;

	// i lose in all other cases
	return scoreKey.lose;
}

function getMoveFromIntendedOutcome(opponent, outcome) {
	let opponentIndex = moveHierarchy.indexOf(opponent);
	switch (outcome) {
		case "win":
			return opponentIndex === moveHierarchy.length - 1
				? moveHierarchy[0]
				: moveHierarchy[opponentIndex + 1];
		case "lose":
			return opponentIndex === 0
				? moveHierarchy[2]
				: moveHierarchy[opponentIndex - 1];
		default:
			return opponent;
	}
}

module.exports = { getGameScore, getMoveFromIntendedOutcome, scoreKey };
