# RegExp.RegExpNFA

Defined in regexp@1.1.5

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
at the same place, together with the scanner as walking it left it.

Positions holding a byte no match can begin with are passed over without the automaton being
walked at all, which is what makes a search over text a pattern rarely meets cost little more
than reading the text.

##### Parameters

* `bytes` - The bytes to read.
* `from` - The position at or after which the match has to begin.
* `dfa` - The scanner.

#### make

Type: `RegExp.RegExpNFA::NFA -> RegExp.RegExpNFA::DFA`

A scanner that has walked nothing yet.

##### Parameters

* `nfa` - The automaton to walk.

### namespace RegExp.RegExpNFA::NFA

#### class_holds

Type: `Std::I64 -> Std::U8 -> RegExp.RegExpNFA::NFA -> Std::Bool`

Whether a byte belongs to the class whose words begin at a position.

##### Parameters

* `base` - Where the class's words begin.
* `byte` - The byte to test.
* `nfa` - The automaton holding the classes.

#### compile

Type: `RegExp.RegExpPattern::Pattern -> RegExp.RegExpNFA::NFA`

`NFA::compile(pattern)` compiles a pattern to NFA.

#### debug

Type: `Std::String -> RegExp.RegExpNFA::NFA -> ()`

#### empty

Type: `RegExp.RegExpNFA::NFA`

An empty NFA.

#### get_node

Type: `RegExp.RegExpNFA::NodeID -> RegExp.RegExpNFA::NFA -> RegExp.RegExpNFA::NFANode`

`nfa.get_node(id)` gets the node whose @id is `id`.

#### mod_node

Type: `RegExp.RegExpNFA::NodeID -> (RegExp.RegExpNFA::NFANode -> RegExp.RegExpNFA::NFANode) -> RegExp.RegExpNFA::NFA -> RegExp.RegExpNFA::NFA`

`nfa.mod_node(id, f)` modifies the node whose @id is `id`.

#### new_class

Type: `RegExp.RegExpPattern::CharClass -> RegExp.RegExpNFA::NFA -> (RegExp.RegExpNFA::NFA, Std::I64)`

Stores a character class and returns where its four words begin.

##### Parameters

* `cls` - The class to store.
* `nfa` - The automaton to store it in.

#### new_node

Type: `RegExp.RegExpNFA::NFA -> (RegExp.RegExpNFA::NFA, RegExp.RegExpNFA::NodeID)`

Creates new node. Returns the new node id.

#### new_quant

Type: `Std::I64 -> Std::I64 -> RegExp.RegExpNFA::NFA -> (RegExp.RegExpNFA::NFA, RegExp.RegExpNFA::QuantID)`

Creates new quant. Returns the new quant id.

##### Parameters

* `least` - The fewest rounds the quantifier admits.
* `most` - The most rounds it admits.
* `nfa` - The automaton to add the quantifier to.

#### quant_next_round

Type: `RegExp.RegExpNFA::QuantID -> Std::I64 -> RegExp.RegExpNFA::NFA -> Std::I64`

The rounds a thread standing at a special quantifier's loop has counted once one more round
is counted, or `-1` when the quantifier admits no such round.

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

`nfa.set_frag_output(frag, out)` sets the output of the fragment to `out`.

#### set_node_label

Type: `RegExp.RegExpNFA::NodeID -> Std::String -> RegExp.RegExpNFA::NFA -> RegExp.RegExpNFA::NFA`

`nfa.set_node_label(id, label)` gives the node whose @id is `id` a label to display.

##### Parameters

* `id` - The node to label.
* `label` - The label to give it.
* `nfa` - The automaton the node belongs to.

### namespace RegExp.RegExpNFA::NFAFrag

#### compile_pattern

Type: `RegExp.RegExpPattern::Pattern -> RegExp.RegExpNFA::NFA -> (RegExp.RegExpNFA::NFA, RegExp.RegExpNFA::NFAFrag)`

