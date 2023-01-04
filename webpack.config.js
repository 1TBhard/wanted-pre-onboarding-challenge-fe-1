const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");

const isProduction = process.env.NODE_ENV == "production";

// const dotenvPath = isProduction
// 	? path.join(__dirname, ".env")
// 	: path.join(__dirname, ".env.dev");

const stylesHandler = isProduction
	? MiniCssExtractPlugin.loader
	: "style-loader";

const config = {
	entry: "./src/index.tsx",
	output: {
		path: path.resolve(__dirname, "dist"),
		clean: true,
	},
	devServer: {
		open: true,
		host: "localhost",
		port: process.env.PORT,
		historyApiFallback: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./public/index.html",
		}),
		new Dotenv({
			path: isProduction ? ".env" : ".env.dev",
		}),
	],
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/i,
				loader: "ts-loader",
				exclude: ["/node_modules/"],
			},
			{
				test: /\.css$/i,
				use: [stylesHandler, "css-loader", "postcss-loader"],
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
				type: "asset/resource",
				generator: {
					filename: "public/[name][ext]",
				},
			},
		],
	},
	resolve: {
		alias: {
			src: path.resolve(__dirname, "src"),
			public: path.resolve(__dirname, "public"),
		},
		modules: [path.resolve(__dirname), "node_modules"],
		extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
	},
};

module.exports = () => {
	if (isProduction) {
		config.mode = "production";

		config.plugins.push(new MiniCssExtractPlugin());
	} else {
		config.mode = "development";
	}
	return config;
};
