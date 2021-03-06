/*
 * Copyright (C) 2019-2020 StoreWise
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

"use strict";
const path = require("path");

const configs = [
  {
    mode: "development",
    target: "electron-main",
    node: {
      __dirname: false,
      __filename: false,
    },
    entry: {
      index: "./src/index.js",
    },
    resolve: {
      extensions: [".js", ".svg"],
    },
    externals: {
      "about-window": "commonjs about-window",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        {
          test: /\.svg$/,
          exclude: /node_modules/,
          use: {
            loader: "svg-url-loader",
            options: {
              noquotes: true,
            },
          },
        },
      ],
    },
    output: {
      path: path.join(__dirname, "lib"),
      filename: "[name].js",
    },
    devtool: "source-map",
  },
];

module.exports = (env, argv) => {
  if (argv.mode === "production") {
    configs.forEach((c) => (c.devtool = false));
  }
  return configs;
};
