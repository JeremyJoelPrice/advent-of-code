const { getMarkerIndex, isValidMarker } = require("./go");

describe("getMarkerIndex()", () => {
	describe("start of packet", () => {
		const startOfPacketTestCases = [
			{
				datastream: "mjqjpqmgbljsphdztnvjfqwrcgsmlb",
				markerIndex: 7
			},
			{
				datastream: "bvwbjplbgvbhsrlpgdmjqwftvncz",
				markerIndex: 5
			},
			{
				datastream: "nppdvjthqldpwncqszvftbrmjlhg",
				markerIndex: 6
			},
			{
				datastream: "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg",
				markerIndex: 10
			},
			{
				datastream: "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw",
				markerIndex: 11
			}
		];

		startOfPacketTestCases.forEach(({ datastream, markerIndex }) => {
			test("returns marker index of the given datastream", () => {
				expect(getMarkerIndex(datastream, 4)).toBe(markerIndex);
			});
		});
	});
	describe("start of message", () => {
		const startOfPacketTestCases = [
			{
				datastream: "mjqjpqmgbljsphdztnvjfqwrcgsmlb",
				markerIndex: 19
			},
			{
				datastream: "bvwbjplbgvbhsrlpgdmjqwftvncz",
				markerIndex: 23
			},
			{
				datastream: "nppdvjthqldpwncqszvftbrmjlhg",
				markerIndex: 23
			},
			{
				datastream: "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg",
				markerIndex: 29
			},
			{
				datastream: "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw",
				markerIndex: 26
			}
		];

		startOfPacketTestCases.forEach(({ datastream, markerIndex }) => {
			test("returns marker index of the given datastream", () => {
				expect(getMarkerIndex(datastream, 14)).toBe(markerIndex);
			});
		});
	});
});

describe("isValidMarker()", () => {
	const testCases = [
		{
			input: "abcd",
			output: true
		},
		{
			input: "abca",
			output: false
		},
		{
			input: "abcc",
			output: false
		},
		{
			input: "aaaa",
			output: false
		}
	];

	testCases.forEach(({ input, output }) => {
		test(`returns ${output} when given ${input}`, () => {
			expect(isValidMarker(input)).toBe(output);
		});
	});
});
