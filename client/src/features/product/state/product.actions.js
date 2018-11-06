import productsService from '../service/product.service';
import actions from './actionTypes';

export function fetchProduct(id) {
	return dispatch => dispatch({
		type: actions.FETCH_PRODUCT,
		async payload() {
			try {
				return await productsService.fetchProductDetails(id);
			} catch(e) {
				console.log(e);
			}
		}
	});
}
