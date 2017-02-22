Directly state
==============

Provides a Redux interface to the imperative [Directly API](../../api/directly).

## Action Creators
These dispatch simple Actions without calling the Directly API:

* `initialize( config )`  
  Initializes the library with the given configuration options. See [the `api/directly`
  README](../../api/directly) for config options.
* `askQuestion( questionText, name, email )`
* `maximize()`
* `minimize()`
* `openAskForm()`

## Middleware
The middleware watches for Directly action types and engages the Directly API correspondingly.
