const webpack = require("webpack");
const { ModuleFederationPlugin } = webpack.container;
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const dependencies = require("./package.json").dependencies;

module.exports = {
    entry: {
        main: path.join(__dirname, "./index.js"),
    },
    output: {
        publicPath: "http://localhost:3002/",
    },
    module: {
        rules: [
            {
                test: /\.js$|jsx/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: { presets: ["@babel/env", "@babel/preset-react"] },
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "authService",
            filename: "remoteEntry.js",
            exposes: {
                "./Login": "./src/components/Login",
                "./Register": "./src/components/Register"
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
            template: "public/index.html",
            title: "auth",
            filename: "index.html",
            chunks: ["main"],
        }),
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },
    mode: "development",
    devServer: {
        static: {
            directory: path.join(__dirname, "./dist"),
        },
        port: 3002,
        open: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    },
};
