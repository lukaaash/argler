var assert = require('assert');
var argler = require('./index');

describe('Argument parsing', function () {
    it('simple', function () {
        assert.deepEqual(argler(''), []);
        assert.deepEqual(argler(' '), []);
        assert.deepEqual(argler('x'), ['x']);
        assert.deepEqual(argler('one'), ['one']);
        assert.deepEqual(argler(' one'), ['one']);
        assert.deepEqual(argler('one '), ['one']);
        assert.deepEqual(argler('\tone'), ['one']);
        assert.deepEqual(argler('one\t'), ['one']);
        assert.deepEqual(argler('one two three'), ['one', 'two', 'three']);
        assert.deepEqual(argler('one  two\tthree'), ['one', 'two', 'three']);
    });

    it('escaped', function () {
        assert.deepEqual(argler('\\'), []);
        assert.deepEqual(argler(' \\'), []);
        assert.deepEqual(argler('\\ '), [' ']);
        assert.deepEqual(argler('\\x'), ['x']);
        assert.deepEqual(argler('one\\'), ['one']);
        assert.deepEqual(argler('one dog\\ cat'), ['one', 'dog cat']);
        assert.deepEqual(argler('one dog\\ '), ['one', 'dog ']);
        assert.deepEqual(argler('one dog\\  cat'), ['one', 'dog ', 'cat']);
    });

    it('doublequoted', function () {
        assert.deepEqual(argler('one "dog cat"'), ['one', 'dog cat']);
        assert.deepEqual(argler('one "dog cat" fox'), ['one', 'dog cat', 'fox']);
        assert.deepEqual(argler('one dog cat"'), ['one', 'dog', 'cat']);
        assert.deepEqual(argler('one "" dog'), ['one', '', 'dog']);
        assert.deepEqual(argler('one "dog""cat"'), ['one', 'dogcat']);
        assert.deepEqual(argler('one"dog cat"'), ['onedog cat']);
        assert.deepEqual(argler('one"dog"cat"'), ['onedogcat']);
        assert.deepEqual(argler('one"dog cat"fox'), ['onedog catfox']);
        assert.deepEqual(argler('one dog cat"'), ['one', 'dog', 'cat']);
        assert.deepEqual(argler('"one dog cat'), ['one dog cat']);
        assert.deepEqual(argler('"one dog\'s cat"'), ['one dog\'s cat']);
    });

    it('singlequoted', function () {
        assert.deepEqual(argler("one 'dog cat'"), ["one", "dog cat"]);
        assert.deepEqual(argler("one 'dog cat' fox"), ["one", "dog cat", "fox"]);
        assert.deepEqual(argler("one dog cat'"), ["one", "dog", "cat"]);
        assert.deepEqual(argler("one '' dog"), ["one", "", "dog"]);
        assert.deepEqual(argler("one 'dog''cat'"), ["one", "dogcat"]);
        assert.deepEqual(argler("one'dog cat'"), ["onedog cat"]);
        assert.deepEqual(argler("one'dog'cat'"), ["onedogcat"]);
        assert.deepEqual(argler("one'dog cat'fox"), ["onedog catfox"]);
        assert.deepEqual(argler("one dog cat'"), ["one", "dog", "cat"]);
        assert.deepEqual(argler("'one dog cat"), ["one dog cat"]);
        assert.deepEqual(argler("'one dog\"s cat'"), ["one dog\"s cat"]);
    });

    it('mixed', function () {
        assert.deepEqual(argler('one "dog\\ cat"'), ['one', 'dog cat']);
        assert.deepEqual(argler('one \\"dog cat"'), ['one', '"dog', 'cat']);
        assert.deepEqual(argler('one "dog cat\\"'), ['one', 'dog cat"']);
        assert.deepEqual(argler("one 'dog\\ cat'"), ['one', 'dog cat']);
        assert.deepEqual(argler("one \\'dog cat'"), ['one', "'dog", 'cat']);
        assert.deepEqual(argler("one 'dog cat\\'"), ['one', "dog cat'"]);
        assert.deepEqual(argler("one 'dog \"and cat\"' fox"), ['one', 'dog "and cat"', 'fox']);
        assert.deepEqual(argler('one "dog \'and cat\'" fox'), ['one', "dog 'and cat'", 'fox']);
    });
});
