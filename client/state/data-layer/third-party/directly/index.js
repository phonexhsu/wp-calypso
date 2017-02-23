/**
 * Internal dependencies
 */
import {
	DIRECTLY_ASK_QUESTION,
	DIRECTLY_INITIALIZE,
	DIRECTLY_MAXIMIZE,
	DIRECTLY_MINIMIZE,
	DIRECTLY_OPEN_ASK_FORM,
} from 'state/action-types';
import * as directly from 'lib/directly';

export function askQuestion( store, action, next ) {
	directly.askQuestion( action.questionText, action.name, action.email );
	next( action );
}

export function initialize( store, action, next ) {
	directly.initialize( action.config );
	next( action );
}

export function maximize( store, action, next ) {
	directly.maximize();
	next( action );
}

export function minimize( store, action, next ) {
	directly.minimize();
	next( action );
}

export function openAskForm( store, action, next ) {
	directly.openAskForm();
	next( action );
}

export default {
	[ DIRECTLY_ASK_QUESTION ]: [ askQuestion ],
	[ DIRECTLY_INITIALIZE ]: [ initialize ],
	[ DIRECTLY_MAXIMIZE ]: [ maximize ],
	[ DIRECTLY_MINIMIZE ]: [ minimize ],
	[ DIRECTLY_OPEN_ASK_FORM ]: [ openAskForm ],
};
