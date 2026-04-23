# RegExp.RegExpPattern

Defined in regexp@1.1.3

Character class and Pattern parser. This is internal module of `RegExp`.

## Values

### namespace RegExp.RegExpPattern::CharClass

#### add

Type: `Std::U8 -> RegExp.RegExpPattern::CharClass -> RegExp.RegExpPattern::CharClass`

Adds a character to the character class.

#### cls_digit

Type: `RegExp.RegExpPattern::CharClass`

A character class of `\d`. (digits)

#### cls_dot

Type: `RegExp.RegExpPattern::CharClass`

A character class of `.`. (any character except newlines)

#### cls_non_digit

Type: `RegExp.RegExpPattern::CharClass`

A character class of `\D`. (non-digits)

#### cls_non_whitespace

Type: `RegExp.RegExpPattern::CharClass`

A character class of `\S`. (non-whitespaces)

#### cls_non_word_char

Type: `RegExp.RegExpPattern::CharClass`

A character class of `\W`. (ie. `[^A-Za-z0-9_]`)

#### cls_whitespace

Type: `RegExp.RegExpPattern::CharClass`

A character class of `\s`. (whitespaces)

#### cls_word_char

Type: `RegExp.RegExpPattern::CharClass`

A character class of `\w`. (ie. `[A-Za-z0-9_]`)

#### consists_of

Type: `Std::String -> RegExp.RegExpPattern::CharClass`

Creates a character class whose members are characters in the specified string.

#### contains

Type: `Std::U8 -> RegExp.RegExpPattern::CharClass -> Std::Bool`

Returns true if the character is a member of the class.

#### empty

Type: `RegExp.RegExpPattern::CharClass`

An empty character class.

#### make

Type: `Std::String -> (Std::U8 -> Std::Bool) -> RegExp.RegExpPattern::CharClass`

Creates a character class from a label and a member function.

#### negate

Type: `RegExp.RegExpPattern::CharClass -> RegExp.RegExpPattern::CharClass`

Negate the member function of a character class.

#### range

Type: `Std::U8 -> Std::U8 -> RegExp.RegExpPattern::CharClass`

Creates a character class whose members are characters from start to end.

#### singleton

Type: `Std::U8 -> RegExp.RegExpPattern::CharClass`

Creates a character class whose only member is the specified character.

#### to_table

Type: `RegExp.RegExpPattern::CharClass -> RegExp.RegExpPattern::CharClass`

For optimization, creates a lookup table of same members, and returns a character class
using that table.

#### union

Type: `RegExp.RegExpPattern::CharClass -> RegExp.RegExpPattern::CharClass -> RegExp.RegExpPattern::CharClass`

Creates union of two character classes.

### namespace RegExp.RegExpPattern::Pattern

#### parse

Type: `Std::String -> Std::Result Std::ErrMsg RegExp.RegExpPattern::Pattern`

Parses a pattern from specified string.

#### parse_pattern

Type: `RegExp.SimpleParser::Parser RegExp.RegExpPattern::Pattern`

Parses a pattern from the stream.

## Types and aliases

### namespace RegExp.RegExpPattern

#### CharClass

Defined as: `type CharClass = unbox struct { ...fields... }`

Type of a character class.

##### field `label`

Type: `Std::String`

A label that describes this class (for debugging only)

##### field `f`

Type: `Std::U8 -> Std::Bool`

A member function that judges whether a character is contained in this class or not

#### PAssertion

Defined as: `type PAssertion = unbox union { ...variants... }`

Type of an assertion for regular expressions, such as `^`, `$`.

##### variant `pa_begin`

Type: `()`

##### variant `pa_end`

Type: `()`

#### Pattern

Defined as: `type Pattern = box union { ...variants... }`

Type of a parsed regular expression.

##### variant `pclass`

Type: `RegExp.RegExpPattern::CharClass`

Character class pattern, eg. `a`, `[a-z]`, `\d` etc.

##### variant `passert`

Type: `RegExp.RegExpPattern::PAssertion`

Assertion pattern, eg. `^`, `$`

##### variant `psequence`

Type: `Std::Array RegExp.RegExpPattern::Pattern`

Sequence of patterns, eg. `XYZ`

##### variant `peither`

Type: `(RegExp.RegExpPattern::Pattern, RegExp.RegExpPattern::Pattern)`

Either pattern, eg. `X|Y`

##### variant `pquant`

Type: `(RegExp.RegExpPattern::Pattern, Std::I64, Std::I64)`

Quantified pattern, eg. `X?`, `X*`, `X+`, `X{n,m}`

##### variant `pgroup`

Type: `(Std::I64, RegExp.RegExpPattern::Pattern)`

Grouped pattern, eg. `(X)`

## Traits and aliases

## Trait implementations

### impl `RegExp.RegExpPattern::CharClass : Std::ToString`

Converts a character class to a string.

### impl `RegExp.RegExpPattern::PAssertion : Std::ToString`

Converts an assertion to a string.

### impl `RegExp.RegExpPattern::Pattern : Std::ToString`

Converts a pattern to a string.