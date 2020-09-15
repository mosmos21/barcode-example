const path = require('path')

const config = {
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                test: /.tsx?$/,
                use: 'ts-loader'
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'public', 'assets'),
        filename: 'index.js',
        publicPath: path.resolve(__dirname, 'public')
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        modules: ['src', 'node_modules'],
        alias: {
            '~': path.resolve(__dirname, 'src')
        }
    }
}

module.exports = { config }