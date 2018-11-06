import {connect} from 'react-redux';
import {
	getDescriptions,
	getImages,
	getPrice,
	getId,
	getTitle,
	getChannel,
	getPromotions,
	getReturnPolicy,
	getReviews
} from './product.selectors';
import {bindActionCreators} from 'redux'
import * as actions from './product.actions';

export default comp => connect(state => {
	return {
		descriptions: getDescriptions(state),
		images: getImages(state),
		pricing: getPrice(state),
		promos: getPromotions(state),
		returnPolicies: getReturnPolicy(state),
		reviews: getReviews(state),
		title: getTitle(state),
		channel: getChannel(state),
		loading: state.product.loading,
		id: getId(state)
	};
}, dispatch => bindActionCreators(actions, dispatch))(comp);