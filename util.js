const fileSystem = require("fs/promises");

exports.getData = (filepath) => {
	return fileSystem.readFile(filepath, "utf-8");
};
