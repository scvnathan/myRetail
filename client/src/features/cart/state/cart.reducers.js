import {PENDING, FULFILLED, REJECTED} from 'redux-promise-middleware';
import actionTypes from "./actionTypes";
import produce from "immer";

//inventory is map of product ids to an object containing its quantity and unit price
const initialState = {inventory: {}, loading: false};

function updateInventory(draft, payload) {
	const existing = draft.inventory[payload.id];
	if (existing) {
		existing.quantity += payload.quantity;
	} else {
		draft.inventory[payload.id] = payload;
	}
}

export default (state = initialState, action) => {
	return produce(state, draft => {
		switch (action.type) {
			case `${actionTypes.FETCH_CART}_${FULFILLED}`:
				draft.inventory = action.payload;
				draft.loading = false;
				break;
			case `${actionTypes.FETCH_CART}_${PENDING}`:
				draft.loading = true;
				break;
			case `${actionTypes.FETCH_CART}_${REJECTED}`:
				draft.loading = false;
				break;

			case `${actionTypes.ADD_TO_CART}_${FULFILLED}`:
				updateInventory(draft, action.payload);
				draft.loading = false;
				break;
			case `${actionTypes.ADD_TO_CART}_${PENDING}`:
				draft.loading = true;
				break;
			case `${actionTypes.ADD_TO_CART}_${REJECTED}`:
				draft.loading = false;
				draft.error = action.payload;
				break;
		}
	});
}