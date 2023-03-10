const { getData } = require("../util");

// solution 1
// getData("./day-3/data.txt").then((data) => {
// 	let sum = 0;

// 	data.split("\n").forEach((backpackString) => {
// 		sum += getCharValue(getDuplicateCharacter(backpackString));
// 	});

// 	console.log(sum);
// });

// solution 2
// get each cluster of 3 backpacks
// find the item common to all 3
// sum the values of these items
// return the sum
getData("./day-3/data.txt").then((data) => {
	let sum = 0;

	const backpackGroups = chunkArray(data.split("\n"), 3);

	backpackGroups.forEach((group) => {
		sum += getCharValue(getTokenOfBackpackGroup(group));
	});

	console.log(sum);
});

function getCharValue(char) {
	if (/[a-z]/.test(char)) return char.charCodeAt(0) - 96;
	if (/[A-Z]/.test(char)) return char.charCodeAt(0) - 38;
}

function getDuplicateCharacter(backpackString) {
	const middleIndex = backpackString.length / 2;
	const compartmentA = backpackString.slice(0, middleIndex);
	const compartmentB = backpackString.slice(middleIndex);

	return compartmentA.split("").filter((char) => {
		return compartmentB.includes(char);
	})[0];
}

function chunkArray(array, chunkSize) {
	const result = [];

	for (let i = 0; i <= array.length - chunkSize; i += chunkSize) {
		result.push(array.slice(i, i + chunkSize));
	}

	return result;
}

function getTokenOfBackpackGroup([packA, packB, packC]) {
	return packA.split("").filter((char) => {
		return packB.includes(char) && packC.includes(char);
	})[0];
}

module.exports = {
	chunkArray,
	getCharValue,
	getDuplicateCharacter,
	getTokenOfBackpackGroup
};
