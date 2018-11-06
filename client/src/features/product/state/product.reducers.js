import {PENDING, FULFILLED, REJECTED} from 'redux-promise-middleware';
import actions from "./actionTypes";
import produce from "immer";
import {combineReducers} from 'redux';

const initialState = {data: {}, loading: false};

export default (state = initialState, action) => {
	return produce(state, draft => {
		switch (action.type) {
			case `${actions.FETCH_PRODUCT}_${PENDING}`:
				draft.data = initialState;
				draft.loading = true;
				break;
			case `${actions.FETCH_PRODUCT}_${FULFILLED}`:
				let productData = action.payload['CatalogEntryView'][0];

				draft.data = productData;
				draft.loading = false;
				break;
			case `${actions.FETCH_PRODUCT}_${REJECTED}`:
				draft.loading = false;
				draft.error = action.payload;
				break;
		}
	});
}
