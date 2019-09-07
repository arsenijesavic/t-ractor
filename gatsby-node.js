exports.onCreateWebpackConfig = ({ actions, stage }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /firebase/,
            use: ["null-loader"],
          },
          {
            test: /react-p5-wrapper/,
            use: ["null-loader"],
          },
          {
            test: /react-new-window/,
            use: ["null-loader"],
          },
        ],
      },
    })
  }
}
