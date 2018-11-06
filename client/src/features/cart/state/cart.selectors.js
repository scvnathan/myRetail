const parsePrice = price => Number(price.replace(/[^0-9.-]+/g, ""));

export function getTotal(state) {
	const inventory = state.cart.inventory;
	const ids = Object.keys(inventory);
	if (ids.length === 0) {
		return 0;
	}

	return ids.reduce((acc, currVal) => {
		return currVal + parsePrice(inventory[acc.id].price);
	}, 0);
}

export function getInventoryTotal(state) {
	const inventory = state.cart.inventory;
	const ids = Object.keys(inventory);

	return ids.reduce((acc, currVal) => {
		return acc + inventory[currVal].quantity;
	}, 0);
}
