# RegExp.RegExpNFA

Defined in regexp@1.2.0

NFA (Nondeterministic Finite Automaton). This is internal module of `RegExp`.

For details, see web pages below.
- https://swtch.com/~rsc/regexp/regexp1.html
- https://zenn.dev/canalun/articles/regexp_and_automaton

## Values

### namespace RegExp.RegExpNFA

#### group_at

Type: `Std::I64 -> RegExp.RegExpNFA::Groups -> RegExp.RegExpNFA::Group`

Gets specified group. If the group index is out of range, returns `(-1, -1)`.

##### Parameters

* `group_idx` - The index of the group.
* `groups` - The captured groups.

### namespace RegExp.RegExpNFA::DFA

#### find

Type: `Std::Array Std::U8 -> Std::I64 -> RegExp.RegExpNFA::DFA -> (Std::Option RegExp.RegExpNFA::Groups, RegExp.RegExpNFA::DFA)`

The leftmost match beginning at or after a position, taking the longest of those that begin
at the same place, together with the scanner as the search left it.

##### Parameters

* `bytes` - The bytes to read.
* `from` - The position at or after which the match has to begin.
* `dfa` - The scanner.

#### forced_beginning

Type: `RegExp.RegExpNFA::NFA -> Std::Array Std::U8`

The bytes every match begins with, as far as they are forced. They are worked out once for the
automaton and kept in its `prefix`.

##### Parameters

* `nfa` - The automaton to walk.

#### make

Type: `RegExp.RegExpNFA::NFA -> RegExp.RegExpNFA::DFA`

The scanner a search with an automaton starts from.

##### Parameters

* `nfa` - The automaton to walk, compiled by `NFA::compile`.

#### search_every

Type: `Std::Array Std::U8 -> RegExp.RegExpNFA::DFA -> (Std::Array RegExp.RegExpNFA::Groups, RegExp.RegExpNFA::DFA)`

Every match a scanner finds, taken left to right, none of them overlapping another, together
with the scanner as the search left it.

##### Parameters

* `bytes` - The bytes to read.
* `dfa` - The scanner to search with.

#### search_from

Type: `Std::Array Std::U8 -> Std::I64 -> RegExp.RegExpNFA::DFA -> (Std::Option RegExp.RegExpNFA::Groups, RegExp.RegExpNFA::DFA)`

The leftmost match beginning at or after a position, taking the longest of those that begin
at the same place, together with the scanner as the search left it.

A scanner works out what the automaton does with a byte the first time it reads that byte in
that state, and keeps the answer, so a search handed a scanner back reads what the searches
before it worked out.

##### Parameters

* `bytes` - The bytes to read.
* `from` - The position at or after which the match has to begin.
* `dfa` - The scanner to search with.

### namespace RegExp.RegExpNFA::NFA

#### action_quant

Type: `RegExp.RegExpNFA::NFANodeAction -> Std::I64`

The special quantifier whose rounds a node's action reads, or `-1` where it reads none. A
walk reads that many rounds off the thread and hands them to `action_step`.

##### Parameters

* `action` - The action to read.

#### action_step

Type: `Std::Bool -> Std::Bool -> Std::I64 -> RegExp.RegExpNFA::NFANode -> RegExp.RegExpNFA::NFA -> RegExp.RegExpNFA::ActionStep`

What a node's action lets a thread standing at it do: where it may step, the rounds it writes
there, and the group whose beginning or end it records. `next` is `-1` where the action lets
the thread nowhere, and `quant`, `opens` and `closes` are `-1` where the step writes and
records nothing.

Every walk of the automaton asks this, and each writes the answer into threads of its own
shape, which is why the answer is numbers rather than a thread.

##### Parameters

* `at_begin` - Whether the position is the beginning of the input, where `^` holds.
* `at_end` - Whether it is the end of the input, where `$` holds.
* `counted` - The rounds the thread has counted for the quantifier the action reads.
* `node` - The node whose action to read.
* `nfa` - The automaton the node belongs to.

#### class_holds

Type: `Std::I64 -> Std::U8 -> RegExp.RegExpNFA::NFA -> Std::Bool`

Whether a byte belongs to the class whose words begin at a position.

##### Parameters

* `base` - Where the class's words begin.
* `byte` - The byte to test.
* `nfa` - The automaton holding the classes.

#### compile

Type: `RegExp.RegExpPattern::Pattern -> RegExp.RegExpNFA::NFA`

