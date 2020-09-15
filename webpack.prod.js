const {merge} = require('webpack-merge')
const shared = require('./webpack.shared')

module.exports = merge(shared.config, {
    mode: 'production'
})