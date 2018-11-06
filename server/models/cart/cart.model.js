const fakePersistentDb = {
	1: {
		products: []
	}
};

module.exports = {
	async getCurrentCart(userId) {
		return fakePersistentDb[userId];
	},

	async saveCart(userId, payload) {
		//TODO: verify user and payload

		const cart = fakePersistentDb[userId]
		if (cart) {
			cart.products.push(payload);
		}
	}

};