`nfa.compile_pattern(pattern)` compiles a pattern to a fragment.

### namespace RegExp.RegExpNFA::NFANode

#### empty

Type: `RegExp.RegExpNFA::NFANode`

An empty node

### namespace RegExp.RegExpNFA::Replacement

#### calc_replacement

Type: `Std::String -> Std::Array RegExp.RegExpNFA::ReplaceFrag -> RegExp.RegExpNFA::Groups -> Std::String`

Calculates actual replacement string.

#### compile

Type: `Std::String -> Std::Array RegExp.RegExpNFA::ReplaceFrag`

Compiles a replacement string to fragments.

### namespace RegExp.RegExpNFA::Walk

#### make

Type: `RegExp.RegExpNFA::NFA -> RegExp.RegExpNFA::Walk`

A walk carrying no thread.

##### Parameters

* `nfa` - The automaton to walk.

## Types and aliases

### namespace RegExp.RegExpNFA

#### DFA

Defined as: `type DFA = box struct { ...fields... }`

The automaton walked over sets of threads, so that reading a byte costs one table lookup.

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

#### Group

Defined as: `type Group = (Std::I64, Std::I64)`

Type of a matched group.
The group is represented as two stream positions: `(begin, end)`.
`-1` means that the stream position is undefined.

#### Groups

Defined as: `type Groups = Std::Array RegExp.RegExpNFA::Group`

Type of the array of matched groups.

#### NFA

Defined as: `type NFA = unbox struct { ...fields... }`

NFA

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

##### field `labels`

Type: `Std::Array Std::String`

##### field `debug`

Type: `Std::Bool`

#### NFAFrag

Defined as: `type NFAFrag = unbox struct { ...fields... }`

NFA Fragment

NFA Fragment is a collection of nodes. It exports one input,
And a function to set the output.
Internally, the output of a fragment is a collection of outputs of one or more nodes.
Calling `set_output()` will change them all.

##### field `input`

Type: `RegExp.RegExpNFA::NodeID`

##### field `set_output`

Type: `RegExp.RegExpNFA::NodeID -> RegExp.RegExpNFA::NFA -> RegExp.RegExpNFA::NFA`

##### field `label`

Type: `Std::String`

of this fragment

#### NFANode

Defined as: `type NFANode = unbox struct { ...fields... }`

NFA node

NFA node has one input (ID of this node) and three outputs
(one output guarded by the action, and two outputs with no guard).

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

Actions that has to be performed before the state makes a transition to `node.@out_on_action`.

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

ID of NFA node. -1 is invalid value.

##### field `val`

Type: `Std::I64`

#### QuantID

Defined as: `type QuantID = Std::I64`

Type of special quantifiers ID.
Special quantifiers are quantifieres other than `X?` `X*` `X+`.
In other words, they are `X{n}` `X{n,}` `X{n,m}` etc.
Special quantifiers are hard to implement only using node transition,
so its iteration count are stored in the NFA state, and managed by `sa_quant_*` actions.

#### ReplaceFrag

Defined as: `type ReplaceFrag = unbox union { ...variants... }`

A replacement fragment

##### variant `rep_literal`

Type: `Std::U8`

##### variant `rep_group`

Type: `Std::I64`

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
positions, and the rounds counted by the threads that took it, since two threads standing at
one node having counted differently do not have the same future.

##### field `counts_at_step`

Type: `Std::Array (Std::Array Std::I64)`

##### field `step`

Type: `Std::I64`

## Traits and aliases

## Trait implementations

### impl `RegExp.RegExpNFA::NFA : Std::ToString`

### impl `RegExp.RegExpNFA::NFANode : Std::ToString`

### impl `RegExp.RegExpNFA::NFANodeAction : Std::ToString`

### impl `RegExp.RegExpNFA::NodeID : Std::Eq`

### impl `RegExp.RegExpNFA::NodeID : Std::ToString`