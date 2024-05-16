const path = require('path');

module.exports = {
  entry: './public/firebase-messaging-sw.js', // Updated path to your service worker entry file
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'firebase-messaging-sw.bundle.js' // Output file name
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Use babel-loader for JavaScript files
          options: {
            presets: ['@babel/preset-env'] // Use @babel/preset-env preset for transpilation
          }
        }
      }
    ]
  }
};
