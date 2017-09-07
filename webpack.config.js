module.exports = {
  entry: "./lib/scripts/game.js",
  output: {
    filename: "./lib/scripts/bundle.js"
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '*']
  }
};
