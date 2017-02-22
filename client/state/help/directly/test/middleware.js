/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import { useSandbox } from 'test/helpers/use-sinon';
import * as directly from 'lib/directly';
import {
	DIRECTLY_ASK_QUESTION,
	DIRECTLY_INITIALIZE,
	DIRECTLY_MAXIMIZE,
	DIRECTLY_MINIMIZE,
	DIRECTLY_OPEN_ASK_FORM,
} from 'state/action-types';
import middleware from '../middleware';

describe( 'Directly middleware', () => {
	let next;
	let store = { dispatch: () => {} };

	useSandbox( ( sandbox ) => {
		next = sandbox.spy();
		store = {
			dispatch: sandbox.spy(),
		};
		// Stub in all lib/directly functions to avoid them being actually called
		sandbox.stub( directly, 'askQuestion' );
		sandbox.stub( directly, 'initialize' );
		sandbox.stub( directly, 'maximize' );
		sandbox.stub( directly, 'minimize' );
		sandbox.stub( directly, 'openAskForm' );
	} );

	it( 'should pass along actions without corresponding handlers', () => {
		const action = { type: 'UNSUPPORTED_ACTION' };

		middleware( store )( next )( action );

		expect( store.dispatch ).to.not.have.beenCalled;
		expect( next ).to.have.been.calledWith( action );
	} );

	it( 'should ask a question to Directly on DIRECTLY_ASK_QUESTION action type', () => {
		const questionText = 'To be or not to be?';
		const name = 'Hamlet';
		const email = 'hammie@royalfamily.dk';
		const action = { type: DIRECTLY_ASK_QUESTION, questionText, name, email };

		middleware( store )( next )( action );

		expect( directly.askQuestion ).to.have.been.calledWith( questionText, name, email );
		expect( next ).to.have.been.calledWith( action );
	} );

	it( 'should initialize Directly on DIRECTLY_INITIALIZE action', () => {
		const config = {
			displayAskQuestion: true,
			questionCategory: 'toBeOrNotToBe',
			metadata: {
				quote: 'Something is rotten in the state of Denmark',
			},
			userName: 'Hamlet',
			userEmail: 'hammie@royalfamily.dk.com',
		};
		const action = { type: DIRECTLY_INITIALIZE, config };

		middleware( store )( next )( action );

		expect( directly.initialize ).to.have.been.calledWith( config );
		expect( next ).to.have.been.calledWith( action );
	} );

	it( 'should maximize the Directly widget on DIRECTLY_MAXIMIZE action', () => {
		const action = { type: DIRECTLY_MAXIMIZE };

		middleware( store )( next )( action );

		expect( directly.maximize ).to.have.beenCalled;
		expect( next ).to.have.been.calledWith( action );
	} );

	it( 'should minimize the Directly widget on DIRECTLY_MINIMIZE action', () => {
		const action = { type: DIRECTLY_MINIMIZE };

		middleware( store )( next )( action );

		expect( directly.minimize ).to.have.beenCalled;
		expect( next ).to.have.been.calledWith( action );
	} );

	it( 'should open the Directly ask form on DIRECTLY_OPEN_ASK_FORM action', () => {
		const action = { type: DIRECTLY_OPEN_ASK_FORM };

		middleware( store )( next )( action );

		expect( directly.openAskForm ).to.have.beenCalled;
		expect( next ).to.have.been.calledWith( action );
	} );
} );
