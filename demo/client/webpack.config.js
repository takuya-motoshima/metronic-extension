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
    app: './src/app.js',
    'select-elements': './src/pages/select-elements.js',
    'api-client': './src/pages/api-client.js',
    'block-ui': './src/pages/block-ui.js',
    datatable: './src/pages/datatable.js',
    dialog: './src/pages/dialog.js',
    'image-input': './src/pages/image-input.js',
    modal: './src/pages/modal.js',
    toast: './src/pages/toast.js',
    'date-range-picker': './src/pages/date-range-picker.js',
    'date-range-menu': './src/pages/date-range-menu.js',
    'form-validation': './src/pages/form-validation.js',
    tagify: './src/pages/tagify.js',
    dropzone: './src/pages/dropzone.js',
    'password-toggle': './src/pages/password-toggle.js',
    tree: './src/pages/tree.js',
    clipboard: './src/pages/clipboard.js',
    'toggle-button': './src/pages/toggle-button.js',
    barchart: './src/pages/barchart.js',
    tooltip: './src/pages/tooltip.js',
    utilities: './src/pages/utilities.js',
    keenicons: './src/pages/keenicons.js',
    'form-advanced': './src/pages/form-advanced.js',
    'no-ui-slider': './src/pages/no-ui-slider.js',
    indicator: './src/pages/indicator.js',
    inputmask: './src/pages/inputmask.js',
    piechart: './src/pages/piechart.js',
    linechart: './src/pages/linechart.js',
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
        {from: 'src/theme/metronic_8.1.8', to: 'theme'},
        // {from: 'src/theme/metronic_8.1.7', to: 'theme'},
        // {from: 'src/theme/metronic_8.1.2', to: 'theme'},
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