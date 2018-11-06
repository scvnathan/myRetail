const cart = require('../models/cart/cart.model');

module.exports = {
	getCart: async id => {
		return await cart.getCurrentCart(id);
	},

	addToCart: async (req) => {
		const {id, quantity} = req;
		const results = {}
		try {
			await cart.saveCart(1, {id, quantity})
			results.updatedAt = new Date();
		} catch(e) {
			console.error(e);
			results.error = 'Failed to add to cart';
		}

		return results;
	}
};