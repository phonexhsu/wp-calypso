/**
 * Internal dependencies
 */
import * as directly from 'lib/directly';
import {
	DIRECTLY_ASK_QUESTION,
	DIRECTLY_INITIALIZE,
	DIRECTLY_MAXIMIZE,
	DIRECTLY_MINIMIZE,
	DIRECTLY_OPEN_ASK_FORM,
} from 'state/action-types';

function askQuestion( dispatch, { questionText, name, email } ) {
	directly.askQuestion( questionText, name, email );
}
function initialize( dispatch, { config } ) {
	directly.initialize( config );
}
function maximize() {
	directly.maximize();
}
function minimize() {
	directly.minimize();
}
function openAskForm() {
	directly.openAskForm();
}

/**
 * Action Handlers
 */

// Initialized this way for performance reasons
export const handlers = Object.create( null );
handlers[ DIRECTLY_ASK_QUESTION ] = askQuestion;
handlers[ DIRECTLY_INITIALIZE ] = initialize;
handlers[ DIRECTLY_MAXIMIZE ] = maximize;
handlers[ DIRECTLY_MINIMIZE ] = minimize;
handlers[ DIRECTLY_OPEN_ASK_FORM ] = openAskForm;

export default ( { dispatch } ) => next => action => {
	const handler = handlers[ action.type ];
	if ( 'function' === typeof handler ) {
		handler( dispatch, action );
	}

	return next( action );
};
