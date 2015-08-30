﻿function isWhitespace(c) {
    if (typeof c === "undefined") return true;
    switch (c) {
        case '\t':
        case ' ':
            return true;
        default:
            return false;
    }
}

function parse(line) {
    var len = line.length;
    var args = [];
    var current = null;
    var quote = null;

    for (var n = 0; n < len; n++) {
        var c = line[n];

        if (isWhitespace(c)) {
            if (current === null) continue;
            if (!quote) {
                args.push(current);
                current = null;
                continue;
            }
        } else {
            switch (c) {
                case '\\':
                    if (++n >= len) continue;
                    c = line[n];
                    break;
                case '"':
                case "'":
                    if (current === null) {
                        quote = c;
                        current = "";
                    } else {
                        if (quote) {
                            if (quote != c) break;

                            quote = null;
                            if (isWhitespace(line[n + 1])) {
                                args.push(current);
                                current = null;
                            }
                        } else {
                            quote = c;
                        }
                    }
                    continue;
            }
        }

        if (current === null) current = "";

        current += c;
    }

    if (current !== null) args.push(current);

    return args;
}

module.exports = parse;
