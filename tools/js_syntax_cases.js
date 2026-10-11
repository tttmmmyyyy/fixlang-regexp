// Writes `test_js_syntax_cases.fix`: escapes, bracket expressions and characters from U+0080
// upward, each with every match JavaScript's `String.prototype.matchAll` finds in `TEXT`,
// `NON_ASCII_TEXT` or `BRACE_TEXT`, or with `none()` where the pattern is to be reported as an error, by JavaScript
// or as a form this library does not support.
//
// Run with Node from the root of the repository: `node tools/js_syntax_cases.js`.

"use strict";
const fs = require("fs");

// Every ASCII character from U+0001 upward, then `\c1\c`, which `\c1` and `\c` outside a bracket
// expression match. `test.fix` builds the same text.
let TEXT = "";
for (let code = 1; code < 0x80; code++) TEXT += String.fromCharCode(code);
TEXT += "\\c1\\c";

const PRINTABLE = [];
for (let code = 0x20; code < 0x7f; code++) PRINTABLE.push(String.fromCharCode(code));

// The escapes JavaScript reads one way and this library reports as errors: outside a bracket
// expression, the word boundary assertions and the backreferences.
const UNSUPPORTED_OUTSIDE = new Set(["b", "B", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);

const cases = [];

function add(pattern, unsupported) {
    cases.push({ pattern, unsupported });
}

// A backslash before each printable character, outside and in a bracket expression.
for (const c of PRINTABLE) {
    add("\\" + c, UNSUPPORTED_OUTSIDE.has(c));
    add("[\\" + c + "]", false);
    add("[^\\" + c + "]", false);
}

// The escapes made of more than one character after the backslash.
const MULTI = [
    "\\x41", "\\x7e", "\\x7F", "\\x4", "\\x4g", "\\xg1", "\\x80", "\\xe9",
    "\\u0041", "\\u007e", "\\u004", "\\u{41}", "\\u00e9", "\\u3042", "\\uD800",
    "\\cA", "\\cz", "\\cJ", "\\c1", "\\c_", "\\c", "\\c-",
    "\\0", "\\00", "\\07", "\\08", "\\000", "\\012", "\\0123", "\\077", "\\08a",
    "\\101", "\\18", "\\377", "\\400", "\\8", "\\9",
];
const NON_ASCII_IN_BRACKET = new Set(["\\x80", "\\xe9", "\\u00e9", "\\u3042", "\\377"]);
for (const escape of MULTI) {
    add(escape, /^\\[1-9]/.test(escape) || escape == "\\uD800");
    add("[" + escape + "]", NON_ASCII_IN_BRACKET.has(escape) || escape == "\\uD800");
}

// Ranges between two class atoms, every pair drawn from these.
const ATOMS = [
    "a", "c", "z", "A", "0", "9", "-", "/", "^", "\\d", "\\w", "\\S", "\\t", "\\r", "\\x41",
    "\\x5a", "\\u0061", "\\]", "\\\\", "\\-", "\\b", "\\B", "\\cA", "\\c1", "\\101", "\\0", "\\.",
];
for (const first of ATOMS) {
    for (const last of ATOMS) {
        add("[" + first + "-" + last + "]", false);
    }
}

// Bracket expressions where `-` or `]` stands at an edge.
for (const pattern of [
    "[a-c-e]", "[--/]", "[---]", "[-]", "[a-]", "[-a]", "[^-]", "[a-c-]", "[]", "[^]", "[]a]",
    "[a]]", "[\\d-]", "[-\\d]", "[a-\\d-z]", "[", "[a", "[a-", "[\\", "\\", "a\\",
]) {
    add(pattern, false);
}

// Braces, against `BRACE_TEXT`: a quantifier where `{n}`, `{n,}` or `{n,m}` follows something to
// repeat, an error where it follows nothing, and the characters themselves elsewhere.
const BRACE_TEXT = "a{,2} x{a} a{2 a{2, a{2,1 a{1,2 a{ 1} }{ {} {,} a{} a{,} p{L} u{4G} u{41} " +
    "{a}{ x{2}{,} xx{ xx} aaa} {{}} x{{2}} a{0x1} a{01} a{1 } x{1} xx{,}";
const braceCases = [];
for (const pattern of [
    "{", "}", "a{", "a}", "a{,2}", "x{a}", "a{2", "a{2,", "a{2,1", "a{1,2", "a{ 1}", "a{1 }",
    "a{0x1}", "a{01}", "\\p{L}", "\\u{4G}", "\\u{41}", "{2}", "{1,}", "{1,2}", "x{1}{2}",
    "x{1}{", "x{1}}", "a{2,1}", "a{1}?{", "}{", "{}", "{,}", "a{}", "a{,}", "(a){2}", "a|{", "({)",
    "{a}{", "x{2}{,}", "\\{", "\\}", "[{}]", "[{-}]", "a{1}?", "a{2}{", "^{", "${", "|{2}",
    "({2})", "a{1,}?{1}", "a{3}}", "\\d{2}{", "a{2}{3}", "{{}}", "x{{2}}",
]) {
    braceCases.push({ pattern, unsupported: false });
}

// Counts of rounds past `I64::maximum`, which read as `I64::maximum`.
for (const pattern of [
    "a{0,9223372036854775808}", "a{99999999999999999999}", "a{9223372036854775808,}",
]) {
    add(pattern, false);
}

// Characters from U+0080 upward, against `NON_ASCII_TEXT`: at the edges of the two and three byte
// encodings and beyond, written as themselves and as escapes, under quantifiers, and in bracket
// expressions, where this library leaves them unsupported.
const NON_ASCII_TEXT = "a\u00e9\u00e9\u07ff\u0800\uffff\u3042\u3042b\u{1f600}\u{1f600}\u00e9";
const nonAsciiCases = [];
for (const pattern of [
    "\\u00e9", "\\u07ff", "\\u0800", "\\uffff", "\\u3042", "\\xe9", "\\x80", "\\u0080", "\\u07FF",
    "\\u00e9+", "\\u00e9{2}", "\\u3042*b", "\\xe9?b", "(\\u00e9|\\u3042)+",
    "é", "߿", "ࠀ", "￿", "あ", "😀", "é+", "あ{1,2}", "é?あ", "(é|あ)+b", "\\é", "\\あ+", "\\😀",
    "a😀", "😀😀", "(😀)", "😀|é",
]) {
    nonAsciiCases.push({ pattern, unsupported: false });
}
for (const pattern of [
    "😀+", "😀*", "😀?", "😀{2}", "\\😀+", "\\uD83D", "\\uDE00", "\\uD83D\\uDE00",
    "[é]", "[\\é]", "[\\xe9]", "[\\u3042]", "[a-é]", "[é-z]", "[^é]", "[😀]",
]) {
    nonAsciiCases.push({ pattern, unsupported: true });
}

// Every match JavaScript finds in `text`, as Fix writes it with positions counted in UTF-8 bytes,
// or `none()` where JavaScript reports the pattern as an error.
function matches(pattern, text) {
    let regexp;
    try {
        regexp = new RegExp(pattern, "g");
    } catch (e) {
        if (e instanceof SyntaxError) return "none()";
        throw e;
    }
    const bytes = (index) => Buffer.byteLength(text.slice(0, index));
    const found = [...text.matchAll(regexp)].map((m) =>
        "(" + bytes(m.index) + ", " + bytes(m.index + m[0].length) + ")"
    );
    return "some([" + found.join(", ") + "])";
}

// A string literal of Fix holding `text`.
function literal(text) {
    return '"' + text.replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"';
}

const rowsOf = (list, text) => list.map(({ pattern, unsupported }) =>
    "    (" + literal(pattern) + ", " + (unsupported ? "none()" : matches(pattern, text)) + ")"
).join(",\n");

const source = `// Escapes and bracket expressions, each with every match JavaScript finds in the text
// \`test.fix\` builds: every ASCII character from U+0001 upward, then \`\\c1\\c\`. \`none()\`
// stands for a pattern that is reported as an error, by JavaScript or as a form this library does
// not support.
//
// Generated by \`node tools/js_syntax_cases.js\`; edit that script rather than this file.
module Test.JsSyntaxCases;

_js_syntax_cases: Array (String, Option (Array (I64, I64)));
_js_syntax_cases = [
${rowsOf(cases, TEXT)}
];

// Characters from U+0080 upward, each with every match JavaScript finds in
// \`_js_non_ascii_text\`, or \`none()\` as above.
_js_non_ascii_cases: Array (String, Option (Array (I64, I64)));
_js_non_ascii_cases = [
${rowsOf(nonAsciiCases, NON_ASCII_TEXT)}
];

_js_non_ascii_text: String;
_js_non_ascii_text = ${literal(NON_ASCII_TEXT)};

// Braces, each with every match JavaScript finds in \`_js_brace_text\`, or \`none()\` as above.
_js_brace_cases: Array (String, Option (Array (I64, I64)));
_js_brace_cases = [
${rowsOf(braceCases, BRACE_TEXT)}
];

_js_brace_text: String;
_js_brace_text = ${literal(BRACE_TEXT)};
`;
fs.writeFileSync("test_js_syntax_cases.fix", source);
