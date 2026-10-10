# RegExp

Defined in regexp@2.0.0

Simple regular expression.

Currently it only supports patterns below:
- Character classes: `[xyz]`, `[^xyz]`, `.`, `\d`, `\D`, `\w`, `\W`, `\s`,
  `\S`, `\t`, `\r`, `\n`, `\v`, `\f`, `[\b]`, `x|y`
- Assertions: `^`, `$`
- Groups: `(x)`
- Quantifiers: `x*`, `x+`, `x?`, `x{n}`, `x{n,}`, `x{n,m}`

This follows JavaScript but for one thing: where several alternatives match at one place, the
longest wins. `a|ab` matched against `ab` gives `ab`; JavaScript gives `a`.

For what the pattern syntax above means, see
[mdn web docs: Regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions).

This module is the whole interface of the library, and its version number follows this module
alone. The modules under `RegExp.Internal` are the parts the library is built from, and any
version may change them.

LIMITATION:

A character class holds single byte characters (U+0001..U+007F). UTF-8 writes a character from
U+0080 upward as two or more bytes, and a Fix string holds no null character (U+0000).

## Values

### namespace RegExp::Matcher

#### find_all

Type: `Std::String -> RegExp::Matcher -> (Std::Array (Std::Array (Std::I64, Std::I64)), RegExp::Matcher)`

`matcher.find_all(target)` finds every match in `target`, and reports the scanner as the
search left it.

What it reports is what `RegExp::find_all` reports.

##### Parameters

* `target` - The string to search.
* `matcher` - The regular expression and its scanner.

#### find_all_in_bytes

Type: `Std::Array Std::U8 -> RegExp::Matcher -> (Std::Array (Std::Array (Std::I64, Std::I64)), RegExp::Matcher)`

`matcher.find_all_in_bytes(bytes)` is `find_all` over an array of bytes.

##### Parameters

* `bytes` - The bytes to search.
* `matcher` - The regular expression and its scanner.

#### find_from

Type: `Std::I64 -> Std::String -> RegExp::Matcher -> (Std::Option (Std::Array (Std::I64, Std::I64)), RegExp::Matcher)`

`matcher.find_from(from, target)` finds the match in `target` that begins first at or after
the byte position `from`, and reports the scanner as the search left it.

What it reports is what `RegExp::find_from` reports.

##### Parameters

* `from` - The byte position the match has to begin at or after.
* `target` - The string to search.
* `matcher` - The regular expression and its scanner.

#### find_from_in_bytes

Type: `Std::I64 -> Std::Array Std::U8 -> RegExp::Matcher -> (Std::Option (Std::Array (Std::I64, Std::I64)), RegExp::Matcher)`

`matcher.find_from_in_bytes(from, bytes)` is `find_from` over an array of bytes.

##### Parameters

* `from` - The position the match has to begin at or after.
* `bytes` - The bytes to search.
* `matcher` - The regular expression and its scanner.

#### match_all

Type: `Std::String -> RegExp::Matcher -> (Std::Array (Std::Array Std::String), RegExp::Matcher)`

`matcher.match_all(target)` matches `target` against the regular expression, and reports the
scanner as the match left it.

What it reports is what `RegExp::match_all` reports.

##### Parameters

* `target` - The string to match against.
* `matcher` - The regular expression and its scanner.

#### match_one

Type: `Std::String -> RegExp::Matcher -> (Std::Option (Std::Array Std::String), RegExp::Matcher)`

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
`flags` change behavior of regular expression matching. The only flag is the global
flag `g`, which `match_one` reads, so `flags` is `""` or `"g"`. Any other flag, or `g`
given twice, is reported as an error.

#### find_all

Type: `[?it : Std::Iterator, Std::Iterator::Item ?it = Std::Array (Std::I64, Std::I64)] Std::String -> RegExp::RegExp -> ?it`

`regexp.find_all(target)` is an iterator over the matches in `target`, taken left to right,
none of them overlapping another, each reported as where its groups stand. Each match is
looked for when the iterator is advanced to it, so a program that stops early does not pay
for the matches after.

A match is reported as one `(begin, end)` pair of byte positions per group, the whole match
first. A group that captured nothing stands as `(-1, -1)`. Where several matches begin at one
place, the longest is taken, and after a match that holds no byte the search goes on from the
next byte. The global flag (`"g"`) makes no difference here.

Example:
```fix
let regexp = RegExp::compile("([a-z]+)([0-9]+)", "").as_ok;
let found = regexp.find_all("abc012 def345").to_array;
assert_eq(|_|"", found, [[(0, 6), (0, 3), (3, 6)], [(7, 13), (7, 10), (10, 13)]])
```

##### Parameters

* `target` - The string to search.
* `regexp` - The regular expression.

#### find_all_in_bytes

Type: `[?it : Std::Iterator, Std::Iterator::Item ?it = Std::Array (Std::I64, Std::I64)] Std::Array Std::U8 -> RegExp::RegExp -> ?it`

