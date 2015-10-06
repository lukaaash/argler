﻿argler
======

Argler is a simple module that parses a whole command line string into individual arguments
that can be passed to modules (such as [minimist](https://www.npmjs.com/package/minimist)) that expect `process.argv`-like argument array on input.

## Examples

```javascript
var argler = require('argler');

// 'one two three' -> [ 'one', 'two', 'three' ]
var args = argler('one two three');
console.dir(args);

// say -n 7 "this is a single argument"' -> [ 'say', '-n', '7', 'this is a single argument' ]
var args = argler('say -n 7 "this is a single argument"');
console.dir(args);

// 'say Hello\\ world!' -> [ 'say', 'Hello world!' ]
var args = argler('say Hello\\ world!');
console.dir(args);
```

## Examples with minimist

```javascript
var argler = require('argler');
var minimist = require('minimist');

// with minimist, you can do this:
var args = minimist(argler('get --retries 3 "document 1.txt"'));
console.dir(args);

// you might want to force all arguments (but not options) to be strings:
var args = minimist(argler('echo 1 2 3 4'), { string: ['_'] });
console.dir(args);

// parsing a command line into a command, arguments and options:
var args = argler('open sftp.nuane.com -P 22');
var cmd = args.shift();
var options = minimist(args, { string: ['_'] });
args = options._;
delete options._;
console.log(cmd);
console.dir(args);
console.dir(options);
```

## Installing

```shell
$ npm install argler
```
