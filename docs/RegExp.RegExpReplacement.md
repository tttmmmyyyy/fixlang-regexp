# RegExp.RegExpReplacement

Defined in regexp@1.1.5

Building the text a match is replaced with. This is an internal module of `RegExp`.

## Values

### namespace RegExp.RegExpReplacement::Replacement

#### calc_replacement

Type: `Std::String -> Std::Array RegExp.RegExpReplacement::ReplaceFrag -> RegExp.RegExpNFA::Groups -> Std::String`

Calculates actual replacement string.

#### compile

Type: `Std::String -> Std::Array RegExp.RegExpReplacement::ReplaceFrag`

Compiles a replacement string to fragments.

## Types and aliases

### namespace RegExp.RegExpReplacement

#### ReplaceFrag

Defined as: `type ReplaceFrag = unbox union { ...variants... }`

A replacement fragment

##### variant `rep_literal`

Type: `Std::U8`

##### variant `rep_group`

Type: `Std::I64`

## Traits and aliases

## Trait implementations