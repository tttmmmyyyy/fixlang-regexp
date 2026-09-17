# RegExp

Defined in regexp@1.1.6

Simple regular expression.

Currently it only supports patterns below:
- Character classes: `[xyz]`, `[^xyz]`, `.`, `\d`, `\D`, `\w`, `\W`, `\s`,
  `\S`, `\t`, `\r`, `\n`, `\v`, `\f`, `[\b]`, `x|y`
- Assertions: `^`, `$`
- Groups: `(x)`
- Quantifiers: `x*`, `x+`, `x?`, `x{n}`, `x{n,}`, `x{n,m}`

For details, see
[mdn web docs: Regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions).

LIMITATION:

Currently, only single byte characters (U+0001..U+007F) can be specified in character classes.
Non-ASCII characters (U+0080..U+10FFFF) are encoded to two or more bytes in UTF-8, so they cannot be specified in character classes.
And the null character (U+0000) cannot be used in Fix strings.

## Values

### namespace RegExp::Matcher

#### match_all

Type: `Std::String -> RegExp::Matcher -> (Std::Array (Std::Array Std::String), RegExp::Matcher)`

`matcher.match_all(target)` matches `target` against the regular expression, and reports the
scanner as the match left it.

What it reports is what `RegExp::match_all` reports.

##### Parameters

* `target` - The string to match against.
* `matcher` - The regular expression and its scanner.

#### match_one

Type: `Std::String -> RegExp::Matcher -> (Std::Result Std::ErrMsg (Std::Array Std::String), RegExp::Matcher)`

`matcher.match_one(target)` matches `target` against the regular expression, and reports the
scanner as the match left it.

What it reports is what `RegExp::match_one` reports.

##### Parameters

* `target` - The string to match against.
* `matcher` - The regular expression and its scanner.

#### replace_all

Type: `Std::String -> Std::String -> RegExp::Matcher -> (Std::String, RegExp::Matcher)`

`matcher.replace_all(target, replacement)` replaces every stretch of `target` the regular
expression matches with `replacement`, and reports the scanner as the work left it.

What it reports is what `RegExp::replace_all` reports.

##### Parameters

* `target` - The string to work over.
* `replacement` - The text to put in place of every match.
* `matcher` - The regular expression and its scanner.

### namespace RegExp::RegExp

#### compile

Type: `Std::String -> Std::String -> Std::Result Std::ErrMsg RegExp::RegExp`

`RegExp::compile(pattern, flags)` compiles `pattern` into a regular expression.
`flags` change behavior of regular expression matching.
Currently only global flag (`"g"`) is supported.

#### match_all

Type: `Std::String -> RegExp::RegExp -> Std::Array (Std::Array Std::String)`

`regexp.match_all(target)` matches `target` against `regexp`.
All matching results will be returned including captured groups.

If the match against the regular expression fails, an empty array is returned.

This function is similar to [String.matchAll()](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll)
function of JavaScript.

#### match_one

Type: `Std::String -> RegExp::RegExp -> Std::Result Std::ErrMsg (Std::Array Std::String)`

`regexp.match(target)` matches `target` against `regexp`.

If the global flag (`"g"`) is not set, it returns an array of the groups of the first match.
Group 0 is a substring that matches the entire regular expression.
Group 1 and beyond are the captured substrings in each group. If not captured, the group will be an empty string.

Example:
```
let regexp = RegExp::compile("[a-z]+([0-9]+)", "").as_ok;
let groups = regexp.match_one("abc012 def345").as_ok;
// groups == ["abc012", "012"]
```

If the global flag (`"g"`) is set, all matching results will be returned, but captured groups will not be included.

Example:
```
let regexp = RegExp::compile("[a-z]+([0-9]+)", "g").as_ok;
let groups = regexp.match_one("abc012 def345").as_ok;
// groups == ["abc012", "def345"]
```

If the match against the regular expression fails, an error `"NotMatch"` is reported.

This function is similar to [String.match()](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/match)
function of JavaScript.

#### matcher

Type: `RegExp::RegExp -> RegExp::Matcher`

`regexp.matcher` is the regular expression together with a scanner of its own.

A scanner works out what the automaton does with a byte the first time it reads that byte in
that state, and keeps the answer. `Matcher`'s matching functions hand the scanner back, so a
program that matches many strings against one regular expression pays for the working out
once, where `RegExp`'s own matching functions make a scanner for each match and let it go.

Example:
```
let matcher = RegExp::compile("[a-z]+", "g").as_ok.matcher;
let (first, matcher) = matcher.match_all("abc def");
let (second, matcher) = matcher.match_all("ghi jkl");
```

#### replace_all

Type: `Std::String -> Std::String -> RegExp::RegExp -> Std::String`

`regexp.replace_all(target, replacement)` matches `target` against `regexp`,
and replace all matching substrings with `replacement`.
If `replacement` contains `$&`, it is substituted with entire matched substring.
If `replacement` contains `$n` where `n` is an integer, it is substituted with
the captured group.
If `replacement` contains `$$`, it is substituted with single `$`.

Example:
```
let regexp = RegExp::compile("(\\w\\w)(\\w)", "").as_ok;
let result = regexp.replace_all("abc def ijk", "$2$1");
// result == "cab fde kij"
```

This function is similar to [String.replaceAll()](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll)
function of JavaScript.
Note that `$'`, `` $` ``, `$<Name>` are not supported yet.

## Types and aliases

### namespace RegExp

#### Matcher

Defined as: `type Matcher = unbox struct { ...fields... }`

A compiled regular expression together with the scanner it has built so far. See
`RegExp::matcher`.

##### field `global`

Type: `Std::Bool`

##### field `dfa`

Type: `RegExp.RegExpNFA::DFA`

#### RegExp

Defined as: `type RegExp = unbox struct { ...fields... }`

Type of a compiled regular expression.

##### field `flags`

Type: `Std::String`

##### field `nfa`

Type: `RegExp.RegExpNFA::NFA`

## Traits and aliases

## Trait implementations