Compiles a pattern to an automaton, together with what a search reads off it before it
begins: the byte strings every match holds, the bytes every match begins with, the ways on
that carry one thread, the automaton of the pattern read from right to left, and the scanner.

#### empty

Type: `RegExp.RegExpNFA::NFA`

An automaton with no node and no group.

#### get_node

Type: `RegExp.RegExpNFA::NodeID -> RegExp.RegExpNFA::NFA -> RegExp.RegExpNFA::NFANode`

The node an id names.

#### mod_node

Type: `RegExp.RegExpNFA::NodeID -> (RegExp.RegExpNFA::NFANode -> RegExp.RegExpNFA::NFANode) -> RegExp.RegExpNFA::NFA -> RegExp.RegExpNFA::NFA`

Replaces the node an id names by what a function makes of it.

#### new_class

Type: `RegExp.RegExpPattern::CharClass -> RegExp.RegExpNFA::NFA -> (RegExp.RegExpNFA::NFA, Std::I64)`

Stores a character class and returns where its four words begin.

##### Parameters

* `cls` - The class to store.
* `nfa` - The automaton to store it in.

#### new_node

Type: `RegExp.RegExpNFA::NFA -> (RegExp.RegExpNFA::NFA, RegExp.RegExpNFA::NodeID)`

Adds a node that guards nothing and leads nowhere, and reports its id.

#### new_quant

Type: `Std::I64 -> Std::I64 -> RegExp.RegExpNFA::NFA -> (RegExp.RegExpNFA::NFA, RegExp.RegExpNFA::QuantID)`

Adds a special quantifier and reports its id.

##### Parameters

* `least` - The fewest rounds the quantifier admits.
* `most` - The most rounds it admits.
* `nfa` - The automaton to add the quantifier to.

#### quant_next_round

Type: `RegExp.RegExpNFA::QuantID -> Std::I64 -> RegExp.RegExpNFA::NFA -> Std::I64`

The rounds a thread standing at a special quantifier's loop has counted after one more
round, or `-1` when the quantifier admits no further round.

A round past the most the quantifier admits leaves the thread nowhere to go: the quantifier's
end admits no such count, and the count is never brought down again, since coming back to the
quantifier's beginning means leaving through its end first.

Counting past what the quantifier can still tell apart would give every round a state of its
own; holding the counter there keeps their number finite and admits the same paths, since
`most` being unbounded makes every count at or above `least` alike.

##### Parameters

* `qid` - The quantifier the thread stands in.
* `counted` - The rounds it has counted so far.
* `nfa` - The automaton the quantifier belongs to.

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

#### set_frag_output

Type: `RegExp.RegExpNFA::NFAFrag -> RegExp.RegExpNFA::NodeID -> RegExp.RegExpNFA::NFA -> RegExp.RegExpNFA::NFA`

Points every node a fragment leads out of at one node.

##### Parameters

* `frag` - The fragment to point onward.
* `out` - The node it is to lead to.
* `nfa` - The automaton the fragment was built in.

### namespace RegExp.RegExpNFA::NFAFrag

#### compile_pattern

Type: `RegExp.RegExpPattern::Pattern -> RegExp.RegExpNFA::NFA -> (RegExp.RegExpNFA::NFA, RegExp.RegExpNFA::NFAFrag)`

Compiles a pattern to a fragment.

### namespace RegExp.RegExpNFA::NFANode

#### empty

Type: `RegExp.RegExpNFA::NFANode`

A node that has no id, guards nothing and leads nowhere.

### namespace RegExp.RegExpNFA::OneWayTable

#### empty

Type: `RegExp.RegExpNFA::OneWayTable`

A table offering no way, which sends every walk to the threads.

### namespace RegExp.RegExpNFA::Prefilter

#### make

Type: `Std::Array Std::U64 -> Std::Array Std::U8 -> RegExp.RegExpNFA::Prefilter`

What a search looks for where it has been told no byte string every match holds.

##### Parameters

* `first_bytes` - The bytes a match may begin with, one bit each.
* `prefix` - The bytes every match begins with.

### namespace RegExp.RegExpNFA::Replacement

#### calc_replacement

Type: `Std::String -> Std::Array RegExp.RegExpNFA::ReplaceFrag -> RegExp.RegExpNFA::Groups -> Std::String`

The text a match is replaced by: the fragments written out one after another, each group
standing for the text it captured.

##### Parameters

* `target` - The string the match was found in.
* `rep_frags` - The fragments the replacement string compiled to.
* `groups` - The groups the match captured.

#### compile

