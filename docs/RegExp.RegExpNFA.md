# RegExp.RegExpNFA

Defined in regexp@1.1.3

NFA (Nondeterministic Finite Automaton). This is internal module of `RegExp`.

For details, see web pages below.
- https://swtch.com/~rsc/regexp/regexp1.html
- https://zenn.dev/canalun/articles/regexp_and_automaton

## Values

### namespace RegExp.RegExpNFA::NFA

#### compile

Type: `RegExp.RegExpPattern::Pattern -> RegExp.RegExpNFA::NFA`

`NFA::compile(pattern)` compiles a pattern to NFA.

#### debug

Type: `Std::String -> RegExp.RegExpNFA::NFA -> ()`

#### empty

Type: `RegExp.RegExpNFA::NFA`

An empty NFA.

#### execute

Type: `Std::String -> RegExp.RegExpNFA::NFA -> RegExp.RegExpNFA::NFAExecutor`

`nfa.execute(target)` executes matching.

#### get_node

Type: `RegExp.RegExpNFA::NodeID -> RegExp.RegExpNFA::NFA -> RegExp.RegExpNFA::NFANode`

`nfa.get_node(id)` gets the node whose @id is `id`.

#### mod_node

Type: `RegExp.RegExpNFA::NodeID -> (RegExp.RegExpNFA::NFANode -> RegExp.RegExpNFA::NFANode) -> RegExp.RegExpNFA::NFA -> RegExp.RegExpNFA::NFA`

`nfa.mod_node(id, f)` modifies the node whose @id is `id`.

#### new_node

Type: `RegExp.RegExpNFA::NFA -> (RegExp.RegExpNFA::NFA, RegExp.RegExpNFA::NodeID)`

Creates new node. Returns the new node id.

#### new_quant

Type: `RegExp.RegExpNFA::NFA -> (RegExp.RegExpNFA::NFA, RegExp.RegExpNFA::QuantID)`

Creates new quant. Returns the new quant id.

#### set_frag_output

Type: `RegExp.RegExpNFA::NFAFrag -> RegExp.RegExpNFA::NodeID -> RegExp.RegExpNFA::NFA -> RegExp.RegExpNFA::NFA`

`nfa.set_frag_output(frag, out)` sets the output of the fragment to `out`.

### namespace RegExp.RegExpNFA::NFAExecutor

#### execute

Type: `RegExp.RegExpNFA::NFAExecutor -> RegExp.RegExpNFA::NFAExecutor`

Make transitions until end of stream is reached, or the state set becomes empty.

#### make

Type: `RegExp.SimpleParser::Stream::Stream -> RegExp.RegExpNFA::NFA -> RegExp.RegExpNFA::NFAExecutor`

Creates an executor.

### namespace RegExp.RegExpNFA::NFAFrag

#### compile_pattern

Type: `RegExp.RegExpPattern::Pattern -> RegExp.RegExpNFA::NFA -> (RegExp.RegExpNFA::NFA, RegExp.RegExpNFA::NFAFrag)`

`nfa.compile_pattern(pattern)` compiles a pattern to a fragment.

### namespace RegExp.RegExpNFA::NFANode

#### empty

Type: `RegExp.RegExpNFA::NFANode`

An empty node

### namespace RegExp.RegExpNFA::NFAState

#### collect_all_non_overlapping

Type: `Std::Array RegExp.RegExpNFA::NFAState -> Std::Array RegExp.RegExpNFA::NFAState`

Collects all non overlapping matches.

#### collect_first_match

Type: `Std::Array RegExp.RegExpNFA::NFAState -> Std::Option RegExp.RegExpNFA::NFAState`

Collects first match.

#### get_group

Type: `Std::I64 -> RegExp.RegExpNFA::NFAState -> RegExp.RegExpNFA::Group`

Gets specified group. If group index is out of range, returns (-1, -1).

#### get_quant

Type: `RegExp.RegExpNFA::QuantID -> RegExp.RegExpNFA::NFAState -> Std::I64`

get quant loop count

#### group_length

Type: `Std::I64 -> RegExp.RegExpNFA::NFAState -> Std::I64`

Gets the length of specified group.

#### make

Type: `RegExp.RegExpNFA::NodeID -> RegExp.RegExpNFA::Groups -> RegExp.RegExpNFA::NFAState`

Creates a NFA state.

#### mod_group

Type: `Std::I64 -> (RegExp.RegExpNFA::Group -> RegExp.RegExpNFA::Group) -> RegExp.RegExpNFA::NFAState -> RegExp.RegExpNFA::NFAState`

