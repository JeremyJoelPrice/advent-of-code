// setup
const { getData } = require("../util");
let forest;
let rowSize;
const directions = {
	up: {
		row: -1,
		column: 0
	},
	down: {
		row: +1,
		column: 0
	},
	left: {
		row: 0,
		column: -1
	},
	right: {
		row: 0,
		column: +1
	}
};

// program
getData("./day-8/test-data.txt").then((data) => {
	forest = data.split("\n").map((row) => row.split(""));
	rowSize = forest[0].length;

	// solution 1:
	// let sum = rowSize * 2 + (rowSize - 2) * 2;

	// iterateThroughInnerTrees((tree) => {
	// 	if (isVisible(tree)) {
	// 		sum++;
	// 	}
	// });

	// console.log(sum);

	// solution 2:
	console.log(forest);

	// get the scenic score for every inner tree
	// return the highest scenic score
});

function iterateThroughInnerTrees(callback) {
	for (let row = 1; row <= rowSize - 2; row++) {
		for (let column = 1; column <= rowSize - 2; column++) {
			callback({ row, column });
		}
	}
}

function isVisible(tree) {
	for (let direction of Object.values(directions)) {
		const treeLine = getTreeLineFromTree(tree, direction);
		for (let i = 0; i < treeLine.length; i++) {
			// if we see a tree not smaller than us, this path is a bust
			if (treeLine[i] >= forest[tree.row][tree.column]) {
				break;
			} else if (i === treeLine.length - 1) {
				// if we don't see a tree bigger than us, return true
				return true;
			}
		}
	}
	return false;
}

function getTreeLineFromTree(tree, direction) {
	let treeLine = [];
	let cursor = { row: tree.row, column: tree.column };
	while (
		cursor.row > 0 &&
		cursor.row < rowSize - 1 &&
		cursor.column > 0 &&
		cursor.column < rowSize - 1
	) {
		cursor.row += direction.row;
		cursor.column += direction.column;
		treeLine.push(forest[cursor.row][cursor.column]);
	}

	return treeLine;
}

function getScenicScore(tree) {
	// check how many trees are visible in each direction
		// get treeline in each direction
		for (let direction of Object.values(directions)) {
			const treeLine = getTreeLineFromTree(tree, direction);
			// for each direction, stop when you find a tree as big or bigger than the given tree
			for (let i = 0; i < treeLine.length; i++)  {
				// stop if next tree is 
			}
		}
	// multiply these together
}