Type: `Std::String -> Std::Array RegExp.RegExpNFA::ReplaceFrag`

Compiles a replacement string to fragments. `$n` stands for the text group `n` captured,
`$&` for the whole match and `$$` for a `$`; every other byte stands for itself.

### namespace RegExp.RegExpNFA::StateTable

#### given_up

Type: `RegExp.RegExpNFA::NFA -> RegExp.RegExpNFA::StateTable`

A table that has given the search back to the automaton before it took a state, so that a
search with it walks the automaton's threads from the beginning.

##### Parameters

* `nfa` - The automaton.

#### make

Type: `RegExp.RegExpNFA::NFA -> RegExp.RegExpNFA::StateTable`

A table that has walked nothing yet, holding the state with no thread and no other.

##### Parameters

* `nfa` - The automaton to walk.

#### make_seeking

Type: `RegExp.RegExpNFA::NFA -> RegExp.RegExpNFA::StateTable`

A table that has walked nothing yet, holding the state with no thread and the state a search
begins in away from the beginning of the input.

##### Parameters

* `nfa` - The automaton to walk.

### namespace RegExp.RegExpNFA::Walk

#### make

Type: `RegExp.RegExpNFA::NFA -> RegExp.RegExpNFA::Walk`

A walk carrying no thread.

##### Parameters

* `nfa` - The automaton to walk.

## Types and aliases

### namespace RegExp.RegExpNFA

#### ActionStep

Defined as: `type ActionStep = unbox struct { ...fields... }`

What a node's action lets a thread standing at it do. See `NFA::action_step`.

##### field `next`

Type: `Std::I64`

##### field `quant`

Type: `Std::I64`

##### field `round`

Type: `Std::I64`

##### field `opens`

Type: `Std::I64`

##### field `closes`

Type: `Std::I64`

#### DFA

Defined as: `type DFA = unbox struct { ...fields... }`

The scanner: the automaton walked over sets of threads, so that reading a byte costs one table
lookup. Where the text below says "the scanner" it means a `DFA`, and "the automaton" an `NFA`.

A search walks the automaton forward from where it is to begin, starting a rank of threads at
every position until a match is reached, which finds where the leftmost match ends in one
reading of the text. Where the match begins is where the rank that reached it began. The walk
reads that off where it can, and otherwise walks the automaton of the pattern read from right to
left back from where the match ends: the earliest position that walk reaches a match at is where
the match begins.

The scanner reports where a match begins and ends and nothing else. The groups a match captured
are read off afterwards by the automaton, over the stretch the match covers.

##### field `forward`

Type: `RegExp.RegExpNFA::StateTable`

##### field `backward`

Type: `RegExp.RegExpNFA::StateTable`

##### field `prefilter`

Type: `RegExp.RegExpNFA::Prefilter`

from where a match ends to find where it begins

#### Group

Defined as: `type Group = (Std::I64, Std::I64)`

Where a group was matched: the two stream positions `(begin, end)`. `-1` stands for a position
that was never written.

#### Groups

Defined as: `type Groups = Std::Array RegExp.RegExpNFA::Group`

The groups a match captured, the whole match first. Group `n` of the pattern stands at index `n`.

#### NFA

Defined as: `type NFA = box struct { ...fields... }`

The automaton a pattern compiles to.

A node is a place a thread may stand at, and the transitions out of it say where the thread may
go next. A node may offer a thread more than one way on, so a search follows several threads at
once.

It is boxed because a scanner holds one and reads it back at every match it reports: boxed, that
reading raises one reference count for the automaton, where unboxed it raises one for each array
the automaton holds.

##### field `nodes`

Type: `Std::Array RegExp.RegExpNFA::NFANode`

##### field `initial_node`

Type: `RegExp.RegExpNFA::NodeID`

##### field `accepting_node`

Type: `RegExp.RegExpNFA::NodeID`

##### field `group_count`

Type: `Std::I64`

##### field `quant_bounds`

Type: `Std::Array (Std::I64, Std::I64)`

##### field `classes`

Type: `Std::Array Std::U64`

The character classes the nodes are guarded by, as one bit per byte value, four words to a
class. Keeping them here rather than in the node leaves a node holding nothing but numbers,
so that walking the nodes costs no reference counting at all.

##### field `kind_of`

Type: `Std::Array Std::I64`

The kind of each byte value. Two bytes are of one kind where every character class above holds
both or neither of them, so that they lead every thread the same way, and a table works out
what a byte does once for the bytes of its kind.

##### field `kinds`

