# `module RegExp.RegExpNFA`

NFA (Nondeterministic Finite Automaton). This is internal module of `RegExp`.

For details, see web pages below.
- https://swtch.com/~rsc/regexp/regexp1.html
- https://zenn.dev/canalun/articles/regexp_and_automaton

# Types and aliases

## `namespace RegExp.RegExpNFA`

### `type Group = (Std::I64, Std::I64)`

Type of a matched group.
The group is represented as two stream positions: `(begin, end)`.
`-1` means that the stream position is undefined.

### `type Groups = Std::Array RegExp.RegExpNFA::Group`

Type of the array of matched groups.

### `type NFA = unbox struct { ...fields... }`

NFA

#### field `nodes : Std::Array RegExp.RegExpNFA::NFANode`

#### field `initial_node : RegExp.RegExpNFA::NodeID`

#### field `accepting_node : RegExp.RegExpNFA::NodeID`

#### field `group_count : Std::I64`

#### field `quant_count : Std::I64`

#### field `debug : Std::Bool`

### `type NFAExecutor = unbox struct { ...fields... }`

The NFA executor

#### field `stream : RegExp.SimpleParser::Stream::Stream`

#### field `nfa : RegExp.RegExpNFA::NFA`

#### field `empty_state_set : RegExp.RegExpNFA::NFAStateSet`

#### field `state_set : RegExp.RegExpNFA::NFAStateSet`

#### field `stack : Std::Iterator::DynIterator RegExp.RegExpNFA::NFAState`

#### field `accepted_states : RegExp.RegExpNFA::NFAStateSet`

### `type NFAFrag = unbox struct { ...fields... }`

NFA Fragment

NFA Fragment is a collection of nodes. It exports one input,
And a function to set the output.
Internally, the output of a fragment is a collection of outputs of one or more nodes.
Calling `set_output()` will change them all.

#### field `input : RegExp.RegExpNFA::NodeID`

#### field `set_output : RegExp.RegExpNFA::NodeID -> RegExp.RegExpNFA::NFA -> RegExp.RegExpNFA::NFA`

#### field `label : Std::String`

### `type NFANode = unbox struct { ...fields... }`

NFA node

NFA node has one input (ID of this node) and three outputs
(one output guarded by the action, and two outputs with no guard).

#### field `id : RegExp.RegExpNFA::NodeID`

#### field `action : RegExp.RegExpNFA::NFANodeAction`

#### field `output_on_action : RegExp.RegExpNFA::NodeID`

#### field `output : RegExp.RegExpNFA::NodeID`

#### field `output2 : RegExp.RegExpNFA::NodeID`

#### field `label : Std::String`

### `type NFANodeAction = unbox union { ...variants... }`

Actions that has to be performed before the state makes a transition to `node.@out_on_action`.

#### variant `sa_none : ()`

#### variant `sa_char_match : RegExp.RegExpPattern::CharClass`

#### variant `sa_assert : RegExp.RegExpPattern::PAssertion`

#### variant `sa_group_begin : Std::I64`

#### variant `sa_group_end : Std::I64`

#### variant `sa_quant_begin : RegExp.RegExpNFA::QuantID`

#### variant `sa_quant_loop : RegExp.RegExpNFA::QuantID`

#### variant `sa_quant_end : (RegExp.RegExpNFA::QuantID, Std::I64, Std::I64)`

### `type NFAState = unbox struct { ...fields... }`

NFA state

#### field `id : RegExp.RegExpNFA::NodeID`

#### field `groups : RegExp.RegExpNFA::Groups`

#### field `quants : Std::Array Std::I64`

### `type NFAStateSet = unbox struct { ...fields... }`

NFA state set, used for NFA state transition

#### field `array : Std::Array RegExp.RegExpNFA::NFAState`

#### field `map : HashMap::HashMap RegExp.RegExpNFA::NFAState Std::Bool`

