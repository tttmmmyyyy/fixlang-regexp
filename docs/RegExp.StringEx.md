# `module RegExp.StringEx`

String extensions, such as:
- ToString for Tuple, Option, Result, Array, HashMap
- Array U8 -> String conversion
- Search, replace, split, comparison of String
- Hexadecimal String
- File Path handling

# Types and aliases

## `namespace RegExp.StringEx`

### `type SplitByIterator = Std::Iterator::ArrayIterator Std::String`

# Traits and aliases

# Trait implementations

# Values

## `namespace RegExp.StringEx`

### `_array_cmp_inner : Std::Array Std::U8 -> Std::Array Std::U8 -> Std::I64 -> Std::I64 -> Std::I64 -> Std::I64`

### `_unsafe_to_string : Std::Array Std::U8 -> Std::String`

Converts a byte array to a string. Specifically, it calls `String::_unsafe_to_string()`
after appending a null character to the end of the byte array.

### `byte_to_string : Std::U8 -> Std::String`

Converts a byte (a character) to a string of length 1.

### `decode_hex_char : Std::U8 -> Std::Result Std::ErrMsg Std::U8`

Converts a hex character ('0'..'9', 'A'..'F' or 'a'..'f') to a 4bit number (0..15).

### `dirname : Std::String -> Std::String`

`dirname(path)` returns the path with its last non-slash component and trailing slashes removed.
if `path` contains no `/`s, returns `"."`.

### `encode_hex_char : Std::U8 -> Std::U8`

Converts a 4bit number (0..15) to a hex character ('0'..'9', 'A'..'F').

### `ends_with : Std::String -> Std::String -> Std::Bool`

Checks if a string ends with the specified suffix.

### `find_byte : Std::U8 -> Std::String -> Std::Option Std::I64`

Searches for the specified byte from the beginning of a string.
If found, returns the index of that byte.

### `find_last_byte : Std::U8 -> Std::String -> Std::Option Std::I64`

Searches for the specified byte from the end of a string.
If found, returns the index of that byte.

### `formatv : Std::String -> Std::Array Std::String -> Std::String`

`array.formatv(str)` replaces each occurence of `{}` in the format string `str`
with each element of `array`.
Currently only supports `{}`.

### `from_string_hex : Std::String -> Std::Result Std::ErrMsg Std::U64`

Converts a hex string to a 64bit number.

### `is_path_sep : Std::U8 -> Std::Bool`

Checks if the byte is a path separator. Currently only '/' is supported.

### `join_paths : Std::Array Std::String -> Std::String`

`join_paths(path_segments)` joins segments into a path.

### `replace_all : Std::String -> Std::String -> Std::String -> Std::String`

Replaces all occurrences of `from` in the string with `to`.

### `replace_suffix : Std::String -> Std::String -> Std::String -> Std::Result Std::ErrMsg Std::String`

`str.replace_suffix(from, to)` replaces `from` at the end of `str` with `to`.
if `str` does not end with `from`, an error occurs.
Example:
```
"test.txt".replace_suffix(".txt", ".tmp")  ==> ok("test.tmp")
"test.jpg".replace_suffix(".txt", ".tmp")  ==> err("suffix does not match: test.jpg")
```

### `split_by : (Std::U8 -> Std::Bool) -> Std::String -> RegExp.StringEx::SplitByIterator`

Splits a string by a function that checks whether a character is a delimiter or not.
The result will not contain any empty string.

### `split_ex : Std::String -> Std::String -> Std::Iterator::DynIterator Std::String`

Same as Std::String::split, except that `"foo".split_ex(",")` returns a singleton iterator of "foo".

### `split_first : Std::String -> Std::String -> (Std::String, Std::String)`

`str.split_first(delim)` splits the string `str` into two parts with the delimiter `delim`.
Returns `(left, right)` where `left` is the left part of the delimiter, and
`right` is the right part of the delimiter.
Returns `(str, "")` if the delimiter is not found.

### `starts_with : Std::String -> Std::String -> Std::Bool`

Checks if a string starts with the specified prefix.

### `string_less_than : (Std::String, Std::String) -> Std::Bool`

`string_less_than((str1,str2))` compares two strings.
Returns True if and only if `str1` is less than `str2` in lexicographical order.

### `substring : Std::I64 -> Std::I64 -> Std::String -> Std::String`

Returns a substring extracted from a specified range from a string.
If the specified range exceeds the string, it will be truncated to fit within the string.

### `to_lower : Std::String -> Std::String`

Converts the specified string to lowercase.

### `to_string_hex : Std::U64 -> Std::String`

Converts a 64bit number to a hex string.

### `to_upper : Std::String -> Std::String`

Converts the specified string to uppercase.

## `namespace RegExp.StringEx::Array`

### `format : [a : Std::ToString] Std::String -> Std::Array a -> Std::String`

`array.format(str)` replaces each occurence of `{}` in the format string `str`
with each element of `array`.
Currently only supports `{}`.

## `namespace RegExp.StringEx::Tuple2`

### `format : [a : Std::ToString, b : Std::ToString] Std::String -> (a, b) -> Std::String`

`(a, b).format(str)` replaces each occurence of `{}` in the format string `str`
with `a`, `b`.

## `namespace RegExp.StringEx::Tuple3`

### `format : [a : Std::ToString, b : Std::ToString, c : Std::ToString] Std::String -> (a, b, c) -> Std::String`

`(a, b, c).format(str)` replaces each occurence of `{}` in the format string `str`
with `a`, `b`, `c`.

## `namespace RegExp.StringEx::Tuple4`

### `format : [a : Std::ToString, b : Std::ToString, c : Std::ToString, d : Std::ToString] Std::String -> (a, b, c, d) -> Std::String`

`(a, b, c, d).format(str)` replaces each occurence of `{}` in the format string `str`
with `a`, `b`, `c`, `d`.