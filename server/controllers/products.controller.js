const product = require('../models/products/product.model');

module.exports = {
	getProducts: async id => {
		return await product.findProducts({id});
	}
};