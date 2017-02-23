/**
 * External dependencies
 */
import { expect } from 'chai';
import sinon from 'sinon';

// const initializeSpy = sinon.spy( require( '../vendor' ) );

 /**
 * Internal dependencies
 */
import useFakeDom from 'test/helpers/use-fake-dom';
import {
	initialize as initializeDirectly,
	askQuestion as askDirectlyQuestion,
} from '..';

describe( 'index', () => {
	let vendor;
	useFakeDom();

	beforeEach( () => {
		vendor = require( '../vendor' );
		sinon.spy( vendor, 'initializeDirectly' );
	} );

	afterEach( () => {
		// After each test, clean up the globals put in place by Directly
		delete window.DirectlyRTM;
		delete require.cache[ require.resolve( '../vendor' ) ];
	} );

	describe( 'initialize', () => {
		it( 'uses the given config data for Directly', () => {
			const config = { a: '1', b: '2', c: '3' };
			initializeDirectly( config );
			//
			// expect( window.DirectlyRTM.cq ).to.have.lengthOf( 1 );
			// expect( window.DirectlyRTM.cq[ 0 ][ 0 ] ).to.equal( 'config' );
			// expect( window.DirectlyRTM.cq[ 0 ][ 1 ] ).to.contain.all.keys( config );
			expect( vendor.initializeDirectly.callCount ).to.equal( 1 );
			expect( vendor.initializeDirectly.firstCall.args[ 0 ] ).to.contain.all.keys( config );
		} );
	} );

	describe( 'askQuestion', () => {
		const questionText = 'How can I give you all my money?';
		const name = 'Richie Rich';
		const email = 'richie@richenterprises.biz';

		it( 'does nothing if Directly hasn\'t been initialized', () => {
			expect( askDirectlyQuestion( questionText, name, email ) ).not.to.throw;
			expect( window.DirectlyRTM ).to.be.undefined;
		} );

		it( 'invokes the Directly API with the given paramaters', () => {
			window.DirectlyRTM = sinon.spy();
			initializeDirectly();
			askDirectlyQuestion( questionText, name, email );
			expect( window.DirectlyRTM ).to.have.been.calledWith( 'askQuestion', { questionText, name, email } );
		} );
	} );
} );
