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

export function askQuestion( questionText, name, email ) {
	return { type: DIRECTLY_ASK_QUESTION, questionText, name, email };
}

export function initialize( config = {} ) {
	return { type: DIRECTLY_INITIALIZE, config };
}

export function maximize() {
	return { type: DIRECTLY_MAXIMIZE };
}

export function minimize() {
	return { type: DIRECTLY_MINIMIZE };
}

export function openAskForm() {
	return { type: DIRECTLY_OPEN_ASK_FORM };
}