### `type NodeID = unbox struct { ...fields... }`

ID of NFA node. -1 is invalid value.

#### field `val : Std::I64`

### `type QuantID = Std::I64`

Type of special quantifiers ID.
Special quantifiers are quantifieres other than `X?` `X*` `X+`.
In other words, they are `X{n}` `X{n,}` `X{n,m}` etc.
Special quantifiers are hard to implement only using node transition,
so its iteration count are stored in the NFA state, and managed by `sa_quant_*` actions.

### `type ReplaceFrag = unbox union { ...variants... }`

A replacement fragment

#### variant `rep_literal : Std::U8`

#### variant `rep_group : Std::I64`

# Traits and aliases

# Trait implementations

### `impl RegExp.RegExpNFA::NFA : Std::ToString`

### `impl RegExp.RegExpNFA::NFANode : Std::ToString`

### `impl RegExp.RegExpNFA::NFANodeAction : Std::ToString`

### `impl RegExp.RegExpNFA::NFAState : Hash::Hash`

### `impl RegExp.RegExpNFA::NFAState : Std::Eq`

### `impl RegExp.RegExpNFA::NFAState : Std::ToString`

### `impl RegExp.RegExpNFA::NodeID : Hash::Hash`

### `impl RegExp.RegExpNFA::NodeID : Std::Eq`

### `impl RegExp.RegExpNFA::NodeID : Std::ToString`

# Values

## `namespace RegExp.RegExpNFA::NFA`

### `compile : RegExp.RegExpPattern::Pattern -> RegExp.RegExpNFA::NFA`

`NFA::compile(pattern)` compiles a pattern to NFA.

### `debug : Std::String -> RegExp.RegExpNFA::NFA -> ()`

### `empty : RegExp.RegExpNFA::NFA`

An empty NFA.

### `execute : Std::String -> RegExp.RegExpNFA::NFA -> RegExp.RegExpNFA::NFAExecutor`

`nfa.execute(target)` executes matching.

### `get_node : RegExp.RegExpNFA::NodeID -> RegExp.RegExpNFA::NFA -> RegExp.RegExpNFA::NFANode`

`nfa.get_node(id)` gets the node whose @id is `id`.

### `mod_node : RegExp.RegExpNFA::NodeID -> (RegExp.RegExpNFA::NFANode -> RegExp.RegExpNFA::NFANode) -> RegExp.RegExpNFA::NFA -> RegExp.RegExpNFA::NFA`

`nfa.mod_node(id, f)` modifies the node whose @id is `id`.

### `new_node : RegExp.RegExpNFA::NFA -> (RegExp.RegExpNFA::NFA, RegExp.RegExpNFA::NodeID)`

Creates new node. Returns the new node id.

### `new_quant : RegExp.RegExpNFA::NFA -> (RegExp.RegExpNFA::NFA, RegExp.RegExpNFA::QuantID)`

Creates new quant. Returns the new quant id.

### `set_frag_output : RegExp.RegExpNFA::NFAFrag -> RegExp.RegExpNFA::NodeID -> RegExp.RegExpNFA::NFA -> RegExp.RegExpNFA::NFA`

`nfa.set_frag_output(frag, out)` sets the output of the fragment to `out`.

## `namespace RegExp.RegExpNFA::NFAExecutor`

### `_add_to_state_set_and_stack : RegExp.RegExpNFA::NFAState -> RegExp.RegExpNFA::NFAExecutor -> RegExp.RegExpNFA::NFAExecutor`

Adds a state to the state set if not added yet, then pushes the state to the stack.

### `_check_for_accepting_state : RegExp.RegExpNFA::NFAExecutor -> RegExp.RegExpNFA::NFAExecutor`

Checks for accepting state

### `_pop_stack : RegExp.RegExpNFA::NFAExecutor -> Std::Option (RegExp.RegExpNFA::NFAState, RegExp.RegExpNFA::NFAExecutor)`

