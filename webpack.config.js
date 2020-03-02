const path = require("path");

module.exports = {
  entry: "./public/javascript/main.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "public")
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                indentWidth: 4,
                includePaths: ["node_modules", "node_modules/@financial-times"]
              }
            }
          }
        ]
      }
    ]
  }
};
