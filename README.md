This is a regular expression (regex) implementation for the [Fix programming language](https://github.com/tttmmmyyyy/fixlang).

It follows JavaScript's regular expressions: a search finds the match JavaScript finds, and each
group captures what it captures in JavaScript. The syntax it reads is listed in
[docs/RegExp.md](docs/RegExp.md). A character class holds single byte characters (U+0001..U+007F),
and positions are counted in bytes, where JavaScript counts UTF-16 code units; over ASCII text the
two agree.

The module `RegExp` is the whole interface of the library, and its version number follows that
module alone. The modules under `RegExp._Internal` are the parts the library is built from, and any
version may change them.

# Acknowledgements

The original version of this program was written by [pt9999](https://github.com/pt9999).