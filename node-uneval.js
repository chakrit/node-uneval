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
    if (isNaN(obj))
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
      
    return "{" + results.join(",") + "}";
  }
  
  var runTests = function() {

    var a = { 'value': {} };
    var b = { 'value': {} };
    a.value = b;
    b.value = a;
    circular = { 'a': a, 'b': b };

    var tests = [
      0,
      1234,
      01234,
      "ASDF",
      null,
      undefined,
      0xFFFF,
      [],
      [1,2,3],
      [null, undefined, null, undefined, "hello"],
      { 'x': 'y' },
      { 'x': { 'nest': '-ed', 'y': 'z' } },
      //circular,
      //{ 'x': 'y', 'c': circular },
      function() { },
      function() { return globalVar; },
      function(a) { return a * a; },
      function() { return function() { }; },
      function(a) { return function(b) { return a * b; }; },
      new Function("return globalVar;"),
      new Function("return function() { };"),
      new Function("return function(a) { return a * a; };"),
      new Function("return function() { return function() { }; };"),
      eval("(function () { })"),
      eval("(function () { return globalVar; })"),
      eval("(function (a) { return a * a; })"),
      eval("(function () { return function() { }; })"),
      eval("(function (a) { return function(b) { return a * b; }; })"),
      eval("(eval('(function() { })'))"),
      eval("(eval('(function(a) { return a * a; })'))"),
      eval("(eval('(function() { return function() { }; })'))"),
      eval("(eval('(function(a) { return function(b) { return a * b; }; })'))"),
      (function() { return function() { }; })(),
      (function() { return function() { return globalVar; }; })(),
      (function(a) { return function() { a * a; }; })(),
      { 'x': 'a', 'func': (function() { }) },
    ];  
    
    var results = tests.map(uneval);
    
    for (var i = 0; i < tests.length; i++) {
      sys.puts(i.toString() + " : " + results[i]);
    }
  };
  
  exports.uneval = uneval;
  exports.runTests = runTests;
  
  if (module.parent === undefined)
    runTests();

})();
