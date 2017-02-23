/**
 * External dependencies
 */
import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import QueryMediaStorage from 'components/data/query-media-storage';
import { getMediaStorage } from 'state/sites/media-storage/selectors';
import { getSite } from 'state/sites/selectors';
import PlanStorageBlock from './block';

class PlanStorage extends Component {
	static propTypes = {
		className: PropTypes.string,
		mediaStorage: PropTypes.object,
		siteId: PropTypes.number.isRequired,
	};

	render() {
		const { site, siteId } = this.props;

		if ( ! site || site.jetpack ) {
			return null;
		}

		const classes = classNames( this.props.className, 'plan-storage' );

		return (
			<div className={ classes } >
				<QueryMediaStorage siteId={ siteId } />
				<PlanStorageBlock
					siteSlug={ site.Slug }
					sitePlanName={ site.plan.product_name_short }
					mediaStorage={ this.props.mediaStorage }
				>
					{ this.props.children }
				</PlanStorageBlock>
			</div>
		);
	}
}

export default connect( ( state, ownProps ) => {
	return {
		mediaStorage: getMediaStorage( state, ownProps.siteId ),
		site: getSite( state, ownProps.siteId )
	};
} )( PlanStorage );