Modify specified group.

#### overlaps

Type: `RegExp.RegExpNFA::NFAState -> RegExp.RegExpNFA::NFAState -> Std::Bool`

#### set_quant

Type: `RegExp.RegExpNFA::QuantID -> Std::I64 -> RegExp.RegExpNFA::NFAState -> RegExp.RegExpNFA::NFAState`

set quant loop count

#### transition

Type: `RegExp.RegExpNFA::NodeID -> RegExp.RegExpNFA::NFAState -> RegExp.RegExpNFA::NFAState`

Makes transition to next node.

### namespace RegExp.RegExpNFA::NFAStateSet

#### add

Type: `RegExp.RegExpNFA::NFAState -> RegExp.RegExpNFA::NFAStateSet -> RegExp.RegExpNFA::NFAStateSet`

Adds a state to the state set.

#### contains

Type: `RegExp.RegExpNFA::NFAState -> RegExp.RegExpNFA::NFAStateSet -> Std::Bool`

Checks whether the state set contains a state.

#### empty

Type: `Std::I64 -> RegExp.RegExpNFA::NFAStateSet`

`NFAStateSet::empty(node_count)` creates an empty state set.
`node_count` is number of NFA nodes.

#### is_empty

Type: `RegExp.RegExpNFA::NFAStateSet -> Std::Bool`

Checks whether the state set is empty.

#### to_iter

Type: `RegExp.RegExpNFA::NFAStateSet -> Std::Iterator::DynIterator RegExp.RegExpNFA::NFAState`

Returns an iterator of the states.

### namespace RegExp.RegExpNFA::Replacement

#### calc_replacement

Type: `Std::String -> Std::Array RegExp.RegExpNFA::ReplaceFrag -> RegExp.RegExpNFA::NFAState -> Std::String`

Calculates actual replacement string.

#### compile

Type: `Std::String -> Std::Array RegExp.RegExpNFA::ReplaceFrag`

Compiles a replacement string to fragments.

## Types and aliases

### namespace RegExp.RegExpNFA

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

##### field `quant_count`

Type: `Std::I64`

##### field `debug`

Type: `Std::Bool`

#### NFAExecutor

Defined as: `type NFAExecutor = unbox struct { ...fields... }`

The NFA executor

##### field `stream`

Type: `RegExp.SimpleParser::Stream::Stream`

##### field `nfa`

Type: `RegExp.RegExpNFA::NFA`

##### field `empty_state_set`

Type: `RegExp.RegExpNFA::NFAStateSet`

##### field `state_set`

Type: `RegExp.RegExpNFA::NFAStateSet`

##### field `stack`

Type: `Std::Iterator::DynIterator RegExp.RegExpNFA::NFAState`

##### field `accepted_states`

Type: `RegExp.RegExpNFA::NFAStateSet`

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

##### field `label`

Type: `Std::String`

#### NFANodeAction

Defined as: `type NFANodeAction = unbox union { ...variants... }`

Actions that has to be performed before the state makes a transition to `node.@out_on_action`.

##### variant `sa_none`

Type: `()`

##### variant `sa_char_match`

Type: `RegExp.RegExpPattern::CharClass`

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

##### field `id`

Type: `RegExp.RegExpNFA::NodeID`

##### field `groups`

Type: `RegExp.RegExpNFA::Groups`

##### field `quants`

Type: `Std::Array Std::I64`

#### NFAStateSet

Defined as: `type NFAStateSet = unbox struct { ...fields... }`

NFA state set, used for NFA state transition

##### field `array`

Type: `Std::Array RegExp.RegExpNFA::NFAState`

##### field `map`

Type: `HashMap::HashMap RegExp.RegExpNFA::NFAState Std::Bool`

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

## Traits and aliases

## Trait implementations

### impl `RegExp.RegExpNFA::NFA : Std::ToString`

### impl `RegExp.RegExpNFA::NFANode : Std::ToString`

### impl `RegExp.RegExpNFA::NFANodeAction : Std::ToString`

### impl `RegExp.RegExpNFA::NFAState : Hash::Hash`

### impl `RegExp.RegExpNFA::NFAState : Std::Eq`

### impl `RegExp.RegExpNFA::NFAState : Std::ToString`

### impl `RegExp.RegExpNFA::NodeID : Hash::Hash`

### impl `RegExp.RegExpNFA::NodeID : Std::Eq`

### impl `RegExp.RegExpNFA::NodeID : Std::ToString`