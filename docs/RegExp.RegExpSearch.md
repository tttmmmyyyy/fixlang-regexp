# RegExp.RegExpSearch

Defined in regexp@1.1.5

Running the automaton over the input: the scanner that walks sets of threads, and the walk that
carries the threads one at a time. This is an internal module of `RegExp`.

## Values

### namespace RegExp.RegExpSearch::DFA

#### find

Type: `Std::Array Std::U8 -> Std::I64 -> RegExp.RegExpSearch::DFA -> (Std::Option RegExp.RegExpNFA::Groups, RegExp.RegExpSearch::DFA)`

The leftmost match beginning at or after a position, taking the longest of those that begin
at the same place, together with the scanner as the search left it.

Positions holding a byte no match can begin with are passed over without the automaton being
walked at all, which is what makes a search over text a pattern rarely meets cost little more
than reading the text.

##### Parameters

* `bytes` - The bytes to read.
* `from` - The position at or after which the match has to begin.
* `dfa` - The scanner.

#### make

Type: `RegExp.RegExpNFA::NFA -> RegExp.RegExpSearch::DFA`

A scanner that has walked nothing yet.

##### Parameters

* `nfa` - The automaton to walk.

### namespace RegExp.RegExpSearch::NFA

#### search

Type: `Std::Array Std::U8 -> Std::I64 -> RegExp.RegExpNFA::NFA -> Std::Option RegExp.RegExpNFA::Groups`

Runs the automaton over the bytes and reports the leftmost match beginning at or after a
position, taking the longest of those that begin at the same place.

##### Parameters

* `bytes` - The bytes to read.
* `from` - The position at or after which the match has to begin.
* `nfa` - The automaton to run.

#### search_all

Type: `Std::Array Std::U8 -> RegExp.RegExpNFA::NFA -> Std::Array RegExp.RegExpNFA::Groups`

Every match the automaton finds, taken left to right, none of them overlapping another.

##### Parameters

* `bytes` - The bytes to read.
* `nfa` - The automaton to run.

### namespace RegExp.RegExpSearch::Walk

#### make

Type: `RegExp.RegExpNFA::NFA -> RegExp.RegExpSearch::Walk`

A walk carrying no thread.

##### Parameters

* `nfa` - The automaton to walk.

## Types and aliases

### namespace RegExp.RegExpSearch

#### DFA

Defined as: `type DFA = box struct { ...fields... }`

The scanner: the automaton walked over sets of threads, so that reading a byte costs one table
lookup. Where the text below says "the scanner" it means a `DFA`, and "the automaton" an `NFA`.

A state is a set of threads. Reading a byte carries every thread whose node admits it to the node
that node leads to, and the threads reachable from there without reading anything join them; what
comes out is again a state. States and the transitions between them are worked out as the input
calls for them and kept, so that a byte read again in the same state costs one lookup.

A thread is `width` numbers: the node it stands at, then the rounds it has counted for each
special quantifier. A state holds its threads ordered by node, so that two sets holding the same
threads are one state.

The scanner reports where a match begins and ends and nothing else. The groups a match captured
are read off afterwards by the automaton, over the stretch the match covers.

##### field `nfa`

Type: `RegExp.RegExpNFA::NFA`

##### field `width`

Type: `Std::I64`

##### field `threads`

Type: `Std::Array Std::I64`

##### field `bounds`

Type: `Std::Array Std::I64`

##### field `ordered`

Type: `Std::Array Std::I64`

##### field `transitions`

Type: `Std::Array Std::I64`

##### field `accepts`

Type: `Std::Array Std::Bool`

##### field `accepts_at_end`

Type: `Std::Array Std::I64`

##### field `untaken`

Type: `Std::Array Std::I64`

`1` where it does, `0` where it does not, `-1` until asked

##### field `interior`

Type: `Std::I64`

##### field `first_bytes`

Type: `Std::Array Std::U64`

##### field `absorbing`

Type: `Std::Array Std::U8`

##### field `full`

Type: `Std::Bool`

`2` where it does not, `0` where it has not been worked out

#### Walk

Defined as: `type Walk = box struct { ...fields... }`

The threads an automaton is walked with, and what each of them has captured.

A thread stands at a node, has captured a beginning and an end for each group, and has counted
rounds for each special quantifier. All three are numbers, and the threads share three arrays of
them, so that carrying a thread forward writes numbers and allocates nothing. Gathering what one
thread holds into a value of its own would put an array behind every thread and have it copied
once per node the thread reaches.

Thread `t` stands at `nodes.@(t)`, has captured the `slot_width` numbers of `slots` beginning at
`t * slot_width` - a beginning and an end to a group, the whole match first - and has counted the
`count_width` numbers of `counts` beginning at `t * count_width`.

##### field `slot_width`

Type: `Std::I64`

##### field `count_width`

Type: `Std::I64`

##### field `nodes`

Type: `Std::Array Std::I64`

##### field `slots`

Type: `Std::Array Std::I64`

##### field `counts`

Type: `Std::Array Std::I64`

##### field `pending`

Type: `Std::Array Std::I64`

The threads whose empty-string transitions are still to be followed, taken from the end.

##### field `at_step`

Type: `Std::Array Std::I64`

Per node, the step at which a thread took it, so that nothing has to be cleared between
positions.

##### field `counts_at_step`

Type: `Std::Array (Std::Array Std::I64)`

Per node, the rounds counted by the threads that took it at that step, since two threads
standing at one node having counted differently do not have the same future.

##### field `step`

Type: `Std::I64`

How many bytes the walk has read, which tells the marks left at one position from those left
at another.

## Traits and aliases

## Trait implementations