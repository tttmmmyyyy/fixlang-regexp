# `module RegExp.RegExpPattern`

Character class and Pattern parser. This is internal module of `RegExp`.

## Types and aliases

### `namespace RegExp.RegExpPattern`

#### `type CharClass = unbox struct { ...fields... }`

Type of a character class.

##### field `label : Std::String`

##### field `f : Std::U8 -> Std::Bool`

#### `type PAssertion = unbox union { ...variants... }`

Type of an assertion for regular expressions, such as `^`, `$`.

##### variant `pa_begin : ()`

##### variant `pa_end : ()`

#### `type Pattern = box union { ...variants... }`

Type of a parsed regular expression.

##### variant `pclass : RegExp.RegExpPattern::CharClass`

##### variant `passert : RegExp.RegExpPattern::PAssertion`

##### variant `psequence : Std::Array RegExp.RegExpPattern::Pattern`

##### variant `peither : (RegExp.RegExpPattern::Pattern, RegExp.RegExpPattern::Pattern)`

##### variant `pquant : (RegExp.RegExpPattern::Pattern, Std::I64, Std::I64)`

##### variant `pgroup : (Std::I64, RegExp.RegExpPattern::Pattern)`

## Traits and aliases

## Trait implementations

### `impl RegExp.RegExpPattern::CharClass : Std::ToString`

Converts a character class to a string.

### `impl RegExp.RegExpPattern::PAssertion : Std::ToString`

Converts an assertion to a string.

### `impl RegExp.RegExpPattern::Pattern : Std::ToString`

Converts a pattern to a string.

## Values

### `namespace RegExp.RegExpPattern::CharClass`

#### `add : Std::U8 -> RegExp.RegExpPattern::CharClass -> RegExp.RegExpPattern::CharClass`

Adds a character to the character class.

#### `cls_digit : RegExp.RegExpPattern::CharClass`

A character class of `\d`. (digits)

#### `cls_dot : RegExp.RegExpPattern::CharClass`

A character class of `.`. (any character except newlines)

#### `cls_non_digit : RegExp.RegExpPattern::CharClass`

A character class of `\D`. (non-digits)

#### `cls_non_whitespace : RegExp.RegExpPattern::CharClass`

A character class of `\S`. (non-whitespaces)

#### `cls_non_word_char : RegExp.RegExpPattern::CharClass`

A character class of `\W`. (ie. `[^A-Za-z0-9_]`)

#### `cls_whitespace : RegExp.RegExpPattern::CharClass`

A character class of `\s`. (whitespaces)

#### `cls_word_char : RegExp.RegExpPattern::CharClass`

A character class of `\w`. (ie. `[A-Za-z0-9_]`)

#### `consists_of : Std::String -> RegExp.RegExpPattern::CharClass`

Creates a character class whose members are characters in the specified string.

#### `contains : Std::U8 -> RegExp.RegExpPattern::CharClass -> Std::Bool`

Returns true if the character is a member of the class.

#### `empty : RegExp.RegExpPattern::CharClass`

An empty character class.

#### `make : Std::String -> (Std::U8 -> Std::Bool) -> RegExp.RegExpPattern::CharClass`

Creates a character class from a label and a member function.

#### `negate : RegExp.RegExpPattern::CharClass -> RegExp.RegExpPattern::CharClass`

Negate the member function of a character class.

#### `range : Std::U8 -> Std::U8 -> RegExp.RegExpPattern::CharClass`

Creates a character class whose members are characters from start to end.

#### `singleton : Std::U8 -> RegExp.RegExpPattern::CharClass`

Creates a character class whose only member is the specified character.

#### `to_table : RegExp.RegExpPattern::CharClass -> RegExp.RegExpPattern::CharClass`

For optimization, creates a lookup table of same members, and returns a character class
using that table.

#### `union : RegExp.RegExpPattern::CharClass -> RegExp.RegExpPattern::CharClass -> RegExp.RegExpPattern::CharClass`

Creates union of two character classes.

### `namespace RegExp.RegExpPattern::Pattern`

#### `_assign_group_number : Std::I64 -> RegExp.RegExpPattern::Pattern -> (Std::I64, RegExp.RegExpPattern::Pattern)`

`pat._assign_group_number(n)` assigns group number for each group.
The first group number becomes `n`.
It returns the translated pattern along with group count.

#### `_normal_chars : RegExp.RegExpPattern::CharClass`

A table of normal characters, ie. not a meta character.

#### `_parse_backslash_char_class : Std::Bool -> RegExp.SimpleParser::Parser RegExp.RegExpPattern::CharClass`

Parses the char class that begins with a backslash.
The backslash itself is parsed already.

#### `_parse_bracket_component : RegExp.SimpleParser::Parser RegExp.RegExpPattern::CharClass`

Parses each component in a bracket.

#### `_parse_passert : RegExp.SimpleParser::Parser RegExp.RegExpPattern::Pattern`

Parses an assertion pattern, ie. `^`, `$` etc.

#### `_parse_pclass : RegExp.SimpleParser::Parser RegExp.RegExpPattern::Pattern`

Parses character class pattern, ie. `.`, `[a-z]`, `\w` etc.

#### `_parse_pclass_bracket : RegExp.SimpleParser::Parser RegExp.RegExpPattern::CharClass`

Parses a character class that begins with '['.
The `[` itself is parsed already.

#### `_parse_peither : RegExp.SimpleParser::Parser RegExp.RegExpPattern::Pattern`

Parses either-pattern, ie. `X|Y`

#### `_parse_pgroup : RegExp.SimpleParser::Parser RegExp.RegExpPattern::Pattern`

Parses Group Pattern, ie. `(X)`

#### `_parse_pquant : RegExp.SimpleParser::Parser RegExp.RegExpPattern::Pattern`

Parses Quantified Pattern, ie. `X?`, `X*`, `X+`, `X{n}`, `X{n,}`, `X{n,m}`

#### `_parse_pquant_n_m_inner : RegExp.SimpleParser::Parser (Std::I64, Std::I64)`

Parses inner of `X{n}`, `X{n,}`, `X{n,m}`

#### `_parse_psequence : RegExp.SimpleParser::Parser RegExp.RegExpPattern::Pattern`

Parses sequence of patterns, ie. `XYZ`

#### `_parse_quantifiable_item : RegExp.SimpleParser::Parser RegExp.RegExpPattern::Pattern`

Parses quantifiable item.

#### `parse : Std::String -> Std::Result Std::ErrMsg RegExp.RegExpPattern::Pattern`

Parses a pattern from specified string.

#### `parse_pattern : RegExp.SimpleParser::Parser RegExp.RegExpPattern::Pattern`

Parses a pattern from the stream.