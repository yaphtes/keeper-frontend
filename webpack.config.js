const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './app',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'public', '/assets/'),
        publicPath: '/'
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: path.join(__dirname, 'src'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['es2015', { modules: false }],
                            'stage-2',
                            'react'
                        ]
                    }
                }
            },
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(eot|ttf|woff|woff2|svg)([\?]?.*)$/,
                use: ['file-loader']
            }
        ]
    },

    devServer: {
        contentBase: path.join(__dirname, 'public'),
        publicPath: '/',
        historyApiFallback: true,
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://localhost:3000'
            }
        }
    },

    resolve: {
        extensions: ['.js', '.json', '.jsx', '.scss'],
        alias: {
            'micro-reset': path.join(__dirname, 'src', 'sass', 'micro-reset.scss'),
            'layouts': path.join(__dirname, 'src', 'components', 'layouts'),
            'types': path.join(__dirname, 'src', 'actions', 'types'),
            'components': path.join(__dirname, 'src', 'components'),
            'containers': path.join(__dirname, 'src', 'containers'),
            'reducers': path.join(__dirname, 'src', 'reducers'),
            'ui': path.join(__dirname, 'src', 'components', 'ui'),
            'services': path.join(__dirname, 'src', 'services'),
            'actions': path.join(__dirname, 'src', 'actions'),
            'router': path.join(__dirname, 'src', 'router'),
            'store': path.join(__dirname, 'src', 'store'),
            'sass': path.join(__dirname, 'src', 'sass'),
            'normalize': 'normalize.css'
        }
    },

    devtool: process.env.NODE_ENV != 'production' ? 'inline-source-map' : false,

    context: path.join(__dirname, 'src'),

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
};