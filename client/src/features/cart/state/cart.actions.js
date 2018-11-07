import cartService from "~root/features/cart/services/cart.service";
import actionTypes from "./actionTypes";

export function fetchCurrentCart(id) {
	return dispatch =>
		dispatch({
			type: actionTypes.FETCH_CART,
			async payload() {
				try {
					const cart = await cartService.fetchCurrentCart(id);
					return cart;
				} catch (e) {

				}
			}
		});
}

export function addToCart(id, quantity, price) {
	return dispatch =>
		dispatch({
			type: actionTypes.ADD_TO_CART,
			async payload() {
				//artifically delay to see ui reactions
				//await new Promise(resolve => setTimeout(resolve, 1000));
				await cartService.addToCart(id, quantity, price);
				return {
					id,
					quantity,
					price
				};
			}
		}).catch(e => {});
}
