const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  entry: {
    main: "./src/index.tsx",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].chunk.js",
    clean: true,
    publicPath: "/",
    uniqueName: "host_app",
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
    new webpack.DefinePlugin({
      IS_DEVELOPMENT: JSON.stringify(isDevelopment),
    }),
    ...(isDevelopment ? [new ReactRefreshWebpackPlugin()] : []),
    ...(isDevelopment
      ? []
      : [
          new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
          }),
        ]),
    new webpack.container.ModuleFederationPlugin({
      name: "host_app",
      filename: "remoteEntry.js",
      remotes: {}, // loading using custom dynamic script loader, so no skipping remotes here
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  stats: "errors-warnings",
  devServer: {
    hot: true, // Enables Hot Module Replacement
    open: true,
    port: 3000,
    historyApiFallback: true,
  },
};
