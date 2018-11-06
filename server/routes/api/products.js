const productController = require("../../controllers/products.controller")

module.exports = async (request, response) => {
	const results = await productController.getProducts(request.params.id);
	response.json(results);
};
