const path = require("path");

module.exports = (env) => {
  return {
    stats: "verbose",
    entry: {
      components: "./src/components/index.ts", // Entry point for components
      utils: "./src/utils/index.ts", // Entry point for utils
    },
    output: {
      path: path.resolve(__dirname, "build/styles"), // Output to the build folder
      filename: "[name].css", // Use [name] placeholder for dynamic output filenames
      publicPath: "./",
      library: "kemis-react-form",
      libraryTarget: "umd",
      globalObject: "this",
    },
    resolve: {
      extensions: [".css", ".module.css"],
    },
    module: {
      rules: [
        // {
        //   test: /\.(ts|tsx)$/,
        //   exclude: /node_modules/,
        //   use: [
        //     {
        //       loader: "babel-loader",
        //       options: {
        //         presets: [
        //           "@babel/preset-env",
        //           "@babel/preset-react",
        //           "@babel/preset-typescript",
        //         ],
        //       },
        //     },
        //   ],
        // },
        {
          test: /\.(css|module.css)$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                modules: false,
              },
            },
          ],
        },
      ],
    },
  };
};
