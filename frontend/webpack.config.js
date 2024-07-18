const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { ModuleFederationPlugin } = webpack.container;
const dependencies = require("./package.json").dependencies;

module.exports = {
    entry: {
        main: path.join(__dirname, "./src/index.js"),
    },
    output: {
        publicPath: "auto",
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "./dist"),
        },
        historyApiFallback: true,
        port: 3000,
        open: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|tsx|ts)$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: { presets: ["@babel/env", "@babel/preset-react"] },
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.svg$/,
                loader: "url-loader",
            },
            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: "url-loader",
                },
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "host",
            filename: "remoteEntry.js",
            remotes: {
                cardContent: `cardContentService@http://localhost:3003/remoteEntry.js`,
                auth: `authService@http://localhost:3002/remoteEntry.js`,
                profile: `profileService@http://localhost:3001/remoteEntry.js`,
            },
            shared: {
                ...dependencies,
                react: {
                    singleton: true,
                    requiredVersion: dependencies["react"],
                },
                "react-dom": {
                    singleton: true,
                    requiredVersion: dependencies["react-dom"],
                },
                "shared": {
                    singleton: true,
                },
                'react-router-dom': {
                    singleton: true
                }
            },
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            favicon: "./public/favicon.ico",
            title: "Host",
            filename: "index.html",
            chunks: ["main"],
            publicPath: "/",
        }),
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },
    mode: "development"
};
