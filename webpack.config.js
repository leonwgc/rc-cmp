const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const dist = path.resolve(__dirname, 'dist');
const env = process.env.NODE_ENV;
const isProd = env === 'production';
const isDev = !isProd;
const isPreact = env === 'preact';
const port = 3000;

const extractSass = new ExtractTextPlugin('[name].css');
var extractLess = new ExtractTextPlugin('[name][contenthash].css');

function getPath(_path) {
  return path.resolve(__dirname, _path);
}

const babelPlugins = [['transform-decorators-legacy']];

const entry = {
  index: ['./polyfill', './index'],
  vendor: ['react', 'react-dom']
};

if (isPreact) {
  babelPlugins.push(['transform-react-jsx', { pragma: 'h' }]);
  entry.index = ['./preact/index'];
}

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
        enforce: 'pre',
        test: /\.js$/,
        include: getPath('src'),
        loader: 'eslint-loader',
        options: {
          eslintPath: require.resolve('eslint'),
          baseConfig: {
            extends: [require.resolve('eslint-config-react-app')]
          },
          ignore: false,
          useEslintrc: false
        }
      },
      {
        test: /\.less$/,
        use: extractLess.extract([
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev
            }
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: isDev
            }
          }
        ])
      },
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
    new CleanPlugin([dist]),
    new HtmlWebpackPlugin({
      filename: `index.html`,
      template: `./index.html`,
      inject: true,
      hash: true,
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
        minifyJS: isProd
      }
    }),
    extractLess,
    extractSass,
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor-[hash:8].js',
      minChunks: function(module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      filename: 'manifest-[hash:8].js',
      minChunks: Infinity
    })
  ]
};

if (isDev) {
  config.devServer = {
    disableHostCheck: true,
    contentBase: dist,
    port: port,
    hot: true,
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
