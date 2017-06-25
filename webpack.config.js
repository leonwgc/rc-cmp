const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const dist = path.resolve(__dirname, 'dist');
const env = process.env.NODE_ENV;
const isProd = env === 'production';
const isDev = !isProd;
const port = 3000;
const extractSass = new ExtractTextPlugin('[name].css');

function getPath(_path) {
  return path.resolve(__dirname, _path);
}

var config = {
  context: path.resolve(__dirname),
  entry: {
    index: './index',
    vendor: ['react', 'react-dom']
  },
  output: {
    path: dist,
    filename: '[name].js'
  },
  devtool: isDev ? 'source-map' : false,
  module: {
    rules: [
      // {   enforce: "pre",   test: /\.js$/,   exclude: /node_modules/,   loader:
      // "eslint-loader", },
      // {
      //   test: /\.less$/,
      //   use: extractLESS.extract([
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         sourceMap: isDev
      //       }
      //     },
      //     {
      //       loader: 'less-loader',
      //       options: {
      //         sourceMap: isDev
      //       }
      //     }
      //   ])
      // },
      {
        test: /\.scss$/,
        use: extractSass.extract([
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev
            }
          }
        ])
      },
      {
        test: /\.(png|jpg|gif|jpeg|svg)$/, //处理css文件中的背景图片
        loader: [
          'url-loader?limit=10000&name=./images/[name].[ext]',
          {
            loader: 'image-webpack-loader',
            query: {
              bypassOnDebug: true,
              progressive: true,
              // optimizationLevel: 7, interlaced: false,
              pngquant: {
                quality: '65-90',
                speed: 4
              }
            }
          }
        ]
      },
      {
        test: /\.html$/, //获取html里面的图片
        use: {
          loader: 'html-loader',
          options: {
            minimize: false
          }
        }
      },
      {
        test: /\.json$/, //获取json数据的loader
        loader: 'json-loader'
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/, /link/],
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: ['es2015', 'react'],
          plugins: [
            ['transform-decorators-legacy'],
            ['transform-object-rest-spread'],
            ['transform-runtime'],
            ['transform-class-properties'],
            ['syntax-dynamic-import']
          ]
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.sass', '.scss', '.less', 'jsx'],
    alias: {}
  },
  plugins: [
    new CleanPlugin([dist]),
    new HtmlWebpackPlugin({
      filename: `index.html`,
      template: `./index.html`,
      inject: true,
      hash: true,
      // chunks: ['index'],
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
        minifyJS: isProd
      }
    }),
    extractSass,
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    })
  ]
};

if (isDev) {
  config.devServer = {
    disableHostCheck: true,
    contentBase: dist,
    port: port,
    // hot: true,
    inline: true,
    proxy: {}
  };

  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  console.log(`in development mode with port ${port}`);
}

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
