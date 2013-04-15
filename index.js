// Public Domain

// node-uneval.js - good enough approximation of uneval
(function() {

  var sys = require('sys');

  var uneval = function (obj, ctx) {
    var objType = typeof obj;
      
    // circular reference check
    ctx = ctx || { };
    if (ctx[obj])
      throw "Circular references detected while uneval()-ing.";
      
    ctx[obj] = true;
      
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
    switch (objType) {
      case 'function': return "(" + obj.toString() + ")";
      case 'string':
      case 'number':
        return sys.inspect(obj);
    }

    // special data types
    if (obj instanceof Array)
      return "[" + obj.map(function(o) { return uneval(o, ctx); }).join(",") + "]";
    
    if (obj instanceof Date)
      return "(new Date('" + obj.toString() + "'))";
    
    // complex objects
    var key, results = [];
    
    for (key in obj)
      results.push(uneval(key, ctx) + ":" + uneval(obj[key], ctx));
      
    return "({" + results.join(",") + "})";
  }
  
  exports.uneval = uneval;
  
  if (module.parent == null)
    require('./test')

})();
