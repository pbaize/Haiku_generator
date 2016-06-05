var fs = require("fs");
var cmudictFile = './cmudict.txt';
var syllable = require('syllable');
var cards = 'cah.txt';

function readData(file) {
	return fs.readFileSync(file).toString().split("\n");
}

function formatCmuData() {
	var lines = readData(cmudictFile);
	var dict = {};
	lines.forEach(function(line) {
		var lineSplit = line.split(" ");
		var sylCount = 0;
		for (var i = 1; i < lineSplit.length; i++) {
			if (lineSplit[i].match(/\d/)) {
				sylCount += 1;
			}
		}
		if (dict[sylCount]) {
			dict[sylCount].push(lineSplit[0]);
		} else {
			dict[sylCount] = [lineSplit[0]];
		}
	});
	return dict;
}

function makeHaiku(structure, data) {
	var haiku = "";
	var lines = data;
	for (var i = 0; i < structure.length; i++) {
		line = "";
		for (var n = 0; n < structure[i].length; n++) {
			var sylls = structure[i][n];
			var randInd = Math.floor(Math.random() * lines[sylls].length);
			line += lines[sylls][randInd] + " ";
		}
		haiku += line + "\n";
	}
	return haiku;
}

function createHaiku(structure) {
	return makeHaiku(structure, formatCmuData());
}

//Below is another aproach for words not in CMUDict to enable the use of cards from Cards Against Humanity. Inspired by their "Make a haiku" black card.

function cardObj(text) {
	this.phrase = text;
}

cardObj.prototype.structure = function() {
	var words = this.phrase.split(" ");
	var structArr = [];
	for (var i = 0; i < words.length; i++) {
		structArr.push(syllable(words[i]));
	}
	return structArr;
};

cardObj.prototype.syllables = function() {
	var struct = this.structure();
	return struct.reduce(function(a, b) {
		return a + b;
	});
};

function organizeCards() {
	var lines = readData(cards);
	var deck = {};
	for (var i = 0; i < lines.length; i++) {
		var card = new cardObj(lines[i]);
		if (deck[card.syllables()]) {
			deck[card.syllables()].push(card.phrase);
		} else {
			deck[card.syllables()] = [card.phrase];
		}
	}
	return deck;
}

function naughtyHaiku(structure) {
	return makeHaiku(structure, organizeCards());
}

module.exports = {
	createHaiku: createHaiku,
	naughtyHaiku: naughtyHaiku,
};