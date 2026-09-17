This is a regular expression (regex) implementation for the [Fix programming language](https://github.com/tttmmmyyyy/fixlang).

A search takes the leftmost match, and the longest of the matches beginning at that place, which is
the rule POSIX gives. `a|ab` matched against `ab` gives `ab`. JavaScript takes the first alternative
that matches and would give `a`, so a pattern whose alternatives begin alike is read differently
here.

# Acknowledgements

The original version of this program was written by [pt9999](https://github.com/pt9999).