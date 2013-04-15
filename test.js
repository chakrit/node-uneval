var t = require('tap')
var uneval = require('./index').uneval

t.test('test all the things', function(t){
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
    // [null, undefined, null, undefined, "hello"],
    { 'x': 'y' },
    // { 'x': { 'nest': '-ed', 'y': 'z' } },
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
  
  t.test('eval must not throw', function(t){
    tests.forEach(function(object, index){
      var source
      
      t.doesNotThrow(function(){
        source = uneval(object)
      }, 'uneval doesNotThrow')
      
      t.test(source, function(t){
        var object2
        t.doesNotThrow(function(){
          object2 = eval(source)
        }, 'eval doesNotThrow')
        
        t.is(typeof object, typeof object2, 'typeof matches')
        t.is(source, uneval(object2))
        t.end()
      })
    })
    t.end()
  })
  
  t.end()
})
