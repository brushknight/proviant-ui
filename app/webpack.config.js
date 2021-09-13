const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let apiBackendUrl = 'http://localhost:8080/'

switch (process.env.BACKEND) {
case 'local':
	apiBackendUrl = 'http://localhost:8090/'
	break
case 'stage':
	apiBackendUrl = 'http://10.0.0.50:13000/'
	break
case 'prod':
	apiBackendUrl = 'https://proviant.io/'
	break
}

const staticUrl = 'http://localhost:8090/uc/'

module.exports = {
	entry: path.resolve(__dirname, './web/index.js'),
	target: 'web',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				include: /web/
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'fonts/'
						}
					}
				]
			},
			{
				test: /\.(svg|png|jpg|jpeg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'images/'
						}
					}
				]
			},
			{
				test: /\.less$/i,
				use: [
					// compiles Less to CSS
					'style-loader',
					'css-loader',
					'less-loader'
				]
			}
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx']
	},
	output: {
		path: path.resolve(__dirname, './dist')
	},
	devServer: {
		contentBase: path.resolve(__dirname, './dist'),
		historyApiFallback: true,
		disableHostCheck: true,
		port: 9000,
		host: '0.0.0.0',
		hot: true,
		proxy: {
			'/api': apiBackendUrl,
			'/uc': staticUrl
		}
	},
	// alias: { 'react-dom': '@hot-loader/react-dom'  },
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				target: JSON.stringify('web'),
				is_saas: process.env.IS_SAAS || 0,
				version: JSON.stringify(process.env.VERSION) || JSON.stringify('dev')
			}
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'web/index.html'),
			filename: 'index.html'
		})
	]
}
