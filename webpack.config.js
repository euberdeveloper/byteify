const path = require('path');
const nodeExternals = require('webpack-node-externals');
const DtsBundleWebpack = require('dts-bundle-webpack');

module.exports = {
    target: 'node',
    mode: 'production',
    // devtool: 'source-map',
    entry: {
        index: './source/index.ts',
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                include: path.resolve(__dirname, 'source'),
                use: [{ loader: 'ts-loader' }]
            }
        ]
    },
    plugins: [
        new DtsBundleWebpack({
            name: 'byteify',
            main: 'dist/index.d.ts',
            out: '../bundled/index.d.ts'
        })
    ],
    externals: [nodeExternals()],
    output: {
        path: path.resolve(__dirname, './bundled'),
        filename: 'index.js',
        library: 'byteify',
        libraryTarget: 'umd',
        globalObject: 'this',
        umdNamedDefine: true,
    }
}