### `_transition_on_action : RegExp.RegExpNFA::NFANode -> RegExp.RegExpNFA::NFAState -> RegExp.RegExpNFA::NFAExecutor -> RegExp.RegExpNFA::NFAExecutor`

Applies transitions on an action with empty string.

### `_transition_with_char : Std::U8 -> RegExp.RegExpNFA::NFAExecutor -> RegExp.RegExpNFA::NFAExecutor`

Applies transitions with a string of one character.

### `_transition_with_empty_string : RegExp.RegExpNFA::NFAExecutor -> RegExp.RegExpNFA::NFAExecutor`

Applies transitions with an empty string.

### `execute : RegExp.RegExpNFA::NFAExecutor -> RegExp.RegExpNFA::NFAExecutor`

Make transitions until end of stream is reached, or the state set becomes empty.

### `make : RegExp.SimpleParser::Stream::Stream -> RegExp.RegExpNFA::NFA -> RegExp.RegExpNFA::NFAExecutor`

Creates an executor.

## `namespace RegExp.RegExpNFA::NFAFrag`

### `_compile_action : RegExp.RegExpNFA::NFANodeAction -> RegExp.RegExpNFA::NFA -> (RegExp.RegExpNFA::NFA, RegExp.RegExpNFA::NFAFrag)`

Compiles an action to a fragment.

### `_compile_either : RegExp.RegExpNFA::NFAFrag -> RegExp.RegExpNFA::NFAFrag -> RegExp.RegExpNFA::NFA -> (RegExp.RegExpNFA::NFA, RegExp.RegExpNFA::NFAFrag)`

Compiles an alternative of two fragments (`e1|e2`) to a fragment.

### `_compile_null_sequence : RegExp.RegExpNFA::NFA -> (RegExp.RegExpNFA::NFA, RegExp.RegExpNFA::NFAFrag)`

Compiles null sequence (``) to a fragment.

### `_compile_one_or_more : RegExp.RegExpNFA::NFAFrag -> RegExp.RegExpNFA::NFA -> (RegExp.RegExpNFA::NFA, RegExp.RegExpNFA::NFAFrag)`

Compiles one or more occurrence (`e+`) to a fragment.

### `_compile_seq : RegExp.RegExpNFA::NFAFrag -> RegExp.RegExpNFA::NFAFrag -> RegExp.RegExpNFA::NFA -> (RegExp.RegExpNFA::NFA, RegExp.RegExpNFA::NFAFrag)`

Compiles a sequence of two fragments (`e1 e2`) to a fragment.

### `_compile_special_quant : RegExp.RegExpNFA::NFAFrag -> Std::I64 -> Std::I64 -> RegExp.RegExpNFA::NFA -> (RegExp.RegExpNFA::NFA, RegExp.RegExpNFA::NFAFrag)`

Compiles special quant (`e{min,max}`) to a fragment.

### `_compile_zero_or_more : RegExp.RegExpNFA::NFAFrag -> RegExp.RegExpNFA::NFA -> (RegExp.RegExpNFA::NFA, RegExp.RegExpNFA::NFAFrag)`

Compiles zero or more occurrence (`e*`) to a fragment.

### `_compile_zero_or_once : RegExp.RegExpNFA::NFAFrag -> RegExp.RegExpNFA::NFA -> (RegExp.RegExpNFA::NFA, RegExp.RegExpNFA::NFAFrag)`

Compiles zero or once occurrence (`e?`) to a fragment.

### `compile_pattern : RegExp.RegExpPattern::Pattern -> RegExp.RegExpNFA::NFA -> (RegExp.RegExpNFA::NFA, RegExp.RegExpNFA::NFAFrag)`

`nfa.compile_pattern(pattern)` compiles a pattern to a fragment.

## `namespace RegExp.RegExpNFA::NFANode`

### `_INVALID_NODE_ID : RegExp.RegExpNFA::NodeID`

