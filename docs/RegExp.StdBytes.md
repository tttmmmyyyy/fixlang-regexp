# RegExp.StdBytes

Defined in regexp@1.1.6

The byte operations `Std` does not offer, which the automaton reads text with.

They are written to go into `Std::Array` as they stand, so this module is the whole of what moves
when they do, and no other file changes with them. Nothing outside this module reaches for a
foreign function.

Each of them hands the reading to the C library, which reads many bytes at a time. Written in Fix
the same reading costs five instructions a byte against half an instruction, and no compiler
closes that gap: a search that reads several bytes at once reads past the byte it stops at, which
a C library may do because it reads inside page boundaries, and a Fix program may not.

## Values

### namespace RegExp.StdBytes

#### find_byte

Type: `Std::U8 -> Std::I64 -> Std::Array Std::U8 -> Std::Option Std::I64`

The first position at or after `from` where `bytes` holds `wanted`, or `none` where it holds it
nowhere at or after `from`.

##### Parameters

* `wanted` - The byte to look for.
* `from` - The position to look from.
* `bytes` - The bytes to read.

#### find_bytes

Type: `Std::Array Std::U8 -> Std::I64 -> Std::Array Std::U8 -> Std::Option Std::I64`

The first position at or after `from` where `bytes` holds `wanted` entire, or `none` where it
holds it nowhere at or after `from`. An empty `wanted` stands at every position, so the answer
there is `from` itself where the bytes reach that far.

The C library is asked for the first byte of `wanted`, and the rest is read here. Asking it for
the whole of `wanted` with `memmem` reads far more slowly a byte than `memchr` does, so looking
for one byte and reading the rest is the cheaper way round wherever the first byte is not the
commonest thing in the text.

##### Parameters

* `wanted` - The bytes to look for.
* `from` - The position to look from.
* `bytes` - The bytes to read.

#### find_bytes_within

Type: `Std::Array Std::U8 -> Std::I64 -> Std::I64 -> Std::Array Std::U8 -> Std::Option Std::I64`

The first position at or after `from` and at or before `limit` where `bytes` holds `wanted`
entire, or `none` where it holds it nowhere between the two. `limit` bounds where the run begins,
so a run beginning at `limit` and reaching past it is found.

A search for several byte strings takes the earliest place any of them stands, so each string
after the first needs looking for only as far as the earliest place found so far. That bound is
what keeps a string the text holds nowhere ahead from being looked for over all the text that is
left, once for every position the search asks about.

##### Parameters

* `wanted` - The bytes to look for.
* `from` - The position to look from.
* `limit` - The last position a run may begin at.
* `bytes` - The bytes to read.

## Types and aliases

## Traits and aliases

## Trait implementations