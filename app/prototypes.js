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