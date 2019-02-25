module.exports = {
  output: {
    library: 'AxiosJsonMock',
    libraryTarget: 'umd',
  },
  externals: {
    axios: 'axios',
  },
  node: {
    process: false,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [],
};
