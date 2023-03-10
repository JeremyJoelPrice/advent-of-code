const { getData } = require("../util");

getData("./day-5/data.txt").then((data) => {
	const { stacks, instructions } = parseData(data);
	executeInstructions(stacks, instructions);
	let results = [];
	stacks.forEach((stack) => results.push(stack[0]));
	results = results
		.join()
		.replaceAll("[", "")
		.replaceAll("]", "")
		.replaceAll(",", "");
	// console.log("results:\n", results);
});

/*
Array methods:
	read top crate: stack[0]
	remove top crate: topCrate = stack.shift()
	add crate to stack: stack.unshift(newTopCrate)
*/

function liftCrates(numOfCrates, stack) {
	if (numOfCrates > stack.length) {
		throw "stack size error";
	}
	return stack.splice(0, numOfCrates);
}

function putCrates(crates, stack) {
	// solution 1 version:
	// crates.forEach((crate) => {
	// 	stack.unshift(crate);
	// });
	// solution 2 version:
	stack.splice(0, stack.length, ...crates, ...stack);
}

function executeInstructions(stacks, instructions) {
	instructions.forEach((instruction) => {
		const { numOfCrates, sourceStack, destinationStack } =
			parseSingleInstruction(instruction);
		const crates = liftCrates(numOfCrates, stacks[sourceStack]);
		putCrates(crates, stacks[destinationStack]);
	});
}

function parseSingleInstruction(instruction) {
	instruction = instruction
		.replace("move ", "")
		.replaceAll(/\D+/g, ",")
		.split(",");

	let [numOfCrates, sourceStack, destinationStack] = instruction.map((e) =>
		parseInt(e)
	);

	// 0-index the stack references
	sourceStack--;
	destinationStack--;

	return { numOfCrates, sourceStack, destinationStack };
}

function parseData(data) {
	// divide stacks from instructions by finding the blank line
	// get stacks
	let stackData = data.substring(0, data.indexOf("\n\n"));
	const stacks = parseStackData(stackData);
	// get instructions
	const instructions = data.substring(data.indexOf("m")).split("\n");

	return { stacks, instructions };
}

function parseStackData(stackData) {
	const stacks = [];
	let numOfStacks;

	// split data into rows, removing the final row of numbers and using it to prepare the empty stacks
	stackDataRows = stackData.split("\n");
	numOfStacks = stackDataRows.pop();
	numOfStacks = numOfStacks[numOfStacks.length - 2];
	for (let i = 0; i < numOfStacks; i++) stacks.push([]);

	// divide each row into crates, and assign each non-blank crate to its corresponding stack
	stackDataRows.forEach((dataRow) => {
		let stackIndex = 0;
		while (dataRow.length > 0) {
			// extract first crate
			const nextCrate = dataRow.substring(0, 3);

			// if non-whitespace, add them to the corresponding array
			if (nextCrate !== "   ") {
				stacks[stackIndex].push(nextCrate);
			}
			stackIndex++;
			// remove the current chunk and any trailing whitespace
			dataRow =
				dataRow.length > 3
					? dataRow.substring(4)
					: dataRow.substring(3);
		}
	});

	return stacks;
}

module.exports = {
	executeInstructions,
	liftCrates,
	parseData,
	parseSingleInstruction,
	parseStackData,
	putCrates
};