Type: `Std::Array (Std::Array Std::U8)`

##### field `forced_sets`

Type: `Std::Array (Std::Array RegExp.RegExpPattern::ForcedRun)`

Sets of byte strings the pattern forces every text it matches to hold. Every match holds a
member of each of these sets, so a search may look for whichever set the text it is over
holds least often.

##### field `prefix`

Type: `Std::Array Std::U8`

The bytes every match begins with. Working them out means walking the automaton, and doing
it here leaves every scanner made from this automaton with nothing to walk.

##### field `one_way`

Type: `RegExp.RegExpNFA::OneWayTable`

What the automaton does between one byte and the next where it offers one way on, which is
how a match's groups are read without running the threads over it again.

##### field `reversed`

Type: `Std::Option RegExp.RegExpNFA::NFA`

The automaton of the pattern read from right to left, which a search walks back from where a
match ends to find where it begins. An automaton compiled from a reversed pattern holds
`none` here, and so does an automaton with no node.

##### field `scanner`

Type: `Std::Option RegExp.RegExpNFA::DFA`

The scanner a search with this automaton starts from, holding the states a search meets first
worked out. Only `NFA::compile` gives an automaton one: the automaton the scanner walks holds
`none` here.

#### NFAFrag

Defined as: `type NFAFrag = unbox struct { ...fields... }`

A stretch of the automaton, compiled from a stretch of the pattern. A thread enters it at one
node and may leave it from several, so where it leads onward is held as a function that points
every one of those nodes at the same place.

##### field `input`

Type: `RegExp.RegExpNFA::NodeID`

##### field `set_output`

Type: `RegExp.RegExpNFA::NodeID -> RegExp.RegExpNFA::NFA -> RegExp.RegExpNFA::NFA`

#### NFANode

Defined as: `type NFANode = unbox struct { ...fields... }`

A node of the automaton. It has one input, which is its own id, and three outputs: one a thread
takes when the node's action lets it through, and two it takes without reading anything.

##### field `id`

Type: `RegExp.RegExpNFA::NodeID`

##### field `action`

Type: `RegExp.RegExpNFA::NFANodeAction`

##### field `output_on_action`

Type: `RegExp.RegExpNFA::NodeID`

##### field `output`

Type: `RegExp.RegExpNFA::NodeID`

##### field `output2`

Type: `RegExp.RegExpNFA::NodeID`

#### NFANodeAction

Defined as: `type NFANodeAction = unbox union { ...variants... }`

What a thread has to do, or what has to hold, before it may take a node's `output_on_action`.

##### variant `sa_none`

Type: `()`

##### variant `sa_char_match`

Type: `Std::I64`

##### variant `sa_assert`

Type: `RegExp.RegExpPattern::PAssertion`

##### variant `sa_group_begin`

Type: `Std::I64`

##### variant `sa_group_end`

Type: `Std::I64`

##### variant `sa_quant_begin`

Type: `RegExp.RegExpNFA::QuantID`

##### variant `sa_quant_loop`

Type: `RegExp.RegExpNFA::QuantID`

##### variant `sa_quant_end`

Type: `(RegExp.RegExpNFA::QuantID, Std::I64, Std::I64)`

#### NodeID

Defined as: `type NodeID = unbox struct { ...fields... }`

A node's name: its place in the automaton's `nodes`.

##### field `val`

Type: `Std::I64`

#### OneWayTable

Defined as: `type OneWayTable = box struct { ...fields... }`

The ways on from a node that carry one thread: what the automaton does between one byte and
the next, worked out once for the automaton rather than once for every byte of every match.

##### field `ways`

Type: `Std::Array Std::I64`

Five numbers to a way: where its class's words begin, the node the byte leads to, which
assertions the way stands on (one for the beginning of the input, two for its end), and
the stretch of `writes` it performs.

##### field `bounds`

Type: `Std::Array Std::I64`

Node `n` offers the ways from `bounds.@(n)` to `bounds.@(n + 1)`, counted in ways. It
holds nothing where the automaton is walked by its threads.

##### field `accepts`

Type: `Std::Array Std::I64`

Three numbers to a node: which assertions the way from it to the accepting node stands
on, and the stretch of `writes` that way performs. The assertions read `-1` where no
empty-string way leads from the node to the accepting node.

##### field `writes`

Type: `Std::Array Std::I64`

What a way writes down: a slot doubled, and one more where the slot takes `-1` rather
than the position the walk stands at.

##### field `twice`

Type: `Std::Array Std::Bool`

