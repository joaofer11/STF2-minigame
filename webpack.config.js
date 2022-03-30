const path = require('path');

module.exports = {
  entry: './scripts/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  devServer: {
    static: [
      {
        directory: path.resolve(__dirname, 'public')
      },
      {
        directory: path.resolve(__dirname, 'css')
      },
      {
        directory: path.resolve(__dirname, 'dist')
      },
      {
        directory: path.resolve(__dirname, 'assets/images')
      },
      {
        directory: path.resolve(__dirname, 'scripts')
      }
    ],
    port: 8001,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'asset-modules/images/[hash][ext]'
        }
      },
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          }
        }
      },
    ]
  }
}
