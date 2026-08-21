# RegExp.RegExpReplacement

Defined in regexp@1.1.5

Building the text a match is replaced with. This is an internal module of `RegExp`.

## Values

### namespace RegExp.RegExpReplacement::Replacement

#### calc_replacement

Type: `Std::String -> Std::Array RegExp.RegExpReplacement::ReplaceFrag -> RegExp.RegExpNFA::Groups -> Std::String`

The text a match is replaced by: the fragments written out one after another, each group
standing for the text it captured.

##### Parameters

* `target` - The string the match was found in.
* `rep_frags` - The fragments the replacement string compiled to.
* `groups` - The groups the match captured.

#### compile

Type: `Std::String -> Std::Array RegExp.RegExpReplacement::ReplaceFrag`

Compiles a replacement string to fragments. `$n` stands for the text group `n` captured,
`$&` for the whole match and `$$` for a `$`; every other byte stands for itself.

## Types and aliases

### namespace RegExp.RegExpReplacement

#### ReplaceFrag

Defined as: `type ReplaceFrag = unbox union { ...variants... }`

A piece of a replacement string: a byte to write out as it stands, or a group whose captured
text to write out.

##### variant `rep_literal`

Type: `Std::U8`

##### variant `rep_group`

Type: `Std::I64`

## Traits and aliases

## Trait implementations