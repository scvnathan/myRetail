import { combineReducers } from 'redux'
import cart from './cart/state/cart.reducers'
import product from './product/state/product.reducers'

export default combineReducers({
	cart,
	product,
});