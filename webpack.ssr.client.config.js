const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const dist = path.resolve(__dirname, 'dist');
const env = process.env.NODE_ENV;
const isProd = env === 'production';
const isDev = !isProd;
const port = 3000;

const cssLoaders = [
  {
    loader: 'css-loader',
    options: {
      sourceMap: isDev
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: isDev,
      ident: 'postcss',
      plugins: () => [
        require('postcss-flexbugs-fixes'),
        autoprefixer({
          browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
          flexbox: 'no-2009'
        })
      ]
    }
  }
];

const babelPlugins = [['transform-decorators-legacy']];

const entry = {
  client: ['./ssr/client']
};

var config = {
  context: path.resolve(__dirname),
  entry: entry,
  output: {
    path: dist,
    filename: '[name].js'
  },
  devtool: isDev ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: ExtractTextPlugin.extract(
          cssLoaders.concat({
            loader: 'less-loader',
            options: {
              sourceMap: isDev
            }
          })
        )
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract(
          cssLoaders.concat({
            loader: 'sass-loader',
            options: {
              sourceMap: isDev
            }
          })
        )
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
          presets: ['es2015', 'react', 'stage-0'],
          plugins: babelPlugins
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.sass', '.scss', '.less', 'jsx'],
    alias: {}
  },
  plugins: [
    // new CleanPlugin([dist]),
    new HtmlWebpackPlugin({
      filename: `index0.html`,
      template: `./ssr/index.html`,
      inject: true,
      hash: false,
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
        minifyJS: isProd
      }
    }),
    new ExtractTextPlugin(
      isDev ? '[name].[hash].css' : '[name].[contenthash].css'
    )
  ]
};

if (isDev) {
  config.devServer = {
    disableHostCheck: true,
    contentBase: dist,
    port: port,
    hot: false,
    inline: true,
    proxy: {
      '/wapi': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  };

  config.plugins.push(new webpack.HotModuleReplacementPlugin());
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
