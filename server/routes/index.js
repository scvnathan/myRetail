const express = require('express');
const path = require('path');
const router = express.Router();


/* GET home page. */

module.exports = (root) => {
	router.get('/', function (req, res, next) {
		res.sendfile(path.resolve(root, 'app/index.html'));
	});
	return router;
};
