// setup
const { getData } = require("../util");

const directions = {
	up: { dx: 0, dy: -1 },
	down: { dx: 0, dy: 1 },
	left: { dx: -1, dy: 0 },
	right: { dx: 1, dy: 0 }
};

// program
getData("./day-8/data.txt").then((data) => {
	const forest = getArrayOfForest(data);
	// solution 1:
	// console.log(countVisibleTreesInForest(forest));
	// solution 2:
	// console.log(getHighestScenicScoreInForest(forest));
});

function countVisibleTreesInForest(forest) {
	let treeCount = 0;

	forEachTree(forest, ({ tx, ty }) => {
		if (
			isVisibleInDirection(directions.up, { tx, ty }, forest) ||
			isVisibleInDirection(directions.down, { tx, ty }, forest) ||
			isVisibleInDirection(directions.left, { tx, ty }, forest) ||
			isVisibleInDirection(directions.right, { tx, ty }, forest)
		) {
			treeCount++;
		}
	});

	return treeCount;
}

function forEachTree(forest, callback) {
	for (let ty = 0; ty < forest.length; ty++) {
		for (let tx = 0; tx < forest[ty].length; tx++) {
			callback({ tx, ty });
		}
	}
}

function getArrayOfForest(forest) {
	rows = forest.split("\n");
	forest = rows.map((row) => row.split("").map((cell) => parseInt(cell)));
	return forest;
}

function isVisibleInDirection(direction, tree, forest) {
	// tree under consideration
	const { tx, ty } = tree;
	const { dx, dy } = direction;

	// take your tree
	// move the cursor in the given direction and test the next tree
	function testNextTree(cursor) {
		let { cx, cy } = cursor;
		cx += dx;
		cy += dy;

		// if the cursor passed the edge of the forest, return true
		if (cy < 0 || cy === forest.length || cx < 0 || cx === forest.length) {
			return true;
		}

		// if the current tree is not shorter than the original tree, return false
		if (forest[cy][cx] >= forest[ty][tx]) {
			return false;
		}

		// move the cursor to the next tree and test again
		return testNextTree({ cx, cy });
	}

	return testNextTree({ cx: tx, cy: ty });
}

function getViewingDistanceInDirection(direction, tree, forest) {
	// tree under consideration
	const { tx, ty } = tree;
	const { dx, dy } = direction;
	let viewingDistance = 0;

	// take your tree
	// move the cursor in the given direction and test the next tree
	function testNextTree(cursor) {
		let { cx, cy } = cursor;
		cx += dx;
		cy += dy;

		// has the cursor passed the edge of the forest?
		if (
			cy < 0 ||
			cy === forest.length ||
			cx < 0 ||
			cx === forest[0].length
		) {
			return viewingDistance;
		}

		viewingDistance++;

		// is the current tree the same or taller than the original tree?
		if (forest[cy][cx] >= forest[ty][tx]) {
			return viewingDistance;
		}

		// move the cursor to the next tree and test again
		return testNextTree({ cx, cy });
	}

	return testNextTree({ cx: tx, cy: ty });
}

function getScenicScore(tree, forest) {
	return (
		getViewingDistanceInDirection(directions.up, tree, forest) *
		getViewingDistanceInDirection(directions.down, tree, forest) *
		getViewingDistanceInDirection(directions.left, tree, forest) *
		getViewingDistanceInDirection(directions.right, tree, forest)
	);
}

function getHighestScenicScoreInForest(forest) {
	const scenicScores = [];
	forEachTree(forest, (tree) => {
		scenicScores.push(getScenicScore(tree, forest));
	});

	return Math.max(...scenicScores);
}

module.exports = {
	countVisibleTreesInForest,
	directions,
	forEachTree,
	getArrayOfForest,
	getHighestScenicScoreInForest,
	getScenicScore,
	getViewingDistanceInDirection,
	isVisibleInDirection
};
