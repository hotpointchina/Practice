const path = require('path');

module.exports = {
    mode:'development',
    entry: {
        cssFN: './src/js/cssFN.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
          { test: /\.css$/, use: 'css-loader' },
          { test: /\.ts$/, use: 'ts-loader' }
        ]
    }
}