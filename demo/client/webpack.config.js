const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1500,
    ignored: [
      path.resolve(__dirname, 'src/theme'),
      path.resolve(__dirname, 'src/media'),
      path.resolve(__dirname, 'node_modules')
    ]
  },
  entry: {
    'block-ui': './src/block-ui.js',
    datatable: './src/datatable.js',
    dialog: './src/dialog.js',
    'image-input': './src/image-input.js',
    modal: './src/modal.js',
    toast: './src/toast.js',
    'date-range-picker': './src/date-range-picker.js',
    'custom-validation': './src/custom-validation.js',
    tagify: './src/tagify.js',
    dropzone: './src/dropzone.js',
    'select-elements': './src/select-elements.js',
    'toggle-password-visibility': './src/toggle-password-visibility.js',
    'rest-client': './src/rest-client.js',
    tree: './src/tree.js',
  },

  // File output settings.
  output: {
    // Output file directory name.
    path: path.resolve(__dirname, '../public/build'),
    // Output file name.
    filename: '[name].js'
  },
  plugins: [
    // new webpack.ProvidePlugin({moment: 'moment'}),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        {from: 'src/media', to: 'media'},
        {from: 'src/theme', to: 'theme'}
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {url: false}
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {url: false}
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin()
    ]
  },

  // Do not include React itself in the bundle file.
  externals: {
    jquery: 'jQuery'
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '~': path.resolve(__dirname, 'src'),
      // handlebars : 'handlebars/dist/handlebars.js'
    }
  },
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 5242880
  }
}