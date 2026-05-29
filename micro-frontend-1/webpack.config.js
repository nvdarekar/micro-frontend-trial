const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { container } = require("webpack");

const isDevelopment = process.env.NODE_ENV !== "production";

const APP_NAME = "micro-frontend-1";
const APP_PUBLIC_PATH = `/${APP_NAME}/`;

module.exports = {
  entry: {
    main: "./src/index.tsx",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].chunk.js",
    clean: true,
    publicPath: "auto",
  },
  mode: isDevelopment ? "development" : "production",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.module\.css$/,
        use: [
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              esModule: false,
              modules: {
                localIdentName: isDevelopment
                  ? "[name]__[local]--[hash:base64:5]"
                  : "[hash:base64:8]",
                exportLocalsConvention: "camelCase",
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".jsx", ".js"], // Allows importing without extensions
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    ...(isDevelopment ? [new ReactRefreshWebpackPlugin()] : []),
    ...(isDevelopment
      ? []
      : [
          new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
          }),
        ]),
    new container.ModuleFederationPlugin({
      name: "micro_frontend_1",
      filename: "remoteEntry.js",
      exposes: {
        "./Root": "./src/components/Root", // Exposes the Root component to be consumed by the host application
        "./RemoteReactDom": "./src/RemoteReactDom", // Exposes ReactDOM to be shared with the host application
      },
    }),
  ],
  stats: "errors-warnings",
  devServer: {
    hot: true, // Enables Hot Module Replacement
    open: {
      target: ["micro-frontend-1"],
    },
    port: 3001,
    historyApiFallback: {
      index: APP_PUBLIC_PATH,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    devMiddleware: {
      publicPath: APP_PUBLIC_PATH,
    },
    static: {
      directory: path.join(__dirname, "public"),
      publicPath: APP_PUBLIC_PATH,
    },
  },
};
