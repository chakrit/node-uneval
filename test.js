
// node-uneval/test.js
// ----
// Read test cases from tests.json, perform uneval() on objects and check that the
// expected value matches or if an error should have been thrown.

(function() {

  var fs = require('fs')
    , path = require('path')
    , test = require('tap').test;

  var INPUTS = path.resolve(__dirname, 'test_input.js')
    , OUTPUTS = path.resolve(__dirname, 'test_expected.js');

  var uneval = require('./index.js')
    , inputs = require(INPUTS)
    , outputs = fs.readFileSync(OUTPUTS, 'utf-8').split('\n');

  // remove empty lines and unescape some characters
  outputs = outputs.filter(function(item) { return !!item; });
  outputs = outputs.map(function(item) { return item.replace(/\\n/g, '\n'); });

  test("integrity check", function(t) {
    t.plan(2);
    t.type(uneval, 'function', 'index.js exports a function');
    t.equal(inputs.length, outputs.length, 'expected outputs has same length as inputs');
    t.end();
  });

  test('circular references', function(t) {
    var a = { v: null }, b = { v: null }, c = { a: a, b: b };
    a.v = b;
    b.v = a;

    var message = 'Circular references detected while uneval()-ing.';

    t.plan(3);
    t.throws(function() { uneval(c); }, 'circular reference detected');
    t.throws(function() { uneval(a); }, 'circular reference detected');
    t.throws(function() { uneval(b); }, 'circular reference detected');
    t.end();
  });

  test("uneval results", function(t) {
    var i, count = inputs.length;

    t.plan(count);
    for (i = 0; i < count; i++) {
      t.equal(uneval(inputs[i]), outputs[i], outputs[i]);
    }
    t.end();
  });

})();

