# RegExp.RegExpNFA

Defined in regexp@1.1.5

The automaton a pattern is compiled to, and the compiler that builds it. This is an internal
module of `RegExp`.

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

Compiles a pattern to an automaton. The groups of the pattern are numbered first, so that a
thread can write down what it captures by number, and an accepting node is put after the
fragment the pattern compiles to.

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

#### Group

Defined as: `type Group = (Std::I64, Std::I64)`

Where a group was matched: the two stream positions `(begin, end)`. `-1` stands for a position
that was never written.

#### Groups

Defined as: `type Groups = Std::Array RegExp.RegExpNFA::Group`

The groups a match captured, the whole match first. Group `n` of the pattern stands at index `n`.

#### NFA

Defined as: `type NFA = unbox struct { ...fields... }`

The automaton a pattern compiles to.

A node is a place a thread may stand at, and the transitions out of it say where the thread may
go next. A node may offer a thread more than one way on, so a search follows several threads at
once.

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

#### QuantID

Defined as: `type QuantID = Std::I64`

Which special quantifier a node belongs to. `X{n}`, `X{n,}` and `X{n,m}` are the special
quantifiers, and a thread counts the rounds it has taken through each of them, since how many it
has taken decides where it may go and the node it stands at does not say. The `sa_quant_*`
actions are where the counting happens.

## Traits and aliases

## Trait implementations

### impl `RegExp.RegExpNFA::NFA : Std::ToString`

### impl `RegExp.RegExpNFA::NFANode : Std::ToString`

### impl `RegExp.RegExpNFA::NFANodeAction : Std::ToString`

### impl `RegExp.RegExpNFA::NodeID : Std::Eq`

### impl `RegExp.RegExpNFA::NodeID : Std::ToString`