const path = require('path');
const { HotModuleReplacementPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

const webpackPlugins = (() => {
    const base = [
        new HtmlWebpackPlugin({
            title: 'TensorFlow Digit Analyzer',
            template: 'src/index.html',
            inject: true
        })
    ];

    const development = [
        new HotModuleReplacementPlugin()
    ];

    const production = [
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css'
        }),
        new OptimizeCssAssetsPlugin(),
        new CopyPlugin([
            {from: 'src/tensorflow/models', to: 'docs/models'}
        ])
    ];

    return isDevelopment ? base.concat(development) : base.concat(production);
})();

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'docs')
    },
    devServer: {
        hot: true,
        progress: true,
        port: 9000,
        inline: true,
        contentBase: './src',
        historyApiFallback: true,
        host: '0.0.0.0',
        https: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }, {
                test: /\.s?[a|c]ss$/,
                use: [
                    { loader: isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader },
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '@': path.resolve('src')
        }
    },
    plugins: webpackPlugins
};