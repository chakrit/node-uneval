
// node-uneval/index.js
// ----
// Approximation of uneval for node.js/v8.
// Convert objects into code.
// Don't use this unless you know all the things that could go wrong with this.

module.exports = (function(undefined) {

  var util = require('util');

  return function uneval(obj, known) {
    var root = (known === undefined), result;
    known = known || [];

    // some values fail eval() if not wrapped in a ( ) parenthesises
    var wrapRoot = function(result) {
      return root ? ("(" + result + ")") : result;
    }

    // special objects
    if (obj === null)
      return "null";
    if (obj === undefined)
      return "undefined";
    if (obj !== obj) // isNaN does type coercion, so can't use that.
      return "NaN";
    if (obj === Infinity)
      return "Infinity";
    if (obj === -Infinity)
      return "-Infinity";

    // atoms
    switch (typeof obj) {
      case 'function':
        return wrapRoot(obj.toString());
      case 'string':
      case 'number':
      case 'boolean':
        return util.inspect(obj);
    }

    // circular reference check for non-atoms
    if (known.indexOf(obj) !== -1)
      throw new Error("Circular references detected while uneval()-ing.");

    known.push(obj);

    // specialized types
    if (obj instanceof Array)
      return "[" + obj.map(function(o) { return uneval(o, known); }).join(",") + "]";

    if (obj instanceof Date)
      return wrapRoot("new Date('" + obj.toString() + "')");

    // hashes
    var key, pairs = [];

    for (key in obj)
      pairs.push(uneval(key, known) + ":" + uneval(obj[key], known));

    return wrapRoot("{" + pairs.join(",") + "}");

  };

})();