`regexp.find_all_in_bytes(bytes)` is `find_all` over an array of bytes: an iterator over the
matches in `bytes`, each reported as where its groups stand.

##### Parameters

* `bytes` - The bytes to search.
* `regexp` - The regular expression.

#### find_from

Type: `Std::I64 -> Std::String -> RegExp::RegExp -> Std::Option (Std::Array (Std::I64, Std::I64))`

`regexp.find_from(from, target)` finds the match in `target` that begins first at or after the
byte position `from`, taking the longest of those that begin there, and reports where each of
its groups stands, as `find_all` reports them. It reports `none()` where no match begins at
or after `from`. A negative `from` counts as `0`.

Example:
```fix
let regexp = RegExp::compile("[0-9]+", "").as_ok;
let found = regexp.find_from(4, "abc012 def345");
assert_eq(|_|"", found, some([(4, 6)]))
```

##### Parameters

* `from` - The byte position the match has to begin at or after.
* `target` - The string to search.
* `regexp` - The regular expression.

#### find_from_in_bytes

Type: `Std::I64 -> Std::Array Std::U8 -> RegExp::RegExp -> Std::Option (Std::Array (Std::I64, Std::I64))`

`regexp.find_from_in_bytes(from, bytes)` is `find_from` over an array of bytes: the match in
`bytes` that begins first at or after the position `from`.

##### Parameters

* `from` - The position the match has to begin at or after.
* `bytes` - The bytes to search.
* `regexp` - The regular expression.

#### match_all

Type: `Std::String -> RegExp::RegExp -> Std::Array (Std::Array Std::String)`

`regexp.match_all(target)` matches `target` against `regexp`.
All matching results will be returned including captured groups.

If the match against the regular expression fails, an empty array is returned.

This function is similar to [String.matchAll()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll)
function of JavaScript.

#### match_one

Type: `Std::String -> RegExp::RegExp -> Std::Option (Std::Array Std::String)`

`regexp.match_one(target)` matches `target` against `regexp`. What it returns depends on
whether `regexp` was compiled with the global flag `g`, as with `String.prototype.match` of
JavaScript. This is the one function the flag changes.

Without `g`, it returns the groups of the first match. Group 0 is the substring the whole
regular expression matches, and group 1 and beyond are the substrings each group captured,
the empty string standing for a group that captured nothing.

```fix
let regexp = RegExp::compile("[a-z]+([0-9]+)", "").as_ok;
let groups = regexp.match_one("abc012 def345").as_some;
assert_eq(|_|"", groups, ["abc012", "012"])
```

With `g`, it returns the substring of every match, without the groups.

```fix
let regexp = RegExp::compile("[a-z]+([0-9]+)", "g").as_ok;
let groups = regexp.match_one("abc012 def345").as_some;
assert_eq(|_|"", groups, ["abc012", "def345"])
```

Where `regexp` matches nowhere in `target`, it returns `none()`.

See [String.match()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)
of JavaScript.

#### matcher

Type: `RegExp::RegExp -> RegExp::Matcher`

`regexp.matcher` is the regular expression together with a scanner of its own.

A scanner works out what the automaton does with a byte the first time it reads that byte in
that state, and keeps the answer. `Matcher`'s matching functions hand the scanner back, so a
program that matches many strings against one regular expression pays for the working out
once, where `RegExp`'s own matching functions make a scanner for each match and let it go.

Example:
```fix
let matcher = RegExp::compile("[a-z]+", "g").as_ok.matcher;
let (first, matcher) = matcher.match_all("abc def");
let (second, matcher) = matcher.match_all("ghi jkl");
assert_eq(|_|"", first, [["abc"], ["def"]]);;
assert_eq(|_|"", second, [["ghi"], ["jkl"]])
```

#### replace_all

Type: `Std::String -> Std::String -> RegExp::RegExp -> Std::String`

`regexp.replace_all(target, replacement)` replaces every match of `regexp` in `target` with
`replacement`, reading `replacement` as JavaScript's `String.prototype.replaceAll` reads it:
- `$$` stands for a `$`, `$&` for the whole match, `` $` `` for the text before the match and
  `$'` for the text after it.
- `$n` and `$nn` stand for the text group `n` or `nn` captured, and for the empty string where
  the group captured nothing. Two digits are read as one group number where the pattern has
  that group; otherwise the first digit is, and the second stands for itself.
- `$0`, the number of a group the pattern lacks, and every other text stand for themselves.

Example:
```fix
let regexp = RegExp::compile("(\\w\\w)(\\w)", "").as_ok;
let result = regexp.replace_all("abc def ijk", "$2$1");
assert_eq(|_|"", result, "cab fde kij")
```

See [String.replaceAll()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll)
of JavaScript.

## Types and aliases

### namespace RegExp

#### Matcher

Defined as: `type Matcher = unbox struct { ...fields... }`

A compiled regular expression together with the scanner it has built so far. See
`RegExp::matcher`.

#### RegExp

Defined as: `type RegExp = unbox struct { ...fields... }`

Type of a compiled regular expression.

## Traits and aliases

## Trait implementations