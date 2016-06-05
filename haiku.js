var haiku = require('./haiku_generator');
var structure = [[5], [7], [5]];
console.log("\nNice:\n"+haiku.createHaiku(structure)+"\nNaughty:\n"+haiku.naughtyHaiku(structure));
//haiku.createHaiku([5, 7, 5])+