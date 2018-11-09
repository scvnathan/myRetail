import productsService from "../service/product.service";
import actionTypes from "./actionTypes";
import { REJECTED } from "redux-promise-middleware";

export function fetchProduct(id) {
	return dispatch =>
		dispatch({
			type: actionTypes.FETCH_PRODUCT,
			async payload() {
				return await productsService.fetchProductDetails(id);
			}
		}).catch(e => {});
}
