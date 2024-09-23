const path = require("path");

module.exports = (env) => {
  return {
    stats: "verbose",
    entry: {
      components: "./src/components/index.ts", // Entry point for components
      utils: "./src/utils/index.ts", // Entry point for utils
    },
    output: {
      path: path.resolve(__dirname, "build"), // Output to the build folder
      filename: "[name].js", // Use [name] placeholder for dynamic output filenames
      publicPath: "./",
      library: "kemis-react-form",
      libraryTarget: "umd",
      globalObject: "this",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  "@babel/preset-env",
                  "@babel/preset-react",
                  "@babel/preset-typescript",
                ],
              },
            },
          ],
        },
      ],
    },
  };
};
