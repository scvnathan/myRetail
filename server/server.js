const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

app.use(logger(process.env.PROD ? 'prod' : 'dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

const root = path.join(__dirname, '../public');
app.use(express.static(root));

const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
        .catch(next);
};

const productsRouter = require('./routes/api/products');
const cartRouter = require('./routes/api/cart');

const apiRoot = '/api/';
app.get(`${apiRoot}product/:id`, asyncMiddleware(productsRouter))
app.post(`${apiRoot}cart/save`, asyncMiddleware(cartRouter))

// Handle any non-api response. Serve up the html file with our webpack bundles
app.get('*', (request, response) => {
	response.sendFile(path.resolve(root, 'index.html'))
});

module.exports = app;
