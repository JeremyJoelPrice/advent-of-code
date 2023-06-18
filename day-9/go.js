const { getData } = require("../util");

class TailLocations {
	locations = [];

	logLocation(location) {
		const isRedundantInstruction = this.locations.some(({ x, y }) => {
			const result = x === location.x && y === location.y;
			return result;
		});

		if (!isRedundantInstruction) {
			this.locations.push(location);
		}
	}

	getLocationCount() {
		return this.locations.length;
	}
}

function solutionOne(instructionString) {
	// Solution 1
	// parse instructions
	const instructions = parseInstructions(instructionString);

	// add tail's initial position to the *set* of all tail's positions
	const head = { x: 0, y: 0 };
	const tail = { x: 0, y: 0 };
	const tailLocations = new TailLocations();
	tailLocations.logLocation({ x: tail.x, y: tail.y });

	// for each instruction:
	instructions.forEach((i) => {
		// move head
		moveHead(i, head);
		// check if tail should move
		// if so, move tail
		correctTail(head, tail);
		// console.log(`${i}: `, tail, tailLocations.getLocationCount());
		// add tail's current position to a *set* of all tail's positions
		tailLocations.logLocation({ x: tail.x, y: tail.y });
	});
	// when no more instructions:
	// return the size of the set of tail locations
	return tailLocations.getLocationCount();
}

function solutionTwo(instructionString) {
	// parse instructions
	const instructions = parseInstructions(instructionString);
	const rope = [
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
	];
	const tailLocations = new TailLocations();
	tailLocations.logLocation({ x: rope[9].x, y: rope[9].y });

	// for each instruction:
	instructions.forEach((i) => {
		console.log(i);
		// move head
		moveHead(i, rope[0]);
		// iterate through all knots, with each one acting as the head for the next
		for (let k = 1; k < rope.length; k++) {
			correctTail(rope[k - 1], rope[k]);
		}
		tailLocations.logLocation({ x: rope[9].x, y: rope[9].y });
		printRope(rope, 25);
	});
	return tailLocations.getLocationCount();
}

function parseInstructions(instructionString) {
	const parsedInstructions = [];
	instructionString.split("\n").forEach((i) => {
		let [direction, count] = i.split(" ");
		count = parseInt(count);
		for (let c = 0; c < count; c++) {
			parsedInstructions.push(direction);
		}
	});
	return parsedInstructions;
}

function moveHead(instruction, head) {
	switch (instruction) {
		case "R":
			head.x++;
			break;
		case "L":
			head.x--;
			break;
		case "U":
			head.y++;
			break;
		case "D":
			head.y--;
			break;
		default:
			throw new Error("Invalid head instruction exception");
	}
}

function correctTail(head, tail) {
	const xDiff = head.x - tail.x;
	const yDiff = head.y - tail.y;
	if (xDiff > 1) {
		tail.x++;
		tail.y = head.y;
	}
	if (xDiff < -1) {
		tail.x--;
		tail.y = head.y;
	}
	if (yDiff > 1) {
		tail.y++;
		tail.x = head.x;
	}
	if (yDiff < -1) {
		tail.y--;
		tail.x = head.x;
	}
}

function printRope(rope, boardSize = 7) {
	let board = "";
	let startingPoint =
		parseInt(boardSize / 2) + parseInt(boardSize / 2) * (boardSize + 1);

	for (let rowCount = 0; rowCount < boardSize; rowCount++) {
		for (let columnCount = 0; columnCount < boardSize; columnCount++) {
			board += ".";
		}
		board += "\n";
	}

	for (let i = rope.length - 1; i >= 0; i--) {
		let { x, y } = rope[i];
		y *= -1; // invert y because I decided earlier in the code that a higher y value means nearer the top of the "board", whereas in a string a higher value means nearer the end
		let char = startingPoint + x + y * (boardSize + 1);
		board = board.substring(0, char) + i + board.substring(char + 1);
	}
	console.log(board);
	return board;
}

module.exports = {
	correctTail,
	moveHead,
	parseInstructions,
	printRope,
	solutionOne,
	solutionTwo,
	TailLocations
};
