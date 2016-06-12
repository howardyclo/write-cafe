const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')

const config = {
	entry: {
		app: [
			'babel-polyfill',
			// Our application
			path.join(__dirname, 'app/index.js'),
		]
	},
	output: {
		// We need to give webpack a path. It does not actually need it,
	    // because files are kept in memory in webpack-dev-server, but an
	    // error will occur if nothing is specified. We use the buildPath
	    // as that points to where the files will eventually be bundled
	    // in production
	    path: path.join(__dirname, '/public/'),
	    filename: '[name]-[hash].min.js',
	    publicPath: '/'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel',
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]!sass-loader!sass-resources-loader!postcss-loader'),
				include: path.join(__dirname, 'app')
			},
			{
				test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif|ico)(\?\S*)?$/,
				loader: 'url?name=[name].[ext]'
			}
		]
	},
	sassResources: [
		'app/styles/variables.scss',
		'app/styles/global.scss'
	],
	postcss: [
		autoprefixer
    ],
    resolve: {
        modulesDirectories: [
        	'app',
            'node_modules'
        ],
        extensions: ['', '.json', '.js', '.jsx']
    },
 	// We have to manually add the Hot Replacement plugin when running from Node
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),

		// HtmlWebpackPlugin automatically generates index.html and injects links and scripts
		// based on template 'app/index.tpl.html' to output directory
		// https://github.com/ampedandwired/html-webpack-plugin#configuration
		new HtmlWebpackPlugin({
			template: 'app/index.tpl.html',
			favicon: 'app/static/imgs/favicon.ico',
			filename: 'index.html'
		}),

		new ExtractTextPlugin('[name]-[hash].min.css'),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false,
				screw_ie8: true
			}
		}),
	    new webpack.DefinePlugin({
	      'process.env.NODE_ENV': JSON.stringify('production')
	    })
	]
}

module.exports = config
