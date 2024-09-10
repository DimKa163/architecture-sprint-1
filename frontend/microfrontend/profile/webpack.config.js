const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { ModuleFederationPlugin } = webpack.container;
const dependencies = require("./package.json").dependencies;

module.exports = {
    entry: {
        main: path.join(__dirname, "./index.js"),
    },
    output: {
        publicPath: "http://localhost:3001/",
        crossOriginLoading: "anonymous",
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
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "profileService",
            filename: "remoteEntry.js",
            exposes: {
                "./Profile": "./src/components/Profile",
                "./EditAvatarPopup": "./src/components/EditAvatarPopup",
                "./EditProfilePopup": "./src/components/EditProfilePopup",
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
            },
        }),
        new HtmlWebpackPlugin({
            template: "public/index.html",
            title: "profile",
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
        port: 3001,
        open: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    },
};
