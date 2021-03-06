'use strict';

var fs = require('fs');
var path = require('path');
var test = require('tape');
var scopeStyles = require('../');
var getCss = scopeStyles.getCss;

test('basic functionality', function(t) {
  var basicTest = getFixtures('basic');
  var result = scopeStyles(basicTest.source);

  t.equal(getCss(result), basicTest.expected, 'css matches expected');
  t.ok(result, 'exports exists');
  t.ok(result.foo, 'class foo exists in exports');
  t.ok(result.bar, 'class bar exists in exports');
  t.equal(result.foo, 'foo_4gn20', 'foo is correctly scoped');
  t.equal(result.bar, 'bar_4gn20', 'bar is correctly scoped');
  t.end();
});

function getFixtures(name) {
  var expectedPath = path.join(__dirname, name + '.expected.css');
  var sourcePath = './' + name + '.source.js';

  return {
    source: require(sourcePath),
    expected: removeTrailingNewline(fs.readFileSync(expectedPath, 'utf8'))
  }
}

function removeTrailingNewline(str) {
  return str.substring(0, str.length - 1);
}
