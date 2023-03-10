const { getData } = require("../util");

getData("./day-4/data.txt").then((data) => {
	const elfPairs = parseData(data);

	let overlapCount = 0;

	elfPairs.forEach(({ elfA, elfB }) => {
		if (isOverlapping(elfA, elfB) || isOverlapping(elfB, elfA)) {
			overlapCount++;
		}
	});

	console.log(overlapCount);
});

function parseData(data) {
	const elfPairs = [];
	data.split("\n").forEach((line) => {
		lineArray = line.split(",");
		elfPairObj = {
			elfA: {
				low: parseInt(lineArray[0].split("-")[0]),
				high: parseInt(lineArray[0].split("-")[1])
			},
			elfB: {
				low: parseInt(lineArray[1].split("-")[0]),
				high: parseInt(lineArray[1].split("-")[1])
			}
		};
		elfPairs.push(elfPairObj);
	});

	return elfPairs;
}

function isChildRange(
	{ low: lowChild, high: highChild },
	{ low: lowParent, high: highParent }
) {
	if (lowChild >= lowParent && highChild <= highParent) {
		return true;
	}
	return false;
}

function isOverlapping(
	{ low: lowChild, high: highChild },
	{ low: lowParent, high: highParent }
) {
	if (
		(lowChild >= lowParent && lowChild <= highParent) ||
		(highChild >= lowParent && highChild <= highParent)
	) {
		return true;
	}
	return false;
}

module.exports = { isChildRange, isOverlapping, parseData };
