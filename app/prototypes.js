// -- String

/* Pseudo Pluralize */
String.prototype.plural = function() {
  return this + 's';
};

/* Pseudo Singularize */
String.prototype.single = function() {
  return this.slice(0, -1);
};

/* Capitalize */
String.prototype.caps = function() {
  return this.charAt(0).toUpperCase() + this.substring(1);
};

var Snake = Snake || {};

/* Shuffle - http://bost.ocks.org/mike/shuffle */
Snake.shuffle = function(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;

    return array;
  }
};