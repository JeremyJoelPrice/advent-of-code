// setup
const { getData } = require("../util");

class Entry {
	name;
	parentDirectory;
	isDirectory;
	size;
	children;

	constructor(name, parentDirectory, isDirectory, size = 0) {
		this.name = name;
		this.parentDirectory = parentDirectory;
		this.isDirectory = isDirectory;
		this.size = size;
		this.children = [];
	}
}

const root = new Entry("/", undefined, true);
let currentDirectory = root;
const maxDirectorySize = 100000;
const diskSize = 70000000;
const updateSize = 30000000;

// test answer: 95437
// part 1 answer: 1477771

// / directory
// current directory
// parent directory
// directory
// file

// program

getData("./day-7/data.txt").then((data) => {
	executeCommands(data.split("\n"));

	const allDirectorySizes = getEachChildDirectorySize(root);

	// part 1 solution:
	// console.log(sumAllSmallEnoughDirectories(allDirectorySizes));

	// part 2 solution:
	// get all big enough directories, order by size, return smallest
	console.log(getSmallestBigEnoughDirectory());
});

function executeCommands(commands) {
	for (let command of commands) {
		if (command.startsWith("$")) {
			handleBashCommand(command);
		} else {
			handleLsResult(command);
		}
	}
}

function handleBashCommand(command) {
	const value = command.split(" ")[2];

	switch (value) {
		case "/":
			currentDirectory = root;
			break;
		case "..":
			currentDirectory = currentDirectory.parentDirectory;
			break;
		case undefined:
			break;
		default:
			currentDirectory = currentDirectory.children.filter((c) => {
				return c.name === value;
			})[0];
	}
}

function handleLsResult(command) {
	const [value, name] = command.split(" ");
	currentDirectory.children.push(
		new Entry(
			name,
			currentDirectory,
			command.startsWith("dir"),
			parseInt(value) || 0
		)
	);
}

function getDirectorySize(directory) {
	let sum = 0;
	for (let child of directory.children) {
		sum += !child.isDirectory ? child.size : getDirectorySize(child);
	}
	return sum;
}

function getEachChildDirectorySize(directory) {
	let directorySizes = [];

	for (let child of directory.children) {
		if (!child.isDirectory) {
			continue;
		}

		directorySizes.push({
			name: child.name,
			size: getDirectorySize(child)
		});

		directorySizes = directorySizes.concat(
			getEachChildDirectorySize(child)
		);
	}

	return directorySizes;
}

function sumAllSmallEnoughDirectories(directories) {
	let sum = 0;
	for (let dir of directories) {
		if (dir.size <= maxDirectorySize) {
			sum += dir.size;
		}
	}
	return sum;
}

function getSmallestBigEnoughDirectory() {
	// get available space
	const availableSpace = diskSize - getDirectorySize(root);
	// calcuate difference
	const minimumDirectorySize = updateSize - availableSpace;
	// filter directories by minimumDirectorySize
	let directorySizes = getEachChildDirectorySize(root).filter((dir) => {
		return dir.size >= minimumDirectorySize;
	});
	// sort directories by size
	directorySizes = directorySizes.sort((a, b) => {
		return a.size - b.size;
	});
	// return size of smallest directory
	return directorySizes[0].size;
}
