const merge = require('webpack-merge');
const base = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const dev = {
	devtool: 'eval-source-map ',
	devServer: {
		contentBase: base.projectDir('public'),
		hot: true,
		port: 8080,
		historyApiFallback: true,
		proxy: {
			'/api/*': {
				target: 'http://localhost:3000/api',
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: require('html-webpack-template'),
			inject: false,
			appMountId: 'app',
			devServer: 'localhost:8080'
		})
	]
}

const config = merge(base.config, dev);
module.exports = config;
