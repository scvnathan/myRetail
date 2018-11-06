const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

function projectDir(p) {
	return path.resolve(__dirname, '../../', p);
}

function clientDir(p) {
	return path.resolve(__dirname, '../', p);
}

const config = {
	entry: ['@babel/polyfill', clientDir('src/index.js')],
	output: {
		path: projectDir('public'),
		filename: 'app/[name].[hash].js',
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.png$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							mimetype: 'image/png'
						}
					}
				]
			},
			{
				test: /\.(ttf|eot|svg)/,
				use: {
					loader: "file-loader"
				}
			}
		]
	},
	resolve: {
		alias: {
			'~root': clientDir('src'),
			'~images': projectDir('public/images'),
			'~public': projectDir('public'),
			'~common': clientDir('src/common'),
		},
		extensions: [
			'.js',
			'.jsx'
		]
	},
	plugins: [
		new CleanWebpackPlugin(projectDir('public/app'), {allowExternal: true}),
		new webpack.HotModuleReplacementPlugin()
	]
};

module.exports = {
	config,
	projectDir,
	clientDir
}