const merge = require('webpack-merge');
const base = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const prd = {
	plugins: [
		new HtmlWebpackPlugin({
			template: require('html-webpack-template'),
			inject: false,
			appMountId: 'app'
		})
	]
}

const config = merge(base.config, prd);
module.exports = config;
