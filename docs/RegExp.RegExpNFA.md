# RegExp.RegExpNFA

Defined in regexp@1.1.3

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

#### search

Type: `Std::Array Std::U8 -> Std::I64 -> RegExp.RegExpNFA::NFA -> Std::Option RegExp.RegExpNFA::Groups`

Runs the automaton over the bytes and reports the leftmost match beginning at or after a
position, taking the longest of those that begin at the same place.

A thread is started at every position until a match is found; after that a later start could
not be the leftmost one, so none is added and the threads still running are followed only to
see how far the match reaches.

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

### namespace RegExp.RegExpNFA::NFAState

#### captured

Type: `RegExp.RegExpNFA::NFAState -> RegExp.RegExpNFA::Groups`

The groups a state captured, the whole match first.

##### Parameters

* `state` - The state to read.

#### close_group

Type: `Std::I64 -> Std::I64 -> RegExp.RegExpNFA::NFAState -> RegExp.RegExpNFA::NFAState`

Records where a group ended.

##### Parameters

* `group_idx` - The group, the whole match counted as group zero.
* `at` - Where it ended.
* `state` - The state to record it in.

#### get_quant

Type: `RegExp.RegExpNFA::QuantID -> RegExp.RegExpNFA::NFAState -> Std::I64`

get quant loop count

#### make

Type: `RegExp.RegExpNFA::NodeID -> Std::I64 -> RegExp.RegExpNFA::NFAState`

Creates a NFA state that has captured nothing yet.

##### Parameters

* `id` - The node the state stands at.
* `group_count` - How many groups the pattern has, the whole match counted as one.

#### open_group

Type: `Std::I64 -> Std::I64 -> RegExp.RegExpNFA::NFAState -> RegExp.RegExpNFA::NFAState`

Records where a group began.

##### Parameters

* `group_idx` - The group, the whole match counted as group zero.
* `at` - Where it began.
* `state` - The state to record it in.

#### set_quant

Type: `RegExp.RegExpNFA::QuantID -> Std::I64 -> RegExp.RegExpNFA::NFAState -> RegExp.RegExpNFA::NFAState`

set quant loop count

#### transition

Type: `RegExp.RegExpNFA::NodeID -> RegExp.RegExpNFA::NFAState -> RegExp.RegExpNFA::NFAState`

Makes transition to next node.

### namespace RegExp.RegExpNFA::Replacement

#### calc_replacement

Type: `Std::String -> Std::Array RegExp.RegExpNFA::ReplaceFrag -> RegExp.RegExpNFA::Groups -> Std::String`

Calculates actual replacement string.

#### compile

Type: `Std::String -> Std::Array RegExp.RegExpNFA::ReplaceFrag`

Compiles a replacement string to fragments.

### namespace RegExp.RegExpNFA::Seen

#### make

Type: `Std::I64 -> Std::Bool -> RegExp.RegExpNFA::Seen`

A record in which no node has been reached.

##### Parameters

* `node_count` - How many nodes the automaton has.
* `counted` - Whether the pattern has special quantifiers.

#### take

Type: `Std::Bool -> RegExp.RegExpNFA::NFAState -> RegExp.RegExpNFA::Seen -> (Std::Bool, RegExp.RegExpNFA::Seen)`

Records a state as reached, and reports whether it had not been reached before.

##### Parameters

* `counted` - Whether the pattern has special quantifiers.
* `state` - The state to record.
* `seen` - The record to add it to.

## Types and aliases

### namespace RegExp.RegExpNFA

#### Gathered

Defined as: `type Gathered = (Std::Array RegExp.RegExpNFA::NFAState, RegExp.RegExpNFA::Seen, Std::Array RegExp.RegExpNFA::NFAState)`

The threads gathered at a position: those to read the next byte with, the record of the nodes
they hold, and the ones whose outgoing empty-string transitions are still to be followed.

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

#### NFAState

Defined as: `type NFAState = unbox struct { ...fields... }`

NFA state

The bounds of the whole match are held as numbers rather than as the first entry of `groups`,
because every thread writes its beginning as soon as it starts: were they in the array, starting
a thread would copy the array once per position read.

##### field `id`

Type: `RegExp.RegExpNFA::NodeID`

##### field `begin`

Type: `Std::I64`

##### field `end`

Type: `Std::I64`

##### field `groups`

Type: `RegExp.RegExpNFA::Groups`

##### field `quants`

Type: `Std::Array Std::I64`

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

#### Search

Defined as: `type Search = unbox struct { ...fields... }`

What one search carries throughout: the automaton, the bytes it is reading, and whether the
pattern has special quantifiers.

##### field `nfa`

Type: `RegExp.RegExpNFA::NFA`

##### field `bytes`

Type: `Std::Array Std::U8`

##### field `counted`

Type: `Std::Bool`

#### Seen

Defined as: `type Seen = unbox struct { ...fields... }`

The nodes already reached at the position being read.

A node is given to the first thread that reaches it and to no other. Threads are handed over in
the order of the positions they started at, so the thread that keeps a node is the one that
started earliest, which is what makes the match reported the leftmost one. Two threads standing
at the same node have the same future, so dropping the later one loses no match.

`at_step` holds, for each node, the step at which it was last reached, so that nothing has to be
cleared between positions. `counters` holds, for each node, the counters of the special
quantifiers already reached at that step: two threads at one node whose counters differ do *not*
have the same future, so they have to be told apart. A pattern without special quantifiers
carries no such state, and then `counters` stays empty and is never read.

##### field `at_step`

Type: `Std::Array Std::I64`

##### field `counters`

Type: `Std::Array (Std::Array (Std::Array Std::I64))`

##### field `step`

Type: `Std::I64`

## Traits and aliases

## Trait implementations

### impl `RegExp.RegExpNFA::NFA : Std::ToString`

### impl `RegExp.RegExpNFA::NFANode : Std::ToString`

### impl `RegExp.RegExpNFA::NFANodeAction : Std::ToString`

### impl `RegExp.RegExpNFA::NFAState : Std::ToString`

### impl `RegExp.RegExpNFA::NodeID : Std::Eq`

### impl `RegExp.RegExpNFA::NodeID : Std::ToString`