Per node, whether its empty-string transitions reach some node two ways. One thread
stands for the automaton only where they reach each node one way.

#### Prefilter

Defined as: `type Prefilter = box struct { ...fields... }`

What a search looks for to pass over the positions no match begins at.

It is held apart from the tables the search walks so that the search can read it while it
changes them.

##### field `first_bytes`

Type: `Std::Array Std::U64`

##### field `first_byte`

Type: `Std::I64`

##### field `prefix`

Type: `Std::Array Std::U8`

begin with several bytes or with none

##### field `prefix_size`

Type: `Std::I64`

a match may begin with is not forced

##### field `prefix_anchor`

Type: `Std::I64`

to look so that the choice costs no reference count

##### field `forced_strings`

Type: `Std::Array (Std::Array Std::U8)`

##### field `forced_anchors`

Type: `Std::Array Std::I64`

for, empty where it looks for what a match begins with

##### field `forced_count`

Type: `Std::I64`

asked for stands

##### field `back_max`

Type: `Std::I64`

how to look so that the choice costs no reference count

##### field `back_class`

Type: `Std::Array Std::U64`

#### QuantID

Defined as: `type QuantID = Std::I64`

Which special quantifier a node belongs to. `X{n}`, `X{n,}` and `X{n,m}` are the special
quantifiers, and a thread counts the rounds it has taken through each of them, since how many it
has taken decides where it may go and the node it stands at does not say. The `sa_quant_*`
actions are where the counting happens.

#### ReplaceFrag

Defined as: `type ReplaceFrag = unbox union { ...variants... }`

A piece of a replacement string: a byte to write out as it stands, or a group whose captured
text to write out.

##### variant `rep_literal`

Type: `Std::U8`

##### variant `rep_group`

Type: `Std::I64`

#### StateTable

Defined as: `type StateTable = box struct { ...fields... }`

The states an automaton is walked through, worked out as the input calls for them and kept, so
that reading a byte in a state met before costs one lookup.

A state is the threads the automaton stands at, each ranked by where it began: the threads of rank
0 began earliest. A thread is `width` numbers: the node it stands at, then the rounds it has
counted for each special quantifier. Two threads that stand alike have the same future, so a state
holds a thread once, at the earliest rank that reached it, and a rank left holding nothing is
dropped.

A state is seeking while no thread of it has reached the accepting node: reading a byte in it
starts a new rank at the position after the byte, so that one reading of the text tries every
position a match may begin at. Once a rank reaches the accepting node, a match beginning later
could not be the leftmost one, so the ranks after it are dropped and no rank is started again. The
walk then goes on only to see how far the match reaches, and whether an earlier rank reaches a
match of its own.

A state's key is what tells two states apart: `1` where it is seeking and `0` where it is not, then
its threads, each as its rank followed by its `width` numbers, ordered by rank and, within a rank,
by the numbers.

##### field `nfa`

Type: `RegExp.RegExpNFA::NFA`

##### field `width`

Type: `Std::I64`

##### field `keys`

Type: `Std::Array Std::I64`

##### field `bounds`

Type: `Std::Array Std::I64`

##### field `ordered_states`

Type: `Std::Array Std::I64`

##### field `transitions`

Type: `Std::Array Std::I64`

##### field `accepts`

Type: `Std::Array Std::Bool`

##### field `accepts_at_end`

Type: `Std::Array Std::I64`

##### field `starting`

Type: `Std::Array Std::I64`

where the input ends: `-1` where none does, `-2` until asked

##### field `interior`

Type: `Std::I64`

##### field `fresh`

Type: `Std::I64`

##### field `full`

Type: `Std::Bool`

the position the walk stands at; `-1` where it is not

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

#### WayBuild

Defined as: `type WayBuild = box struct { ...fields... }`

What the ways on from one node come to while they are worked out.

##### field `ways`

Type: `Std::Array Std::I64`

##### field `writes`

Type: `Std::Array Std::I64`

##### field `accept`

Type: `Std::Array Std::I64`

##### field `seen`

Type: `Std::Array Std::I64`

##### field `twice`

Type: `Std::Bool`

## Traits and aliases

## Trait implementations

### impl `RegExp.RegExpNFA::NFA : Std::ToString`

### impl `RegExp.RegExpNFA::NFANode : Std::ToString`

### impl `RegExp.RegExpNFA::NFANodeAction : Std::ToString`

### impl `RegExp.RegExpNFA::NodeID : Std::Eq`

### impl `RegExp.RegExpNFA::NodeID : Std::ToString`