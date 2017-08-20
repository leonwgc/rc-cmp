const path = require('path');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');

const dist = path.resolve(__dirname, 'dist');
const env = process.env.NODE_ENV;
const isProd = env === 'production';

const babelPlugins = [['transform-decorators-legacy']];

const entry = {
  ssr: ['./ssr']
};

var config = {
  context: path.resolve(__dirname),
  entry: entry,
  output: {
    path: dist,
    filename: '[name].js'
  },
  target: 'node',
  node: {
    __filename: false,
    __dirname: false
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: ['es2015', 'react', 'stage-0'],
          plugins: babelPlugins
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', 'jsx'],
    alias: {}
  },
  plugins: [new CleanPlugin([dist])]
};

if (isProd) {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  );

  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
      },
      comments: false,
      beautify: false,
      sourceMap: false
    })
  );
}

module.exports = config;
