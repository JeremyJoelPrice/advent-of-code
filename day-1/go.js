const { getData } = require("../util");

getData("./day-1/data.txt").then((data) => {
	data = this.parseData(data);
	const largestThree = this.findLargest3Sums(data);
	const totalSum = this.sumArray(largestThree);
	console.log(totalSum);
});

exports.parseData = (data) => {
	data = data.split("\n\n");

	data = data.map((lineGroup) => {
		return lineGroup.split("\n").map((line) => parseInt(line));
	});

	return data;
};

exports.sumArray = (array) => {
	let sum = 0;

	array.forEach((e) => (sum += e));

	return sum;
};

exports.findLargestSum = (nestedArrays) => {
	let largest = 0;

	nestedArrays.forEach((array) => {
		const sum = this.sumArray(array);
		if (sum > largest) largest = sum;
	});

	return largest;
};

exports.findLargest3Sums = (nestedArrays) => {
	let allSums = [];

	nestedArrays.forEach((array) => {
		allSums.push(this.sumArray(array));
	});

	while (allSums.length > 3) {
		const minValue = Math.min(...allSums);
		allSums = allSums.filter((n) => n !== minValue);
	}

	return allSums;
};

exports.findNthLargestSum = (nestedArrays, n) => {
	const nthLargest = [];

	// for each array
	// get the sum
	// check if the array is full
	// if not full, add to array
	// if full, check if sum is larger than the array's smallest element
	// if larger, replace that element
	// if not, discard and continue

	nestedArrays.forEach((array) => {
		const sum = this.sumArray(array);
		if (sum > nthLargest) nthLargest = sum;
	});

	return nthLargest[n - 1];
};

exports.isLargerThanArraysSmallestValue = (n, array) => {
	for (let i = 0; i < array.length; i++) {}
	return false;
};
