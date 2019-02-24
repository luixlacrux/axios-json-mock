module.exports = {
  output: {
    library: 'AxiosJsonMocks',
    libraryTarget: 'umd',
  },
  externals: {
    axios: 'axios',
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
