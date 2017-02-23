Directly
========

[Directly](https://www.directly.com/) is an on-demand customer support tool that we're
using to provide live chat support to unpaid customers. This module wraps the Directly
library and API to provide a modular interface to its global functions.

## Docs
- [Directly's website](https://www.directly.com/)
- [Directly integration and API documentation](https://cloudup.com/cySVQ9R_O6S)

## Usage

**Unless you have a very good reason, you should interact with Directly through [its
Redux interface](../../state/help/directly).**

Not all of the Directly API has been wrapped with this library. Refer to the [API
documentation](https://cloudup.com/cySVQ9R_O6S) to see other available methods, which
should be wrapped here rather than called using the global `DirectlyRTM()` function.

The following functions are provided:

#### `initialize( config )`

*This must be called before any other functions have effect.*

Configures Directly and loads all its third-party assets (about 200KB at the time of
writing). If the user has recently interacted with the Directly widget, the widget
will open up on initialization (an unavoidable part of the library's mount).

Configuration options can only be set once, so any tags/labels/etc you add will apply
to all Directly questions the user asks until the page reloads. This also means that
after the first call to `initialize` the function becomes a no-op.

`config` is an Object with these optional keys:
- `displayAskQuestion`: Boolean. Whether to display the ask form and widget by default or not. Default: `false`
- `questionCategory`: String. Category that will be assigned to the question asked.
- `customTags`: Array of strings. Tags that will be assigned to the question asked.
- `metadata`: Object. Key-Value metadata that will be assigned to the question asked.
- `userName`: String. The name that will be used to ask the question. Also, if present, the input field to enter user name won't be displayed.
- `userEmail`: String. The email address of the user who is asking the question. Also, if present, the input field to enter user email won't be displayed.
- `labels`: Object. The texts defined here will override the default text in the ask widget, the ask button and the header. Valid keys are `askBubble` and `askButton`.


Example:

```
import { initialize as initializeDirectly } from 'lib/directly';

const directlyConfig = {
	displayAskQuestion: true,
	questionCategory: 'bananaStand',
	customTags: [ 'ann', 'her?' ],
	metadata: {
		favoriteSong: 'The Final Countdown',
		preferredTransport: 'Segway',
	},
	userName: 'GOB Bluth',
	userEmail: 'gob@bluthcompany.com',
	labels: {
		askBubble: 'Ask\nour specialists',
		askButton: 'Submit your question',
	},
};

initializeDirectly( directlyConfig );
```

#### `askQuestion( questionText, name, email )`

Asks a question with the given params and opens the "Alerting experts" view. All parameters are required strings.

Example:

```
import { askQuestion as askDirectlyQuestion } from 'lib/directly';

askDirectlyQuestion(
	'What have we always said is the most important thing?',
	'Michael Bluth',
	'michael@bluthcompany.com'
);
```

## A note on the library integration

For a variety of reasons we aren't able to use Directly's out-of-the-box integration
code, which looks like pretty standard async script load but has some inherent quirks.
Instead we've hard-coded their script into `vendor.js` (with some annotated modifications)
and you can execute the exported function to configure and initialize the Directly RTM widget.

In most cases `vendor.js` shouldn't be used and those wishing to interact with Directly
should stick with the API documented above.
