const path = require('path')

module.exports = {
  mode: 'production',
  entry: {
    content: './src/content/content',
  },

  output: {
    path: path.resolve(__dirname, './dist/src/scripts'),
    filename: '[name].js'
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  }
}
