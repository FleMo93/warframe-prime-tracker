const path = require('path');

module.exports = (production) => {
  return {
    entry: './src/index.ts',
    devtool: production ? false : 'source-map',
    mode: production ? 'production' : 'development',
    module: {
      rules: [{
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          minimize: {
            removeComments: false
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      // {
      //   test: /\.(gif|png|jpe?g)$/i,
      //   use: [
      //     'file-loader',
      //     {
      //       loader: 'image-webpack-loader',
      //       options: {
      //         disable: true, // webpack@2.x and newer
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.svg/,
        use: { loader: 'svg-url-loader' }
      }]
    },
    resolve: {
      extensions: ['.ts', '.js'],
      modules: [path.resolve(__dirname, 'node_modules'), 'node_modules']
    },
    output: {
      filename: 'primetracker.js',
      library: 'PrimeTracker',
      libraryTarget: 'var',
      libraryExport: 'default'
    },
    devServer: {
      index: 'index.html',
      contentBase: 'public',
      watchContentBase: true,
      port: 8081,
      hot: true,
      // inline: false // enable for IE11 support, but disables hot-reload
    }
  }
}