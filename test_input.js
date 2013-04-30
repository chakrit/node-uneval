
// node-uneval/test_input.js
// ----
// test inputs, expected input[index] to match output line
// defined in test_expected.js

// NOTE: same file only - means that it is impossible to preserve the exact
//   representation unless the literal is defined in the exact same file as
//   the definition of `uneval()` function itself.

module.exports =
[ 0
, 1234
, 01234 // octal representation - same file only
, "ASDF" // different quotations - same file only
, 'ASDF'
, 'with " quotes'
, "with ' quotes"
, true
, false
, null
, undefined
, 0xFFFF // hex representation - same file only
, []
, [1, 2, 3]
, [true, false]
, [null, undefined, null, undefined, "hello"]
, { 'x': 'y' }
, { 'x': { 'nest': '-ed', 'y': 'z' } }
, { 'x': 'a', 'func': (function() { }) }
, { a: undefined, b: null }
, { a: true, b: false }
, function() { }
, function() { return globalVar; }
, function(a) { return a * a; }
, function() { return function() { }; }
, function(a) { return function(b) { return a * b; }; }
, new Function("return globalVar;") // uneval to function literal - same file only
, new Function("return function() { };")
, new Function("return function(a) { return a * a; };")
, new Function("return function() { return function() { }; };")
, eval("(function () { })")
, eval("(function () { return globalVar; })")
, eval("(function (a) { return a * a; })")
, eval("(function () { return function() { }; })")
, eval("(function (a) { return function(b) { return a * b; }; })")
, eval("(eval('(function() { })'))")
, eval("(eval('(function(a) { return a * a; })'))")
, eval("(eval('(function() { return function() { }; })'))")
, eval("(eval('(function(a) { return function(b) { return a * b; }; })'))")
, (function() { return function() { }; })()
, (function() { return function() { return globalVar; }; })()
, (function(a) { return function() { a * a; }; })() // uneval function with closure
];
