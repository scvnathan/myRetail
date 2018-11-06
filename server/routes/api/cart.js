const cartController = require('../../controllers/cart.controller');

module.exports = async (request, response) => {
	console.log(request.body);
	const results = await cartController.addToCart(request.body);
	response.json(results);
};