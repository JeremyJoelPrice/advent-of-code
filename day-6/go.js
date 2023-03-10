const { getData } = require("../util");

getData("./day-6/data.txt").then((data) => {
	console.log(getMarkerIndex(data, 14));
});

function getMarkerIndex(datastream, size) {
	for (let i = 0; i < datastream.length - size; i++) {
		const marker = datastream.substring(i, i + size);
		if (isValidMarker(marker, size)) {
			return i + size;
		}
	}
}

function isValidMarker(marker) {
	for (let i = 0; i < marker.length - 1; i++) {
		const charCount = marker.split(marker[i]).length - 1;
		if (charCount > 1) return false;
	}
	return true;
}

module.exports = { getMarkerIndex, isValidMarker };
