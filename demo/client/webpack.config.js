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
    'select-elements': './src/select-elements.js',
    'api-client': './src/api-client.js',
    'block-ui': './src/block-ui.js',
    'basic-table': './src/datatables/basic-table.js',
    'server-side-processing-table': './src/datatables/server-side-processing-table.js',
    'column-visibility-table': './src/datatables/column-visibility-table.js',
    'column-visibility-with-icon-button-table': './src/datatables/column-visibility-with-icon-button-table.js',
    'disable-first-ajax-call-table': './src/datatables/disable-first-ajax-call-table.js',
    'subtable': './src/datatables/subtable.js',
    dialog: './src/dialog.js',
    'image-input': './src/image-input.js',
    modal: './src/modal.js',
    toast: './src/toast.js',
    'date-range-picker': './src/date-range-picker.js',
    'date-range-menu': './src/date-range-menu.js',
    'form-validation': './src/form-validation.js',
    tagify: './src/tagify.js',
    dropzone: './src/dropzone.js',
    'password-toggle': './src/password-toggle.js',
    tree: './src/tree.js',
    clipboard: './src/clipboard.js',
    'toggle-button': './src/toggle-button.js',
    barchart: './src/barchart.js',
    tooltip: './src/tooltip.js',
    utilities: './src/utilities.js',
    keenicons: './src/keenicons.js',
    'form-advanced': './src/form-advanced.js',
    'no-ui-slider': './src/no-ui-slider.js',
    indicator: './src/indicator.js',
    inputmask: './src/inputmask.js',
    piechart: './src/piechart.js',
    linechart: './src/linechart.js',
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
        {from: 'node_modules/metronic-extension/dist/sourcemaps/plugins/global/toastr.js.map', to: 'theme/plugins/global/toastr.js.map'},
        {from: 'node_modules/metronic-extension/dist/sourcemaps/plugins/custom/datatables/pdfmake.min.js.map', to: 'theme/plugins/custom/datatables/pdfmake.min.js.map'},
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