An invalid node ID.

### `empty : RegExp.RegExpNFA::NFANode`

An empty node

## `namespace RegExp.RegExpNFA::NFAState`

### `_sort_by_group0_begin_and_length : Std::Array RegExp.RegExpNFA::NFAState -> Std::Array RegExp.RegExpNFA::NFAState`

Sorts states by beginning of group 0 (ascending order)
and length of group 0 (descending order).

### `collect_all_non_overlapping : Std::Array RegExp.RegExpNFA::NFAState -> Std::Array RegExp.RegExpNFA::NFAState`

Collects all non overlapping matches.

### `collect_first_match : Std::Array RegExp.RegExpNFA::NFAState -> Std::Option RegExp.RegExpNFA::NFAState`

Collects first match.

### `get_group : Std::I64 -> RegExp.RegExpNFA::NFAState -> RegExp.RegExpNFA::Group`

Gets specified group. If group index is out of range, returns (-1, -1).

### `get_quant : RegExp.RegExpNFA::QuantID -> RegExp.RegExpNFA::NFAState -> Std::I64`

get quant loop count

### `group_length : Std::I64 -> RegExp.RegExpNFA::NFAState -> Std::I64`

Gets the length of specified group.

### `make : RegExp.RegExpNFA::NodeID -> RegExp.RegExpNFA::Groups -> RegExp.RegExpNFA::NFAState`

Creates a NFA state.

### `mod_group : Std::I64 -> (RegExp.RegExpNFA::Group -> RegExp.RegExpNFA::Group) -> RegExp.RegExpNFA::NFAState -> RegExp.RegExpNFA::NFAState`

Modify specified group.

### `overlaps : RegExp.RegExpNFA::NFAState -> RegExp.RegExpNFA::NFAState -> Std::Bool`

### `set_quant : RegExp.RegExpNFA::QuantID -> Std::I64 -> RegExp.RegExpNFA::NFAState -> RegExp.RegExpNFA::NFAState`

set quant loop count

### `transition : RegExp.RegExpNFA::NodeID -> RegExp.RegExpNFA::NFAState -> RegExp.RegExpNFA::NFAState`

Makes transition to next node.

## `namespace RegExp.RegExpNFA::NFAStateSet`

### `add : RegExp.RegExpNFA::NFAState -> RegExp.RegExpNFA::NFAStateSet -> RegExp.RegExpNFA::NFAStateSet`

Adds a state to the state set.

### `contains : RegExp.RegExpNFA::NFAState -> RegExp.RegExpNFA::NFAStateSet -> Std::Bool`

Checks whether the state set contains a state.

### `empty : Std::I64 -> RegExp.RegExpNFA::NFAStateSet`

`NFAStateSet::empty(node_count)` creates an empty state set.
`node_count` is number of NFA nodes.

### `is_empty : RegExp.RegExpNFA::NFAStateSet -> Std::Bool`

Checks whether the state set is empty.

### `to_iter : RegExp.RegExpNFA::NFAStateSet -> Std::Iterator::DynIterator RegExp.RegExpNFA::NFAState`

Returns an iterator of the states.

## `namespace RegExp.RegExpNFA::Replacement`

### `_parse_dollar : RegExp.SimpleParser::Parser RegExp.RegExpNFA::ReplaceFrag`

### `_parse_literal : RegExp.SimpleParser::Parser RegExp.RegExpNFA::ReplaceFrag`

### `_parse_replacement_seq : RegExp.SimpleParser::Parser (Std::Array RegExp.RegExpNFA::ReplaceFrag)`

### `calc_replacement : Std::String -> Std::Array RegExp.RegExpNFA::ReplaceFrag -> RegExp.RegExpNFA::NFAState -> Std::String`

Calculates actual replacement string.

### `compile : Std::String -> Std::Array RegExp.RegExpNFA::ReplaceFrag`

Compiles a replacement string to fragments.