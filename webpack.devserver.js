const path = require('path')
const { merge } = require('webpack-merge')
const shared = require('./webpack.shared')

module.exports = merge(shared.config, {
    mode: 'development',
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        hot: true,
        port: 3001,
        publicPath: '/assets/',
    }
})