# Change Log

## [2.1.0] - 2026-10-11

### Added

- #5: The flag `i` of `RegExp::compile` makes a character match every character JavaScript's `i` flag takes for it, such as `a` and `A`, or `é` and `É`. It can be given with `g`, as `"gi"` or `"ig"`.

### Changed

- #25: A `{` that does not begin `{n}`, `{n,}` or `{n,m}`, and a `}` outside such a quantifier, now stand for themselves, as in JavaScript. `a{,2}` matches `"a{,2}"`, where it used to be reported as an error.

## [2.0.0] - 2026-10-11

### Added

- #5, #23: Lazy quantifiers `x*?`, `x+?`, `x??`, `x{n}?`, `x{n,}?` and `x{n,m}?`, which take as few rounds as they can.
- #23: The escapes `\0`, `\xhh`, `\uhhhh`, `\cX` and the octal escapes such as `\012`, read as JavaScript reads them. An escape for a character from U+0080 upward matches the bytes of its UTF-8 encoding.
- #23: `find_all_in_bytes` and `find_from_in_bytes` of `RegExp` and `Matcher` search an `Array U8`, as `find_all` and `find_from` did before this version.

### Changed

- #23: The library now requires Fix 1.6.0.
- #23: A search now finds the match JavaScript finds: among the matches beginning leftmost, the first one JavaScript's backtracking reaches, trying alternatives from the left and taking as many rounds of a quantifier as it can. It used to find the longest one. `/a|ab/` against `"ab"` now matches `"a"`, where it matched `"ab"`.
- #23: `match_one` of `RegExp` and `Matcher` now returns `Option (Array String)`, `none()` where nothing matches. It used to return `Result ErrMsg (Array String)` with the error `"NotMatch"`.
- #23: `find_all` and `find_from` of `RegExp` and `Matcher` now search a `String`. For an `Array U8`, use `find_all_in_bytes` and `find_from_in_bytes`.
- #14, #23: `replace_all` now reads the replacement string as JavaScript's `String.prototype.replaceAll` reads it. `` $` `` and `$'` stand for the text before and after the match. `$nn` names group `nn` only where the pattern has that group, and otherwise names group `n` followed by the second digit itself. `$0` and the number of a group the pattern lacks stand for themselves.
- #23: `RegExp::compile` now reports an error for a flag other than `g`, and for `g` given twice. It used to ignore them.
- #23: Outside a bracket expression, `\b`, `\B` and `\1`..`\9` are now reported as errors. They used to match the characters `b`, `B` and `1`..`9`, where JavaScript reads them as word boundary assertions and backreferences.
- #23: A character from U+0080 upward in a bracket expression, written as itself or as an escape, is now reported as an error. `[é]` used to match each of the two bytes of `é` alone.
- #23: A quantifier after a character from U+0080 upward now repeats the whole character: `é+` matches `"éé"`, where it used to repeat the last byte of `é`. A quantifier after a character from U+10000 upward, such as `😀+`, is reported as an error, since JavaScript repeats half of the character.
- #23: A range of a bracket expression whose ends are in the wrong order, such as `[z-a]`, is now reported as an error.
- #23: The fields of `RegExp` and `Matcher` are now private, and the modules other than `RegExp` are now under `RegExp._Internal`, private to the library. A program that reads `regexp.@nfa` or imports `RegExp.RegExpNFA` has to use the functions of `RegExp` instead.

### Fixed

- #13, #23: The groups of a match are now the ones JavaScript reports. `/(a)*.+/` against `"ab"` used to report the empty string as group 1, where JavaScript reports `"a"`.
- #14, #23: `replace_all` no longer aborts the program when the replacement string holds `$` followed by a number past `I64::maximum`.
- #23: A range of a bracket expression can now have an escape at an end, as `[\t-\r]` does. It used to be reported as an error.
- #23: A count of rounds past `I64::maximum`, as in `a{99999999999999999999}`, now reads as `I64::maximum`. It used to be reported as an error.
- #23: `\d`, `\w` and `\s` no longer depend on the C locale of the program.
