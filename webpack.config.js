const path = require('path');

module.exports = {
  entry: './src/blockchart.js',
  mode: 'production',
  output: {
    filename: 'blockchart.min.js',
    // libraryTarget: 'BlockChart',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    compress: true,
    port: 9000
  }
};