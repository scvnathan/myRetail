import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actions from './cart.actions';
import * as selectors from "./cart.selectors"

export default comp => connect(state => {
	return {
		cart: state.cart,
		inventoryTotal: selectors.getInventoryTotal(state),
		loading: state.cart.loading,
	}
}, dispatch => bindActionCreators(actions, dispatch))(comp);