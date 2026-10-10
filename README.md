This is a regular expression (regex) implementation for the [Fix programming language](https://github.com/tttmmmyyyy/fixlang).

It follows JavaScript's regular expressions but for one thing: where several alternatives match at
one place, the longest wins. `a|ab` matched against `ab` gives `ab`; JavaScript gives `a`.

The module `RegExp` is the whole interface of the library, and its version number follows that
module alone. The modules under `RegExp.Internal` are the parts the library is built from, and any
version may change them. The documentation of `RegExp` is in [docs/RegExp.md](docs/RegExp.md).

# Acknowledgements

The original version of this program was written by [pt9999](https://github.com/pt9999).